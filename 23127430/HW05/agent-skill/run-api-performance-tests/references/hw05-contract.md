# HW05 Performance Testing 2.0 Contract

Read this reference for HW05-style work. Treat the repository's assignment file as authoritative when it differs.

## Required method

- Apply AI step by step; do not use one generic black-box prompt.
- Require student Human Review for every AI result and preserve corrections.
- Document work in Markdown and maintain the mandatory AI Audit Report.
- State what AI got wrong or missed, why it happened, and how the student corrected it.
- Preserve genuine raw logs, screenshots, video, and hardware evidence. Missing evidence stays missing.

## System and endpoint coverage

The supplied assignment's default SUT exposes a backend on port `5000` and a frontend on port `5173`; verify actual source and runtime values before use.

Select one end-to-end workflow and reuse it across Load, Stress, and Spike. Across that workflow, cover authentication-heavy, read-heavy, and transactional behavior when available. Typical assignment endpoint groups include:

- Authentication: `POST /api/login`, `POST /api/users`, `GET /api/users`.
- Product browsing: `GET /api/products`, `GET /api/products/{id}`.
- Cart and checkout: `GET /api/cart`, `POST /api/cart`, `POST /api/cart/checkout`, `GET /api/orders`.

Do not assume these routes exist in a different SUT. Source inspection decides.

## Task 1 — Design and execute

- Create data-driven CSV requests.
- Handle the assignment's three-failed-login lockout where it exists.
- Use one unique account per VU for stateful cart and authentication workflows.
- Name canonical plans `{StudentID}_{ScenarioType}_{YYYYMMDD}`.
- Create separate Load, Stress, and Spike plans with realistic ramp-up, think time, assertions, and thresholds.
- Preserve AI Proposal, Human Review corrections, and Reviewed Final plans.
- Run all three scenarios as completely and safely as possible.
- Capture the tool and backend resource use in the same frame for each run.
- Capture a hardware report and spec table.
- Reset and document lockouts between Stress/Spike runs when triggered.
- Preserve three raw JTL files for JMeter or full equivalent k6 raw streams and three HTML report artifacts.
- Use three different primary listener/report perspectives across the scenarios.
- Run an approximately 10–15 minute Endurance/soak test and report an empirical hardware threshold with maximum stable RPS and memory ceiling.
- Record an unlisted YouTube demonstration of at least six minutes in total, with the student's Vietnamese narration.
- Report only genuine reproducible bugs/performance issues on GitHub Issues, with screenshots.

## Task 2 — AI analysis and critique

- Have AI analyze the complete raw results.
- Human-review every conclusion.
- For every AI misinterpretation, cite the correct raw-log value and explain the error.
- Ask AI for optimizations, then classify each as feasible or hallucinated/unsupported with source-based reasoning.
- Include a mandatory 200–300 word critique covering an AI error/bias/omission, why it missed the issue, and the collaboration principle learned.

## Task 3 — Continuous performance testing

Propose a pipeline that:

1. watches SUT commits;
2. classifies whether performance-sensitive code changed;
3. selects and runs an appropriate performance test in an isolated environment;
4. compares p95 against a baseline or reviewed budget;
5. flags regressions and archives raw evidence.

Include a flow chart and discuss cost, test duration, noisy/shared runners, baseline drift, and false alarms.

## Agent Skill deliverable

- Submit the reusable skill.
- Include an end-to-end demonstration video showing the skill used on one complete endpoint group.
- Do not claim a skill demonstration without the genuine video link and repository evidence.

## AI Audit fields

For each genuine interaction record:

1. AI tool name;
2. actual date and time;
3. verbatim user prompt;
4. complete user-visible AI output.

Never include hidden prompts, hidden reasoning, developer/system messages, or fabricated tool output.

## Submission contract

Name the archive:

```text
<StudentID>_HW05_AI_Performance_<SelfAssessedGrade>.zip
```

`SelfAssessedGrade` is a three-digit number from `000` through `100`.

Required contents:

- main report in Markdown and PDF;
- public GitHub repository link;
- three canonical plans and data files;
- three raw JTL files or documented k6 equivalents;
- three HTML report folders/artifacts;
- resource-monitor and hardware screenshots;
- empirical Endurance threshold;
- unlisted YouTube link;
- AI Critique and AI Audit Report in Markdown and PDF;
- Git commit log text;
- bug reports with screenshots, when genuine issues exist;
- README with self-assessment and test summary;
- the Agent Skill and skill demonstration link.

The self-assessment table covers Load (20), Stress (20), Spike (20), AI analysis/misinterpretation hunt (10), continuous-performance proposal (10), and Agent Skill (10), totaling 100.

## Manual authenticity checks

Automation cannot prove these requirements. A human must verify:

- the tool and resource monitor appear together in genuine frames;
- hardware evidence belongs to the execution machine;
- raw logs were not synthesized or edited;
- Human Review is written by the student;
- Vietnamese narration and video duration meet the rule;
- public repository, video, and issue links resolve;
- filenames and hostname identity are consistent with earlier homework.
