"""Generate synthetic HVAC procurement databases for 6 merged companies.

Each of the 6 companies exports its own part database as a CSV with a
materially different schema, label set, layout and conventions. The same
real-world part appears across several companies under different names,
descriptions and formatted specs, and is bought from different suppliers at
different prices.

Two answer-key files are also written:
  - real_parts.csv            canonical truth for every real part
  - ground_truth_mapping.csv  (company, row) -> real_part_id

Everything is seeded, so runs are reproducible.

Usage:
    python3 scripts/make_hvac_data.py
"""

from __future__ import annotations

import csv
import json
import math
import os
import random
from dataclasses import dataclass, field
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple

SEED = 20260607
NUM_REAL_PARTS = 1500
UNIVERSAL_PARTS = 150  # forced to appear in (almost) every company

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

# --------------------------------------------------------------------------
# Value pools
# --------------------------------------------------------------------------
HP_POOL = ["1/6", "1/4", "1/3", "1/2", "3/4", "1", "1-1/2", "2", "3", "5"]
MOTOR_VOLT = [115, 208, 230, 460, 24, 120, 240]
PHASE = [1, 3]
RPM = [825, 1075, 1625, 1725, 3450]
POLES = [1, 2, 4, 6]
RUN_CAP = ["15/5", "20/5", "25/5", "30/5", "35/5", "40/5", "45/5", "50/5",
           "55/5", "60/5", "70/5", "35/10", "50/7.5"]
START_CAP = ["43", "53", "64", "88", "108", "124", "161", "189", "216", "233"]
CAP_VOLT = [370, 440]
CONTACTOR_AMPS = [20, 25, 30, 40, 50, 60]
CONTACTOR_POLES = [1, 2, 3]
COIL_VOLT = [24, 120, 240]
RELAY_AMPS = [10, 15, 20, 30]
XFMR_VA = [40, 50, 75, 100, 150, 200]
XFMR_PRI = [120, 208, 240, 480]
XFMR_SEC = [24, 120, 240]
IGN_VOLT = [120, 24]
IGN_TYPE = ["hot surface", "spark"]
FS_LEN = ["2 in", "3 in", "4 in", "6 in"]
FS_TYPE = ["ceramic", "Kanthal"]
GAS_SIZE = ["1/2 in", "3/4 in", "1 in"]
GAS_BTU = ["100k", "150k", "200k", "250k"]
THERMO_TYPE = ["programmable", "non-programmable", "smart", "digital"]
COMP_TONNAGE = ["1", "1.5", "2", "2.5", "3", "4", "5"]
COMP_VOLT = [208, 230, 460]
REFRIG = ["R-410A", "R-32", "R-22", "R-454B"]
COIL_ROWS = [2, 3, 4]
FILTER_SIZE = ["14x20x1", "16x20x1", "16x25x1", "20x20x1", "20x25x1",
               "24x24x1", "20x20x2", "16x25x4"]
MERV = [8, 11, 13, 16]
BELT_SIZE = ["A36", "A38", "A40", "B42", "B45", "3L280", "4L320", "5L450"]
BELT_TYPE = ["v-belt", "cogged", "fractional hp"]
BEARING_BORE = ["1/2 in", "5/8 in", "3/4 in", "1 in", "1-3/16 in"]
BEARING_TYPE = ["ball", "sleeve", "pillow block", "flange"]
WHEEL_DIA = ["9 in", "10 in", "10-1/2 in", "11 in", "12 in"]
WHEEL_WIDTH = ["6 in", "8 in", "10 in"]
ROTATION = ["CW", "CCW"]
BLADE_DIA = ["18 in", "20 in", "22 in", "24 in", "26 in", "30 in"]
BLADE_COUNT = [3, 4, 5]
BOARD_VOLT = [24, 120]
BOARD_TYPE = ["ignition", "blower", "defrost", "main", "furnace"]
FUSE_AMPS = [3, 5, 10, 15, 20, 30, 40]
FUSE_VOLT = [250, 600]
FUSE_TYPE = ["blade", "cartridge", "ceramic"]
SWITCH_SET = ["0.5 in wc", "1.0 in wc", "2.0 in wc"]
SWITCH_DIFF = ["0.1", "0.2", "0.3"]
DAMPER_SIZE = ["8 in", "10 in", "12 in", "14 in", "16 in"]
DAMPER_TYPE = ["manual", "motorized", "barometric", "fire"]

CATEGORIES: List[Dict[str, Any]] = [
    {"name": "Blower Motor", "weight": 12, "fields": {"horsepower": HP_POOL, "voltage": MOTOR_VOLT, "phase": PHASE, "rpm": RPM, "poles": POLES}},
    {"name": "Condenser Fan Motor", "weight": 12, "fields": {"horsepower": HP_POOL, "voltage": MOTOR_VOLT, "phase": PHASE, "rpm": RPM, "poles": POLES}},
    {"name": "Inducer Motor", "weight": 9, "fields": {"horsepower": HP_POOL, "voltage": MOTOR_VOLT, "rpm": RPM, "poles": POLES}},
    {"name": "Run Capacitor", "weight": 10, "fields": {"capacitance": RUN_CAP, "voltage": CAP_VOLT}},
    {"name": "Dual Run Capacitor", "weight": 8, "fields": {"capacitance": RUN_CAP, "voltage": CAP_VOLT}},
    {"name": "Start Capacitor", "weight": 6, "fields": {"capacitance": START_CAP, "voltage": CAP_VOLT}},
    {"name": "Contactor", "weight": 9, "fields": {"amps": CONTACTOR_AMPS, "poles": CONTACTOR_POLES, "coil_voltage": COIL_VOLT}},
    {"name": "Relay", "weight": 5, "fields": {"amps": RELAY_AMPS, "coil_voltage": COIL_VOLT}},
    {"name": "Transformer", "weight": 6, "fields": {"va": XFMR_VA, "primary_voltage": XFMR_PRI, "secondary_voltage": XFMR_SEC}},
    {"name": "Igniter", "weight": 5, "fields": {"voltage": IGN_VOLT, "igniter_type": IGN_TYPE}},
    {"name": "Flame Sensor", "weight": 4, "fields": {"length": FS_LEN, "sensor_type": FS_TYPE}},
    {"name": "Gas Valve", "weight": 5, "fields": {"size": GAS_SIZE, "voltage": [24], "btu": GAS_BTU}},
    {"name": "Thermostat", "weight": 5, "fields": {"thermostat_type": THERMO_TYPE, "voltage": [24]}},
    {"name": "Compressor", "weight": 7, "fields": {"tonnage": COMP_TONNAGE, "voltage": COMP_VOLT, "phase": PHASE, "refrigerant": REFRIG}},
    {"name": "Evaporator Coil", "weight": 5, "fields": {"tonnage": COMP_TONNAGE, "refrigerant": REFRIG, "rows": COIL_ROWS}},
    {"name": "Condenser Coil", "weight": 5, "fields": {"tonnage": COMP_TONNAGE, "refrigerant": REFRIG, "rows": COIL_ROWS}},
    {"name": "Filter", "weight": 6, "fields": {"size": FILTER_SIZE, "merv": MERV}},
    {"name": "Belt", "weight": 4, "fields": {"belt_size": BELT_SIZE, "belt_type": BELT_TYPE}},
    {"name": "Bearing", "weight": 4, "fields": {"bore": BEARING_BORE, "bearing_type": BEARING_TYPE}},
    {"name": "Blower Wheel", "weight": 4, "fields": {"diameter": WHEEL_DIA, "width": WHEEL_WIDTH, "rotation": ROTATION}},
    {"name": "Fan Blade", "weight": 4, "fields": {"diameter": BLADE_DIA, "blades": BLADE_COUNT, "rotation": ROTATION}},
    {"name": "Control Board", "weight": 5, "fields": {"voltage": BOARD_VOLT, "board_type": BOARD_TYPE}},
    {"name": "Fuse", "weight": 3, "fields": {"amps": FUSE_AMPS, "voltage": FUSE_VOLT, "fuse_type": FUSE_TYPE}},
    {"name": "Pressure Switch", "weight": 3, "fields": {"setpoint": SWITCH_SET, "differential": SWITCH_DIFF}},
    {"name": "Damper", "weight": 4, "fields": {"size": DAMPER_SIZE, "damper_type": DAMPER_TYPE}},
]

BASE_PRICE = {
    "Blower Motor": 120, "Condenser Fan Motor": 110, "Inducer Motor": 140,
    "Run Capacitor": 12, "Dual Run Capacitor": 18, "Start Capacitor": 15,
    "Contactor": 35, "Relay": 20, "Transformer": 45, "Igniter": 40,
    "Flame Sensor": 25, "Gas Valve": 90, "Thermostat": 80, "Compressor": 900,
    "Evaporator Coil": 400, "Condenser Coil": 450, "Filter": 12, "Belt": 15,
    "Bearing": 18, "Blower Wheel": 60, "Fan Blade": 45, "Control Board": 150,
    "Fuse": 5, "Pressure Switch": 30, "Damper": 120,
}

BRANDS = ["AeroFlow", "ThermoCore", "KlimaTech", "Baltimo", "Northwind",
          "Vortec", "Magnadyne", "ProCool", "Zephyr Air", "CryoStar"]

ACRONYM = {
    "Blower Motor": "MTR BLWR", "Condenser Fan Motor": "MTR COND FAN",
    "Inducer Motor": "MTR INDUCER", "Run Capacitor": "CAP RUN",
    "Dual Run Capacitor": "CAP RUN DUAL", "Start Capacitor": "CAP START",
    "Contactor": "CONT", "Relay": "RELAY", "Transformer": "XFMR",
    "Igniter": "IGN", "Flame Sensor": "FLAME SENSOR", "Gas Valve": "GAS VALVE",
    "Thermostat": "THERMOSTAT", "Compressor": "COMPRESSOR",
    "Evaporator Coil": "EVAP COIL", "Condenser Coil": "COND COIL",
    "Filter": "FILTER", "Belt": "BELT", "Bearing": "BEARING",
    "Blower Wheel": "BLWR WHEEL", "Fan Blade": "FAN BLADE",
    "Control Board": "CONTROL BOARD", "Fuse": "FUSE",
    "Pressure Switch": "PRESS SWITCH", "Damper": "DAMPER",
}

DE_CATEGORY = {
    "Blower Motor": "Gebläsemotor", "Condenser Fan Motor": "Kondensatorlüftermotor",
    "Inducer Motor": "Induktionsmotor", "Run Capacitor": "Betriebskondensator",
    "Dual Run Capacitor": "Doppel-Betriebskondensator",
    "Start Capacitor": "Anlaufkondensator", "Contactor": "Schütz",
    "Relay": "Relais", "Transformer": "Transformator", "Igniter": "Zünder",
    "Flame Sensor": "Flammenfühler", "Gas Valve": "Gasventil",
    "Thermostat": "Thermostat", "Compressor": "Kompressor",
    "Evaporator Coil": "Verdampferregister", "Condenser Coil": "Verflüssigerregister",
    "Filter": "Filter", "Belt": "Keilriemen", "Bearing": "Lager",
    "Blower Wheel": "Gebläserad", "Fan Blade": "Lüfterrad",
    "Control Board": "Steuerplatine", "Fuse": "Sicherung",
    "Pressure Switch": "Druckschalter", "Damper": "Klappe",
}

SYNONYMS = {
    "Blower Motor": ["blower motor", "blower mtr", "air handler motor"],
    "Condenser Fan Motor": ["condenser fan motor", "cond fan motor", "cooling fan motor"],
    "Inducer Motor": ["inducer motor", "draft inducer", "draft inducer motor", "vent motor"],
    "Run Capacitor": ["run capacitor", "run cap", "motor run capacitor"],
    "Dual Run Capacitor": ["dual run capacitor", "dual run cap", "dual rated capacitor"],
    "Contactor": ["contactor", "power contactor", "contact switch"],
    "Transformer": ["transformer", "xfmr", "control transformer"],
}

SUPPLIERS = {
    "apex": ["Midwest Supply Co", "CoolParts Distributors", "Thermal Supply Group",
             "AirPro Supply", "Vanguard Parts"],
    "delta": ["Ridgeline Parts", "Metro Mechanical Supply", "AllClimate Distributors",
              "Proton Supply"],
    "summit": ["Kälte-Technik GmbH", "EuroKlima Handel", "Wärmepunkt AG",
               "Nordwind Komponenten"],
    "northfield": ["Northfield Wholesale", "Keystone HVAC Supply", "Beacon Mechanical",
                   "Summit Distributing"],
    "blackwell": ["Blackwell Industrial", "ColdChain Supply", "Roper Parts Co",
                  "Central Equipment"],
    "cascade": ["Cascade Wholesale", "Pacific Parts", "Evergreen Supply"],
}

CONTACTS = ["J. Alvarez", "M. Chen", "R. Patel", "S. Kowalski", "D. Thompson",
            "L. Nguyen", "K. O'Brien", "T. Schmidt", "A. Rossi", "P. Dubois",
            "H. Yamamoto", "B. Nowak", "C. Fernandez", "E. Johansson"]

WAREHOUSES = {
    "apex": ["WH-A1", "WH-A2", "WH-B1", "WH-C3"],
    "delta": ["PLT-01", "PLT-02", "PLT-07"],
    "summit": ["Halle 1", "Halle 2", "Halle 3", "Lager Süd"],
    "northfield": ["BIN-100", "BIN-205", "BIN-330", "BIN-412"],
    "blackwell": ["DOCK-1", "DOCK-2", "RACK-A", "RACK-C"],
    "cascade": ["C-01", "C-02"],
}


# --------------------------------------------------------------------------
# Formatting helpers
# --------------------------------------------------------------------------
def frac_to_float(value: str) -> float:
    total = 0.0
    for part in str(value).replace("-", " ").split():
        total += float(Fraction(part))
    return total


def fmt_money(value: float, decimal_comma: bool, decimals: int = 2) -> str:
    if value is None:
        return ""
    if decimal_comma:
        text = f"{value:,.{decimals}f}"
        return text.replace(",", "\u0000").replace(".", ",").replace("\u0000", ".")
    return f"{value:.{decimals}f}"


def hp_disp(hp: str, style: str) -> str:
    if style == "apex":
        return f"{hp} HP"
    if style == "delta":
        return f"{hp}HP"
    if style == "northfield":
        return f"{hp}HP"
    if style == "summit":
        return fmt_money(frac_to_float(hp), True) + " PS"
    if style == "blackwell":
        return f"{frac_to_float(hp):.2f} HP"
    if style == "cascade":
        return f"{frac_to_float(hp):.2f}".lstrip("0") + "hp"
    return f"{hp} HP"


def volt_disp(v: Any, style: str) -> str:
    if style == "summit":
        return f"{v} V"
    if style == "blackwell":
        return f"{v} VOLTS"
    if style == "cascade":
        return f"{v}v"
    return f"{v}V"


def phase_disp(v: Any, style: str) -> str:
    if v == 1:
        return {"apex": "1 phase", "delta": "1PH", "summit": "einphasig",
                "northfield": "1PH", "blackwell": "1 PH", "cascade": "1ph"}[style]
    return {"apex": "3 phase", "delta": "3PH", "summit": "dreiphasig",
            "northfield": "3PH", "blackwell": "3 PH", "cascade": "3ph"}[style]


def pole_disp(v: Any, style: str) -> str:
    return {"apex": f"{v} pole", "delta": f"{v}POLE", "summit": f"{v}-polig",
            "northfield": f"{v}P", "blackwell": f"{v} POLE", "cascade": f"{v}p"}[style]


def cap_disp(v: Any, style: str) -> str:
    return {"apex": f"{v} MFD", "delta": f"{v}MFD", "summit": f"{v} µF",
            "northfield": f"{v} MFD", "blackwell": f"{v} MFD", "cascade": f"{v}"}[style]


def fmt_attr(key: str, value: Any, style: str) -> str:
    if key == "horsepower":
        return hp_disp(value, style)
    if key == "voltage":
        return volt_disp(value, style)
    if key == "phase":
        return phase_disp(value, style)
    if key == "poles":
        return pole_disp(value, style)
    if key == "capacitance":
        return cap_disp(value, style)
    if key == "rpm":
        return f"{value} RPM"
    if key == "amps":
        return f"{value}A"
    if key == "coil_voltage":
        return f"{value}V coil"
    if key == "va":
        return f"{value} VA"
    if key == "primary_voltage":
        return f"{value}V pri"
    if key == "secondary_voltage":
        return f"{value}V sec"
    if key == "btu":
        return f"{value} BTU"
    if key == "tonnage":
        return f"{value} ton"
    if key == "refrigerant":
        return str(value)
    if key == "rows":
        return f"{value} row"
    if key == "merv":
        return f"MERV {value}"
    if key == "diameter":
        return str(value)
    if key == "width":
        return f"{value} wide"
    if key == "blades":
        return f"{value} blade"
    if key == "igniter_type":
        return str(value)
    if key == "thermostat_type":
        return str(value)
    if key == "sensor_type":
        return str(value)
    if key == "bearing_type":
        return str(value)
    if key == "belt_type":
        return str(value)
    if key == "fuse_type":
        return str(value)
    if key == "damper_type":
        return str(value)
    if key == "board_type":
        return str(value)
    if key == "setpoint":
        return f"{value} set"
    if key == "differential":
        return f"{value} diff"
    if key == "rotation":
        return str(value)
    return str(value)


def spec_tokens(part: "RealPart", style: str) -> List[str]:
    return [fmt_attr(k, v, style) for k, v in part.attrs.items()]


# --------------------------------------------------------------------------
# Real part model
# --------------------------------------------------------------------------
@dataclass
class RealPart:
    real_part_id: str
    category: str
    attrs: Dict[str, Any]
    brand: str
    base_cost: float
    commonness: float
    universal: bool


def generate_parts(rng: random.Random) -> List[RealPart]:
    names = [c["name"] for c in CATEGORIES]
    weights = [c["weight"] for c in CATEGORIES]
    by_name = {c["name"]: c for c in CATEGORIES}

    seen: set = set()
    parts: List[RealPart] = []
    attempts = 0
    while len(parts) < NUM_REAL_PARTS and attempts < NUM_REAL_PARTS * 200:
        attempts += 1
        category = rng.choices(names, weights=weights, k=1)[0]
        cfg = by_name[category]
        attrs = {k: rng.choice(v) for k, v in cfg["fields"].items()}
        key = (category, tuple(sorted((k, str(v)) for k, v in attrs.items())))
        if key in seen:
            continue
        seen.add(key)
        idx = len(parts) + 1
        universal = idx <= UNIVERSAL_PARTS
        commonness = 1.0 if universal else rng.random()
        brand = rng.choice(BRANDS)
        base = BASE_PRICE[category] * rng.uniform(0.7, 1.7)
        parts.append(RealPart(
            real_part_id=f"RP-{idx:06d}",
            category=category,
            attrs=attrs,
            brand=brand,
            base_cost=round(base, 2),
            commonness=commonness,
            universal=universal,
        ))
    return parts


def spec_summary(part: RealPart) -> str:
    return ", ".join(f"{k}={v}" for k, v in part.attrs.items())


# --------------------------------------------------------------------------
# Company configuration
# --------------------------------------------------------------------------
@dataclass
class Company:
    key: str
    display: str
    filename: str
    columns: List[str]
    inclusion: float
    price_mult: float
    currency: str = "USD"
    delimiter: str = ","
    encoding: str = "utf-8"
    newline: str = "\n"
    decimal_comma: bool = False
    has_contact: bool = True
    id_prefix: str = ""
    id_start: int = 1
    id_width: int = 6
    uoms: List[str] = field(default_factory=lambda: ["EA"])


def build_companies() -> List[Company]:
    return [
        Company(
            key="apex", display="Apex Air Systems",
            filename="apex_air.csv",
            columns=["part_id", "part_name", "description", "category",
                     "manufacturer", "model_number", "uom", "unit_price",
                     "currency", "stock_qty", "reorder_point", "supplier",
                     "supplier_contact", "supplier_email", "lead_time_days",
                     "moq", "warehouse", "last_updated"],
            inclusion=0.62, price_mult=1.02, has_contact=True,
            id_prefix="APX-", id_start=100001, id_width=6,
            uoms=["EA"],
        ),
        Company(
            key="delta", display="Delta Mechanical Supply",
            filename="delta_mechanical.csv",
            columns=["Material", "Description", "Vendor", "List_Price",
                     "Currency", "UOM", "On_Hand_Qty", "Reorder_Point",
                     "Lead_Time_Days", "Plant"],
            inclusion=0.55, price_mult=0.94, has_contact=False,
            id_start=4000001, id_width=7, uoms=["EA", "PC"],
        ),
        Company(
            key="summit", display="Summit Climate Parts",
            filename="summit_climate.csv",
            columns=["SKU", "Artikelbeschreibung", "Kategorie", "Hersteller",
                     "Lieferant", "Ansprechpartner", "Einzelpreis", "Währung",
                     "Einheit", "Lagermenge", "Mindestbestellmenge",
                     "Lieferzeit_Tage", "Gewicht_kg", "Länge_mm", "Breite_mm",
                     "Höhe_mm", "Zolltarifnummer", "Lagerort"],
            inclusion=0.43, price_mult=1.12, currency="EUR",
            delimiter=";", decimal_comma=True, has_contact=True,
            id_prefix="SU-2024-", id_start=1, id_width=5, uoms=["Stk"],
        ),
        Company(
            key="northfield", display="Northfield HVAC Co.",
            filename="northfield_hvac.csv",
            columns=["STK_NO", "NAME_LINE_1", "NAME_LINE_2", "TYPE", "NOTES",
                     "COST", "SELL", "LIST", "CURR", "UNIT", "VENDOR", "BUYER",
                     "STOCK_QTY", "ON_ORDER", "ETA_WEEKS", "BIN", "MOQ",
                     "CONTRACT_NO"],
            inclusion=0.60, price_mult=1.06, has_contact=True,
            id_prefix="NF", id_start=1, id_width=5, uoms=["EA", "EACH"],
        ),
        Company(
            key="blackwell", display="Blackwell Refrigeration",
            filename="blackwell_refrigeration.csv",
            columns=["ITEM_CODE", "OLD_CODE", "ITEM_DESC", "CATG", "VOLTS",
                     "AMPS", "HORSEPOWER", "UOM", "UNIT_COST", "CURRENCY",
                     "SUPPLIER", "CONTACT_PERSON", "WAREHOUSE", "QTY_AVAIL",
                     "LEAD_TIME_TXT", "LAST_RECEIVED", "SUPERSEDED_BY",
                     "WARRANTY_MO"],
            inclusion=0.50, price_mult=0.98, has_contact=True,
            encoding="utf-8-sig", newline="\r\n",
            id_prefix="BLK-", id_start=1, id_width=6, uoms=["EA"],
        ),
        Company(
            key="cascade", display="Cascade Comfort Systems",
            filename="cascade_comfort.csv",
            columns=["sku", "product", "supplier", "contact", "unit_price",
                     "stock_qty", "lead_time"],
            inclusion=0.35, price_mult=1.09, has_contact=True,
            id_prefix="C", id_start=1, id_width=4, uoms=["EA", "ea"],
        ),
    ]


def local_id(company: Company, n: int) -> str:
    return f"{company.id_prefix}{n:0{company.id_width}d}"


# --------------------------------------------------------------------------
# Per-company row rendering
# --------------------------------------------------------------------------
LEAD_TEXTS = ["IN STOCK", "1 WEEK", "2-3 WEEKS", "3-4 WEEKS", "SPECIAL ORDER"]
CASCADE_LEAD = ["in stock", "3-5 days", "1-2 wks", "2 wks", "4-6 wks"]


def render_row(company: Company, part: RealPart, seq: int, rng: random.Random) -> Tuple[Dict[str, str], Dict[str, Any]]:
    style = company.key
    toks = spec_tokens(part, style)
    supplier = rng.choice(SUPPLIERS[company.key])
    contact = rng.choice(CONTACTS) if company.has_contact else ""
    wh = rng.choice(WAREHOUSES[company.key])
    uom = rng.choice(company.uoms)
    price = round(part.base_cost * company.price_mult * rng.uniform(0.9, 1.2), 2)
    stock = rng.choice([0, 0, 5, 12, 20, 35, 50, 75, 120, 200, 350, 500])
    rop = rng.randint(5, 60)
    moq = rng.choice([1, 1, 1, 5, 10, 25])
    lead_days = rng.randint(3, 45)
    rid = local_id(company, seq)

    name_for_cascade = None
    if style == "cascade":
        syn = SYNONYMS.get(part.category)
        base = rng.choice(syn) if syn else part.category.lower()
        name_for_cascade = (base + " " + " ".join(toks)).lower()

    if style == "apex":
        name = f"{part.category}, " + ", ".join(toks)
        desc = (f"{part.category} for HVAC equipment. Specs: {', '.join(toks)}. "
                f"Brand: {part.brand}. Direct replacement component.")
        model = f"{part.brand[:3].upper()}-{rng.randint(1000, 9999)}"
        email = contact.lower().replace(" ", "").replace("'", "").replace(".", "") + "@" + \
            supplier.lower().replace(" ", "").replace("-", "").replace("&", "and")[:12] + ".com"
        row = {
            "part_id": rid, "part_name": name, "description": desc,
            "category": part.category, "manufacturer": part.brand,
            "model_number": model, "uom": uom,
            "unit_price": fmt_money(price, False), "currency": company.currency,
            "stock_qty": str(stock), "reorder_point": str(rop),
            "supplier": supplier, "supplier_contact": contact,
            "supplier_email": email, "lead_time_days": str(lead_days),
            "moq": str(moq), "warehouse": wh,
            "last_updated": f"20{rng.randint(23, 25)}-{rng.randint(1, 12):02d}-{rng.randint(1, 28):02d}",
        }
        return row, {"kg_weight": None}

    if style == "delta":
        name = ACRONYM.get(part.category, part.category.upper()) + " " + \
            " ".join(toks).upper()
        row = {
            "Material": rid, "Description": name, "Vendor": supplier,
            "List_Price": fmt_money(price, False), "Currency": company.currency,
            "UOM": uom, "On_Hand_Qty": str(stock), "Reorder_Point": str(rop),
            "Lead_Time_Days": str(lead_days), "Plant": wh,
        }
        return row, {}

    if style == "summit":
        name = DE_CATEGORY.get(part.category, part.category) + " " + ", ".join(toks)
        desc = f"{DE_CATEGORY.get(part.category, part.category)} – {', '.join(toks)}. Marke: {part.brand}."
        weight = round(rng.uniform(0.2, 25.0), 2)
        l = rng.randint(80, 900)
        w = rng.randint(80, 700)
        h = rng.randint(50, 600)
        hs = f"{rng.randint(8200, 8600)}{rng.randint(10, 99)}"
        row = {
            "SKU": rid, "Artikelbeschreibung": desc,
            "Kategorie": DE_CATEGORY.get(part.category, part.category),
            "Hersteller": part.brand, "Lieferant": supplier,
            "Ansprechpartner": contact,
            "Einzelpreis": fmt_money(price, True), "Währung": company.currency,
            "Einheit": uom, "Lagermenge": str(stock),
            "Mindestbestellmenge": str(moq),
            "Lieferzeit_Tage": str(lead_days),
            "Gewicht_kg": fmt_money(weight, True, 3),
            "Länge_mm": str(l), "Breite_mm": str(w), "Höhe_mm": str(h),
            "Zolltarifnummer": hs, "Lagerort": wh,
        }
        return row, {}

    if style == "northfield":
        line1 = ACRONYM.get(part.category, part.category.upper())
        line2 = " ".join(toks)
        notes = f"Replaces prior stock. {', '.join(toks)}."
        cost = round(price * 0.62, 2)
        sell = round(price * 0.86, 2)
        lst = round(price * 1.15, 2)
        eta_weeks = max(1, math.ceil(lead_days / 7))
        row = {
            "STK_NO": rid, "NAME_LINE_1": line1, "NAME_LINE_2": line2,
            "TYPE": ACRONYM.get(part.category, part.category.upper()),
            "NOTES": notes, "COST": fmt_money(cost, False),
            "SELL": fmt_money(sell, False), "LIST": fmt_money(lst, False),
            "CURR": company.currency, "UNIT": uom, "VENDOR": supplier,
            "BUYER": contact, "STOCK_QTY": str(stock),
            "ON_ORDER": str(rng.choice([0, 0, 10, 25, 50, 100])),
            "ETA_WEEKS": str(eta_weeks), "BIN": wh, "MOQ": str(moq),
            "CONTRACT_NO": f"CN-{rng.randint(10000, 99999)}",
        }
        return row, {}

    if style == "blackwell":
        name = (part.category.upper() + " " + " ".join(toks)).upper()
        old_code = f"BLK-OLD-{rng.randint(1000, 9999)}" if rng.random() < 0.3 else ""
        superseded = f"BLK-{rng.randint(1, 99999):06d}" if rng.random() < 0.15 else ""
        row = {
            "ITEM_CODE": rid, "OLD_CODE": old_code, "ITEM_DESC": name,
            "CATG": ACRONYM.get(part.category, part.category.upper()),
            "VOLTS": str(part.attrs.get("voltage", "")),
            "AMPS": str(part.attrs.get("amps", "")),
            "HORSEPOWER": (f"{frac_to_float(part.attrs['horsepower']):.2f}"
                           if "horsepower" in part.attrs else ""),
            "UOM": uom, "UNIT_COST": fmt_money(price, False),
            "CURRENCY": company.currency, "SUPPLIER": supplier,
            "CONTACT_PERSON": contact, "WAREHOUSE": wh,
            "QTY_AVAIL": str(stock),
            "LEAD_TIME_TXT": rng.choice(LEAD_TEXTS),
            "LAST_RECEIVED": f"20{rng.randint(23, 25)}-{rng.randint(1, 12):02d}-{rng.randint(1, 28):02d}",
            "SUPERSEDED_BY": superseded,
            "WARRANTY_MO": str(rng.choice([6, 12, 12, 24, 36])),
        }
        return row, {}

    # cascade
    row = {
        "sku": rid, "product": name_for_cascade, "supplier": supplier,
        "contact": contact, "unit_price": fmt_money(price, False),
        "stock_qty": str(stock), "lead_time": rng.choice(CASCADE_LEAD),
    }
    return row, {}


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
def main() -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    rng = random.Random(SEED)
    parts = generate_parts(rng)
    companies = build_companies()

    # Decide up front which companies carry each part. Every part is
    # guaranteed to appear in at least one company so nothing is orphaned.
    inclusion: Dict[str, set] = {}
    for part in parts:
        carriers = set()
        for company in companies:
            if part.universal:
                include = rng.random() < 0.97
            else:
                include = rng.random() < company.inclusion * (0.25 + 0.80 * part.commonness)
            if include:
                carriers.add(company.key)
        if not carriers:
            carriers.add(rng.choice(companies).key)
        inclusion[part.real_part_id] = carriers

    mapping: List[Dict[str, str]] = []
    inclusion_counts = {p.real_part_id: 0 for p in parts}
    total_rows = 0

    for company in companies:
        rows: List[Dict[str, str]] = []
        seq = company.id_start
        for part in parts:
            if company.key not in inclusion[part.real_part_id]:
                continue
            row, _ = render_row(company, part, seq, rng)
            rows.append((row, part.real_part_id))
            mapping.append({
                "company": company.key,
                "source_file": company.filename,
                "local_row_id": row[company.columns[0]],
                "real_part_id": part.real_part_id,
            })
            inclusion_counts[part.real_part_id] += 1
            seq += 1

        # occasional intra-file duplicate of the same real part
        for row, rp in list(rows):
            if rng.random() < 0.035:
                dup = dict(row)
                dup[company.columns[0]] = local_id(company, seq)
                seq += 1
                # nudge price / stock to look like a re-listing
                price_cols = [c for c in company.columns if "price" in c.lower()
                              or "cost" in c.lower() or c in ("COST", "SELL", "LIST", "Einzelpreis")]
                for pc in price_cols:
                    txt = dup.get(pc, "")
                    try:
                        if company.decimal_comma:
                            val = float(txt.replace(".", "").replace(",", "."))
                        else:
                            val = float(txt)
                    except (TypeError, ValueError):
                        continue
                    dup[pc] = fmt_money(val * rng.uniform(0.95, 1.05),
                                        company.decimal_comma)
                for sc in [c for c in company.columns if "stock" in c.lower()
                           or c in ("On_Hand_Qty", "Lagermenge", "QTY_AVAIL", "Qty_Avail")]:
                    dup[sc] = str(rng.choice([0, 5, 15, 40, 90]))
                rows.append((dup, rp))
                mapping.append({
                    "company": company.key,
                    "source_file": company.filename,
                    "local_row_id": dup[company.columns[0]],
                    "real_part_id": rp,
                })

        path = os.path.join(DATA_DIR, company.filename)
        with open(path, "w", newline="", encoding=company.encoding) as fh:
            writer = csv.DictWriter(fh, fieldnames=company.columns,
                                    delimiter=company.delimiter)
            writer.writeheader()
            writer.writerows(row for row, _ in rows)
        total_rows += len(rows)
        print(f"{company.filename:32s} {len(rows):5d} rows  "
              f"({len(company.columns)} cols, delim='{company.delimiter}')")

    # answer key: canonical parts
    rp_path = os.path.join(DATA_DIR, "real_parts.csv")
    with open(rp_path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow(["real_part_id", "category", "brand", "spec_summary",
                         "specs_json", "reference_cost"])
        for p in parts:
            writer.writerow([p.real_part_id, p.category, p.brand,
                             spec_summary(p), json.dumps(p.attrs),
                             f"{p.base_cost:.2f}"])

    # answer key: mapping
    gt_path = os.path.join(DATA_DIR, "ground_truth_mapping.csv")
    with open(gt_path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(
            fh, fieldnames=["company", "source_file", "local_row_id", "real_part_id"])
        writer.writeheader()
        writer.writerows(mapping)

    # stats
    hist: Dict[int, int] = {}
    for count in inclusion_counts.values():
        hist[count] = hist.get(count, 0) + 1
    print("\n--- summary ---")
    print(f"unique real parts      : {len(parts)}")
    print(f"total rows across files: {total_rows}")
    print(f"mapping rows           : {len(mapping)}")
    print("parts by number of companies they appear in:")
    for k in sorted(hist):
        print(f"  in {k} company(ies): {hist[k]}")
    print(f"\nwritten to: {DATA_DIR}")


if __name__ == "__main__":
    main()
