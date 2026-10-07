# Part-matching scoring eval

Scores an agent's predicted equivalence groups against the ground-truth answer
keys in `../data/`.

## What the agent must output

A single file, `groups.jsonl` (or a JSON array), one object per proposed group:

```json
{
  "group_id": "g0001",
  "canonical_name": "Start Capacitor, 64 MFD, 370V",
  "category": "Start Capacitor",
  "confidence": 0.94,
  "members": [
    {"source_file": "apex_air.csv",                "row_id": "APX-100001"},
    {"source_file": "delta_mechanical.csv",        "row_id": "4000001"},
    {"source_file": "summit_climate.csv",          "row_id": "SU-2024-00001"},
    {"source_file": "northfield_hvac.csv",         "row_id": "NF00001"},
    {"source_file": "blackwell_refrigeration.csv", "row_id": "BLK-000001"},
    {"source_file": "cascade_comfort.csv",         "row_id": "C0001"}
  ],
  "evidence": [{"claim": "all six are 64 MFD / 370 V", "url": "https://...", "quote": "..."}],
  "counterpoints": [],
  "reasoning_summary": "Identical capacitance and voltage across all six listings."
}
```

**Scoring only needs `members`.** Everything else is human-review metadata.

Rules:
- `source_file` is the exact CSV filename.
- `row_id` is the exact value in that file's own id column
  (`part_id` / `Material` / `SKU` / `STK_NO` / `ITEM_CODE` / `sku`).
- Rows form a partition: a row appears in at most one group. Overlaps are merged
  automatically and reported.
- Groups of size 1 are ignored.
- Rows not present in the ground truth are reported as `unknown row refs`.

The JSON Schema is in `schema/groups.schema.json`; the id columns are in
`schema/sources.json`.

## How the score works

For every real part that must be matched (appears in >= 2 files), each
additional true member merged into the same group earns `1 / (n - 1)`:

```
credit(part) = min(1, sum_groups max(0, |group ∩ part| - 1) / (n - 1))
HEADLINE     = mean(credit) over all parts with >= 2 files
```

- all members in one group -> 1.0
- a 4-member part split 2 + 2 -> (1 + 1) / 3 = 0.66
- doing nothing -> 0

Because recall alone is exploitable ("put everything in one group"), the report
also shows **pairwise precision**, F1, false merges, polluted groups, and the
false merges that hit deliberately-confusable "trap" parts.

## Usage

```bash
cd experiments/agent_v1
python -m eval.cli --groups data/groups.jsonl
python -m eval.cli --groups data/groups.jsonl --json-out data/score.json
python -m eval.cli --groups data/groups.jsonl --keep-intra-file-dupes
python -m eval.cli --groups data/groups.jsonl --over-merge f1
```

Flags:
- `--over-merge {recall_only,precision,f1,purity}` — headline mode (default `precision`).
- `--keep-intra-file-dupes` — count repeated rows in one file separately
  (default: collapse them, so a part's size = number of files).
- `--min-group-size` — minimum rows for a part to be scored (default 2).

## Reference prediction

`scripts/make_truth_groups.py` writes `data/truth_groups.jsonl`, a perfect
prediction from the answer key. Scoring it returns 100% and is a quick way to
check the harness.

## Tests

```bash
cd experiments/agent_v1
python -m pytest tests/ -q
```
