# Hardware Evidence Checklist

## Human-Provided Hardware Context

The following values were supplied during Human Review and are recorded exactly without inferring missing specifications:

| Field | Supplied value |
|---|---|
| Device | MSI Thin GF63 12VE |
| Operating system | Windows |
| CPU | 12th Gen Intel(R) Core(TM) i5-12450H |
| CPU speed displayed by Windows | 2.00 GHz |
| RAM | 16.0 GB, 3200 MT/s |
| Storage capacity shown | 477 GB |
| Graphics memory | 6 GB |
| Evidence source | Windows Settings -> System -> About |

Not provided or verified: GPU model, CPU core/thread count, disk model/type, free disk space, Windows edition/version, and hostname. Do not infer these fields from the model name. The completed Load execution verified that k6 and the local disposable SUT shared this Windows host.

## Evidence Capture Checklist

- [ ] Capture Windows Settings -> System -> About showing device, CPU, installed RAM, and Windows details required by the assignment.
- [ ] Capture the relevant Windows display/storage panel if graphics memory or storage capacity must be evidenced separately.
- [ ] Record the hostname and capture date/time without exposing a personal account, license key, serial number, or unrelated notifications.
- [ ] Confirm the final execution topology: load generator, Node.js backend, and SQLite database location; state explicitly whether they share one machine.
- [ ] Before the dry run, capture Task Manager Performance showing overall CPU and memory.
- [ ] During a measured run, capture Task Manager Details/Processes with the Node.js backend and selected load-generator process identifiable.
- [ ] Record timestamps and workload phase for every resource screenshot.
- [ ] Keep original screenshots in this directory with descriptive filenames; do not fabricate or edit measured values.

No hardware screenshot has been copied into the repository yet. The table above is documented human-supplied context, not a substitute for the requested visual evidence. The genuine numeric resource samples from the completed Load run are stored in `23127430_Load_20260814_resources.csv`.

## Resource-Monitoring Plan

1. Start one documented Node.js backend instance and verify its PID and port `3000`.
2. After JMeter or k6 is selected, record the load-generator process, version, command, host, and PID. Prefer non-GUI/CLI execution for the measured run.
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
