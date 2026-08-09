---
name: eshop-playwright-automation
description: Build, review, run, and maintain data-driven Playwright automation for EShop web features. Use when converting FR/EC/BVA test cases into TypeScript specs, preparing Chromium/Firefox/WebKit runs, generating per-feature HTML reports with StudentID metadata, diagnosing flaky selectors or state isolation, and auditing HW04 submission evidence.
---

# EShop Playwright Automation

## Workflow

1. Read `Requirement.md`, the selected `FR-*.md`, and `e-shop.md`. Treat the requirement as the test oracle.
2. Count test cases. Require at least 12 per feature and preserve EC/BVA traceability.
3. Store data in external JSON/CSV. Follow `references/test-data-schema.md`.
4. Inspect the live UI before finalizing locators. Prefer role, label, placeholder, and visible text.
5. Create one spec per feature and shared Page Objects/fixtures. Isolate state with unique test data and cleanup in `finally`.
6. Use at least three assertion patterns per feature: UI/DOM, navigation or response, and persistent hậu điều kiện.
7. Store browser names and Playwright device profiles in `execution-matrix.json`; build config projects from that JSON.
8. Run `npx playwright test --list` before browser execution. Confirm the expected count.
9. Run each feature/browser separately with Playwright CLI and an explicit HTML output directory. Do not require a custom runner.
10. Add `Run by: <StudentID>` and an ISO timestamp through config metadata plus visible suite title/annotations.

## Review Rules

- Never change expected results to match a defect.
- Do not replace waits with arbitrary long sleeps; wait for observable UI/network state. Use real sleeps only for specified time boundaries.
- Distinguish test defect, environment limitation, ambiguous specification and SUT defect.
- Re-run one failing case after a test-code fix before re-running the complete feature.
- Do not fabricate GitHub Issues, videos, execution reports, timestamps, commits or screenshots.

## Completion Gate

- At least 12 external data rows and discovered tests per feature.
- Three browser projects and one independent HTML report per feature/browser.
- Report metadata and test annotations contain StudentID and ISO timestamp.
- Summary counts reconcile with JSON reporter results.
- Genuine assertion failures remain visible in the HTML report; bug evidence may be maintained separately by the student.
- README, main report, AI Audit, AI Critique, bug report and commit log are present.

Read `references/test-data-schema.md` when creating or validating test and browser data.
