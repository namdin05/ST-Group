# Scenario Design and Evidence Guide

Use this guide before generating or running a plan.

## Workflow model

Model one iteration as named business steps, for example:

```text
authenticate -> list products -> view product -> add cart item -> view cart -> checkout -> view orders
```

For every step record:

- method and path;
- data source and state prerequisites;
- expected status and critical response semantics;
- whether failure should stop the iteration;
- what state must be cleaned or reset.

Do not let an early login failure create a flood of misleading downstream failures. Tag every request with scenario and step names.

## CSV and account allocation

Use deterministic synthetic rows, such as:

```csv
username,password,product_id,quantity
perf_user_001,synthetic-secret-001,1,1
```

Keep the real file out of public artifacts if it contains non-synthetic secrets. Validate headers and row count before execution. In k6, a typical safe mapping is `rows[(__VU - 1) % rows.length]` only when `maxVUs <= rows.length`; otherwise the modulo silently shares accounts. JMeter CSV Data Set Config should not recycle stateful identities unless the review explicitly permits it.

Record:

- provisioning command and output;
- source versus disposable-database path;
- account count and maximum VUs;
- lockout-reset and cleanup procedure;
- before/after hash or invariant for protected data.

## Scenario rationale

### Load

Use a ramp, steady hold, and ramp-down around expected traffic. Capture steady-state throughput and percentiles; do not call a sub-second dry-run a Load test.

Primary view suggestion: throughput plus p50/p90/p95 latency during the steady hold.

### Stress

Increase load in observable stages. Set an upper safety/data cap and abort conditions. A test stopped at the account cap identifies a test constraint, not the SUT breaking point.

Primary view suggestion: VUs/arrival rate overlaid with p95, error rate, and backend resource use by stage.

### Spike

Hold a baseline, jump rapidly to a reviewed peak, return rapidly, then allow enough time to observe recovery. Analyze peak degradation and time-to-recovery separately.

Primary view suggestion: a peak/recovery time series for p95, failures, throughput, and VUs.

### Endurance

Use a reviewed sustainable level for about 10–15 minutes. Sample memory and CPU throughout. Report start/peak/end memory, slope or growth pattern, stable throughput, p95, error rate, and the specific maximum stable RPS/memory ceiling supported by the observation.

Do not extrapolate a long-term leak from a short run without a follow-up experiment.

## Thresholds and checks

Keep four concepts separate:

- **checks:** functional truth about responses or state;
- **HTTP failures:** transport/protocol failure classification;
- **performance thresholds:** reviewed budgets such as p95 or error rate;
- **safety aborts:** conditions that stop harmful or invalid traffic.

Thresholds need a source: stakeholder SLO, prior baseline, class requirement, or explicitly provisional engineering budget. Always state the source.

## k6 artifact pattern

Preserve at least:

```text
results/raw/<plan>_<run-id>.json
results/raw/<plan>_<run-id>_summary.json
results/raw/<plan>_<run-id>_console.log
results/html/<plan>_<run-id>.html
```

Use a dry-run-specific name for smoke results. Do not replace the full run with the dry run.

A PowerShell execution may enable the k6 web dashboard with environment variables before `k6 run`; use the version-supported mechanism confirmed by `k6 version` and local help. Capture the exact command in the report instead of assuming dashboard defaults.

## JMeter artifact pattern

Run non-GUI for load generation and preserve:

```text
jmeter -n -t <plan>.jmx -l <raw>.jtl -e -o <html-directory>
```

Confirm the actual JMeter binary and property overrides locally. Use GUI listeners only for plan review or low-cost evidence, not as part of the full load generator when they distort measurements.

## Three distinct report perspectives

The HW05 requirement is semantic, not satisfied by changing filenames. Declare the mapping before execution.

| Scenario | JMeter example | k6 equivalent |
| --- | --- | --- |
| Load | Summary/Aggregate view | steady-state throughput and percentile dashboard |
| Stress | Response Times Over Time | stage view combining load, p95/errors, and resources |
| Spike | Active Threads + response timeline | peak/recovery time series and recovery duration |

Keep the raw result and HTML artifact for every scenario even when the highlighted primary panel differs. If course staff require a specific JMeter Listener interpretation for k6 submissions, obtain clarification and document it.

## Screenshot matrix

Capture genuine images at readable resolution:

| Evidence | Minimum content |
| --- | --- |
| Environment | backend start output, port, disposable data context |
| Data setup | provisioning result and valid synthetic-account count |
| Dry run | tool summary, checks, threshold status, exit status |
| Baseline | tool progress and backend CPU/memory in the same frame |
| Peak/limit | active stage plus backend resource use in the same frame |
| Recovery/end | tool state plus recovered/final resource use |
| Full summary | counts, p95, failures, thresholds, exit status |
| HTML view | scenario's declared primary perspective |
| Cleanup | reset/cleanup success and protected-data invariant |
| Hardware | OS, CPU, RAM, and machine identity required by the assignment |

Do not compose separate moments into a misleading same-frame image. Store originals and include short captions stating scenario, phase, actual timestamp, and result path.

## Execution ledger

For each run record:

```text
Run ID:
Plan path and hash:
Source revision / dirty state:
Tool and version:
Target base URL:
Database/test-data identity:
Start/end timestamps and timezone:
Exact command and environment overrides:
Exit code:
Raw, summary, console, HTML, screenshot paths:
Cleanup/reset outcome:
Known limitations:
```
