# k6 Report View Mapping

The completed scenarios use separate raw streams and HTML exports. Because the k6 dashboard exporter uses the same report shell, this index declares a distinct primary analytical perspective for each scenario instead of pretending the HTML renderer itself is different.

| Scenario | Primary k6-equivalent view | Genuine sources | Purpose |
| --- | --- | --- | --- |
| Load | Steady-state aggregate and per-endpoint percentile view | [`../23127430_Load_20260814_report.md`](../23127430_Load_20260814_report.md), [`../html/23127430_Load_20260814.html`](../html/23127430_Load_20260814.html) | Establish requests/iterations, p90/p95, endpoint distribution, and local baseline |
| Stress | Stage-progression and resource-band view | [`../23127430_Stress_20260815_report.md`](../23127430_Stress_20260815_report.md), [`../html/23127430_Stress_20260815.html`](../html/23127430_Stress_20260815.html) | Relate 5/20/50-VU stages to throughput, p95/max, and resources |
| Spike | Peak/recovery time-series view | [`../23127430_Spike_20260815_report.md`](../23127430_Spike_20260815_report.md), [`../html/23127430_Spike_20260815.html`](../html/23127430_Spike_20260815.html) | Show baseline, abrupt 25-VU peak, and return toward the low-rate region |
| Endurance | Hold-stability and resource-trend view | [`../23127430_Endurance_20260815_report.md`](../23127430_Endurance_20260815_report.md), [`../html/23127430_Endurance_20260815.html`](../html/23127430_Endurance_20260815.html) | Establish exact-hold stable RPS, latency, failure rate, and observed memory ceiling |

All values originate from the scenario raw JSON and summary files. Endurance additionally includes a clean final Summary screenshot and an exact-hold machine-readable analysis. If course staff require three different HTML renderer products rather than k6-equivalent analytical perspectives, a new reviewed post-processing/export step is still required.
