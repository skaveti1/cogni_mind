from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple


def normalize_text(value: Any) -> str:
    if value is None:
        return ""
    text = str(value).lower().strip()
    text = text.replace("&", " and ")
    text = re.sub(r"[^a-z0-9+/\s]", " ", text)
    text = text.replace("/", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize_name_tokens(value: Any) -> Tuple[str, ...]:
    text = normalize_text(value)
    replacements = {
        "ea": "each",
        "each": "each",
        "volt": "volt",
        "volts": "volt",
        "v": "volt",
        "hp": "hp",
        "motor": "motor",
        "blower": "blower",
        "capacitor": "capacitor",
        "mfd": "mfd",
        "uf": "mfd",
        "pole": "pole",
        "poles": "pole",
        "single": "single",
        "dual": "dual",
    }
    tokens = []
    for token in text.split():
        if token.isdigit() or re.fullmatch(r"\d+(?:\.\d+)?", token):
            continue
        normalized = replacements.get(token, token)
        if normalized not in {"and", "the", "for", "of", "volt", "hp", "mfd", "ea", "each", "pole"}:
            tokens.append(normalized)
    return tuple(sorted(set(tokens)))


def canonicalize_unit(value: Any) -> Optional[str]:
    text = normalize_text(value)
    if not text:
        return None
    if text in {"ea", "each"}:
        return "EA"
    return text.upper()


def parse_decimal_from_text(value: Any) -> Optional[float]:
    if value is None:
        return None

    text = str(value).lower().strip()
    if not text:
        return None

    text = text.replace(",", " ")
    text = text.replace("volt", " ")
    text = text.replace("volts", " ")
    text = text.replace("v", " ")
    text = text.replace("hp", " ")
    text = text.replace("mfd", " ")
    text = text.replace("uf", " ")
    text = text.replace("each", " ")
    text = text.replace("ea", " ")
    text = re.sub(r"[^0-9./\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    fraction_match = re.search(r"((?:\d+(?:\.\d+)?)|(?:\.\d+))\s*/\s*((?:\d+(?:\.\d+)?)|(?:\.\d+))", text)
    if fraction_match:
        numerator = float(fraction_match.group(1))
        denominator = float(fraction_match.group(2))
        if denominator:
            return numerator / denominator

    number_match = re.search(r"((?:\d+(?:\.\d+)?)|(?:\.\d+))", text)
    if number_match:
        return float(number_match.group(1))
    return None


def parse_horsepower(value: Any) -> Optional[float]:
    if value is None:
        return None

    text = str(value).lower().strip()
    if not text:
        return None
    if "hp" not in text:
        return None
    return parse_decimal_from_text(text)


def parse_voltage(value: Any) -> Optional[int]:
    if value is None:
        return None

    text = str(value).lower().strip()
    if not text:
        return None
    if "volt" not in text and "v" not in text:
        return None
    parsed = parse_decimal_from_text(text)
    if parsed is None:
        return None
    return int(round(parsed))


def parse_pole_count(value: Any) -> Optional[int]:
    if value is None:
        return None

    text = str(value).lower().strip()
    if not text:
        return None

    if "pole" not in text and "poles" not in text and not re.fullmatch(r"\d+(?:\.\d+)?", text):
        return None

    parsed = parse_decimal_from_text(text)
    if parsed is None:
        return None
    return int(round(parsed))


def parse_capacitance(value: Any) -> Optional[Tuple[float, Optional[float]]]:
    if value is None:
        return None

    text = str(value).lower().strip()
    if not text:
        return None

    if "cap" not in text and "mfd" not in text and "uf" not in text and "micro" not in text and "/" not in text:
        return None

    fraction_match = re.search(r"((?:\d+(?:\.\d+)?)|(?:\.\d+))\s*/\s*((?:\d+(?:\.\d+)?)|(?:\.\d+))", text)
    if fraction_match:
        return (float(fraction_match.group(1)), float(fraction_match.group(2)))

    number_match = re.search(r"((?:\d+(?:\.\d+)?)|(?:\.\d+))", text)
    if number_match:
        return (float(number_match.group(1)), None)
    return None


@dataclass
class NormalizedPart:
    source: str
    record_id: str
    kind: str
    name_tokens: Tuple[str, ...]
    horsepower: Optional[float]
    voltage: Optional[int]
    unit: Optional[str]
    poles: Optional[int]
    capacitance: Optional[Tuple[float, Optional[float]]]
    raw: Dict[str, Any]

    def debug_summary(self) -> Dict[str, Any]:
        return {
            "source": self.source,
            "record_id": self.record_id,
            "kind": self.kind,
            "name_tokens": list(self.name_tokens),
            "horsepower": self.horsepower,
            "voltage": self.voltage,
            "unit": self.unit,
            "poles": self.poles,
            "capacitance": self.capacitance,
        }


@dataclass
class MatchDecision:
    predicted_match: bool
    score: float
    reason: str
    normalized_left: NormalizedPart
    normalized_right: NormalizedPart


def infer_kind(record: Dict[str, Any]) -> str:
    text = normalize_text(
        " ".join(
            [
                str(record.get("description") or ""),
                str(record.get("title") or ""),
                str(record.get("name") or ""),
                str(record.get("model") or ""),
                str(record.get("spec") or ""),
            ]
        )
    )
    if "capacitor" in text or "mfd" in text or "uf" in text or "micro" in text:
        return "capacitor"
    return "motor"


def normalize_record(source: str, record_id: str, raw_record: Dict[str, Any]) -> NormalizedPart:
    kind = infer_kind(raw_record)
    description_text = raw_record.get("description") or raw_record.get("title") or raw_record.get("name") or raw_record.get("spec") or ""
    raw_name = raw_record.get("name") or raw_record.get("title") or raw_record.get("description") or ""

    if kind == "capacitor":
        normalized = NormalizedPart(
            source=source,
            record_id=record_id,
            kind="capacitor",
            name_tokens=normalize_name_tokens(raw_name or description_text),
            horsepower=None,
            voltage=None,
            unit=canonicalize_unit(raw_record.get("unit") or raw_record.get("uom") or raw_record.get("packaging")),
            poles=None,
            capacitance=parse_capacitance(
                raw_record.get("capacitance")
                or raw_record.get("rating")
                or raw_record.get("spec")
                or raw_record.get("description")
                or ""
            ),
            raw=raw_record,
        )
        return normalized

    return NormalizedPart(
        source=source,
        record_id=record_id,
        kind="motor",
        name_tokens=normalize_name_tokens(raw_name or description_text),
        horsepower=parse_horsepower(raw_record.get("horsepower") or raw_record.get("hp") or raw_record.get("description") or ""),
        voltage=parse_voltage(raw_record.get("voltage") or raw_record.get("volts") or raw_record.get("description") or ""),
        unit=canonicalize_unit(raw_record.get("unit") or raw_record.get("uom") or raw_record.get("packaging")),
        poles=parse_pole_count(raw_record.get("poles") or raw_record.get("pole_count") or raw_record.get("description") or ""),
        capacitance=None,
        raw=raw_record,
    )


def name_similarity(left: NormalizedPart, right: NormalizedPart) -> float:
    left_tokens = set(left.name_tokens)
    right_tokens = set(right.name_tokens)
    if not left_tokens or not right_tokens:
        return 0.0
    overlap = len(left_tokens & right_tokens)
    union = len(left_tokens | right_tokens)
    if union == 0:
        return 0.0
    return overlap / union


def match_parts(left: NormalizedPart, right: NormalizedPart) -> MatchDecision:
    if left.kind != right.kind:
        return MatchDecision(
            predicted_match=False,
            score=0.0,
            reason=f"Kind mismatch: {left.kind} vs {right.kind}",
            normalized_left=left,
            normalized_right=right,
        )

    score = 0.0
    reasons: List[str] = []

    name_score = name_similarity(left, right)
    score += 0.45 * name_score
    reasons.append(f"name overlap={name_score:.2f}")

    if left.kind == "motor":
        if left.horsepower is None or right.horsepower is None:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason="Critical conflict: missing horsepower on at least one record",
                normalized_left=left,
                normalized_right=right,
            )
        hp_diff = abs(left.horsepower - right.horsepower)
        if hp_diff > 0.02:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason=f"Critical conflict: horsepower {left.horsepower} vs {right.horsepower}",
                normalized_left=left,
                normalized_right=right,
            )
        score += 0.25
        reasons.append("horsepower matches")

        if left.voltage is None or right.voltage is None:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason="Critical conflict: missing voltage on at least one record",
                normalized_left=left,
                normalized_right=right,
            )
        if left.voltage != right.voltage:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason=f"Critical conflict: voltage {left.voltage} vs {right.voltage}",
                normalized_left=left,
                normalized_right=right,
            )
        score += 0.15
        reasons.append("voltage matches")

        if left.unit and right.unit:
            if left.unit == right.unit:
                score += 0.05
                reasons.append("unit matches")
            else:
                reasons.append(f"unit differs: {left.unit} vs {right.unit}")

        if left.poles is None or right.poles is None:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason="Critical conflict: missing pole count on at least one record",
                normalized_left=left,
                normalized_right=right,
            )
        if left.poles != right.poles:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason=f"Critical conflict: pole count {left.poles} vs {right.poles}",
                normalized_left=left,
                normalized_right=right,
            )
        score += 0.10
        reasons.append("pole count matches")

    if left.kind == "capacitor":
        if left.capacitance is None or right.capacitance is None:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason="Critical conflict: missing capacitance on at least one record",
                normalized_left=left,
                normalized_right=right,
            )
        if left.capacitance != right.capacitance:
            return MatchDecision(
                predicted_match=False,
                score=0.0,
                reason=f"Critical conflict: capacitance {left.capacitance} vs {right.capacitance}",
                normalized_left=left,
                normalized_right=right,
            )
        score += 0.55
        reasons.append("capacitance matches")
        if left.unit and right.unit:
            if left.unit == right.unit:
                score += 0.10
                reasons.append("unit matches")
            else:
                reasons.append(f"unit differs: {left.unit} vs {right.unit}")

    predicted_match = score >= 0.72 and name_score >= 0.5
    reason = "; ".join(reasons)
    return MatchDecision(
        predicted_match=predicted_match,
        score=round(score, 3),
        reason=reason,
        normalized_left=left,
        normalized_right=right,
    )


ERP_RECORDS = [
    {
        "record_id": "ERP-1001",
        "description": "MOTOR, BLOWER",
        "hp": "1/3HP",
        "voltage": "115V",
        "uom": "EA",
        "pole_count": "1",
    },
    {
        "record_id": "ERP-1002",
        "description": "BLOWER MOTOR",
        "hp": ".33 HP",
        "voltage": "115 VOLT",
        "uom": "EACH",
        "pole_count": "1",
    },
    {
        "record_id": "ERP-2001",
        "description": "CAPACITOR, RUN 35/5",
        "capacitance": "35/5",
        "uom": "EA",
    },
]

CRM_RECORDS = [
    {
        "record_id": "CRM-2001",
        "title": "Blower Motor",
        "spec": "0.33 HP 115 VOLT EACH",
        "horsepower": ".33 HP",
        "volts": "115 VOLT",
        "unit": "EACH",
        "poles": "1",
    },
    {
        "record_id": "CRM-2002",
        "title": "Blower Motor Assembly",
        "spec": "1/3 HP 115V each",
        "horsepower": "1/3HP",
        "volts": "115V",
        "unit": "EA",
        "poles": "1",
    },
    {
        "record_id": "CRM-3001",
        "title": "Run Capacitor",
        "spec": "35/5 MFD run capacitor",
        "capacitance": "35/5",
        "unit": "EA",
    },
    {
        "record_id": "CRM-2003",
        "title": "Blower Motor",
        "spec": "1/2 HP 115V each",
        "horsepower": "1/2HP",
        "volts": "115V",
        "unit": "EA",
        "poles": "1",
    },
    {
        "record_id": "CRM-3002",
        "title": "Run Capacitor",
        "spec": "45/5 MFD run capacitor",
        "capacitance": "45/5",
        "unit": "EA",
    },
    {
        "record_id": "CRM-2004",
        "title": "Blower Motor",
        "spec": "1/3 HP 115V 2 pole each",
        "horsepower": "1/3HP",
        "volts": "115V",
        "unit": "EA",
        "poles": "2",
    },
]


def build_eval_cases() -> List[Tuple[Tuple[Dict[str, Any], str], Tuple[Dict[str, Any], str], bool]]:
    return [
        ((ERP_RECORDS[0], "erp"), (CRM_RECORDS[0], "crm"), True),
        ((ERP_RECORDS[1], "erp"), (CRM_RECORDS[1], "crm"), True),
        ((ERP_RECORDS[2], "erp"), (CRM_RECORDS[2], "crm"), True),
        ((ERP_RECORDS[0], "erp"), (CRM_RECORDS[3], "crm"), False),
        ((ERP_RECORDS[2], "erp"), (CRM_RECORDS[4], "crm"), False),
        ((ERP_RECORDS[0], "erp"), (CRM_RECORDS[5], "crm"), False),
        (
            ({"record_id": "ERP-1003", "description": "BLOWER MOTOR", "voltage": "115V", "uom": "EA", "pole_count": "1"}, "erp"),
            ({"record_id": "CRM-2005", "title": "Blower Motor", "horsepower": "1/3HP", "volts": "115V", "unit": "EA", "poles": "1"}, "crm"),
            False,
        ),
    ]


def print_case_result(index: int, left: Dict[str, Any], left_source: str, right: Dict[str, Any], right_source: str, expected: bool, decision: MatchDecision) -> bool:
    print(f"\n=== Case {index} ===")
    print(f"Source A ({left_source}): {left}")
    print(f"Source B ({right_source}): {right}")
    print(f"Normalized A: {decision.normalized_left.debug_summary()}")
    print(f"Normalized B: {decision.normalized_right.debug_summary()}")
    print(f"Predicted match: {'MATCH' if decision.predicted_match else 'NON-MATCH'}")
    print(f"Match score: {decision.score}")
    print(f"Reason: {decision.reason}")
    print(f"Expected result: {'MATCH' if expected else 'NON-MATCH'}")
    is_correct = decision.predicted_match == expected
    print(f"Prediction correct: {'YES' if is_correct else 'NO'}")
    return is_correct


def main() -> None:
    cases = build_eval_cases()
    correct = 0

    print("CRM / Catalog Part-Matching Spike")
    print("Synthetic-only baseline with deterministic matching and hard conflict checks.")

    for index, ((left_raw, left_source), (right_raw, right_source), expected) in enumerate(cases, start=1):
        left = normalize_record(left_source, left_raw["record_id"], left_raw)
        right = normalize_record(right_source, right_raw["record_id"], right_raw)
        decision = match_parts(left, right)
        case_correct = print_case_result(index, left_raw, left_source, right_raw, right_source, expected, decision)
        correct += 1 if case_correct else 0

    total = len(cases)
    accuracy = (correct / total) * 100 if total else 0.0
    print("\n=== Final evaluation summary ===")
    print(f"Cases evaluated: {total}")
    print(f"Correct predictions: {correct}")
    print(f"Accuracy: {accuracy:.1f}%")


if __name__ == "__main__":
    main()
