# Hardware Evidence Checklist

## Verified Hardware Context

The following values were verified from the genuine repository screenshots:

| Field | Supplied value |
|---|---|
| Device | MSI Thin GF63 12VE; hostname `NamUS` / `NAMUS` as displayed |
| Operating system | Windows 11 Home Single Language 64-bit; version 25H2; OS build 26200.9168 |
| CPU | 12th Gen Intel(R) Core(TM) i5-12450H |
| CPU speed displayed by Windows | 2.00 GHz |
| RAM | 16.0 GB, 3200 MT/s |
| Storage capacity shown | 477 GB |
| Graphics memory | 6 GB |
| System manufacturer | Micro-Star International Co., Ltd. |
| Evidence source | `01_system_about.png` and `02_dxdiag_system.png`, captured 2026-08-14 |

The screenshots do not establish the GPU model, disk model/type, or sustained CPU frequency, so those fields are not inferred. The completed executions verified that k6 and the local disposable SUT shared this Windows host.

## Evidence Capture Checklist

- [x] Capture Windows Settings -> System -> About showing hostname, CPU, installed RAM, storage, graphics memory, and Windows details.
- [x] Capture dxdiag system information with machine model, hostname, OS, processor, memory, and capture time.
- [x] Confirm that k6, Node.js, and disposable SQLite shared the local machine.
- [x] Capture Task Manager/process resource evidence at scenario-specific phases.
- [x] Record timestamps/load phases in each screenshot index.
- [x] Keep original screenshots with descriptive filenames.

Hardware evidence is stored in `01_system_about.png` and `02_dxdiag_system.png`. Genuine numeric resource samples from the completed Load run are stored in `23127430_Load_20260814_resources.csv`; Spike and Stress phase observations are indexed under their scenario screenshot directories.

## Resource-Monitoring Plan

1. Start one documented Node.js backend instance and verify its PID and port `3000`.
2. Record the selected k6 v2.0.0 process, command, host, and PID; use CLI execution for measured runs.
3. Record a pre-run baseline for total CPU, total memory, Node.js CPU/private working set, database-file size, and order count.
4. For the later Option A execution, observe near the end of ramp-up and the middle of the hold period. Capture total CPU/RAM plus the Node.js and load-generator processes in the same time window.
5. SQLite is embedded in Node.js and has no separate server process. Correlate SQLite effects using Node.js resource use, backend logs, database-file growth, order count, and request latency/errors.
6. Record a post-run sample and distinguish resource saturation from functional/assertion failures.

## Current Topology Status

| Component | Current evidence |
|---|---|
| Load generator | `LOCAL / EXECUTION-VERIFIED` - k6 v2.0.0 |
| Backend | `LOCAL / EXECUTION-VERIFIED` - Node.js on port `3000` during the run; stopped afterward |
| Database | `LOCAL DISPOSABLE / EXECUTION-VERIFIED` - embedded SQLite created in an OS temporary runtime; original source database protected |
| All components on the MSI device | `VERIFIED FOR THIS LOCAL EXECUTION` - k6, Node.js, and SQLite shared the Windows host |

Local execution results must not be presented as production capacity. If the load generator shares this 16 GB Windows device with the SUT, its CPU/RAM use is part of the observed bottleneck and must be reported.
