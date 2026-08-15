# Performance Test Plans

Selected tool: **k6 v2.0.0**.

All scenario plans execute the same WF01 business workflow and differ only in workload profile. Endurance uses the same business flow with its separately approved duration/profile.

Canonical names and implemented plans:

```text
23127430_Load_20260814.js
23127430_Stress_20260815.js
23127430_Spike_20260815.js
23127430_Endurance_20260815.js
```

The accepted Load plan is implemented at `test-plans/load/23127430_Load_20260814.js`. It supports:

- `RUN_MODE=dry-run`: one VU, one iteration;
- `RUN_MODE=load`: Option A (`1 -> 5 VUs`, `2m/5m/1m`);
- `BASE_URL`: defaults to `http://127.0.0.1:3000`.

The Spike plan is implemented at `test-plans/spike/23127430_Spike_20260815.js`. It supports:

- `RUN_MODE=dry-run`: one VU, one iteration;
- `RUN_MODE=spike`: 1-VU baseline, 5-second jump to 25 VUs, 60-second peak, and bounded recovery/ramp-down.

The Stress plan is implemented at `test-plans/stress/23127430_Stress_20260815.js`. It supports:

- `RUN_MODE=dry-run`: one VU, one iteration;
- `RUN_MODE=stress`: progressive 5/10/20/35/50-VU staircase with a 60-second 50-VU hold.

The Endurance plan is implemented at `test-plans/endurance/23127430_Endurance_20260815.js`. It supports:

- `RUN_MODE=dry-run`: one VU, one iteration;
- `RUN_MODE=endurance`: one-minute ramp from 1 to 20 VUs, 12-minute 20-VU hold, and one-minute ramp-down.

All scripts read `test-data/users.csv` and `test-data/products.csv`, keep one unique account per VU, correlate JWT/product/order data, and apply the same WF01 functional checks. Endurance was approved and completed on an isolated disposable runtime; its report is in `results/23127430_Endurance_20260815_report.md`.
