# HW05 – Performance Testing

## Selected Workflow

WF01 – Search & Single-item Purchase

## Scenarios

- [x] Load Test
- [ ] Stress Test
- [ ] Spike Test
- [ ] Endurance Test

## Endpoint Groups

- [x] Auth-heavy
- [x] Read-heavy
- [x] Transactional

## Current Status

WF01 source analysis, functional verification, Human Review, technical dry run, and the accepted Option A Load test are complete.

Tool selection: **k6 v2.0.0**.

## Test Summary

| Scenario | Status | p95 | Throughput | Error Rate |
|---|---|---:|---:|---:|
| Load | PASS | 33.01 ms | 2.0254 requests/s | 0% |
| Stress | NOT RUN | N/A | N/A | N/A |
| Spike | NOT RUN | N/A | N/A | N/A |
| Endurance | NOT RUN | N/A | N/A | N/A |

## Endurance Threshold

NOT DETERMINED. The intended soak duration is approximately 10–15 minutes; the final duration and thresholds require SUT and hardware context.

## Test-plan Naming Convention

Use these names only when the student ID and execution date are known:

```text
<StudentID>_Load_<YYYYMMDD>
<StudentID>_Stress_<YYYYMMDD>
<StudentID>_Spike_<YYYYMMDD>
```

## Bugs / Performance Issues

No reproducible performance failure was found under Option A. Checkout was the slowest endpoint at 49.28 ms p95, but no SLO was violated because none was supplied.

## Demo Video

TODO

## Self-assessment

TODO

## Next Steps

1. Add genuine Windows Settings/Task Manager screenshots if the submission requires visual hardware evidence.
2. Review the Option A baseline and define stakeholder-backed p95/throughput SLOs.
3. Decide whether Option B should be tested; do not run it automatically.
4. Design Stress, Spike, and Endurance only after separate Human Review.
5. Preserve the disposable-database safety pattern for every future execution.

Do not add fabricated results, screenshots, logs, resource usage, or PASS/FAIL claims.
