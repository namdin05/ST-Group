# Performance Test Plans

Selected tool: **k6 v2.0.0**.

All scenario plans must execute the same WF01 business workflow. Load, Stress, and Spike differ only in workload profile. Endurance uses the same business flow with its separately approved duration/profile.

Final Load, Stress, and Spike plan names must follow:

```text
<StudentID>_Load_<YYYYMMDD>
<StudentID>_Stress_<YYYYMMDD>
<StudentID>_Spike_<YYYYMMDD>
```

The accepted Load plan is implemented at `test-plans/load/23127430_Load_20260814.js`. It supports:

- `RUN_MODE=dry-run`: one VU, one iteration;
- `RUN_MODE=load`: Option A (`1 -> 5 VUs`, `2m/5m/1m`);
- `BASE_URL`: defaults to `http://127.0.0.1:3000`.

The script reads `test-data/users.csv` and `test-data/products.csv`, keeps one unique account per VU, correlates JWT/product/order data, and applies the approved functional checks. Stress, Spike, and Endurance scripts have not been generated.
