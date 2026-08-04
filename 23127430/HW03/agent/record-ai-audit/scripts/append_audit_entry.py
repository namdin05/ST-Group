#!/usr/bin/env python3
"""Append one privacy-checked, verbatim HW03 AI audit entry."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


SENSITIVE_PATTERNS = {
    "credential assignment": re.compile(
        r"(?i)\b(password|passwd|pwd|secret|api[_-]?key|access[_-]?token)"
        r"\s*[:=]\s*[\"']?[^\s\"']{4,}"
    ),
    "bearer token": re.compile(r"(?i)\bbearer\s+[A-Za-z0-9._~+/=-]{8,}"),
    "unmasked email": re.compile(
        r"(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b"
    ),
    "possible phone": re.compile(r"(?<!\d)(?:\+?\d[\s().-]*){10,15}(?!\d)"),
    "embedded recording": re.compile(r"(?i)\bdata:(audio|video)/"),
}


def fence_for(text: str) -> str:
    longest = max((len(m.group(0)) for m in re.finditer(r"`+", text)), default=0)
    return "`" * max(3, longest + 1)


def fenced_verbatim(text: str) -> str:
    fence = fence_for(text)
    return f"{fence}text\n{text}\n{fence}"


def sensitive_findings(text: str) -> list[str]:
    return [name for name, pattern in SENSITIVE_PATTERNS.items() if pattern.search(text)]


def existing_ids(root: Path) -> set[str]:
    ids: set[str] = set()
    entries = root / "AI" / "audit_entries"
    if entries.exists():
        ids.update(path.stem for path in entries.glob("AI-[0-9][0-9][0-9].md"))
    prompt_log = root / "AI" / "prompt_log.md"
    if prompt_log.exists():
        ids.update(re.findall(r"\bAI-\d{3}\b", prompt_log.read_text(encoding="utf-8")))
    return ids


def allocate_id(ids: set[str]) -> str:
    numbers = [int(value[3:]) for value in ids if re.fullmatch(r"AI-\d{3}", value)]
    return f"AI-{(max(numbers, default=-1) + 1):03d}"


def require_text(data: dict[str, object], key: str) -> str:
    value = data.get(key)
    if not isinstance(value, str) or value == "":
        raise ValueError(f"{key!r} must be a non-empty string")
    return value


def insert_markdown_row(text: str, header_prefix: str, row: str) -> str | None:
    lines = text.splitlines()
    header_index = next(
        (index for index, line in enumerate(lines) if line.startswith(header_prefix)),
        None,
    )
    if header_index is None or header_index + 1 >= len(lines):
        return None
    cursor = header_index + 2
    while cursor < len(lines) and lines[cursor].startswith("|"):
        cursor += 1
    lines.insert(cursor, row)
    return "\n".join(lines).rstrip() + "\n"


def prompt_log_text(current: str, entry_id: str, data: dict[str, object]) -> str:
    if re.search(rf"\b{re.escape(entry_id)}\b", current):
        raise ValueError(f"{entry_id} already exists in prompt_log.md")
    link = f"[{entry_id} entry](audit_entries/{entry_id}.md)"
    row = (
        f"| {entry_id} | {data['tool']} | {data['datetime']} | {link} | "
        "See detailed entry |"
    )
    inserted = insert_markdown_row(current, "| ID |", row)
    if inserted is not None:
        return inserted
    return (
        current.rstrip()
        + "\n\n| ID | AI tool | Date/time | Prompt | AI output |\n"
        "| --- | --- | --- | --- | --- |\n"
        + row
        + "\n"
    )


def report_text(
    current: str,
    entry_id: str,
    data: dict[str, object],
) -> str:
    if re.search(rf"\b{re.escape(entry_id)}\b", current):
        return current
    row = (
        f"| {entry_id} | {data['tool']} | {data['datetime']} | "
        f"[Detailed entry](audit_entries/{entry_id}.md) | See detailed entry |"
    )
    inserted = insert_markdown_row(current, "| ID | AI tool |", row)
    if inserted is not None:
        return inserted
    return (
        current.rstrip()
        + "\n\n## Interaction index\n\n"
        "| ID | AI tool | Date/time | Prompt | AI output |\n"
        "| --- | --- | --- | --- | --- |\n"
        + row
        + "\n"
    )


def entry_text(entry_id: str, data: dict[str, object]) -> str:
    output = data.get("output")
    output_ref = data.get("output_ref")
    if bool(output) == bool(output_ref):
        raise ValueError("supply exactly one of 'output' or 'output_ref'")
    output_section = (
        fenced_verbatim(str(output))
        if output
        else f"Labelled external artefact/reference (not verbatim output):\n\n{output_ref}"
    )
    return (
        f"# {entry_id}\n\n"
        "## AI tool\n\n"
        f"{data['tool']}\n\n"
        "## Date/time\n\n"
        f"{data['datetime']}\n\n"
        "## Prompt\n\n"
        f"{fenced_verbatim(str(data['prompt']))}\n\n"
        "## AI output\n\n"
        f"{output_section}\n"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--input-json", type=Path, required=True)
    parser.add_argument("--id")
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        data = json.loads(args.input_json.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("input JSON root must be an object")
        for key in ("tool", "datetime", "prompt"):
            data[key] = require_text(data, key)
        ids = existing_ids(args.root)
        entry_id = args.id or allocate_id(ids)
        if not re.fullmatch(r"AI-\d{3}", entry_id):
            raise ValueError("ID must match AI-###")
        if entry_id in ids:
            raise ValueError(f"duplicate ID: {entry_id}")

        sensitive_source = str(data["prompt"]) + "\n" + str(data.get("output") or "")
        findings = sensitive_findings(sensitive_source)
        if findings:
            raise ValueError(
                "sensitive source detected ("
                + ", ".join(findings)
                + "); request a student-redacted source"
            )

        rendered_entry = entry_text(entry_id, data)
        ai_dir = args.root / "AI"
        entries_dir = ai_dir / "audit_entries"
        prompt_log = ai_dir / "prompt_log.md"
        report = ai_dir / "ai_audit_report.md"
        current_log = prompt_log.read_text(encoding="utf-8") if prompt_log.exists() else "# AI Prompt Log\n"
        current_report = report.read_text(encoding="utf-8") if report.exists() else "# AI Audit Report\n"
        updated_log = prompt_log_text(current_log, entry_id, data)
        updated_report = report_text(current_report, entry_id, data)

        if args.dry_run:
            print(f"DRY-RUN OK id={entry_id}")
            return 0

        entries_dir.mkdir(parents=True, exist_ok=True)
        entry_path = entries_dir / f"{entry_id}.md"
        with entry_path.open("x", encoding="utf-8", newline="\n") as handle:
            handle.write(rendered_entry)
        prompt_log.write_text(updated_log, encoding="utf-8", newline="\n")
        report.write_text(updated_report, encoding="utf-8", newline="\n")
        print(f"APPENDED id={entry_id}")
        return 0
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
