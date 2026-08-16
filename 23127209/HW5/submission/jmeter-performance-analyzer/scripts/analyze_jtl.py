#!/usr/bin/env python3
"""Compute reproducible ground-truth metrics from JMeter CSV JTL files."""

from __future__ import annotations

import argparse
import csv
import json
import math
import re
from collections import defaultdict
from pathlib import Path
from typing import Any


def percentile(values: list[float], percent: float) -> float:
    """Return the nearest-rank percentile used for the audit tables."""
    if not values:
        return 0.0
    ordered = sorted(values)
    index = max(0, math.ceil(percent / 100 * len(ordered)) - 1)
    return float(ordered[index])


def is_http_failure(code: str) -> bool:
    try:
        return int(code) >= 400
    except (TypeError, ValueError):
        return False


def summarize(rows: list[dict[str, str]]) -> dict[str, Any]:
    if not rows:
        raise ValueError("JTL contains no samples")

    starts = [int(row["timeStamp"]) for row in rows]
    ends = [int(row["timeStamp"]) + int(row["elapsed"]) for row in rows]
    duration_seconds = max((max(ends) - min(starts)) / 1000, 0.001)

    def metrics(items: list[dict[str, str]]) -> dict[str, Any]:
        elapsed = [float(item["elapsed"]) for item in items]
        unsuccessful = [item for item in items if item.get("success", "").lower() != "true"]
        http_failures = [item for item in items if is_http_failure(item.get("responseCode", ""))]
        assertion_failures = [item for item in unsuccessful if not is_http_failure(item.get("responseCode", ""))]
        return {
            "samples": len(items),
            "mean_ms": round(sum(elapsed) / len(elapsed), 3),
            "min_ms": round(min(elapsed), 3),
            "median_ms": round(percentile(elapsed, 50), 3),
            "p90_ms": round(percentile(elapsed, 90), 3),
            "p95_ms": round(percentile(elapsed, 95), 3),
            "p99_ms": round(percentile(elapsed, 99), 3),
            "max_ms": round(max(elapsed), 3),
            "unsuccessful_samples": len(unsuccessful),
            "unsuccessful_rate": round(len(unsuccessful) / len(items), 6),
            "http_failures": len(http_failures),
            "http_failure_rate": round(len(http_failures) / len(items), 6),
            "assertion_failures": len(assertion_failures),
        }

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        grouped[row["label"]].append(row)

    overall = metrics(rows)
    overall["duration_seconds"] = round(duration_seconds, 3)
    overall["sample_throughput_rps"] = round(len(rows) / duration_seconds, 4)
    http_samples = [row for row in rows if row.get("URL", "").strip().lower() not in {"", "null"}]
    overall["http_requests"] = len(http_samples)
    overall["http_request_throughput_rps"] = round(len(http_samples) / duration_seconds, 4)
    journeys = grouped.get("E2E Shopping Journey", [])
    overall["completed_journeys"] = len(journeys)
    overall["journey_throughput_rps"] = round(len(journeys) / duration_seconds, 4)
    overall["start_timestamp_ms"] = min(starts)
    overall["end_timestamp_ms"] = max(ends)

    thread_groups: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        group = re.sub(r"\s+\d+-\d+$", "", row.get("threadName", "Unknown"))
        thread_groups[group].append(row)

    return {
        "percentile_method": "nearest-rank",
        "overall": overall,
        "labels": {label: metrics(items) for label, items in sorted(grouped.items())},
        "thread_groups": {group: metrics(items) for group, items in sorted(thread_groups.items())},
    }


def compare_claims(result: dict[str, Any], claims: dict[str, Any], tolerance: float) -> list[dict[str, Any]]:
    differences: list[dict[str, Any]] = []
    for section in ("overall", "labels"):
        expected_section = claims.get(section, {})
        actual_section = result.get(section, {})
        if section == "overall":
            expected_section = {"overall": expected_section}
            actual_section = {"overall": actual_section}
        for label, expected_values in expected_section.items():
            actual_values = actual_section.get(label, {})
            for metric, claimed in expected_values.items():
                actual = actual_values.get(metric)
                if not isinstance(claimed, (int, float)) or not isinstance(actual, (int, float)):
                    continue
                allowed = max(abs(actual) * tolerance, tolerance)
                if abs(claimed - actual) > allowed:
                    differences.append({"section": section, "label": label, "metric": metric, "claimed": claimed, "actual": actual, "absolute_difference": round(abs(claimed - actual), 6)})
    return differences


def markdown(source: Path, result: dict[str, Any], differences: list[dict[str, Any]]) -> str:
    overall = result["overall"]
    lines = [
        f"# JTL Ground Truth - {source.name}",
        "",
        f"Percentile method: `{result['percentile_method']}`.",
        "",
        "| Samples | Duration (s) | Recorded RPS | HTTP RPS | Journeys | Journey RPS | p95 (ms) | HTTP failures | Assertion failures |",
        "|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
        f"| {overall['samples']} | {overall['duration_seconds']} | {overall['sample_throughput_rps']} | {overall['http_request_throughput_rps']} | {overall['completed_journeys']} | {overall['journey_throughput_rps']} | {overall['p95_ms']} | {overall['http_failures']} | {overall['assertion_failures']} |",
        "",
        "## Labels",
        "",
        "| Label | Samples | Mean (ms) | p90 | p95 | p99 | Max | HTTP failures | Assertion failures |",
        "|---|---:|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for label, item in result["labels"].items():
        lines.append(f"| {label} | {item['samples']} | {item['mean_ms']} | {item['p90_ms']} | {item['p95_ms']} | {item['p99_ms']} | {item['max_ms']} | {item['http_failures']} | {item['assertion_failures']} |")
    if differences:
        lines.extend(["", "## Claim Differences", "", "| Section | Label | Metric | Claimed | Actual | Difference |", "|---|---|---|---:|---:|---:|"])
        for item in differences:
            lines.append(f"| {item['section']} | {item['label']} | {item['metric']} | {item['claimed']} | {item['actual']} | {item['absolute_difference']} |")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jtl", type=Path)
    parser.add_argument("--markdown", type=Path)
    parser.add_argument("--json", dest="json_output", type=Path)
    parser.add_argument("--claims", type=Path)
    parser.add_argument("--tolerance", type=float, default=0.01)
    args = parser.parse_args()

    with args.jtl.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    result = summarize(rows)
    claims = json.loads(args.claims.read_text(encoding="utf-8")) if args.claims else {}
    differences = compare_claims(result, claims, args.tolerance) if claims else []
    result["source"] = args.jtl.name
    result["claim_differences"] = differences

    rendered = markdown(args.jtl, result, differences)
    if args.markdown:
        args.markdown.write_text(rendered, encoding="utf-8")
    else:
        print(rendered, end="")
    if args.json_output:
        args.json_output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
