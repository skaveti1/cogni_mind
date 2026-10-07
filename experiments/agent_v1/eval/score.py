"""Scoring for cross-company part matching.

Headline metric
---------------
Partial-credit recall over real parts that must be matched (present in >= 2
files). For a true part with ``n`` rows, each additional true member merged into
the same predicted group earns ``1 / (n - 1)``; all ``n`` together earns 1.0.

    credit(t) = min(1, sum_g max(0, |g ∩ T| - 1) / (n - 1))

Because recall alone is exploitable ("put everything in one group" scores
100%), the result also reports pairwise precision, F1, false merges and the
subset of false merges that hit deliberately-confusable (trap) parts.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from math import comb
from typing import Any, Dict, List, Optional, Set, Tuple

from .loader import Group, LoadIssues, RowRef, build_partition

VALID_OVER_MERGE = ("recall_only", "precision", "f1", "purity")


@dataclass
class ScoreConfig:
    min_group_size: int = 2
    # Collapse repeated rows in the same file to one member, so a part's size is
    # the number of *files* it appears in (the "present in 4 of 6 csvs" model).
    collapse_intra_file_dupes: bool = True
    over_merge: str = "precision"


@dataclass
class ScoreResult:
    scored_parts: int
    headline: float
    recall_partial: float
    purity_recall: float
    pairwise_precision: float
    pairwise_recall: float
    pairwise_f1: float
    predicted_groups: int
    predicted_pairs: int
    true_pairs: int
    true_positive_pairs: int
    false_positive_pairs: int
    polluted_groups: int
    trap_false_merges: int
    coverage: float
    unknown_refs: int
    overlapping_groups: int
    malformed: List[str] = field(default_factory=list)
    by_size: Dict[int, Tuple[int, float]] = field(default_factory=dict)
    by_category: Dict[str, Tuple[int, float]] = field(default_factory=dict)
    trap_breakdown: Dict[str, Tuple[int, float]] = field(default_factory=dict)
    per_part: Dict[str, float] = field(default_factory=dict)


def _collapse_dupes(refs: Set[RowRef]) -> Set[RowRef]:
    """Keep at most one row per source file (for intra-file duplicate listings)."""
    seen: Set[str] = set()
    keep: Set[RowRef] = set()
    for src, rid in sorted(refs):
        if src in seen:
            continue
        seen.add(src)
        keep.add((src, rid))
    return keep


def scored_true_groups(
    gt: Dict[str, Set[RowRef]], cfg: ScoreConfig
) -> Dict[str, Set[RowRef]]:
    out: Dict[str, Set[RowRef]] = {}
    for rp, refs in gt.items():
        members = set(refs)
        if cfg.collapse_intra_file_dupes:
            members = _collapse_dupes(refs)
        if len(members) >= cfg.min_group_size:
            out[rp] = members
    return out


def confusable_pairs(
    real_parts: Dict[str, Dict[str, Any]]
) -> Set[frozenset]:
    """Pairs of distinct real parts in the same category differing in exactly
    one attribute -- the near-miss "traps" a naive matcher will false-merge."""
    by_cat: Dict[str, List[str]] = {}
    for rp, info in real_parts.items():
        by_cat.setdefault(info.get("category", ""), []).append(rp)

    pairs: Set[frozenset] = set()
    for rps in by_cat.values():
        for i in range(len(rps)):
            a = real_parts[rps[i]]["attrs"]
            for j in range(i + 1, len(rps)):
                b = real_parts[rps[j]]["attrs"]
                keys = set(a) | set(b)
                if sum(1 for k in keys if a.get(k) != b.get(k)) == 1:
                    pairs.add(frozenset((rps[i], rps[j])))
    return pairs


def score(
    groups: List[Group],
    gt: Dict[str, Set[RowRef]],
    real_parts: Optional[Dict[str, Dict[str, Any]]] = None,
    cfg: Optional[ScoreConfig] = None,
    issues: Optional[LoadIssues] = None,
) -> ScoreResult:
    cfg = cfg or ScoreConfig()
    if cfg.over_merge not in VALID_OVER_MERGE:
        raise ValueError(f"over_merge must be one of {VALID_OVER_MERGE}")
    real_parts = real_parts or {}
    issues = issues or LoadIssues()

    gt_universe: Set[RowRef] = set()
    for refs in gt.values():
        gt_universe |= refs

    merged_groups, part_issues = build_partition(groups, gt_universe)
    # fold partition issues (unknown refs, duplicates) into the passed issues
    issues.unknown_refs = part_issues.unknown_refs
    issues.overlapping_groups = part_issues.overlapping_groups
    issues.duplicate_refs.extend(part_issues.duplicate_refs)

    true = scored_true_groups(gt, cfg)

    # Map *every* ground-truth row to its real part (even rows collapsed out of
    # the size denominator above) so pairwise precision never treats a legitimate
    # duplicate listing as a foreign row.
    ref_to_part: Dict[RowRef, str] = {}
    for rp, refs in gt.items():
        for ref in refs:
            ref_to_part[ref] = rp

    row_to_gid: Dict[RowRef, int] = {}
    for gid, g in enumerate(merged_groups):
        for ref in g:
            row_to_gid[ref] = gid

    cpairs = confusable_pairs(real_parts) if real_parts else set()
    trap_parts: Set[str] = set()
    for c in cpairs:
        trap_parts |= set(c)

    # ---- per-part partial credit -------------------------------------------
    per_part_raw: Dict[str, float] = {}
    per_part: Dict[str, float] = {}
    for rp, T in true.items():
        n = len(T)
        overlaps: Dict[int, int] = {}
        for ref in T:
            gid = row_to_gid.get(ref)
            if gid is None:
                continue
            overlaps[gid] = overlaps.get(gid, 0) + 1
        connections = sum(max(0, o - 1) for o in overlaps.values())
        raw = min(1.0, max(0.0, connections / (n - 1)))
        per_part_raw[rp] = raw
        credit = raw
        if cfg.over_merge == "purity" and overlaps:
            purity = max(o / len(merged_groups[gid]) for gid, o in overlaps.items())
            credit = raw * purity
        per_part[rp] = credit

    scored_parts = len(true)
    recall_partial = sum(per_part_raw.values()) / scored_parts if scored_parts else 0.0
    purity_recall = sum(per_part.values()) / scored_parts if scored_parts else 0.0

    # ---- pairwise ----------------------------------------------------------
    true_pairs = sum(comb(len(refs), 2) for refs in gt.values())
    predicted_groups = 0
    predicted_pairs = 0
    true_positive = 0
    false_positive = 0
    polluted_groups = 0
    trap_false_merges = 0

    for g in merged_groups:
        members = list(g)
        if len(members) < 2:
            continue
        predicted_groups += 1
        predicted_pairs += comb(len(members), 2)
        parts_in_group = {ref_to_part[r] for r in members if r in ref_to_part}
        if len(parts_in_group) > 1:
            polluted_groups += 1
        for i in range(len(members)):
            for j in range(i + 1, len(members)):
                pa = ref_to_part.get(members[i])
                pb = ref_to_part.get(members[j])
                if pa is not None and pb is not None and pa == pb:
                    true_positive += 1
                else:
                    false_positive += 1
                    if pa and pb and pa != pb and frozenset((pa, pb)) in cpairs:
                        trap_false_merges += 1

    precision = true_positive / predicted_pairs if predicted_pairs else 0.0
    pairwise_recall = true_positive / true_pairs if true_pairs else 0.0
    denom = precision + pairwise_recall
    pairwise_f1 = 2 * precision * pairwise_recall / denom if denom else 0.0

    # ---- coverage ----------------------------------------------------------
    all_true_refs: Set[RowRef] = set()
    for refs in gt.values():
        all_true_refs |= refs
    covered = sum(1 for r in all_true_refs if r in row_to_gid)
    coverage = covered / len(all_true_refs) if all_true_refs else 0.0

    # ---- headline ----------------------------------------------------------
    if cfg.over_merge in ("recall_only", "precision"):
        headline = recall_partial
    elif cfg.over_merge == "purity":
        headline = purity_recall
    else:  # f1
        d = recall_partial + precision
        headline = 2 * recall_partial * precision / d if d else 0.0

    # ---- breakdowns --------------------------------------------------------
    by_size: Dict[int, Tuple[int, float]] = {}
    for rp, T in true.items():
        c, m = by_size.get(len(T), (0, 0.0))
        by_size[len(T)] = (c + 1, m + per_part_raw[rp])

    by_category: Dict[str, Tuple[int, float]] = {}
    for rp, T in true.items():
        cat = real_parts.get(rp, {}).get("category", "unknown")
        c, m = by_category.get(cat, (0, 0.0))
        by_category[cat] = (c + 1, m + per_part_raw[rp])

    trap_breakdown: Dict[str, Tuple[int, float]] = {}
    for rp in true:
        key = "trap" if rp in trap_parts else "clean"
        c, m = trap_breakdown.get(key, (0, 0.0))
        trap_breakdown[key] = (c + 1, m + per_part_raw[rp])

    def _avg(d: Dict[Any, Tuple[int, float]]) -> Dict[Any, Tuple[int, float]]:
        return {k: (c, (m / c if c else 0.0)) for k, (c, m) in d.items()}

    return ScoreResult(
        scored_parts=scored_parts,
        headline=headline,
        recall_partial=recall_partial,
        purity_recall=purity_recall,
        pairwise_precision=precision,
        pairwise_recall=pairwise_recall,
        pairwise_f1=pairwise_f1,
        predicted_groups=predicted_groups,
        predicted_pairs=predicted_pairs,
        true_pairs=true_pairs,
        true_positive_pairs=true_positive,
        false_positive_pairs=false_positive,
        polluted_groups=polluted_groups,
        trap_false_merges=trap_false_merges,
        coverage=coverage,
        unknown_refs=len(issues.unknown_refs),
        overlapping_groups=issues.overlapping_groups,
        malformed=list(issues.malformed),
        by_size=_avg(by_size),
        by_category=_avg(by_category),
        trap_breakdown=_avg(trap_breakdown),
        per_part=per_part,
    )
