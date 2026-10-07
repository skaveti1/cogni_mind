"""Emit a 'perfect' groups.jsonl from the ground truth.

Useful as (a) a reference example of the output contract and (b) a sanity check
that the scorer returns ~100% on a perfect partition.

    python3 scripts/make_truth_groups.py
    # -> data/truth_groups.jsonl
"""

from __future__ import annotations

import csv
import json
import os
from typing import Dict, List

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")


def main() -> None:
    gt_path = os.path.join(DATA_DIR, "ground_truth_mapping.csv")
    rp_path = os.path.join(DATA_DIR, "real_parts.csv")
    out_path = os.path.join(DATA_DIR, "truth_groups.jsonl")

    spec: Dict[str, Dict[str, str]] = {}
    if os.path.exists(rp_path):
        with open(rp_path, newline="", encoding="utf-8-sig") as fh:
            for row in csv.DictReader(fh):
                spec[row["real_part_id"]] = row

    groups: Dict[str, List[Dict[str, str]]] = {}
    with open(gt_path, newline="", encoding="utf-8-sig") as fh:
        for row in csv.DictReader(fh):
            groups.setdefault(row["real_part_id"], []).append(
                {"source_file": row["source_file"], "row_id": row["local_row_id"]}
            )

    written = 0
    with open(out_path, "w", encoding="utf-8") as fh:
        for i, (rp, members) in enumerate(sorted(groups.items()), 1):
            info = spec.get(rp, {})
            record = {
                "group_id": f"truth-{i:05d}",
                "canonical_name": info.get("spec_summary", ""),
                "category": info.get("category", ""),
                "confidence": 1.0,
                "members": members,
            }
            fh.write(json.dumps(record) + "\n")
            written += 1

    print(f"wrote {written} groups to {out_path}")


if __name__ == "__main__":
    main()
