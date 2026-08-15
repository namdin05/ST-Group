# Spike Test Design

## Objective

Evaluate how the local EShop backend reacts to an abrupt five-times increase over the accepted 5-VU Load baseline, and whether it recovers after the burst without HTTP or WF01 functional failures. This test is bounded; it is not a breaking-point Stress Test.

## Workflow

WF01 – Search & Single-item Purchase

## Workload Model

- Initial VUs: 1 for a 30-second baseline observation.
- Target VUs: 25, using 25 unique synthetic accounts from the 50-account pool.
- Spike ramp-up: 5 seconds from 1 to 25 VUs.
- Spike hold: 60 seconds at 25 VUs.
- Spike ramp-down: 5 seconds from 25 to 1 VU.
- Recovery observation: 30 seconds at 1 VU, then 10 seconds to 0.
- Think time: unchanged from the accepted Load test (`1-2s`, `2-4s`, `2-5s`, `1-3s`, and `3-6s` inter-iteration pause).

## Assertions

- Every WF01 request must return its expected HTTP status and response shape.
- JWT, product ID/name/price, cart item, checkout order ID, and order readback remain correlated.
- HTTP request failure rate must remain below 1%.
- Functional failure rate and failed checks must remain 0%.
- Overall HTTP p95 must remain below 500 ms for this bounded local spike.

## Test Data

- `test-data/users.csv`: 50 synthetic accounts; VUs 1-25 receive distinct accounts.
- `test-data/products.csv`: five stable search keywords, with product IDs correlated at runtime.
- Execute only against a fresh disposable SQLite database. Provision accounts after the final backend start and delete the runtime after evidence capture.

## Metrics to Collect

- response time
- p90
- p95
- throughput / requests per second
- error rate
- CPU usage
- memory usage

## Acceptance / Observation Criteria

- k6 exit code is 0 and every configured threshold passes.
- Record request count, completed iterations, checks, average/p90/p95/max response time, throughput, and failure rate.
- Capture resource evidence during the 1-VU baseline, during the 25-VU peak, and during the 1-VU recovery period.
- Compare the peak and recovery windows; report any persistent error/latency or failure to return toward baseline.
- Preserve the repository database hash and user count before/after execution.

## AI-generated Proposal

The 25-VU peak is five times the accepted 5-VU Load profile but consumes only half of the prepared 50-account pool. A 5-second transition makes the concurrency change abrupt while a 60-second hold allows multiple complete WF01 iterations. The 30-second recovery window distinguishes transient spike behavior from a persistent degradation.

## Human Review

On 2026-08-15, the user explicitly instructed execution of the next Spike Test and requested genuine screenshots. No exact VU values were supplied, so the bounded 1-to-25-VU profile above is an explicit AI assumption derived from the completed 5-VU Load baseline and the available 50-account dataset; it must not be represented as a separately user-selected capacity target.

## Execution Outcome

**EXECUTED / PASS on 2026-08-15.** A technical dry run passed before the final clean full run. The full run completed 130 iterations and 910 requests with 2,990 passed checks, no failed/interrupted iterations, 0% HTTP and functional failures, 30.22 ms p95, and 6.3095 requests/s. See `results/23127430_Spike_20260815_report.md` and the genuine screenshot index under `evidence/screenshots/spike-rerun-20260815_170949/`.
