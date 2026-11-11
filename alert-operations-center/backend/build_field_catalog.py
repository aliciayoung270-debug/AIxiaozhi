#!/usr/bin/env python3
"""Build the alert-rule field catalog from the approved Excel dictionary.

The generated JSON is consumed by the demo API and can also be copied into the
single-file prototype. It deliberately excludes fields marked as "不对客" and
customer-specific fields for customers other than 致一.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import openpyxl


BACKEND_DIR = Path(__file__).resolve().parent
WORKSPACE_DIR = BACKEND_DIR.parents[2]
SOURCE_XLSX = WORKSPACE_DIR / "demo" / "致一定制" / "预警字段说明_2.1-2.6.xlsx"
OUTPUT_JSON = BACKEND_DIR / "field-catalog.json"


OBJECTS = {
    "PARENT_ASIN": {"label": "父 ASIN", "sheet": "2.1 父asin"},
    "CHILD_ASIN": {"label": "子 ASIN", "sheet": "2.2 子asin"},
    "AD_CAMPAIGN": {"label": "广告活动", "sheet": "2.3 广告活动"},
    "PROMOTED_CHILD_ASIN": {"label": "推广品子 ASIN", "sheet": "2.4 推广品"},
    "TARGETING": {"label": "投放词", "sheet": "2.5 投放词"},
    "SEARCH_TERM_PARENT_ASIN": {"label": "搜索词＋父 ASIN", "sheet": "2.6 搜索词+父asin"},
    "SEARCH_TERM_CHILD_ASIN": {"label": "搜索词＋子 ASIN", "sheet": "2.6 搜索词+子asin"},
}

ALERT_OBJECT_RELATIONS = {
    "PARENT_ASIN": ["PARENT_ASIN"],
    "CHILD_ASIN": ["CHILD_ASIN", "PARENT_ASIN"],
    "AD_CAMPAIGN": ["AD_CAMPAIGN", "CHILD_ASIN", "PARENT_ASIN"],
    "PROMOTED_CHILD_ASIN": ["PROMOTED_CHILD_ASIN", "AD_CAMPAIGN", "CHILD_ASIN", "PARENT_ASIN"],
    "TARGETING": ["TARGETING", "AD_CAMPAIGN", "CHILD_ASIN", "PARENT_ASIN"],
    "SEARCH_TERM_PARENT_ASIN": ["SEARCH_TERM_PARENT_ASIN", "PARENT_ASIN"],
    "SEARCH_TERM_CHILD_ASIN": ["SEARCH_TERM_CHILD_ASIN", "CHILD_ASIN"],
}

OPERATORS = {
    "枚举": ["EQ", "NE", "IN", "NOT_IN"],
    "布尔": ["EQ", "NE"],
    "百分比": ["GTE", "GT", "LTE", "LT", "EQ", "NE", "BETWEEN"],
    "金额": ["GTE", "GT", "LTE", "LT", "EQ", "NE", "BETWEEN"],
    "数值": ["GTE", "GT", "LTE", "LT", "EQ", "NE", "BETWEEN"],
    "天数": ["GTE", "GT", "LTE", "LT", "EQ", "NE", "BETWEEN"],
}


def split_tokens(value: object) -> list[str]:
    if value in (None, "", "-"):
        return []
    return [part.strip() for part in re.split(r"[、,，\\n]+", str(value)) if part.strip() and part.strip() != "-"]


def is_available_for_zhiyi(custom_mark: str) -> bool:
    if "飞阅" in custom_mark:
        return False
    return custom_mark in {"通用", "定制", "定制-致一", "待确认"}


def build_catalog() -> dict:
    workbook = openpyxl.load_workbook(SOURCE_XLSX, read_only=True, data_only=True)
    statistical_objects = {}

    for code, definition in OBJECTS.items():
        sheet = workbook[definition["sheet"]]
        fields = []
        for row in sheet.iter_rows(min_row=4, values_only=True):
            business_type, group, name, field_id, custom_mark, compare_mode, comparable_names, comparable_ids, enum_values, time_window, field_type = row
            if not field_id or compare_mode == "不对客" or field_type in (None, "-"):
                continue
            custom_mark = str(custom_mark or "通用")
            if not is_available_for_zhiyi(custom_mark):
                continue
            comparable_metric_ids = split_tokens(comparable_ids)
            comparison_modes = ["FIXED"]
            if compare_mode == "数值/指标" and comparable_metric_ids:
                comparison_modes.append("METRIC")
            fields.append(
                {
                    "id": str(field_id),
                    "name": str(name),
                    "businessType": str(business_type),
                    "group": str(group),
                    "fieldType": str(field_type),
                    "compareMode": str(compare_mode),
                    "comparisonModes": comparison_modes,
                    "operators": OPERATORS.get(str(field_type), ["EQ", "NE"]),
                    "comparableMetricIds": comparable_metric_ids,
                    "comparableMetricNames": split_tokens(comparable_names),
                    "enumOptions": split_tokens(enum_values),
                    "timeWindow": str(time_window or "-"),
                    "customMark": custom_mark,
                    "isCustom": custom_mark != "通用",
                    "needsConfirmation": custom_mark == "待确认",
                }
            )
        statistical_objects[code] = {
            "code": code,
            "label": definition["label"],
            "sourceSheet": definition["sheet"],
            "fields": fields,
        }

    alert_objects = []
    for code, definition in OBJECTS.items():
        alert_objects.append(
            {
                "code": code,
                "label": definition["label"],
                "allowedStatisticalObjectTypes": ALERT_OBJECT_RELATIONS[code],
            }
        )

    return {
        "schemaVersion": "2026-10-05",
        "source": {
            "file": SOURCE_XLSX.name,
            "scope": "第二章 2.1–2.6；通用、致一定制及待确认字段",
        },
        "alertObjects": alert_objects,
        "statisticalObjects": statistical_objects,
    }


if __name__ == "__main__":
    OUTPUT_JSON.write_text(json.dumps(build_catalog(), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(OUTPUT_JSON)
