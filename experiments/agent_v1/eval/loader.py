"""Loading and validation of the agent output and the ground-truth answer keys.

Row identity everywhere in this eval is the pair ``(source_file, row_id)`` where
``source_file`` is the exact CSV filename and ``row_id`` is the value found in
that file's own id column (part_id / Material / SKU / STK_NO / ITEM_CODE / sku).
This matches ``ground_truth_mapping.csv`` exactly, so joins are direct.
"""

from __future__ import annotations

import csv
import json
import os
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Set, Tuple

RowRef = Tuple[str, str]


@dataclass
class Group:
    group_id: str
    members: List[RowRef]
    canonical_name: Optional[str] = None
    category: Optional[str] = None
    confidence: Optional[float] = None
    raw: Dict[str, Any] = field(default_factory=dict)


@dataclass
class LoadIssues:
    malformed: List[str] = field(default_factory=list)
    unknown_refs: List[RowRef] = field(default_factory=list)
    duplicate_refs: List[RowRef] = field(default_factory=list)
    overlapping_groups: int = 0
    empty_members: int = 0


def load_ground_truth(path: str) -> Dict[str, Set[RowRef]]:
    """Return ``real_part_id -> set of (source_file, row_id)``."""
    gt: Dict[str, Set[RowRef]] = {}
    with open(path, newline="", encoding="utf-8-sig") as fh:
        for row in csv.DictReader(fh):
            src = (row.get("source_file") or "").strip()
            rid = (row.get("local_row_id") or "").strip()
            rp = (row.get("real_part_id") or "").strip()
            if not (src and rid and rp):
                continue
            gt.setdefault(rp, set()).add((src, rid))
    return gt


def load_real_parts(path: str) -> Dict[str, Dict[str, Any]]:
    """Return ``real_part_id -> {category, brand, attrs}`` from real_parts.csv."""
    out: Dict[str, Dict[str, Any]] = {}
    with open(path, newline="", encoding="utf-8-sig") as fh:
        for row in csv.DictReader(fh):
            attrs: Dict[str, Any] = {}
            spec = row.get("specs_json") or ""
            if spec:
                try:
                    parsed = json.loads(spec)
                    if isinstance(parsed, dict):
                        attrs = parsed
                except json.JSONDecodeError:
                    attrs = {}
            out[row["real_part_id"]] = {
                "category": row.get("category", ""),
                "brand": row.get("brand", ""),
                "attrs": attrs,
            }
    return out


def load_sources(path: str) -> Dict[str, str]:
    """Optional ``filename -> id column`` map used to document/validate the CSVs."""
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
    return {str(k): str(v) for k, v in data.items()}


def _parse_member(m: Any) -> Optional[RowRef]:
    if not isinstance(m, dict):
        return None
    sf = (m.get("source_file") or "").strip()
    rid = (m.get("row_id") or "").strip()
    if not (sf and rid):
        return None
    return (sf, rid)


def load_groups(path: str) -> Tuple[List[Group], LoadIssues]:
    """Load ``groups.jsonl`` (or a JSON array) into ``Group`` objects."""
    issues = LoadIssues()
    if not path or not os.path.exists(path):
        issues.malformed.append(f"file not found: {path}")
        return [], issues

    with open(path, encoding="utf-8-sig") as fh:
        text = fh.read()

    stripped = text.lstrip()
    if not stripped:
        issues.malformed.append("empty groups file")
        return [], issues

    docs: List[Any] = []
    if stripped[0] == "[":
        try:
            arr = json.loads(stripped)
        except json.JSONDecodeError as exc:
            issues.malformed.append(f"invalid JSON array: {exc}")
            return [], issues
        if isinstance(arr, list):
            docs = arr
        else:
            issues.malformed.append("top-level JSON is not a list")
            return [], issues
    else:
        for lineno, line in enumerate(text.splitlines(), 1):
            line = line.strip()
            if not line:
                continue
            try:
                docs.append(json.loads(line))
            except json.JSONDecodeError as exc:
                issues.malformed.append(f"line {lineno}: {exc}")

    groups: List[Group] = []
    for i, doc in enumerate(docs, 1):
        if not isinstance(doc, dict):
            issues.malformed.append(f"group {i}: not a JSON object")
            continue
        raw_members = doc.get("members")
        if not isinstance(raw_members, list):
            issues.malformed.append(f"group {i}: missing 'members' list")
            continue
        members: List[RowRef] = []
        for m in raw_members:
            ref = _parse_member(m)
            if ref is None:
                issues.malformed.append(f"group {i}: member missing source_file/row_id")
                continue
            members.append(ref)
        if not members:
            issues.empty_members += 1
            continue
        confidence = doc.get("confidence")
        groups.append(
            Group(
                group_id=str(doc.get("group_id") or f"g{i:04d}"),
                members=members,
                canonical_name=doc.get("canonical_name"),
                category=doc.get("category"),
                confidence=float(confidence) if isinstance(confidence, (int, float)) else None,
                raw=doc,
            )
        )
    return groups, issues


class _UnionFind:
    def __init__(self) -> None:
        self.parent: Dict[RowRef, RowRef] = {}

    def find(self, x: RowRef) -> RowRef:
        self.parent.setdefault(x, x)
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a: RowRef, b: RowRef) -> None:
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.parent[ra] = rb


def build_partition(
    groups: List[Group], gt_universe: Set[RowRef]
) -> Tuple[List[Set[RowRef]], LoadIssues]:
    """Turn possibly-overlapping groups into a clean partition of rows.

    Overlapping groups are merged with union-find. ``issues.overlapping_groups``
    is the number of rows that appeared in more than one group. Rows absent from
    the ground truth are listed in ``issues.unknown_refs``.
    """
    issues = LoadIssues()
    uf = _UnionFind()
    ref_groups: Dict[RowRef, Set[int]] = {}

    for gi, g in enumerate(groups):
        local: Set[RowRef] = set()
        for ref in g.members:
            if ref in local:
                issues.duplicate_refs.append(ref)
                continue
            local.add(ref)
            uf.find(ref)
            ref_groups.setdefault(ref, set()).add(gi)
        if local:
            refs = list(local)
            rep = refs[0]
            for ref in refs[1:]:
                uf.union(rep, ref)

    issues.overlapping_groups = sum(1 for gis in ref_groups.values() if len(gis) > 1)
    issues.unknown_refs = sorted(r for r in uf.parent if r not in gt_universe)

    components: Dict[RowRef, Set[RowRef]] = {}
    for ref in uf.parent:
        components.setdefault(uf.find(ref), set()).add(ref)
    return list(components.values()), issues
