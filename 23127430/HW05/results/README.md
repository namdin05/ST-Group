# Performance Test Results

Status: **LOAD OPTION A COMPLETED / PASS** on 2026-08-14; **SPIKE, STRESS, and ENDURANCE COMPLETED / PASS** on 2026-08-15.

- `raw/` is reserved for genuine raw results produced by real executions.
- `html/` is reserved for genuine generated reports.
- `views/README.md` maps the scenario-specific k6-equivalent analytical perspectives.
- `evidence-rerun/` preserves timestamped artifacts tied to screenshot sessions.
- Keep required raw logs and HTML deliverables in the submission; they are intentionally not ignored by `.gitignore`.

Genuine Load artifacts:

- `23127430_Load_20260814_report.md`: verified run report and interpretation;
- `raw/23127430_Load_20260814.json`: full k6 metric-point stream;
- `raw/23127430_Load_20260814_summary.json`: k6 summary export;
- `raw/23127430_Load_20260814_console.log`: console summary;
- `html/23127430_Load_20260814.html`: k6 HTML dashboard export;
- `_dry-run` raw/summary/console files: genuine 1 VU / 1 iteration technical dry run.

The full run completed 139 iterations and 973 requests with 0 failed checks, 0% HTTP failures, and 0% functional failures. See the report for latency, throughput, resource data, safety controls, and limitations.

Genuine Spike artifacts:

- `23127430_Spike_20260815_report.md`: verified profile, results, comparison, and limitations;
- `raw/23127430_Spike_20260815.json`: full k6 metric-point stream;
- `raw/23127430_Spike_20260815_summary.json`: k6 summary export;
- `raw/23127430_Spike_20260815_console.log`: console summary;
- `html/23127430_Spike_20260815.html`: k6 HTML dashboard export;
- matching `_dry-run` artifacts: genuine 1 VU / 1 iteration technical dry run.

The Spike run completed 130 iterations and 910 requests with 0 failed checks, 0% HTTP failures, 30.22 ms p95, and 6.3095 requests/s.

Genuine Stress artifacts:

- `23127430_Stress_20260815_report.md`: verified profile, results, comparison, and limitations;
- `raw/23127430_Stress_20260815.json`: full k6 metric-point stream;
- `raw/23127430_Stress_20260815_summary.json`: k6 summary export;
- `raw/23127430_Stress_20260815_console.log`: console summary;
- `html/23127430_Stress_20260815.html`: k6 HTML dashboard export;
- matching `_dry-run` artifacts: genuine 1 VU / 1 iteration technical dry run.

The Stress run completed 613 iterations and 4,291 requests with 0 failed checks, 0% HTTP failures, 25.10 ms p95, and 12.4393 requests/s. No breaking point was found within the 50-account limit.

Genuine Endurance artifacts:

- `23127430_Endurance_20260815_report.md`: verified profile, full-run result, hold-only threshold, resources, and limitations;
- `raw/23127430_Endurance_20260815.json`: full k6 metric-point stream;
- `raw/23127430_Endurance_20260815_summary.json`: k6 full-run summary export;
- `raw/23127430_Endurance_20260815_hold-summary.json`: reproducible exact-hold analysis;
- `raw/23127430_Endurance_20260815_resources.csv`: approximately 10-second OS/process samples;
- `raw/23127430_Endurance_20260815_console.log`: console summary;
- `html/23127430_Endurance_20260815.html`: k6 HTML dashboard export;
- matching `_dry-run` artifacts: genuine 1 VU / 1 iteration technical dry run.

The full run completed 1,081 iterations and 7,567 requests with 24,863/24,863 checks, 0% failures, and 19.49 ms p95. During the exact 12-minute hold it sustained 9.5931 requests/s with 19.34 ms p95; Node working set remained at or below 58.54 MB.
