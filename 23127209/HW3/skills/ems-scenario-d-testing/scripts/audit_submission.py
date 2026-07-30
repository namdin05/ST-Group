#!/usr/bin/env python3
"""Validate the minimum evidence structure for EMS Scenario D."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REQUIRED_FILES = (
    "README.md",
    "Checklist.md",
    "execution/Checklist-Execution.md",
    "findings/Bug-Usability-Findings-Log.md",
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


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


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
    if execution.is_file():
        text = read_text(execution)
        for screen in SCREEN_IDS:
            if screen not in text:
                errors.append(f"checklist execution does not mention {screen}")
        item_ids = set(re.findall(r"\|\s*(IA0[1-4]-\d{2})\s*\|", text))
        if len(item_ids) < 40:
            errors.append(f"only {len(item_ids)} checklist items found")
        rows = [line for line in text.splitlines() if re.match(r"^\|\s*IA0[1-4]-\d{2}\s*\|", line)]
        cells = []
        for row in rows:
            cells.extend(cell.strip() for cell in row.split("|")[2:6])
        pending = sum(cell == "Pending" for cell in cells)
        if pending:
            warnings.append(f"{pending} Pending checklist cells remain")

    findings = root / "findings/Bug-Usability-Findings-Log.md"
    if findings.is_file():
        text = read_text(findings)
        finding_ids = re.findall(r"\|\s*(D-F\d{2})\s*\|", text)
        if not finding_ids:
            errors.append("no finding rows found")
        if len(finding_ids) != len(set(finding_ids)):
            errors.append("duplicate finding IDs found")
        pending_refs = re.findall(r"`pending/[^`]+`", text)
        if pending_refs:
            warnings.append(f"{len(pending_refs)} pending screenshot references remain")
        if "Not submitted" in text:
            warnings.append("Google Form timestamps are not submitted")
        for relative in re.findall(r"\]\(\.\./([^)\s]+\.png)\)", text):
            if not (root / relative).is_file():
                errors.append(f"finding screenshot does not exist: {relative}")

    evidence = root / "evidence/screenshots"
    if not evidence.is_dir() or not any(evidence.glob("*.png")):
        errors.append("no PNG screenshots found in evidence/screenshots")
    compatibility_evidence = root / "evidence/compatibility"
    if not compatibility_evidence.is_dir() or len(list(compatibility_evidence.glob("WIN-*.png"))) < 4:
        errors.append("fewer than four Windows compatibility screenshots found")

    compatibility = root / "compatibility/Windows-Baseline.md"
    if compatibility.is_file():
        text = read_text(compatibility)
        if "Partial" in text or "Pending" in text:
            warnings.append("compatibility coverage is incomplete")

    print(f"root: {root}")
    for message in errors:
        print(f"ERROR: {message}")
    for message in warnings:
        print(f"WARNING: {message}")
    print(f"result: {len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
