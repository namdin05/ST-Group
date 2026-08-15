# Performance Test Results

Status: **LOAD OPTION A COMPLETED / PASS** on 2026-08-14. Stress, Spike, and Endurance remain not run.

- `raw/` is reserved for genuine raw results produced by real executions.
- `html/` is reserved for genuine generated reports.
- Keep required raw logs and HTML deliverables in the submission; they are intentionally not ignored by `.gitignore`.

Genuine Load artifacts:

- `23127430_Load_20260814_report.md`: verified run report and interpretation;
- `raw/23127430_Load_20260814.json`: full k6 metric-point stream;
- `raw/23127430_Load_20260814_summary.json`: k6 summary export;
- `raw/23127430_Load_20260814_console.log`: console summary;
- `html/23127430_Load_20260814.html`: k6 HTML dashboard export;
- `_dry-run` raw/summary/console files: genuine 1 VU / 1 iteration technical dry run.

The full run completed 139 iterations and 973 requests with 0 failed checks, 0% HTTP failures, and 0% functional failures. See the report for latency, throughput, resource data, safety controls, and limitations.
