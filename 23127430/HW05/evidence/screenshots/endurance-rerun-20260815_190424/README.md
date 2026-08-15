# k6 Endurance Test Screenshot Evidence — 2026-08-15

These screenshots belong to Endurance run `20260815_190424`, whose full k6 execution started at `19:14:07` local time. The SUT used an isolated temporary backend/SQLite runtime; the source database hash was preserved.

The custom evidence dashboard was generated locally from genuine k6 artifacts, process IDs, operating-system resource samples, and the execution state. It is not a reconstructed Task Manager image. The k6 screenshots were captured directly from the live dashboard or final exported HTML.

## Primary Screenshot Index

| File | Evidence |
| --- | --- |
| [01-dry-run-pass.png](01-dry-run-pass.png) | Dry run passed the workflow and all thresholds. |
| [03-k6-dashboard-ramp-complete.png](03-k6-dashboard-ramp-complete.png) | Live k6 dashboard at completion of ramp-up toward 20 VUs. |
| [04-hold-minute-3-resources.png](04-hold-minute-3-resources.png) | Resource checkpoint after three sustained minutes. |
| [06-hold-minute-6-resources.png](06-hold-minute-6-resources.png) | Mid-hold operating-system resource checkpoint. |
| [08-hold-minute-9-resources.png](08-hold-minute-9-resources.png) | Late-hold resource checkpoint. |
| [10-hold-minute-12-resources.png](10-hold-minute-12-resources.png) | Hold complete; ramp-down beginning. |
| [11-k6-dashboard-ramp-down.png](11-k6-dashboard-ramp-down.png) | Live k6 Overview during controlled ramp-down. |
| [15-k6-final-overview-clean.png](15-k6-final-overview-clean.png) | Clean viewport capture of the final HTML Overview and time series. |
| [16-k6-final-summary-clean.png](16-k6-final-summary-clean.png) | Clean viewport capture of the final HTML Summary metrics. |
| [17-cleanup-clean.png](17-cleanup-clean.png) | Disposable runtime removed and source database hash preserved. |
| [18-final-metrics-clean.png](18-final-metrics-clean.png) | Final k6 totals and latest resource samples read from genuine artifacts. |

The directory also retains full-page captures and paired live-dashboard checkpoints for traceability. Some browser full-page captures contain stitching repetition; the `*-clean.png` viewport captures are the preferred submission images.

## Machine-readable Artifacts

- [Raw k6 stream](../../../results/evidence-rerun/endurance-20260815_190424/raw/23127430_Endurance_20260815_190424.json)
- [Full summary JSON](../../../results/evidence-rerun/endurance-20260815_190424/raw/23127430_Endurance_20260815_190424_summary.json)
- [Hold-only summary JSON](../../../results/evidence-rerun/endurance-20260815_190424/raw/23127430_Endurance_20260815_190424_hold-summary.json)
- [Console log](../../../results/evidence-rerun/endurance-20260815_190424/raw/23127430_Endurance_20260815_190424_console.log)
- [Resource samples](../../../results/evidence-rerun/endurance-20260815_190424/endurance-resource-samples.csv)
- [HTML report](../../../results/evidence-rerun/endurance-20260815_190424/html/23127430_Endurance_20260815_190424.html)
- [Execution state](../../../results/evidence-rerun/endurance-20260815_190424/execution-state.json)
