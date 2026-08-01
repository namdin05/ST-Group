#!/usr/bin/env python3
"""Deterministically validate EMS checklist/execution Markdown structure.

This script never decides whether a UI behaviour Passed or Failed.
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import Counter
from pathlib import Path


PLACEHOLDERS = {
    "",
    "-",
    "—",
    "todo",
    "todo-human-evidence",
    "`todo`",
    "`todo-human-evidence`",
    "n/a",
    "none",
}
FINAL_STATUSES = {"Passed", "Failed"}
WORKING_STATUSES = FINAL_STATUSES | {"BLOCKED", "TODO-HUMAN-EVIDENCE"}


def split_row(line: str) -> list[str]:
    text = line.strip()
    if text.startswith("|"):
        text = text[1:]
    if text.endswith("|"):
        text = text[:-1]
    return [cell.strip() for cell in text.split("|")]


def is_separator(cells: list[str]) -> bool:
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", c) for c in cells)


def markdown_tables(path: Path) -> list[tuple[list[str], list[dict[str, str]]]]:
    lines = path.read_text(encoding="utf-8").splitlines()
    tables: list[tuple[list[str], list[dict[str, str]]]] = []
    index = 0
    while index + 1 < len(lines):
        if "|" not in lines[index] or "|" not in lines[index + 1]:
            index += 1
            continue
        header = split_row(lines[index])
        separator = split_row(lines[index + 1])
        if len(header) < 2 or len(separator) != len(header) or not is_separator(separator):
            index += 1
            continue
        rows: list[dict[str, str]] = []
        cursor = index + 2
        while cursor < len(lines) and "|" in lines[cursor]:
            cells = split_row(lines[cursor])
            if len(cells) != len(header):
                break
            rows.append(dict(zip(header, cells)))
            cursor += 1
        tables.append((header, rows))
        index = cursor
    return tables


def find_table(path: Path, required: set[str]) -> tuple[list[str], list[dict[str, str]]]:
    for header, rows in markdown_tables(path):
        if required.issubset(set(header)):
            return header, rows
    raise ValueError(f"{path}: no Markdown table contains columns {sorted(required)}")


def meaningful(value: str) -> bool:
    return value.strip().lower() not in PLACEHOLDERS


def normalize_ia(value: str) -> str | None:
    match = re.search(r"IA[- ]?0?([1-4])", value, re.IGNORECASE)
    return f"IA-0{match.group(1)}" if match else None


def validate(args: argparse.Namespace) -> tuple[list[str], list[str], dict[str, int]]:
    errors: list[str] = []
    warnings: list[str] = []

    _, checklist_rows = find_table(
        args.checklist, {"ID", "IA", "Checklist Item"}
    )
    checklist_rows = [
        row for row in checklist_rows if meaningful(row.get("ID", ""))
    ]
    checklist_ids = [row["ID"] for row in checklist_rows]
    checklist_counts = Counter(checklist_ids)

    if len(checklist_rows) <= 40:
        errors.append(f"Checklist has {len(checklist_rows)} items; more than 40 required.")
    duplicate_checklist = sorted(key for key, count in checklist_counts.items() if count > 1)
    if duplicate_checklist:
        errors.append(f"Duplicate checklist IDs: {', '.join(duplicate_checklist)}")

    covered = {normalize_ia(row.get("IA", "")) for row in checklist_rows}
    missing_ia = sorted({"IA-01", "IA-02", "IA-03", "IA-04"} - covered)
    if missing_ia:
        errors.append(f"Missing IA coverage: {', '.join(missing_ia)}")

    required_execution = {"ID", "Checklist Item"}
    for screen in args.screens:
        required_execution.update(
            {
                f"{screen} Status",
                f"{screen} Failure Reason",
                f"{screen} Screenshot Ref",
                f"{screen} Bug ID",
            }
        )
    _, execution_rows = find_table(args.execution, required_execution)
    execution_rows = [
        row for row in execution_rows if meaningful(row.get("ID", ""))
    ]
    execution_ids = [row["ID"] for row in execution_rows]
    execution_counts = Counter(execution_ids)
    duplicate_execution = sorted(key for key, count in execution_counts.items() if count > 1)
    if duplicate_execution:
        errors.append(f"Duplicate execution IDs: {', '.join(duplicate_execution)}")

    missing_rows = sorted(set(checklist_ids) - set(execution_ids))
    extra_rows = sorted(set(execution_ids) - set(checklist_ids))
    if missing_rows:
        errors.append(f"Execution missing checklist IDs: {', '.join(missing_rows)}")
    if extra_rows:
        errors.append(f"Execution has unknown checklist IDs: {', '.join(extra_rows)}")

    working_count = 0
    failed_count = 0
    passed_count = 0
    for row in execution_rows:
        item_id = row["ID"]
        for screen in args.screens:
            status = row[f"{screen} Status"].strip()
            if status not in WORKING_STATUSES:
                errors.append(
                    f"{item_id}/{screen}: unsupported status {status!r}; "
                    f"allowed: {', '.join(sorted(WORKING_STATUSES))}"
                )
                continue
            if status == "Passed":
                passed_count += 1
            elif status == "Failed":
                failed_count += 1
                for suffix in ("Failure Reason", "Screenshot Ref", "Bug ID"):
                    field = f"{screen} {suffix}"
                    if not meaningful(row.get(field, "")):
                        errors.append(f"{item_id}/{screen}: Failed requires {field}.")
            else:
                working_count += 1

    if working_count and args.final:
        errors.append(
            f"Final mode rejects {working_count} working-status cells; "
            "resolve each to Passed or Failed."
        )
    elif working_count:
        warnings.append(
            f"{working_count} execution cells use working statuses; finalization is blocked."
        )

    if args.bugs:
        _, bug_rows = find_table(args.bugs, {"Bug ID", "Screen"})
        bug_ids = [row["Bug ID"] for row in bug_rows if meaningful(row.get("Bug ID", ""))]
        duplicates = sorted(key for key, count in Counter(bug_ids).items() if count > 1)
        if duplicates:
            errors.append(f"Duplicate bug IDs: {', '.join(duplicates)}")

    summary = {
        "checklist_items": len(checklist_rows),
        "execution_rows": len(execution_rows),
        "screen_item_cells": len(execution_rows) * len(args.screens),
        "passed": passed_count,
        "failed": failed_count,
        "working": working_count,
    }
    return errors, warnings, summary


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--checklist", type=Path, required=True)
    parser.add_argument("--execution", type=Path, required=True)
    parser.add_argument("--bugs", type=Path)
    parser.add_argument("--screens", nargs="+", required=True)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--final", action="store_true")
    mode.add_argument("--allow-working-statuses", action="store_true")
    args = parser.parse_args()
    if not args.final and not args.allow_working_statuses:
        parser.error("choose --final or --allow-working-statuses")
    for path in (args.checklist, args.execution, args.bugs):
        if path is not None and not path.is_file():
            parser.error(f"file not found: {path}")
    return args


def main() -> int:
    args = parse_args()
    try:
        errors, warnings, summary = validate(args)
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    print(
        "STRUCTURE "
        + " ".join(f"{key}={value}" for key, value in summary.items())
    )
    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}", file=sys.stderr)
    if errors:
        print(f"FAILED errors={len(errors)} warnings={len(warnings)}")
        return 1
    print(f"OK errors=0 warnings={len(warnings)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
