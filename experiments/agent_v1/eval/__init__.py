"""Scoring eval for the cross-company part matching agent.

Public pieces:
    loader  - read the agent's groups.jsonl and the ground-truth answer keys
    score   - partial-credit recall + pairwise precision metrics
    report  - human-readable and JSON reporting
    cli     - `python -m eval.cli --groups groups.jsonl`
"""

from .loader import Group, LoadIssues, build_partition, load_ground_truth, load_groups, load_real_parts
from .score import ScoreConfig, ScoreResult, confusable_pairs, score

__all__ = [
    "Group",
    "LoadIssues",
    "build_partition",
    "load_ground_truth",
    "load_groups",
    "load_real_parts",
    "ScoreConfig",
    "ScoreResult",
    "confusable_pairs",
    "score",
]
