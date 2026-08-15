# Execution Evidence

Status: **LOAD, SPIKE, STRESS, AND ENDURANCE EVIDENCE CAPTURED**

## Hardware Evidence

Genuine evidence from the execution machine is stored under `hardware/`:

- `01_system_about.png`: hostname, model, CPU, RAM, storage, graphics memory, and Windows version;
- `02_dxdiag_system.png`: dxdiag system report and capture time;
- `23127430_Load_20260814_resources.csv`: Load resource samples.

## Scenario Evidence

For each real scenario, capture the performance-testing tool together with backend-process resource usage using Task Manager, `htop`, Activity Monitor, or an equivalent tool.

Current genuine screenshot indexes:

- `screenshots/load-rerun-20260814_165405/README.md`;
- `screenshots/spike-rerun-20260815_170949/README.md`;
- `screenshots/stress-rerun-20260815_173830/README.md`.
- `screenshots/endurance-rerun-20260815_190424/README.md`.

See `screenshots/README.md` for the consolidated index. Endurance run `20260815_190424` includes live k6 views, 3/6/9/12-minute resource checkpoints, final HTML/summary captures, and cleanup evidence.

Place future evidence under scenario-specific directories. Do not fabricate screenshots or hardware/resource values.
