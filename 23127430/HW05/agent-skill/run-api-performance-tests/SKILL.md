---
name: run-api-performance-tests
description: Design, review, safely execute, analyze, and document evidence-based API performance tests with k6 or JMeter. Use when a repository needs Load, Stress, Spike, or Endurance scenarios; data-driven authenticated workflows; genuine raw logs and resource evidence; AI-assisted metric analysis and critique; an HW05-style report, continuous-performance proposal, audit trail, or submission validation.
---

# Run API Performance Tests

Apply a reusable, review-gated performance-testing workflow to an authorized API. Keep every claim traceable to source code, a test plan, a raw result, or genuine execution evidence.

## Choose the Operating Mode

Infer the narrowest mode that satisfies the request, then state it:

- **Full workflow:** inspect, design, review, implement, dry-run, execute, analyze, and document.
- **Design:** inspect the SUT and produce scenario/test-data proposals only.
- **Execute:** run an already reviewed plan and collect genuine artifacts.
- **Analyze:** read existing raw results and produce evidence-cited findings.
- **Audit:** inspect an existing performance-testing submission without running the SUT.

Do not broaden an analysis or audit request into test execution. Continue from trustworthy existing artifacts instead of recreating completed work.

## Enforce Non-Negotiable Rules

- Target only a system the user is authorized to test. Prefer a local or isolated test environment and a disposable database.
- Never target production, shared infrastructure, or an unknown URL. Resolve the effective base URL and database before running traffic.
- Never fabricate executions, human approval, raw logs, screenshots, hardware data, bugs, issue links, commits, video links, or PASS/FAIL results. Mark missing work `TODO — NOT RUN`.
- Separate **AI Proposal**, **Human Review**, and **Reviewed Final** content. Do not claim Human Review until the user explicitly approves or corrects the proposal.
- Preserve user changes and historical evidence. Put reruns in timestamped directories; do not overwrite the canonical run without explicit approval.
- Use synthetic accounts and data. Do not place real credentials, tokens, or personal data in plans, CSV files, screenshots, logs, or audit records.
- Do not install software, reset shared data, commit, push, publish a GitHub issue, upload a video, or submit an archive without the corresponding user authorization.
- Treat a threshold failure as a valid test result, not as permission to conceal or rerun it. Record the process exit code and threshold output.

## Locate Repository Rules and Audit Logging

1. Find the repository root with version-control metadata or the nearest assignment file.
2. Read local instructions and the assignment before changing artifacts.
3. For an HW05 task, read [references/hw05-contract.md](references/hw05-contract.md) completely.
4. Look for an audit logger at `<repo>/audit-skill/SKILL.md`. Read it fully and follow it when it applies. Resolve its output path from the actual repository root instead of copying an old homework-relative path.
5. If no audit logger exists but the assignment requires an audit, preserve the real tool name, current ISO-8601 timestamp with timezone, verbatim user prompt, and complete user-visible AI output in the repository's declared audit file. Never record hidden instructions, reasoning, or tool output.

Finish the task response before finalizing an audit entry so the stored visible output is complete. If a credential appears in content that must be recorded verbatim, pause for the user's handling decision.

## Phase 1 — Establish the Test Context

Inspect before proposing traffic:

1. Inventory source, start commands, routes, authentication, database, existing tests, test data, results, evidence, and documentation. Prefer `rg` or an equivalent fast search.
2. Trace the selected endpoint group through route, controller/service, persistence, and validation code. Record exact methods, paths, request bodies, expected status codes, and state transitions.
3. Record the source commit or working-tree state, effective base URL, environment, database copy, performance-tool version, date, student/tester ID, and hardware/evidence gaps.
4. Reconstruct the same end-to-end workflow for all scenarios. Include authentication-heavy, read-heavy, and transactional operations when the SUT supports them.
5. Identify destructive actions, rate limits, three-failure lockouts, cleanup requirements, irreversible state, and safety abort conditions.

Do not infer an endpoint solely from a README when source code is available. Report ambiguity instead of guessing.

## Phase 2 — Design Data and Scenarios

Read [references/scenario-evidence-guide.md](references/scenario-evidence-guide.md) before creating or modifying plans.

### Design data first

- Use CSV-backed synthetic data for data-driven requests.
- Allocate at least one unique stateful account per concurrent VU unless the workflow proves shared access is safe.
- Keep maximum VUs within the number of valid accounts, or provision more accounts before execution.
- Keep credentials and reset/cleanup data isolated from the source database.
- Document account-lockout reset and verify it between Stress/Spike runs when applicable.

### Design four profiles

- **Load:** expected sustained concurrency or arrival rate with realistic pacing.
- **Stress:** monotonic stages that expose a limit or reach a documented safety/data cap.
- **Spike:** stable baseline, abrupt peak, and an observable recovery window.
- **Endurance:** about 10–15 minutes at a reviewed sustained level to estimate maximum stable RPS and memory ceiling on the test hardware.

Base VUs, arrival rates, ramp durations, think time, and thresholds on baseline measurements, account capacity, hardware, and stakeholder objectives. When no SLO exists, label proposed thresholds **provisional** and explain the rationale; do not present them as stakeholder requirements.

Include functional checks for status, authentication, and critical response/state semantics. Separate functional failures, HTTP transport failures, threshold failures, and test-data exhaustion.

Use exact canonical plan names:

```text
{StudentID}_{Load|Stress|Spike}_{YYYYMMDD}.js   # k6
{StudentID}_{Load|Stress|Spike}_{YYYYMMDD}.jmx  # JMeter
```

Timestamp rerun results, not the canonical plan name.

## Phase 3 — Require Human Review

Present a compact review packet containing:

- selected workflow and exact endpoints;
- data allocation and maximum safe concurrency;
- stage profile, pacing, assertions, thresholds, and their rationale;
- target/database isolation, abort conditions, lockout reset, and cleanup;
- expected artifacts, screenshot moments, and report-view mapping;
- known uncertainties and AI assumptions.

Ask the user to approve or correct the packet. Record their concrete changes in the design document under `Human Review`; explain what the AI got wrong or missed and why. Stop before implementation or execution when approval would materially change traffic, data mutation, or safety.

An earlier documented approval may be reused only when the source, target, data, plan, and constraints still match.

## Phase 4 — Implement and Dry-Run

Respect the user's selected tool. If unspecified, inspect availability and explain the k6/JMeter choice without installing either tool.

1. Implement reusable workflow helpers and scenario-specific executors.
2. Keep environment-dependent values configurable: base URL, data path, credentials source, output paths, and reviewed profile overrides.
3. Add checks and thresholds that map to the review packet.
4. Syntax-check the plan and run the smallest useful smoke/dry-run against the isolated target.
5. Verify account mapping, request bodies, expected state transitions, and cleanup.
6. Fix plan defects; do not tune the SUT merely to make a threshold pass unless optimization was separately requested and reviewed.

For k6, preserve both the raw JSON stream (`--out json=...`) and summary JSON (`--summary-export=...`) when possible. For JMeter, execute non-GUI mode and preserve the raw JTL. Always preserve the console log and exit code.

## Phase 5 — Execute and Capture Evidence

Execute one scenario at a time. Before each full run, verify target URL, test database, account count, resource-monitor visibility, free disk space, and output destinations.

During the run:

- capture genuine tool progress and backend CPU/memory/resource use in the same frame at meaningful phases;
- capture hardware evidence and a text spec table;
- preserve raw results unchanged and generate an HTML report artifact;
- record timestamps, exact command, environment overrides, plan hash, source revision, and exit code;
- capture baseline, peak/limit, and recovery points appropriate to the scenario;
- stop on the reviewed safety condition or unexpected destructive behavior.

After the run, reset lockouts when required, clean only generated test data, and verify that protected/source data remains unchanged. State whether cleanup is recoverable. Keep dry-runs and reruns distinguishable from final runs.

For an HW05 submission, map Load, Stress, and Spike to three distinct primary report perspectives. With k6, use distinct dashboard panels or derived views and document their equivalence to listener views; do not rename three copies of the same view. See [references/scenario-evidence-guide.md](references/scenario-evidence-guide.md).

## Phase 6 — Analyze Without Guessing

Read [references/analysis-reporting-guide.md](references/analysis-reporting-guide.md) before analyzing or writing conclusions.

Use the bundled extractor for an independent first pass:

```powershell
python scripts/summarize_performance_results.py <raw-or-summary-file> --output-format markdown
```

Resolve `scripts/` relative to this skill directory when installed elsewhere. Prefer k6 summary JSON for exact k6 aggregate percentiles; use raw streams for phase/time-series analysis. Treat values computed from samples as derived estimates and label them.

For every important claim, cite the artifact path and exact metric/key, row/column, or time range. Cross-check at least:

- request count versus iteration count;
- HTTP failure rate versus failed functional checks;
- average versus median and p90/p95/p99;
- aggregate results versus stage/peak/recovery behavior;
- client-side latency versus backend resource evidence;
- threshold verdict versus process exit code;
- incomplete runs or data caps versus an actual SUT breaking point.

Keep the AI analysis as a proposal. In the human correction section, quote the correct raw value and explain each misread. Classify optimizations as `Feasible`, `Unsupported/Hallucinated`, or `Needs experiment` only after checking the source and environment.

## Phase 7 — Complete the Report Package

Update existing repository documents rather than inventing a parallel structure. A complete HW05-style package includes:

- design and Human Review records;
- test data and canonical Load/Stress/Spike plans;
- genuine raw results, console logs, HTML artifacts, screenshots, and hardware specs;
- scenario reports and an empirical Endurance threshold with concrete RPS/memory numbers;
- AI analysis, misinterpretation corrections, recommendation classification, and a 200–300 word AI critique;
- a continuous-performance proposal with a flow chart and cost/false-alarm trade-offs;
- AI Audit Report, Git commit log, public-repository link, and unlisted demo-video link;
- a README test summary and self-assessment table.

If an external artifact is unavailable, leave a clear TODO. Create a GitHub issue only for a genuine reproducible issue and only with authorization. Create a commit at each logical step only when the user has authorized commits.

Run the deterministic completeness checker near handoff:

```powershell
python scripts/validate_hw05_artifacts.py --root <repository-root>
```

Treat its result as a checklist, not proof that screenshots, narration, Human Review, or conclusions are genuine. Manually inspect those items.

## Phase 8 — Handoff Clearly

Lead with what is complete and the scenario verdicts supported by evidence. Then list:

- created or changed artifact paths;
- commands/tests actually run and their exit status;
- measured values with source paths;
- safety/cleanup outcome;
- missing evidence, pending Human Review, and external actions still required.

Never call the workflow complete while a required run, Endurance threshold, audit, critique, video, or evidence item remains a placeholder.
