# HW05 – Performance Testing

## Selected Workflow

WF01 – Search & Single-item Purchase

## Scenarios

- [ ] Load Test
- [ ] Stress Test
- [ ] Spike Test
- [ ] Endurance Test

## Endpoint Groups

- [ ] Auth-heavy
- [ ] Read-heavy
- [ ] Transactional

## Current Status

Project scaffold initialized. WF01 source analysis and one isolated functional API verification are complete. No performance test has been run.

Tool selection: **TODO: Select JMeter or k6.**

## Test Summary

| Scenario | Status | p95 | Throughput | Error Rate |
|---|---|---:|---:|---:|
| Load | NOT RUN | N/A | N/A | N/A |
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

NOT DETERMINED. Add an issue only after a real test run provides reproducible evidence.

## Demo Video

TODO

## Self-assessment

TODO

## Next Steps

1. Human-review the backend-cart/frontend-cart scope and approve an isolated database/reset strategy.
2. Select JMeter or k6.
3. Approve a disposable database, then provision the validated 50-account synthetic pool after the final backend start.
4. Record hardware evidence and have a human approve workload parameters and thresholds.
5. Design the Load profile around the verified WF01 mapping; do not implement Stress/Spike in the current analysis phase.

Do not add fabricated results, screenshots, logs, resource usage, or PASS/FAIL claims.
