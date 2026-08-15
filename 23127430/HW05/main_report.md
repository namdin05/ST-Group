# HW05 – Performance Testing

## 1. General Information

- Student ID: 23127430 (derived from the repository path; human confirmation is recommended before final submission)
- Student Name: TODO
- SUT: EShop
- Workflow: WF01 – Search & Single-item Purchase
- Tool: k6 v2.0.0
- SUT Base URL: `http://127.0.0.1:3000` (disposable local execution)
- Hardware: MSI Thin GF63 12VE; Windows; 12th Gen Intel(R) Core(TM) i5-12450H (2.00 GHz displayed); 16.0 GB RAM at 3200 MT/s; 477 GB storage capacity shown; 6 GB graphics memory

## 2. Workflow Selection and API Analysis

Source analysis and one isolated functional API verification are documented in [WF01 workflow](docs/workflow/WF01_workflow.md) and [WF01 verification](docs/workflow/WF01_verification.md). Human review accepted the backend Cart API scope and disposable runtime strategy for the initial Load test.

## 3. Test Data

A validated synthetic pool of 50 isolated accounts and five search keywords is documented in [test-data/README.md](test-data/README.md). The pool was provisioned into newly created disposable SQLite databases after backend startup for the dry run and full run; the original source database was not modified.

## 4. Load Test

### 4.1 AI-assisted Design

The source-grounded workflow, data allocation, JWT/product/order correlation, assertions, workload candidates, and resource plan are documented in [WF01 Load Test Design](docs/test-design/load_test_design.md).

### 4.2 Human Review

COMPLETED on 2026-08-14. Option A was selected as the final initial Load configuration; Option B remains an unselected future candidate. Detailed decisions are in [AI Test Plan Review](docs/human-review/ai_test_plan_review.md).

### 4.3 Final Test Configuration

Option A: `1 -> 5 VUs`, `2m` ramp-up, `5m` hold, `1m` ramp-down, full seven-request WF01 per iteration, accepted transition think-times, and a `3-6s` inter-iteration pause.

Implemented in `test-plans/load/23127430_Load_20260814.js` using k6. The script preserves the accepted workload exactly.

### 4.4 Execution

COMPLETED on 2026-08-14:

1. Technical dry run: 1 VU / 1 iteration - PASS.
2. Full Option A: 1 to 5 VUs over `2m/5m/1m` - PASS.
3. Execution used an isolated temporary copy of the backend with a new disposable SQLite database because the original database contained existing user data.

### 4.5 Results

| Metric | Result |
|---|---:|
| Completed WF01 iterations | 139 |
| HTTP requests | 973 |
| Checks | 3,197 passed / 0 failed |
| HTTP/functional failure rate | 0% / 0% |
| HTTP average / p90 / p95 / max | 12.51 / 24.34 / 33.01 / 87.28 ms |
| Throughput | 2.0254 requests/s; 0.2893 iterations/s |
| Iteration duration average / p95 | 14.50 / 16.95 s |
| Total CPU average / max | 16.13% / 59.91% |
| Available memory minimum | 3,840 MB |

Both initial thresholds passed. This is a local baseline, not a production capacity claim. Full details: [Load Test Report](results/23127430_Load_20260814_report.md).

## 5. Stress Test

TODO — NOT RUN

## 6. Spike Test

TODO — NOT RUN

## 7. Endurance / Soak Test

TODO — NOT RUN

## 8. AI Result Analysis

Completed in [result analysis](docs/ai-analysis/result_analysis.md). Checkout was the slowest endpoint at 49.28 ms p95, but no defect is claimed without an SLO or higher-load comparison.

## 9. AI Misinterpretation Hunt

TODO

## 10. Optimization Recommendation Review

TODO

## 11. Continuous Performance Testing Proposal

TODO

## 12. Bugs / Performance Issues

No reproducible performance failure was found under Option A. The existing source-level cart/checkout correctness limitations remain documented separately and must not be mislabeled as latency failures.

## 13. Agent Skill

TODO

## 14. Conclusion

TODO

## Appendix A – AI Critique

TODO

## Appendix B – AI Audit Report

TODO
