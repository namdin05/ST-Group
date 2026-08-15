#!/usr/bin/env python3
"""Check HW05 artifact completeness without claiming authenticity or correctness."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable


SCENARIOS = ("Load", "Stress", "Spike")
PLAN_PATTERN = re.compile(
    r"^(?P<student>\d+)_(?P<scenario>Load|Stress|Spike)_(?P<date>\d{8})\.(?P<ext>js|jmx)$",
    re.IGNORECASE,
)
WORD_PATTERN = re.compile(r"[^\W_]+(?:[-'][^\W_]+)*", re.UNICODE)


@dataclass
class Finding:
    status: str
    check: str
    detail: str


def relative(path: Path, root: Path) -> str:
    try:
        return path.relative_to(root).as_posix()
    except ValueError:
        return str(path)


def files(root: Path, directory: str, suffixes: tuple[str, ...]) -> list[Path]:
    base = root / directory
    if not base.is_dir():
        return []
    return [
        path
        for path in base.rglob("*")
        if path.is_file() and path.suffix.lower() in suffixes
    ]


def contains_scenario(path: Path, scenario: str) -> bool:
    return scenario.lower() in path.as_posix().lower()


def longest_critique(root: Path) -> tuple[str, str]:
    candidates: list[tuple[str, str]] = []
    for path in files(root, "ai-critique", (".md",)):
        candidates.append((relative(path, root), path.read_text(encoding="utf-8-sig")))

    main_report = root / "main_report.md"
    if main_report.is_file():
        text = main_report.read_text(encoding="utf-8-sig")
        match = re.search(
            r"(?ims)^#{1,6}\s+[^\n]*AI\s+Critique[^\n]*\n(?P<body>.*?)(?=^#{1,6}\s|\Z)",
            text,
        )
        if match:
            candidates.append(("main_report.md#AI-Critique", match.group("body")))

    if not candidates:
        return "", ""
    return max(candidates, key=lambda item: len(WORD_PATTERN.findall(item[1])))


def youtube_links(text: str) -> list[str]:
    return re.findall(
        r"https?://(?:www\.)?(?:youtube\.com/watch\?[^\s)]+|youtu\.be/[^\s)]+)",
        text,
        flags=re.IGNORECASE,
    )


def github_links(text: str) -> list[str]:
    return re.findall(r"https?://github\.com/[^\s)]+", text, flags=re.IGNORECASE)


def add(findings: list[Finding], status: str, check: str, detail: str) -> None:
    findings.append(Finding(status, check, detail))


def check_artifacts(root: Path, requested_student: str | None) -> list[Finding]:
    findings: list[Finding] = []

    plan_files = files(root, "test-plans", (".js", ".jmx"))
    matched_plans: list[tuple[Path, re.Match[str]]] = []
    for plan in plan_files:
        match = PLAN_PATTERN.fullmatch(plan.name)
        if match:
            matched_plans.append((plan, match))

    inferred_ids = sorted({match.group("student") for _path, match in matched_plans})
    if requested_student:
        unexpected = [student for student in inferred_ids if student != requested_student]
        if unexpected:
            add(findings, "FAIL", "Student ID consistency", f"Unexpected plan IDs: {unexpected}")
        else:
            add(findings, "PASS", "Student ID consistency", f"Expected ID: {requested_student}")
    elif len(inferred_ids) == 1:
        add(findings, "PASS", "Student ID consistency", f"Inferred ID: {inferred_ids[0]}")
    else:
        add(
            findings,
            "FAIL",
            "Student ID consistency",
            f"Expected one ID across canonical plans; found {inferred_ids or 'none'}",
        )

    for scenario in SCENARIOS:
        scenario_plans = [
            path
            for path, match in matched_plans
            if match.group("scenario").lower() == scenario.lower()
        ]
        if len(scenario_plans) == 1:
            add(findings, "PASS", f"{scenario} canonical plan", relative(scenario_plans[0], root))
        else:
            add(
                findings,
                "FAIL",
                f"{scenario} canonical plan",
                f"Expected exactly one exact-name plan; found {len(scenario_plans)}",
            )

    data_files = files(root, "test-data", (".csv",))
    add(
        findings,
        "PASS" if data_files else "FAIL",
        "Data-driven CSV",
        ", ".join(relative(path, root) for path in data_files) if data_files else "No CSV test data found",
    )

    raw_files = files(root, "results/raw", (".jtl", ".json", ".csv"))
    canonical_raw = [
        path
        for path in raw_files
        if "dry-run" not in path.name.lower()
        and "summary" not in path.name.lower()
        and "console" not in path.name.lower()
    ]
    html_files = files(root, "results/html", (".html",))
    images = files(root, "evidence", (".png", ".jpg", ".jpeg"))

    for scenario in SCENARIOS:
        raw = [path for path in canonical_raw if contains_scenario(path, scenario)]
        html = [path for path in html_files if contains_scenario(path, scenario)]
        screenshots = [path for path in images if contains_scenario(path, scenario)]
        add(
            findings,
            "PASS" if raw else "FAIL",
            f"{scenario} raw result",
            ", ".join(relative(path, root) for path in raw) if raw else "Missing full raw JTL/k6 stream",
        )
        add(
            findings,
            "PASS" if html else "FAIL",
            f"{scenario} HTML report",
            ", ".join(relative(path, root) for path in html) if html else "Missing HTML artifact",
        )
        add(
            findings,
            "PASS" if screenshots else "FAIL",
            f"{scenario} screenshots",
            f"{len(screenshots)} image(s)" if screenshots else "Missing scenario evidence images",
        )

    endurance_artifacts = [
        path
        for path in (
            files(root, "test-plans/endurance", (".js", ".jmx"))
            + [path for path in canonical_raw if contains_scenario(path, "Endurance")]
            + [path for path in html_files if contains_scenario(path, "Endurance")]
            + [path for path in images if contains_scenario(path, "Endurance")]
        )
    ]
    add(
        findings,
        "PASS" if len(endurance_artifacts) >= 3 else "FAIL",
        "Endurance execution evidence",
        f"Found {len(endurance_artifacts)} plan/raw/HTML/image artifact(s); manually verify 10-15 minute duration and threshold",
    )

    hardware_images = [path for path in images if "hardware" in path.as_posix().lower()]
    add(
        findings,
        "PASS" if hardware_images else "FAIL",
        "Hardware evidence",
        f"{len(hardware_images)} image(s) under evidence/hardware" if hardware_images else "Missing hardware image",
    )

    main_md = root / "main_report.md"
    main_pdfs = [path for path in root.glob("*.pdf") if "report" in path.name.lower()]
    add(findings, "PASS" if main_md.is_file() else "FAIL", "Main report Markdown", relative(main_md, root))
    add(
        findings,
        "PASS" if main_pdfs else "FAIL",
        "Main report PDF",
        ", ".join(relative(path, root) for path in main_pdfs) if main_pdfs else "Missing report PDF",
    )

    critique_source, critique_text = longest_critique(root)
    critique_words = len(WORD_PATTERN.findall(critique_text))
    critique_ok = 200 <= critique_words <= 300 and "TODO" not in critique_text.upper()
    add(
        findings,
        "PASS" if critique_ok else "FAIL",
        "AI Critique 200-300 words",
        f"{critique_words} words in {critique_source or 'no critique found'}",
    )

    audit_files = files(root, "ai-audit", (".md",))
    real_audits: list[Path] = []
    for path in audit_files:
        text = path.read_text(encoding="utf-8-sig")
        fields_present = all(
            field in text
            for field in ("Name of the AI tool", "Date and time", "Your prompt", "The AI output")
        )
        if fields_present and not re.search(r"\bTBD\b", text, re.IGNORECASE):
            real_audits.append(path)
    add(
        findings,
        "PASS" if real_audits else "FAIL",
        "AI Audit Markdown",
        ", ".join(relative(path, root) for path in real_audits) if real_audits else "No complete four-field audit found",
    )
    audit_pdfs = files(root, "ai-audit", (".pdf",))
    add(
        findings,
        "PASS" if audit_pdfs else "FAIL",
        "AI Audit PDF",
        ", ".join(relative(path, root) for path in audit_pdfs) if audit_pdfs else "Missing audit PDF",
    )

    skill_files = files(root, "agent-skill", (".md",))
    skill_files = [path for path in skill_files if path.name == "SKILL.md"]
    add(
        findings,
        "PASS" if skill_files else "FAIL",
        "Reusable Agent Skill",
        ", ".join(relative(path, root) for path in skill_files) if skill_files else "Missing agent-skill/**/SKILL.md",
    )

    text_candidates = [path for path in (root / "README.md", root / "main_report.md") if path.is_file()]
    text_candidates.extend(files(root, "video", (".md", ".txt")))
    combined_text = "\n".join(path.read_text(encoding="utf-8-sig") for path in text_candidates)
    videos = youtube_links(combined_text)
    add(
        findings,
        "PASS" if videos else "FAIL",
        "Unlisted YouTube link",
        videos[0] if videos else "No YouTube link found; manually verify duration and Vietnamese narration",
    )

    repository_links = github_links(combined_text)
    add(
        findings,
        "PASS" if repository_links else "FAIL",
        "Public GitHub link",
        repository_links[0] if repository_links else "No GitHub repository link found",
    )

    git_logs = files(root, "git", (".txt", ".log"))
    add(
        findings,
        "PASS" if git_logs else "FAIL",
        "Git commit log text",
        ", ".join(relative(path, root) for path in git_logs) if git_logs else "Missing git log text artifact",
    )

    readme = root / "README.md"
    readme_text = readme.read_text(encoding="utf-8-sig") if readme.is_file() else ""
    has_self_assessment = bool(re.search(r"self[- ]?assessment|selfassessed", readme_text, re.IGNORECASE))
    has_summary = bool(re.search(r"test summary|scenarios run|endpoint groups", readme_text, re.IGNORECASE))
    add(
        findings,
        "PASS" if has_self_assessment and has_summary else "FAIL",
        "README assessment and summary",
        f"self-assessment={has_self_assessment}, test-summary={has_summary}",
    )

    report_text = main_md.read_text(encoding="utf-8-sig") if main_md.is_file() else ""
    has_continuous = bool(re.search(r"continuous performance", report_text, re.IGNORECASE))
    has_flow = "```mermaid" in report_text or bool(re.search(r"flow\s*chart", report_text, re.IGNORECASE))
    add(
        findings,
        "PASS" if has_continuous and has_flow and "TODO" not in report_text[
            max(0, report_text.lower().find("continuous performance")) :
            max(0, report_text.lower().find("continuous performance")) + 1500
        ].upper() else "FAIL",
        "Continuous-performance proposal",
        f"section={has_continuous}, flowchart={has_flow}; manually verify cost/false-alarm trade-offs",
    )

    add(
        findings,
        "WARN",
        "Manual authenticity review",
        "Verify Human Review authorship, three distinct report perspectives, same-frame tool/resources, raw-log integrity, hardware identity, and video narration/duration.",
    )
    return findings


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path.cwd(), help="HW05 repository root")
    parser.add_argument("--student-id", help="Expected numeric student ID")
    parser.add_argument("--json", action="store_true", help="Emit machine-readable JSON")
    parser.add_argument(
        "--strict-warnings",
        action="store_true",
        help="Return failure when warnings remain",
    )
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    if not root.is_dir():
        print(f"error: repository root does not exist: {root}", file=sys.stderr)
        return 2

    findings = check_artifacts(root, args.student_id)
    totals = {
        status: sum(1 for finding in findings if finding.status == status)
        for status in ("PASS", "FAIL", "WARN")
    }
    if args.json:
        print(json.dumps({"root": str(root), "totals": totals, "findings": [asdict(item) for item in findings]}, indent=2, ensure_ascii=False))
    else:
        print(f"HW05 artifact check: {root}")
        for finding in findings:
            print(f"[{finding.status}] {finding.check}: {finding.detail}")
        print(f"Summary: PASS={totals['PASS']} FAIL={totals['FAIL']} WARN={totals['WARN']}")

    if totals["FAIL"] or (args.strict_warnings and totals["WARN"]):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
