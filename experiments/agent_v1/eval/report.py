"""Human-readable and JSON reporting for :class:`ScoreResult`."""

from __future__ import annotations

import json
from dataclasses import asdict
from typing import Any, Dict

from .score import ScoreResult


def _pct(x: float) -> str:
    return f"{x * 100:6.2f}%"


def format_report(result: ScoreResult, groups_path: str = "") -> str:
    lines = []
    lines.append("=" * 68)
    lines.append("Cross-company part matching -- evaluation")
    if groups_path:
        lines.append(f"predictions: {groups_path}")
    lines.append("=" * 68)
    lines.append("")
    lines.append(f"parts to match (>=2 files) : {result.scored_parts}")
    lines.append(f"HEADLINE (partial recall)  : {_pct(result.headline)}")
    lines.append(f"  raw partial recall       : {_pct(result.recall_partial)}")
    if result.purity_recall != result.recall_partial:
        lines.append(f"  purity-adjusted recall   : {_pct(result.purity_recall)}")
    lines.append("")
    lines.append("over-merge guardrails")
    lines.append(f"  pairwise precision       : {_pct(result.pairwise_precision)}")
    lines.append(f"  pairwise recall          : {_pct(result.pairwise_recall)}")
    lines.append(f"  pairwise F1              : {_pct(result.pairwise_f1)}")
    lines.append(f"  true pairs               : {result.true_pairs}")
    lines.append(f"  predicted pairs          : {result.predicted_pairs}")
    lines.append(f"    true positives         : {result.true_positive_pairs}")
    lines.append(f"    false positives        : {result.false_positive_pairs}")
    lines.append(f"  polluted groups          : {result.polluted_groups}")
    lines.append(f"  trap false merges        : {result.trap_false_merges}")
    lines.append("")
    lines.append("coverage / integrity")
    lines.append(f"  row coverage             : {_pct(result.coverage)}")
    lines.append(f"  predicted groups (>=2)   : {result.predicted_groups}")
    lines.append(f"  unknown row refs         : {result.unknown_refs}")
    lines.append(f"  overlapping rows         : {result.overlapping_groups}")
    if result.malformed:
        preview = "; ".join(result.malformed[:5])
        more = "" if len(result.malformed) <= 5 else f" (+{len(result.malformed) - 5} more)"
        lines.append(f"  malformed entries        : {preview}{more}")
    lines.append("")

    if result.by_size:
        lines.append("recall by group size (n files)")
        for n in sorted(result.by_size):
            count, mean = result.by_size[n]
            lines.append(f"  n={n}: {_pct(mean)}  ({count} parts)")
        lines.append("")

    if result.trap_breakdown:
        lines.append("recall: trap vs clean parts")
        for key in sorted(result.trap_breakdown):
            count, mean = result.trap_breakdown[key]
            lines.append(f"  {key:6s}: {_pct(mean)}  ({count} parts)")
        lines.append("")

    if result.by_category:
        lines.append("recall by category")
        for cat in sorted(result.by_category):
            count, mean = result.by_category[cat]
            lines.append(f"  {cat:24s} {_pct(mean)}  ({count})")
        lines.append("")

    lines.append("=" * 68)
    return "\n".join(lines)


def result_to_dict(result: ScoreResult) -> Dict[str, Any]:
    data = asdict(result)
    # tuples in dicts are fine for JSON; freeze the per-part map as-is
    return data


def write_json(result: ScoreResult, path: str) -> None:
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(result_to_dict(result), fh, indent=2, sort_keys=True)
