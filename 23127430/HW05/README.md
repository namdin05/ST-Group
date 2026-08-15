# HW05 — Performance Testing

## Student and Repository

- **Student:** Đinh Hoàng Nam
- **Student ID:** 23127430
- **SUT:** EShop REST backend
- **Workflow:** WF01 — Search & Single-item Purchase
- **Tool:** k6 v2.0.0
- **Repository:** [namdin05/ST-Group — 23127430-HW05](https://github.com/namdin05/ST-Group/tree/23127430-HW05/23127430/HW05)
- **Main report:** [main_report.md](main_report.md)

## Reviewed Outcome

The student completed Human Review on 2026-08-15 and confirmed that the Load, Stress, and Spike results met expectations and showed no abnormal behavior. Endurance was authorized afterward, passed every machine-evaluated guardrail, and is ready for the student's final evidence review. All measured checks passed with zero HTTP and functional failures.

| Scenario | Status | Max VUs | Iterations | Requests | p95 | Throughput | Error rate |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Load | PASS | 5 | 139 | 973 | 33.01 ms | 2.0254 req/s | 0% |
| Stress | PASS within 50-account cap | 50 | 613 | 4,291 | 25.10 ms | 12.4393 req/s | 0% |
| Spike | PASS | 25 | 130 | 910 | 30.22 ms | 6.3095 req/s | 0% |
| Endurance | PASS | 20 | 1,081 | 7,567 | 19.49 ms | 8.9541 req/s | 0% |

Combined completed results: **1,963 iterations, 13,741 HTTP requests, 45,149 passed checks, 0 failed checks, 0% HTTP failures, and 0% functional failures**.

## Endpoint Groups

- **Auth-heavy:** `POST /api/login`.
- **Read-heavy:** product Search and Product Detail.
- **Transactional:** Add to Cart, Cart read-back, Checkout, and Order read-back.

Every scenario uses the same seven-request end-to-end sequence with JWT/product/order correlation, synthetic CSV input, and one unique account per VU.

## Endurance Threshold

**Determined for the executed local profile.** During the exact 12-minute 20-VU hold, WF01 sustained **9.5931 requests/s**, p95 was **19.34 ms**, HTTP and functional failures were **0%**, and all **22,687** hold checks passed. The observed backend working-set ceiling was **58.54 MB**, the k6 ceiling was **50.07 MB**, and host available memory never fell below **5,354 MB**.

This is a verified lower bound for this hardware/profile, not maximum SUT capacity. The full design, resource trend, and limitations are in [docs/test-design/endurance_test_design.md](docs/test-design/endurance_test_design.md) and the [Endurance report](results/23127430_Endurance_20260815_report.md).

## Bugs and Performance Issues

No reproducible performance failure, crash, HTTP error, failed k6 check, or violated stakeholder SLO was found. No GitHub performance issue was created.

A traceability review nevertheless confirmed three functional defects in Cart/Checkout: duplicate rows for repeated products, a client-controlled persisted total, and a cart that is not cleared after successful checkout. See the [local bug report](docs/bug-reports/bug_report.md). These are kept distinct from the passing performance results because the current scripts do not assert those negative/state-transition cases.

## Demo Video

**Not recorded/uploaded.** The final submission still needs an unlisted YouTube video of at least six minutes with the student's Vietnamese narration, k6 and the resource monitor in the same frame, and an end-to-end demonstration of `$run-api-performance-tests`. See [video/README.md](video/README.md).

## Repository Structure

```text
HW05/
├── main_report.md                 Complete narrative and appendices
├── docs/                          Workflow, design, review, analysis, CI proposal
├── test-data/                     Synthetic users and product keywords
├── test-plans/                    Canonical k6 Load/Stress/Spike/Endurance plans
├── results/                       Canonical raw, summary, console, HTML, reports
│   ├── evidence-rerun/            Timestamped artifacts tied to screenshots
│   └── views/                     Distinct k6 analytical-view mapping
├── evidence/
│   ├── hardware/                  System About, dxdiag, resource CSV
│   └── screenshots/               Four scenario evidence indexes
├── ai-critique/                   200–300 word critique
├── ai-audit/                      Verbatim AI interaction log
├── agent-skill/                   Reusable performance-testing skill
├── git/                           Exported committed history
└── video/                         Genuine video requirement/status
```

Start with [docs/README.md](docs/README.md), [results/README.md](results/README.md), and [evidence/screenshots/README.md](evidence/screenshots/README.md).

## Key Artifacts

| Scenario | Plan | Report | Raw / HTML / screenshots |
| --- | --- | --- | --- |
| Load | [k6 plan](test-plans/load/23127430_Load_20260814.js) | [Run report](results/23127430_Load_20260814_report.md) | [Results index](results/README.md), [evidence](evidence/screenshots/load-rerun-20260814_165405/README.md) |
| Stress | [k6 plan](test-plans/stress/23127430_Stress_20260815.js) | [Run report](results/23127430_Stress_20260815_report.md) | [Results index](results/README.md), [evidence](evidence/screenshots/stress-rerun-20260815_173830/README.md) |
| Spike | [k6 plan](test-plans/spike/23127430_Spike_20260815.js) | [Run report](results/23127430_Spike_20260815_report.md) | [Results index](results/README.md), [evidence](evidence/screenshots/spike-rerun-20260815_170949/README.md) |
| Endurance | [k6 plan](test-plans/endurance/23127430_Endurance_20260815.js) | [Run report](results/23127430_Endurance_20260815_report.md) | [Results index](results/README.md), [evidence](evidence/screenshots/endurance-rerun-20260815_190424/README.md) |

## Self-Assessment

| No. | Criterion | Maximum | Self-assessed |
| ---: | --- | ---: | ---: |
| 1 | Task 1 — Load testing | 20 | 20 |
| 2 | Task 1 — Stress testing | 20 | 20 |
| 3 | Task 1 — Spike testing | 20 | 20 |
| 4 | Task 2 — AI analysis and misinterpretation hunt | 10 | 10 |
| 5 | Task 3 — Continuous Performance Testing proposal | 10 | 10 |
| 6 | Agent Skill | 10 | 10 |
|  | **Total printed in assignment** | **100** | **90** |

The assignment's six listed criterion rows sum to 90 although its printed total says 100. All six listed rows are self-assessed at their stated maximum, so the provisional archive grade is `090`, yielding `23127430_HW05_AI_Performance_090.zip`. Missing video, PDFs, and complete audit coverage remain submission risks and may affect the instructor's final grade.

## Submission Readiness

- [x] Main report Markdown.
- [x] Public repository URL configured from the Git remote/branch; verify anonymous access before submission.
- [x] Canonical Load, Stress, Spike, and Endurance k6 plans.
- [x] Four full raw k6 metric streams, summaries, console logs, and HTML exports.
- [x] Resource-monitor and hardware screenshots.
- [x] AI analysis, misinterpretation corrections, optimization review, and 200–300 word critique.
- [x] Continuous-performance flow chart and trade-offs.
- [x] Reusable Agent Skill.
- [x] Git commit log exported for currently committed history.
- [x] Endurance execution and empirical RPS/memory threshold.
- [ ] Unlisted YouTube demonstration and Agent Skill demo link.
- [ ] Main-report, AI-Critique, and AI-Audit PDFs.
- [ ] Complete AI Audit coverage for later interactions.
- [ ] Final logical commits and refreshed Git log.

## Validation

Run the repository-local completeness checker from the HW05 directory:

```powershell
python agent-skill/run-api-performance-tests/scripts/validate_hw05_artifacts.py --root . --student-id 23127430
```

The validator checks file completeness; it cannot prove Human Review authorship, video narration, screenshot authenticity, report-view interpretation, or the correctness of conclusions.
