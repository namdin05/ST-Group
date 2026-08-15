# Stress Test Design

## Objective

Increase concurrency progressively beyond the accepted Load and bounded Spike profiles to observe latency, throughput, resource behavior, and functional stability near the 50-account dataset limit. The test can identify degradation within this range, but cannot claim the SUT breaking point if 50 VUs pass.

## Workflow

WF01 – Search & Single-item Purchase

## Workload Model

- Start at 5 VUs for 30 seconds.
- Ramp to and hold 10 VUs for 30 seconds each.
- Ramp to and hold 20 VUs for 30 seconds each.
- Ramp to and hold 35 VUs for 30 seconds each.
- Ramp to 50 VUs for 30 seconds and hold 50 VUs for 60 seconds.
- Ramp down from 50 to 0 VUs over 30 seconds.
- Think time remains identical to Load and Spike so profile comparisons remain meaningful.

## Assertions

- Preserve every WF01 HTTP/status/schema/correlation check.
- HTTP request failure rate below 5%.
- Functional failure rate below 1%.
- Check success rate above 99%.
- Overall HTTP p95 below 1,000 ms for this bounded local Stress profile.

## Test Data

- All 50 synthetic accounts are required so each active VU owns one account/cart/JWT/order stream.
- Five search keywords remain correlated to product IDs at runtime.
- Execute on a fresh disposable SQLite database after backend startup and remove the runtime after evidence capture.

## Metrics to Collect

- response time
- p90
- p95
- throughput / requests per second
- error rate
- CPU usage
- memory usage

## Acceptance / Observation Criteria

- Run a 1-VU/1-iteration technical dry run before full execution.
- Record results and resource evidence near 5 VUs, 20 VUs, and the 50-VU hold.
- Treat a threshold breach as a Stress failure/degradation finding, not as a reason to hide the run.
- If all thresholds pass at 50 VUs, conclude only that no breaking point was found within the prepared dataset limit.
- Verify repository database hash and user count before/after execution.

## AI-generated Proposal

The progressive 5/10/20/35/50-VU staircase crosses the completed Load peak (5 VUs) and Spike peak (25 VUs) without an abrupt jump. Thirty-second ramp/hold windows permit multiple WF01 completions at each band while keeping database side effects bounded. The 50-VU ceiling is dictated by the approved one-account-per-VU dataset.

## Human Review

On 2026-08-15, the user explicitly requested that Stress Testing be performed similarly to the completed Spike Test. Exact concurrency values were not supplied; the staircase above is an explicit AI assumption based on the 5-VU Load baseline, successful 25-VU Spike, and 50-account pool. It must not be represented as a stakeholder-defined production capacity target.

## Execution Outcome

**EXECUTED / PASS on 2026-08-15.** After a successful technical dry run, the full staircase completed 613 WF01 iterations and 4,291 requests with 14,099 passed checks, no failures or interrupted iterations, 25.10 ms p95, and 12.4393 requests/s. No breaking point was found within the 50-account limit. See `results/23127430_Stress_20260815_report.md` and `evidence/screenshots/stress-rerun-20260815_173830/`.

## Execution Outcome

**EXECUTED / PASS on 2026-08-15.** After a successful technical dry run, the full staircase completed 613 WF01 iterations and 4,291 requests with 14,099 passed checks, no failures or interrupted iterations, 25.10 ms p95, and 12.4393 requests/s. No breaking point was found within the 50-account limit. See `results/23127430_Stress_20260815_report.md` and `evidence/screenshots/stress-rerun-20260815_173830/`.
