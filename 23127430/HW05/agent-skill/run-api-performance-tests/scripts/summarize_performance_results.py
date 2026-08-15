#!/usr/bin/env python3
"""Summarize genuine k6 or JMeter result files without modifying them."""

from __future__ import annotations

import argparse
import csv
import json
import math
import statistics
import sys
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable


def as_float(value: Any) -> float | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if math.isfinite(number) else None


def percentile(values: list[float], percent: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    position = (len(ordered) - 1) * percent / 100.0
    lower = math.floor(position)
    upper = math.ceil(position)
    if lower == upper:
        return ordered[lower]
    return ordered[lower] * (upper - position) + ordered[upper] * (position - lower)


def derived_duration(values: list[float]) -> dict[str, float | None]:
    if not values:
        return {}
    return {
        "min": min(values),
        "avg": statistics.fmean(values),
        "med": percentile(values, 50),
        "p(90)": percentile(values, 90),
        "p(95)": percentile(values, 95),
        "p(99)": percentile(values, 99),
        "max": max(values),
    }


def metric_values(metrics: dict[str, Any], name: str) -> dict[str, Any]:
    metric = metrics.get(name, {})
    if not isinstance(metric, dict):
        return {}
    nested = metric.get("values")
    return nested if isinstance(nested, dict) else metric


def parse_k6_summary(path: Path) -> dict[str, Any]:
    document = json.loads(path.read_text(encoding="utf-8-sig"))
    metrics = document.get("metrics")
    if not isinstance(metrics, dict):
        raise ValueError("JSON does not contain a k6 'metrics' object")

    requests = metric_values(metrics, "http_reqs")
    iterations = metric_values(metrics, "iterations")
    failures = metric_values(metrics, "http_req_failed")
    functional_failures = metric_values(metrics, "functional_failures")
    checks = metric_values(metrics, "checks")
    duration = metric_values(metrics, "http_req_duration")
    vus = metric_values(metrics, "vus_max")
    request_count = as_float(requests.get("count"))
    failure_rate = as_float(failures.get("value", failures.get("rate")))

    return {
        "source_kind": "k6-summary",
        "aggregate_kind": "tool-native",
        "request_count": request_count,
        "request_rate_rps": as_float(requests.get("rate")),
        "iteration_count": as_float(iterations.get("count")),
        "iteration_rate_rps": as_float(iterations.get("rate")),
        "failure_count": (
            round(request_count * failure_rate)
            if request_count is not None and failure_rate is not None
            else None
        ),
        "failure_rate": failure_rate,
        "functional_failure_rate": as_float(
            functional_failures.get("value", functional_failures.get("rate"))
        ),
        "check_passes": as_float(checks.get("passes")),
        "check_fails": as_float(checks.get("fails")),
        "check_rate": as_float(checks.get("value", checks.get("rate"))),
        "max_vus": as_float(vus.get("max", vus.get("value"))),
        "duration_ms": {
            key: as_float(duration.get(key))
            for key in ("min", "avg", "med", "p(90)", "p(95)", "p(99)", "max")
            if as_float(duration.get(key)) is not None
        },
        "warnings": [
            "Confirm threshold verdicts with the k6 console log and process exit code."
        ],
    }


def parse_iso_time(value: Any) -> float | None:
    if not isinstance(value, str):
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()
    except ValueError:
        return None


def parse_k6_raw(path: Path) -> dict[str, Any]:
    durations: list[float] = []
    request_count = 0.0
    iteration_count = 0.0
    failure_values: list[float] = []
    functional_failure_values: list[float] = []
    check_values: list[float] = []
    vus_values: list[float] = []
    timestamps: list[float] = []

    with path.open("r", encoding="utf-8-sig") as stream:
        for line_number, line in enumerate(stream, 1):
            if not line.strip():
                continue
            try:
                item = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(f"Invalid JSON line {line_number}: {exc}") from exc
            if item.get("type") != "Point":
                continue
            metric = item.get("metric")
            data = item.get("data", {})
            value = as_float(data.get("value"))
            if value is None:
                continue
            timestamp = parse_iso_time(data.get("time"))
            if timestamp is not None:
                timestamps.append(timestamp)
            if metric == "http_req_duration":
                durations.append(value)
            elif metric == "http_reqs":
                request_count += value
            elif metric == "iterations":
                iteration_count += value
            elif metric == "http_req_failed":
                failure_values.append(value)
            elif metric == "functional_failures":
                functional_failure_values.append(value)
            elif metric == "checks":
                check_values.append(value)
            elif metric in {"vus", "vus_max"}:
                vus_values.append(value)

    if request_count == 0 and durations:
        request_count = float(len(durations))
    elapsed = max(timestamps) - min(timestamps) if len(timestamps) > 1 else None
    failure_rate = statistics.fmean(failure_values) if failure_values else None
    check_rate = statistics.fmean(check_values) if check_values else None

    return {
        "source_kind": "k6-raw-json-stream",
        "aggregate_kind": "derived-from-points",
        "request_count": request_count,
        "request_rate_rps": request_count / elapsed if elapsed and elapsed > 0 else None,
        "iteration_count": iteration_count or None,
        "iteration_rate_rps": iteration_count / elapsed if elapsed and elapsed > 0 else None,
        "failure_count": round(request_count * failure_rate) if failure_rate is not None else None,
        "failure_rate": failure_rate,
        "functional_failure_rate": (
            statistics.fmean(functional_failure_values)
            if functional_failure_values
            else None
        ),
        "check_passes": sum(1 for item in check_values if item != 0),
        "check_fails": sum(1 for item in check_values if item == 0),
        "check_rate": check_rate,
        "max_vus": max(vus_values) if vus_values else None,
        "duration_ms": derived_duration(durations),
        "warnings": [
            "Percentiles and rates are derived from raw points and may differ from k6 native aggregates.",
            "Use summary JSON for exact k6 aggregate metrics and the console/exit code for thresholds.",
        ],
    }


def normalize_success(value: Any) -> bool:
    return str(value).strip().lower() in {"true", "1", "yes"}


def summarize_jmeter_samples(
    durations: list[float], successes: list[bool], starts_ms: list[float]
) -> dict[str, Any]:
    count = len(durations)
    failures = sum(1 for value in successes if not value)
    start = min(starts_ms) if starts_ms else None
    end = max(
        (timestamp + duration for timestamp, duration in zip(starts_ms, durations)),
        default=None,
    )
    elapsed_seconds = (end - start) / 1000.0 if start is not None and end else None
    return {
        "source_kind": "jmeter-jtl",
        "aggregate_kind": "derived-from-samples",
        "request_count": count,
        "request_rate_rps": count / elapsed_seconds if elapsed_seconds and elapsed_seconds > 0 else None,
        "iteration_count": None,
        "iteration_rate_rps": None,
        "failure_count": failures,
        "failure_rate": failures / count if count else None,
        "functional_failure_rate": None,
        "check_passes": count - failures,
        "check_fails": failures,
        "check_rate": (count - failures) / count if count else None,
        "max_vus": None,
        "duration_ms": derived_duration(durations),
        "warnings": [
            "Percentiles are derived with linear interpolation and may differ from JMeter dashboard values.",
            "JTL success flags combine assertion/protocol outcomes; inspect response codes and assertions for cause.",
        ],
    }


def parse_jmeter_csv(path: Path) -> dict[str, Any]:
    durations: list[float] = []
    successes: list[bool] = []
    starts_ms: list[float] = []
    with path.open("r", encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        headers = set(reader.fieldnames or [])
        required = {"elapsed", "success"}
        if not required.issubset(headers):
            raise ValueError(f"JTL CSV is missing headers: {sorted(required - headers)}")
        for row_number, row in enumerate(reader, 2):
            elapsed = as_float(row.get("elapsed"))
            if elapsed is None:
                raise ValueError(f"Invalid elapsed value at CSV row {row_number}")
            durations.append(elapsed)
            successes.append(normalize_success(row.get("success")))
            timestamp = as_float(row.get("timeStamp"))
            starts_ms.append(timestamp if timestamp is not None else float(row_number))
    return summarize_jmeter_samples(durations, successes, starts_ms)


def parse_jmeter_xml(path: Path) -> dict[str, Any]:
    durations: list[float] = []
    successes: list[bool] = []
    starts_ms: list[float] = []
    for _event, element in ET.iterparse(path, events=("end",)):
        if element.tag.rsplit("}", 1)[-1] not in {"sample", "httpSample"}:
            continue
        elapsed = as_float(element.attrib.get("t"))
        if elapsed is not None:
            durations.append(elapsed)
            successes.append(normalize_success(element.attrib.get("s")))
            timestamp = as_float(element.attrib.get("ts"))
            starts_ms.append(timestamp if timestamp is not None else float(len(durations)))
        element.clear()
    if not durations:
        raise ValueError("JTL XML contains no sample/httpSample elements")
    return summarize_jmeter_samples(durations, successes, starts_ms)


def detect_format(path: Path) -> str:
    with path.open("r", encoding="utf-8-sig", errors="replace") as stream:
        first_nonempty = next((line.strip() for line in stream if line.strip()), "")
    if first_nonempty.startswith("<"):
        return "jmeter-xml"
    try:
        first_object = json.loads(first_nonempty)
    except json.JSONDecodeError:
        first_object = None
    if isinstance(first_object, dict) and first_object.get("type") in {"Metric", "Point"}:
        return "k6-raw"
    if path.suffix.lower() == ".json" or first_nonempty.startswith("{"):
        return "k6-summary"
    return "jmeter-csv"


def format_number(value: Any, digits: int = 4) -> str:
    number = as_float(value)
    if number is None:
        return "N/A"
    if number.is_integer():
        return str(int(number))
    return f"{number:.{digits}f}".rstrip("0").rstrip(".")


def markdown(summary: dict[str, Any], path: Path) -> str:
    duration = summary.get("duration_ms", {})
    lines = [
        "# Performance Result Summary",
        "",
        f"- Source: `{path}`",
        f"- Source kind: `{summary['source_kind']}`",
        f"- Aggregate kind: `{summary['aggregate_kind']}`",
        "",
        "| Metric | Value |",
        "| --- | ---: |",
        f"| Requests | {format_number(summary.get('request_count'))} |",
        f"| Request rate (req/s) | {format_number(summary.get('request_rate_rps'))} |",
        f"| Iterations | {format_number(summary.get('iteration_count'))} |",
        f"| Iteration rate (iter/s) | {format_number(summary.get('iteration_rate_rps'))} |",
        f"| HTTP/sample failures | {format_number(summary.get('failure_count'))} |",
        f"| Failure rate | {format_number((summary.get('failure_rate') or 0) * 100)}% |"
        if summary.get("failure_rate") is not None
        else "| Failure rate | N/A |",
        f"| Custom functional-failure rate | {format_number((summary.get('functional_failure_rate') or 0) * 100)}% |"
        if summary.get("functional_failure_rate") is not None
        else "| Custom functional-failure rate | N/A |",
        f"| Check passes | {format_number(summary.get('check_passes'))} |",
        f"| Check fails | {format_number(summary.get('check_fails'))} |",
        f"| Max VUs | {format_number(summary.get('max_vus'))} |",
    ]
    for key in ("min", "avg", "med", "p(90)", "p(95)", "p(99)", "max"):
        lines.append(f"| http/sample duration {key} (ms) | {format_number(duration.get(key))} |")
    warnings = summary.get("warnings", [])
    if warnings:
        lines.extend(["", "## Interpretation warnings", ""])
        lines.extend(f"- {warning}" for warning in warnings)
    return "\n".join(lines) + "\n"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="k6 summary/raw JSON or JMeter CSV/XML JTL")
    parser.add_argument(
        "--input-format",
        choices=("auto", "k6-summary", "k6-raw", "jmeter-csv", "jmeter-xml"),
        default="auto",
    )
    parser.add_argument("--output-format", choices=("markdown", "json"), default="markdown")
    parser.add_argument("--output", type=Path, help="Write the derived summary to this path")
    parser.add_argument("--force", action="store_true", help="Allow replacing an existing derived output")
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    path = args.input.resolve()
    if not path.is_file():
        print(f"error: input file does not exist: {path}", file=sys.stderr)
        return 2

    selected = detect_format(path) if args.input_format == "auto" else args.input_format
    readers = {
        "k6-summary": parse_k6_summary,
        "k6-raw": parse_k6_raw,
        "jmeter-csv": parse_jmeter_csv,
        "jmeter-xml": parse_jmeter_xml,
    }
    try:
        summary = readers[selected](path)
    except (OSError, ValueError, json.JSONDecodeError, ET.ParseError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    summary["source"] = str(path)
    rendered = (
        markdown(summary, path)
        if args.output_format == "markdown"
        else json.dumps(summary, indent=2, ensure_ascii=False) + "\n"
    )
    if args.output:
        output = args.output.resolve()
        if output == path:
            print("error: refusing to overwrite the raw input file", file=sys.stderr)
            return 2
        if output.exists() and not args.force:
            print(f"error: output already exists (use --force): {output}", file=sys.stderr)
            return 2
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(rendered, encoding="utf-8")
        print(f"Wrote derived summary: {output}")
    else:
        print(rendered, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
