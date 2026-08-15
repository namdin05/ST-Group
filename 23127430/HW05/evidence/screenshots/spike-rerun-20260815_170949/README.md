# K6 Spike Test Screenshot Evidence — 2026-08-15

This directory contains genuine screenshots from the final 1-to-25-VU Spike execution. An initial pilot was used only to validate timing and was removed; the metrics and screenshots documented here belong to the clean final rerun beginning at `17:18:01` local time.

## Screenshot Index

| File | Evidence |
| --- | --- |
| [00_windows_about_shared.png](00_windows_about_shared.png) | Hardware tile captured on the same execution machine during the preceding Load evidence run; reused without personal/device identifiers. |
| [01_backend_startup.png](01_backend_startup.png) | Backend started from exact source copies with a new SQLite file in the OS temporary runtime. |
| [02_test_data_provision.png](02_test_data_provision.png) | CSV validation, product verification, and first 50-account provisioning gate. |
| [03_k6_spike_dry_run_pass.png](03_k6_spike_dry_run_pass.png) | Spike script technical dry run: 1 iteration, 7 requests, 23 checks, PASS. |
| [04_full_spike_reprovision.png](04_full_spike_reprovision.png) | Final clean database provisioning immediately before the final full run. |
| [05_baseline_resources.png](05_baseline_resources.png) | T+26.4 seconds, baseline phase at 1 VU. |
| [06_peak_spike_resources.png](06_peak_spike_resources.png) | T+79.0 seconds, peak phase at 25 VUs. |
| [07_k6_recovery_progress.png](07_k6_recovery_progress.png) | Recovery progress at T+108–117 seconds: active VUs fall from 9 to 1 with no interrupted iterations. |
| [08_k6_full_spike_pass.png](08_k6_full_spike_pass.png) | Final summary and all threshold verdicts: PASS. |
| [09_k6_spike_html_report.png](09_k6_spike_html_report.png) | Browser-rendered HTML graph showing low baseline, abrupt request-rate/latency burst, and recovery. |
| [10_database_cleanup_pass.png](10_database_cleanup_pass.png) | Source hash/user preservation, 130 disposable orders, and closed ports: PASS. |

## Machine-readable Artifacts

- [Summary JSON](../../../results/evidence-rerun/spike-20260815_170949/raw/23127430_Spike_20260815_170949_summary.json)
- [Console log](../../../results/evidence-rerun/spike-20260815_170949/raw/23127430_Spike_20260815_170949_console.log)
- [HTML report](../../../results/evidence-rerun/spike-20260815_170949/html/23127430_Spike_20260815_170949.html)

