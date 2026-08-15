# Documentation Index

This directory separates source-grounded workflow analysis, scenario design, Human Review, result interpretation, and the continuous-testing proposal.

## Workflow and Verification

- [`workflow/WF01_workflow.md`](workflow/WF01_workflow.md): source-backed endpoint sequence, state, and risks.
- [`workflow/WF01_verification.md`](workflow/WF01_verification.md): isolated functional API verification and post-performance resolution.

## Test Design

- [`test-design/load_test_design.md`](test-design/load_test_design.md): accepted Option A Load design and result traceability.
- [`test-design/stress_test_design.md`](test-design/stress_test_design.md): completed 5–50 VU staircase.
- [`test-design/spike_test_design.md`](test-design/spike_test_design.md): completed bounded 1–25 VU burst and recovery.
- [`test-design/endurance_test_design.md`](test-design/endurance_test_design.md): completed 20-VU, 12-minute hold and empirical threshold.

## Review and Analysis

- [`human-review/ai_test_plan_review.md`](human-review/ai_test_plan_review.md): AI proposal corrections and final student review.
- [`ai-analysis/result_analysis.md`](ai-analysis/result_analysis.md): raw-value verification, misinterpretation hunt, and optimization classification.
- [`continuous-performance/continuous_performance_testing.md`](continuous-performance/continuous_performance_testing.md): risk-based CI proposal, flow chart, baseline rule, and trade-offs.
- [`bug-reports/bug_report.md`](bug-reports/bug_report.md): confirmed cart/checkout functional defects and reproduction steps.
- [`bug-reports/README.md`](bug-reports/README.md): issue index and reporting rule.

The main narrative is [`../main_report.md`](../main_report.md). Raw metrics and generated views remain under `../results/`; genuine screenshots remain under `../evidence/`.
