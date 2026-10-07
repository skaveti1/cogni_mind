"""CLI: score an agent's groups.jsonl against the ground-truth answer keys.

Run from the agent_v1 directory:

    python -m eval.cli --groups data/groups.jsonl
    python -m eval.cli --groups data/groups.jsonl --json-out data/score.json
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import List, Optional

from .loader import load_ground_truth, load_groups, load_real_parts
from .report import format_report, write_json
from .score import VALID_OVER_MERGE, ScoreConfig, score

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DEFAULT_DATA = os.path.join(ROOT, "data")


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="eval.cli",
        description="Score a part-matching agent's predicted groups.",
    )
    p.add_argument("--groups", required=True, help="path to groups.jsonl (or JSON array)")
    p.add_argument(
        "--ground-truth",
        default=os.path.join(DEFAULT_DATA, "ground_truth_mapping.csv"),
        help="path to ground_truth_mapping.csv",
    )
    p.add_argument(
        "--real-parts",
        default=os.path.join(DEFAULT_DATA, "real_parts.csv"),
        help="path to real_parts.csv (enables category/trap breakdowns)",
    )
    p.add_argument("--min-group-size", type=int, default=2,
                   help="only score true parts with at least this many rows (default 2)")
    p.add_argument("--keep-intra-file-dupes", action="store_true",
                   help="count repeated rows in the same file as separate members "
                        "(default: collapse them, so a part's size = number of files)")
    p.add_argument("--over-merge", choices=VALID_OVER_MERGE, default="precision",
                   help="how the headline treats over-merging (default: precision)")
    p.add_argument("--json-out", default=None, help="also write the full result as JSON")
    return p


def main(argv: Optional[List[str]] = None) -> int:
    args = build_parser().parse_args(argv)

    if not os.path.exists(args.ground_truth):
        print(f"error: ground truth not found: {args.ground_truth}", file=sys.stderr)
        return 2

    gt = load_ground_truth(args.ground_truth)
    real_parts = load_real_parts(args.real_parts) if os.path.exists(args.real_parts) else {}
    groups, issues = load_groups(args.groups)

    cfg = ScoreConfig(
        min_group_size=args.min_group_size,
        collapse_intra_file_dupes=not args.keep_intra_file_dupes,
        over_merge=args.over_merge,
    )
    result = score(groups, gt, real_parts, cfg, issues)

    print(format_report(result, args.groups))
    if args.json_out:
        write_json(result, args.json_out)
        print(f"wrote {args.json_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
