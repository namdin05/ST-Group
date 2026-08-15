# K6 Stress Test Screenshot Evidence — 2026-08-15

These screenshots belong to the clean final Stress execution beginning at `17:42:14` local time. The SUT used an isolated temporary backend/SQLite runtime, while the repository database remained read-only.

## Screenshot Index

| File | Evidence |
| --- | --- |
| [00_windows_about_shared.png](00_windows_about_shared.png) | Safe hardware tile from the same execution machine, reused from the preceding Load evidence. |
| [01_backend_startup.png](01_backend_startup.png) | Disposable backend startup; original source database not used for writes. |
| [02_test_data_provision.png](02_test_data_provision.png) | Validation, product verification, and initial 50-account provisioning gate. |
| [03_k6_stress_dry_run_pass.png](03_k6_stress_dry_run_pass.png) | Technical dry run: 1 iteration, 7 requests, 23 checks, PASS. |
| [04_full_stress_reprovision.png](04_full_stress_reprovision.png) | Clean final provisioning immediately before full Stress execution. |
| [05_low_5vu_resources.png](05_low_5vu_resources.png) | Low-load evidence at T+31.3 seconds, approximately 5 VUs. |
| [06_mid_20vu_resources.png](06_mid_20vu_resources.png) | Mid-load evidence at T+142.7 seconds, 20-VU hold. |
| [07_high_50vu_resources.png](07_high_50vu_resources.png) | High-load evidence at T+263.4 seconds, 50-VU hold. |
| [07b_k6_50vu_progress.png](07b_k6_50vu_progress.png) | k6 progress at 50/50 VUs with more than 500 completed and 0 interrupted iterations. |
| [08_k6_full_stress_pass.png](08_k6_full_stress_pass.png) | Final metrics and all threshold verdicts: PASS. |
| [09_k6_stress_html_report.png](09_k6_stress_html_report.png) | Browser-rendered dashboard showing request rate rising with the Stress staircase. |
| [10_database_cleanup_pass.png](10_database_cleanup_pass.png) | Source hash/user preservation, 613 disposable orders, and closed ports: PASS. |

## Machine-readable Artifacts

- [Summary JSON](../../../results/evidence-rerun/stress-20260815_173830/raw/23127430_Stress_20260815_173830_summary.json)
- [Console log](../../../results/evidence-rerun/stress-20260815_173830/raw/23127430_Stress_20260815_173830_console.log)
- [HTML report](../../../results/evidence-rerun/stress-20260815_173830/html/23127430_Stress_20260815_173830.html)

