---
name: agent-skill
description: Generate or review data-driven Playwright TypeScript automation for approved HW04 web features, validate selectors, assertions, synchronization, and test data, run explicitly requested multi-browser executions, classify real failures, and produce only evidence-backed reports. Use for HW04 automation generation, review, execution, maintenance, and failure analysis.
---

# HW04 Playwright Automation Skill

## 1. Name

HW04 Playwright Automation Reviewer

## 2. Description

Convert reviewed feature test cases into maintainable Playwright TypeScript automation, or review existing automation, while preserving evidence integrity and requiring human confirmation before reporting a SUT bug.

## 3. Inputs

- Read the approved feature specification.
- Read only the selected test cases for the requested feature.
- Read the feature's separate JSON or CSV test data file.
- Accept environment details, URLs, and authentication material only when the user provides or authorizes them.
- Accept the requested browser scope and output report directory.

## 4. Preconditions

- Confirm that the feature, test cases, and expected results have been human-reviewed.
- Confirm that the SUT and required test environment are available before execution.
- Keep secrets and personal data outside the repository.
- Do not run tests or change evidence unless the user explicitly requests that step.

## 5. Workflow

1. Read the feature specification and selected test cases.
2. Map each automated case to external test data.
3. Generate or review the Playwright script.
4. Review selectors, assertions, synchronization, and test isolation.
5. Request human review of material assumptions or ambiguous requirements.
6. Run only the user-requested browser scope.
7. Generate reports only from the completed real execution.
8. Classify failures before proposing a bug report.

## 6. Data-driven Testing Rules

- Keep each feature's data in its own JSON or CSV file.
- Do not place the full data set in a `.spec.ts` array or object.
- Do not share mutable data that creates ordering dependencies between features.
- Do not store real passwords, tokens, credentials, or personal data.
- Do not invent expected results or unreviewed input data.

## 7. Selector Review Rules

- Prefer role, label, placeholder, test ID, or stable semantic selectors.
- Check selectors against the real rendered application before accepting them.
- Reject selectors based on fragile DOM depth, generated classes, or guessed text.
- Record selector assumptions for human review when stable semantics are unavailable.

## 8. Assertion Review Rules

- Tie every assertion to a specific business outcome in the reviewed test case.
- Use multiple assertion patterns only where they add meaningful coverage.
- Reject missing, weak, tautological, or unverified assertions.
- Do not weaken expected results to make a test pass.

## 9. Synchronization and Wait Rules

- Use Playwright auto-waiting and state-based waits.
- Detect and remove hardcoded time delays unless a reviewed requirement makes one necessary.
- Wait for observable UI, navigation, response, or application state.
- Treat timing failures as unclassified until synchronization and environment causes are reviewed.

## 10. Multi-browser Execution Rules

- Run Chromium, Firefox, and WebKit only when the user requests execution.
- Keep each feature-browser report in its designated directory.
- Use the execution-time ISO timestamp; never reuse or fabricate a timestamp.
- Ensure the real HTML report visibly identifies `Run by: 23127430`.

## 11. Human Review Rules

- Require a person to review generated scripts, selectors, assertions, test data, and expected results.
- Record only genuine AI problems, human revisions, and retest results.
- Escalate ambiguous specification behavior instead of silently choosing an expected result.

## 12. Failure Classification

Classify each investigated failure as exactly one primary category:

- SUT bug.
- Automation script bug.
- Test data issue.
- Authentication issue.
- Environment issue.
- Browser-specific issue.

Keep the failure unconfirmed when evidence is insufficient.

## 13. Bug Reporting Rules

- Require a failed assertion, reproducible behavior, and human confirmation before concluding that a SUT bug exists.
- Include the related feature and test case, preconditions, reproduction steps, expected and actual results, environment, severity, a real screenshot, and a real GitHub Issue link.
- Do not classify selector, data, authentication, environment, network, ordering, or script problems as SUT bugs.

## 14. Required Outputs

- Produce reviewed Playwright TypeScript only for selected cases.
- Produce separate reviewed test data.
- Produce real multi-browser HTML reports only after execution.
- Produce failure classifications and bug evidence only after investigation.
- Update the main report with complete, truthful automation records when requested.

## 15. Safety and Anti-fabrication Rules

- Never fabricate executions, PASS or FAIL results, reports, screenshots, traces, videos, timestamps, bugs, GitHub Issues, Git history, URLs, selectors, endpoints, credentials, prompts, or AI outputs.
- Never modify the SUT or source test cases to force a passing result.
- Never use credentials found in documents without explicit user authorization.
- Stop and request human direction when evidence or authorization is missing.
