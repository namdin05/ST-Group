# Endurance Test Design and Result

## Status

**EXECUTED / PASS on 2026-08-15.** The user authorized selection and execution of a suitable Endurance duration based on the completed Load, Spike, and Stress results. A 14-minute profile was selected: one-minute ramp-up, 12-minute hold at 20 VUs, and one-minute ramp-down.

## Objective

Run WF01 at a sustained, already-demonstrated concurrency for long enough to observe latency stability and memory behavior on the local MSI/Windows host. The run must produce an empirical stable request rate and observed memory ceiling without extrapolating a long-term memory leak from a 12-minute hold.

## Workflow

The test retained the same seven-request sequence and functional checks as the other scenarios:

```text
Login → Search → Product Detail → Add to Cart → Cart read-back → Checkout → Order read-back
```

## Reviewed Workload Model

| Parameter | Executed value | Rationale |
| --- | --- | --- |
| Initial VUs | 1 | Validate stable startup before sustained load |
| Target VUs | 20 | Stress already passed this band; remains below the 50-account ceiling |
| Ramp-up | 1 minute | Avoid an unintended Spike profile |
| Hold | 12 minutes | Meets the assignment's approximately 10–15 minute soak window |
| Ramp-down | 1 minute | Allow orderly iteration completion |
| Think time | Same accepted WF01 ranges | Keep business pacing comparable |
| Accounts | 20 unique accounts from the 50-row pool | Preserve one stateful account per VU |
| Runtime | Disposable local SQLite copy | Isolate the 1,081 generated orders from source data |

The plan is implemented in [`23127430_Endurance_20260815.js`](../../test-plans/endurance/23127430_Endurance_20260815.js). A 1-VU/1-iteration dry run passed before the full run.

## Assertions and Guardrails

- Login returns a non-empty JWT and expected user identity.
- Search returns a non-empty product list; Detail matches the correlated product ID.
- Cart read-back contains the correlated product and quantity.
- Checkout returns an integer order ID; Order read-back contains that ID.
- HTTP failure rate `< 1%`.
- Functional failure rate `== 0` and critical check rate `== 100%`.
- HTTP p95 `< 500 ms`.

The latency guardrail is an engineering safety value based on the passed bounded profiles, not a stakeholder SLO.

## Full-run Result

| Metric | Result |
| --- | ---: |
| Completed / interrupted iterations | 1,081 / 0 |
| HTTP requests | 7,567 |
| Checks | 24,863 passed / 0 failed |
| HTTP / functional failure rate | 0% / 0% |
| HTTP average / p90 / p95 / max | 7.84 / 15.93 / 19.49 / 134.02 ms |
| Request / iteration rate | 8.9541 req/s / 1.2792 iter/s |
| Maximum VUs | 20 |

All four k6 thresholds passed and k6 exited with code `0`.

## Empirical Hold Threshold

The machine-readable hold-only analysis uses raw points from k6 T+60 seconds through T+780 seconds, exactly matching the 12-minute 20-VU hold:

| Hold-only metric | Measured value |
| --- | ---: |
| Stable sustained request rate | **9.5931 req/s** |
| Completed iterations | 985 |
| HTTP requests | 6,907 |
| HTTP p50 / p90 / p95 / p99 / max | 5.81 / 15.89 / **19.34** / 31.06 / 134.02 ms |
| HTTP / functional failures | 0% / 0% |
| Checks | 22,687 passed / 0 failed |
| Backend working-set average / ceiling | 56.69 / **58.54 MB** |
| k6 working-set average / ceiling | 46.54 / **50.07 MB** |
| Host available-memory floor | **5,354 MB** |

Therefore the demonstrated local Endurance threshold is **20 VUs sustaining 9.5931 requests/s for 12 minutes, with p95 19.34 ms, zero failures, and Node working set no higher than 58.54 MB**. This is a verified lower bound for this exact local profile, not maximum hardware or production capacity.

Backend working set moved from 53.66 to 58.54 MB across sampled hold endpoints, with a regression slope of 0.177 MB/minute and low `R² = 0.135`. Garbage collection produced a 49.50 MB minimum, and the weak fit does not show monotonic leak-like growth. The modest drift is also consistent with the known process-local cart arrays accumulating items across iterations. k6 working set rose more linearly to 50.07 MB while retaining ample host memory. No abnormal behavior was identified in this 12-minute window; a much longer soak would be required for a leak claim.

## Evidence and Safety

- 83 operating-system resource samples were captured; 65 fall inside the exact hold window.
- The disposable database contained 1,081 orders, matching the completed iteration count.
- Source database SHA-256 remained `BF10B050CA374146DDF22A54B8BF4FCD45858A35F4CEF366D63992F31CAAABE1`.
- The temporary runtime was removed and local test ports were closed.
- Raw, summary, hold-only summary, resource CSV, console, HTML, and screenshots are indexed in the [Endurance report](../../results/23127430_Endurance_20260815_report.md).
