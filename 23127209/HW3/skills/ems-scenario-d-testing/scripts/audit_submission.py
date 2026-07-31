#!/usr/bin/env python3
"""Validate the evidence structure and integrity of EMS Scenario D."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REQUIRED_FILES = (
    "README.md",
    "Checklist.md",
    "SUBMISSION-MANIFEST.md",
    "execution/Checklist-Execution.md",
    "execution/Pending-Manual-Test-Guide.md",
    "findings/Bug-Usability-Findings-Log.md",
    "findings/Google-Form-Draft.md",
    "compatibility/Windows-Baseline.md",
    "evidence/README.md",
    "reports/Scenario-D-Test-Report.md",
    "reports/AI-Audit-Report.md",
    "reports/AI-Audit-Log.md",
    "reports/AI-Prompts.md",
    "reports/AI-Critique.md",
    "output/pdf/Scenario-D-Test-Report.pdf",
    "output/pdf/AI-Audit-Report.pdf",
    "output/pdf/AI-Critique.pdf",
)
SCREEN_IDS = ("D1", "D2", "D3", "D4")
EXPECTED_COUNTS = {"Pass": 95, "Fail": 31, "N/A": 78, "Pending": 20}
FINDING_COLUMNS = (
    "ID",
    "Scenario / Screen",
    "Type",
    "Category",
    "Description",
    "Steps / Heuristic",
    "Expected",
    "Actual",
    "Severity",
    "Suggested fix",
    "Screenshot",
    "Form status",
    "Form timestamp",
)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def table_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def check_links(root: Path, errors: list[str]) -> None:
    pattern = re.compile(r"\[[^\]]+\]\((?!https?://|mailto:|#)([^)]+)\)")
    for path in root.rglob("*.md"):
        if any(part in {".git", ".agents", ".claude"} for part in path.parts):
            continue
        for raw in pattern.findall(read_text(path)):
            target = raw.strip().split("#", 1)[0].strip("<>")
            if not target:
                continue
            resolved = (path.parent / target).resolve()
            if not resolved.exists():
                errors.append(f"broken Markdown link in {path.relative_to(root)}: {raw}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    args = parser.parse_args()
    root = args.root.resolve()
    errors: list[str] = []
    warnings: list[str] = []

    for relative in REQUIRED_FILES:
        if not (root / relative).is_file():
            errors.append(f"missing required file: {relative}")

    execution = root / "execution/Checklist-Execution.md"
    observed_counts = {key: 0 for key in EXPECTED_COUNTS}
    if execution.is_file():
        text = read_text(execution)
        rows = [
            table_cells(line)
            for line in text.splitlines()
            if re.match(r"^\|\s*IA0[1-4]-\d{2}\s*\|", line)
        ]
        item_ids = {row[0] for row in rows}
        if len(item_ids) != 56:
            errors.append(f"expected 56 checklist items, found {len(item_ids)}")
        for row in rows:
            for cell in row[1:5]:
                normalized = (
                    "Fail"
                    if re.fullmatch(r"F(?:\s+\(D-F\d{2}\))?", cell)
                    else {"P": "Pass"}.get(cell, cell)
                )
                if normalized in observed_counts:
                    observed_counts[normalized] += 1
                else:
                    errors.append(f"invalid checklist result '{cell}' in {row[0]}")
        if observed_counts != EXPECTED_COUNTS:
            errors.append(
                f"checklist totals {observed_counts} do not match {EXPECTED_COUNTS}"
            )

    readme = root / "README.md"
    if readme.is_file():
        text = read_text(readme)
        expected_summary = "95 Pass, 31 Fail, 78 N/A, 20 Pending"
        if expected_summary not in text:
            errors.append("README checklist summary does not match execution totals")

    manual = root / "execution/Pending-Manual-Test-Guide.md"
    if manual.is_file():
        text = read_text(manual)
        cases = set(re.findall(r"\|\s*(MAN-\d{2})\s*\|", text))
        if cases != {f"MAN-{number:02d}" for number in range(1, 9)}:
            errors.append("manual guide must contain exactly MAN-01 through MAN-08")
        mapped = {
            "IA01-02": 4,
            "IA01-07": 4,
            "IA02-04": 4,
            "IA03-08": 4,
            "IA03-12": 1,
            "IA03-13": 1,
            "IA04-05": 1,
            "IA04-09": 1,
        }
        if sum(mapped.values()) != EXPECTED_COUNTS["Pending"]:
            errors.append("manual mapping definition does not total 20")
        for item_id in mapped:
            if item_id not in text:
                errors.append(f"manual guide does not map {item_id}")

    findings = root / "findings/Bug-Usability-Findings-Log.md"
    if findings.is_file():
        lines = read_text(findings).splitlines()
        header = next((table_cells(line) for line in lines if line.startswith("| ID |")), [])
        if tuple(header) != FINDING_COLUMNS:
            errors.append("finding log schema does not match required columns")
        rows = [
            table_cells(line)
            for line in lines
            if re.match(r"^\|\s*D-F\d{2}\s*\|", line)
        ]
        ids = [row[0] for row in rows]
        if ids != [f"D-F{number:02d}" for number in range(1, 12)]:
            errors.append("finding IDs must be unique and sequential D-F01 through D-F11")
        for row in rows:
            if len(row) != len(FINDING_COLUMNS):
                errors.append(f"{row[0]} has {len(row)} fields, expected {len(FINDING_COLUMNS)}")
                continue
            if row[2] not in {"Bug", "Usability"}:
                errors.append(f"{row[0]} has invalid Type: {row[2]}")
            if row[11] != "Draft - not submitted" or row[12] != "-":
                errors.append(f"{row[0]} fabricates or misstates Google Form status")
            screenshot = re.search(r"\]\(([^)]+\.png)\)", row[10])
            if not screenshot:
                errors.append(f"{row[0]} has no screenshot reference")
            elif not (findings.parent / screenshot.group(1)).resolve().is_file():
                errors.append(f"{row[0]} screenshot does not exist: {screenshot.group(1)}")

    compatibility = root / "compatibility/Windows-Baseline.md"
    if compatibility.is_file():
        rows = [
            table_cells(line)
            for line in read_text(compatibility).splitlines()
            if re.match(r"^\|\s*CMP-D[1-4]-\d{2}\s*\|", line)
        ]
        if len(rows) != 24:
            errors.append(f"expected 24 target compatibility cells, found {len(rows)}")
        for screen in SCREEN_IDS:
            screen_rows = [row for row in rows if row[1] == screen]
            oses = {row[2] for row in screen_rows}
            browsers = {row[3] for row in screen_rows}
            devices = {row[4] for row in screen_rows}
            if len(screen_rows) != 6:
                errors.append(f"{screen} must have 6 target compatibility rows")
            if len(oses) < 3 or len(browsers) < 5 or len(devices) < 3:
                errors.append(
                    f"{screen} compatibility coverage is below 3 OS / 5 browsers / 3 devices"
                )
            for row in screen_rows:
                if row[7] != "Pending" or row[8] != "TBD":
                    errors.append(f"{row[0]} must remain Pending/TBD until executed")

    critique = root / "reports/AI-Critique.md"
    if critique.is_file():
        body = re.sub(r"^#.*$", "", read_text(critique), flags=re.MULTILINE)
        word_count = len(re.findall(r"\b[\w'-]+\b", body, flags=re.UNICODE))
        if not 200 <= word_count <= 300:
            errors.append(f"AI Critique has {word_count} words; required range is 200-300")

    sensitive_files = [
        path
        for path in root.rglob("*")
        if path.is_file()
        and path.suffix.lower() in {".md", ".txt", ".py", ".yaml", ".yml", ".json"}
        and not any(part in {".git", ".agents", ".claude"} for part in path.parts)
        and path.name not in {"Introduction.md", "Requirement.md", "audit_submission.py"}
    ]
    forbidden = (r"Admin@123", r"User@123", r"(?i)bearer\s+[A-Za-z0-9._-]{12,}")
    for path in sensitive_files:
        text = read_text(path)
        for pattern in forbidden:
            if re.search(pattern, text):
                errors.append(f"sensitive value detected in {path.relative_to(root)}")

    output_root = root / "output"
    if output_root.is_dir() and any(output_root.rglob("*.zip")):
        errors.append("ZIP exists even though packaging is explicitly deferred")

    check_links(root, errors)

    if observed_counts.get("Pending"):
        warnings.append("20 checklist cells remain Pending by design")
    warnings.append("24 target compatibility cells remain Pending by design")
    warnings.append("Google Form is drafted but not submitted")
    warnings.append("Task 2 and Agent Skill demo video remain incomplete")

    print(f"root: {root}")
    for message in errors:
        print(f"ERROR: {message}")
    for message in warnings:
        print(f"WARNING: {message}")
    print(f"result: {len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
