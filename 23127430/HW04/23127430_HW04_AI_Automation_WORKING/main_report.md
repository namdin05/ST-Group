# HW04 – AI Automation Testing Main Report

## 1. General Information

- **Student ID:** 23127430
- **Student name:** Đinh Hoàng Nam
- **Assignment:** HW04 – AI Automation Testing

## 2. AI Use Declaration

I use AI tools for the following tasks:

- Review human-approved feature test cases and external test data.
- Generate and self-review data-driven Playwright TypeScript automation.
- Inspect rendered selectors, execute multi-browser tests, analyze evidence, and generate reports.
- Preserve genuine AI interactions in the audit report.

## 3. Selected Features

| Pool | Feature ID | Feature name |
| ---- | ---------- | ------------ |
| A | FR-01 | Account Registration |
| B | FR-07 | Shopping Cart |
| C | FR-13 | Dashboard |

## 4. Test Environment and Tools

| Item | Value |
| ---- | ----- |
| Automation framework | Playwright + TypeScript |
| Reporting tool | Playwright HTML Reporter |
| Browsers | Chromium, Firefox, WebKit |
| SUT environment | Local web `http://localhost:5173`; API `http://localhost:3000` |
| Execution environment | Windows / PowerShell; execution date 2026-08-10 (Asia/Saigon) |

## 5. Automation Approach

Each feature reads reviewed input and expected results from a dedicated JSON file. UI tests prefer semantic Playwright locators and use state-based synchronization. FR-07 UI tests control only the product API response with reviewed fixtures so that price/quantity preconditions are deterministic; cart behavior itself runs in the real React application. API tests create a unique user per browser/test run to avoid ordering dependencies.

## 6. FR-01 Automation Report

### 6.1 Feature Overview

- **Feature ID:** FR-01
- **Feature name:** Account Registration

### 6.2 Test Cases Selected for Automation

All 18 reviewed cases in `automation/test-cases/fr01.md` were automated: UI cases `TC001`–`TC008`, API cases `TC009`–`TC017`, and UI + API security case `TC018`.

Coverage is not complete against the feature specification, however: FR-01 requires the password and confirmation password to match, but the selected case set contains no mismatch case.

### 6.3 Test Data File

`automation/test-data/fr01-registration.json`

### 6.4 Automation Script

`automation/tests/fr01-registration.spec.ts`

### 6.5 Assertions Used

Assertions cover required-field behavior, native email semantics, password validation messages, registration/login URL transitions, API status classes and response keys, inability to log in after rejected registration, preservation of the original duplicate account, forced-role handling, and inert rendering of script-like input. Playwright auto-waiting and state-based assertions are used; the script contains no fixed sleeps.

### 6.6 Browser Execution Results

| Browser | PASS | FAIL | Total | HTML report |
| ------- | ---: | ---: | ---: | ----------- |
| Chromium | 7 | 11 | 18 | `html-reports/fr01/chromium/index.html` |
| Firefox | 7 | 11 | 18 | `html-reports/fr01/firefox/index.html` |
| WebKit | 7 | 11 | 18 | `html-reports/fr01/webkit/index.html` |
| **Total** | **21** | **33** | **54** |  |

PASS on all browsers: `TC002`, `TC004`, `TC006`, `TC008`, `TC009`, `TC015`, `TC017`.

FAIL on all browsers: `TC001`, `TC003`, `TC005`, `TC007`, `TC010`–`TC014`, `TC016`, `TC018`.

The three feature-browser reports above are the canonical FR-01 results. The consolidated diagnostic report at `html-reports/fr01/review-20260809-v2/index.html` shows 20 PASS / 34 FAIL because a 15-second diagnostic timeout and three parallel workers caused an additional Firefox timeout in `TC002`. The focused rerun at `html-reports/fr01/review-20260809-tc002-firefox/index.html` passed, so the diagnostic timeout is excluded from the primary totals.

### 6.7 AI-generated Problems Found

Review found the following automation and data-contract problems:

1. `TC018` data permits either rejection or escaped-text handling, but the script first requires registration status `200`/`201`. A conforming 4xx rejection would therefore be reported as a false failure.
2. API test data declares `request.method`, but the helper always sends `POST`; this is currently harmless because every FR-01 API case uses POST, but the data-driven contract is misleading.
3. `TC011` and `TC012` assert only the 4xx status and do not independently prove the expected “no account created” postcondition. Other negative cases use a login check, but that helper hard-codes `401` instead of accepting the contractually relevant 4xx outcome.
4. `TC007` cannot reach its duplicate-email assertion because the UI incorrectly rejects the otherwise valid password first. Its current failure is inconclusive for the intended duplicate-email behavior.
5. `TC016` proves that the duplicate request returns the wrong status and that the original account remains usable, but it does not independently query storage to prove that no second record was created.

### 6.8 Human Revisions

The source cases are marked `Reviewed`/`Revised`, but the abnormalities identified in this review have not yet been human-approved or corrected. No new human revision is claimed.

### 6.9 Genuine SUT Bugs, if any

No genuine SUT bug has been human-confirmed yet. Ten failing cases provide reproducible **SUT bug candidates (unconfirmed)** on all three browsers:

- `TC001` and `TC005`: the confirmation-password field is absent, and valid strong passwords containing an allowed special character are rejected by the UI.
- `TC003`: the email control uses `type="text"`, and no invalid-email message is shown.
- `TC010`: the API accepts a missing name and creates a login-capable account.
- `TC011` and `TC012`: the API returns `200` for missing email or missing password instead of a 4xx client error.
- `TC013`: the API accepts an invalid email and creates a login-capable account.
- `TC014`: the API accepts a seven-character password and creates a login-capable account.
- `TC016`: the API returns `200` for a duplicate email.
- `TC018`: a script-like name is accepted and rendered in the header as a `<script>` element rather than inert text.

`TC007` is not counted as a duplicate-email SUT candidate because the upstream password-validation failure prevents that behavior from being exercised. Human confirmation is still required before any candidate is reported as a genuine defect.

### 6.10 Limitations, if any

- The FR-01 specification explicitly requires confirmation-password matching, while the note in `fr01.md` says confirmation is not required and `TC006` replaced the mismatch case. This is a requirement/test-case contradiction and a real coverage gap.
- Status and Actual Result fields in `fr01.md` are stale relative to the canonical reports: several cases remain `PAUSED`, while `TC018` is marked `PASSED` although it fails on all three browsers.
- The rendered registration inputs have no accessible name, id, or placeholder, so the page object uses form-scoped positional selectors (`nth(0)`/`nth(1)`); these are brittle if field order changes.
- Unique run IDs isolate parallel tests and duplicate fixtures, but the SUT has no cleanup API, so generated accounts remain in the database.
- `TC008` is exploratory: PASS means the page remained responsive and did not insert a form script; it does not prove an unspecified maximum length or mandatory rejection policy.
- `TC017` assumes that ignoring the submitted role and creating a normal user is the only acceptable path. The specification does not clarify whether rejecting the unexpected role with 4xx should also pass.
- SEC-01 plaintext-password storage is not verified by this FR-01 suite.

## 7. FR-07 Automation Report

### 7.1 Feature Overview

- **Feature ID:** FR-07
- **Feature name:** Shopping Cart

### 7.2 Test Cases Selected for Automation

All 14 reviewed cases in `automation/test-cases/fr07.md` were automated: UI cases `TC001`–`TC010` and API cases `TC011`–`TC014`.

### 7.3 Test Data File

`automation/test-data/fr07-shopping-cart.json`

### 7.4 Automation Script

`automation/tests/fr07-shopping-cart.spec.ts`

### 7.5 Assertions Used

Assertions cover semantic table columns, empty-state content and illustration, row count, quantity boundaries, line/grand-total arithmetic, exact total and navigation labels, confirmation-dialog branches, URL transitions, API status/body shape, duplicate merge behavior, and unchanged cart state after invalid quantities.

### 7.6 Browser Execution Results

| Browser | PASS | FAIL | Total | HTML report |
| ------- | ---: | ---: | ---: | ----------- |
| Chromium | 3 | 11 | 14 | `html-reports/fr07/chromium/index.html` |
| Firefox | 3 | 11 | 14 | `html-reports/fr07/firefox/index.html` |
| WebKit | 3 | 11 | 14 | `html-reports/fr07/webkit/index.html` |
| **Total** | **9** | **33** | **42** |  |

PASS on all browsers: `TC006`, `TC011`, `TC013`.

FAIL on all browsers: `TC001`–`TC005`, `TC007`–`TC010`, `TC012`, `TC014`.

The full Firefox run had a one-time page crash during TC008 setup. A focused Firefox rerun completed normally and reproduced the expected failed assertions (missing confirmation dialog and immediate removal). The rerun is stored at `html-reports/fr07/firefox-tc008-rerun/index.html`.

### 7.7 AI-generated Problems Found

Two genuine automation problems were found during the first validation runs:

1. The add-to-cart locator used the fixed accessible name `Thêm vào giỏ hàng`; it stopped resolving after the button changed to `Đã thêm`.
2. Setup used `page.goto()` between product/cart routes, which reloaded the React application and reset the in-memory `CartProvider` state.

Both invalid runs were excluded. The locator now accepts both observable button states, and setup navigates through real SPA links to preserve cart state. TypeScript compilation passed after revision.

### 7.8 Human Revisions

Pending human review. The two problems above were AI self-review corrections before the final recorded execution; no human revision is claimed.

### 7.9 Genuine SUT Bugs, if any

No genuine SUT bug has been human-confirmed yet. The final runs produced 11 reproducible **SUT bug candidates (unconfirmed)**:

- `TC001`: header is `Giá`, not required `Đơn giá`.
- `TC002`: empty cart has no illustration.
- `TC003` and `TC012`: duplicate products create two lines instead of merging quantities.
- `TC004` and `TC005`: cart rows have no `+`/`-` quantity controls.
- `TC007`: label is `Tổng tạm tính`, not `Tổng cộng`.
- `TC008` and `TC009`: remove action has no confirmation dialog; cancel branch cannot be performed.
- `TC010`: non-empty cart uses `← Mua tiếp`, not `Tiếp tục mua sắm`.
- `TC014`: API returns `200`, stores quantity `0`/`-1`, and changes the cart.

### 7.10 Limitations, if any

- The prompt says FR-01 once, but every supplied artifact and the execution request identify FR-07; automation follows FR-07.
- Reviewed product prices differ from the current SUT database. UI tests mock only `/api/products*` with the reviewed JSON fixtures; this must be approved as the intended deterministic precondition strategy.
- The product quantity input lacks an associated accessible label, so one scoped `input[type="number"]` fallback is documented in the script.
- The SUT provides no test cleanup API. Unique test users prevent cross-test collisions but remain in the SQLite database.
- TC011 verifies authenticated `200` plus array shape for a fresh isolated user; an empty array alone cannot independently prove ownership semantics.

## 8. FR-13 Automation Report

### 8.1 Feature Overview

- **Feature ID:** FR-13
- **Feature name:** Dashboard

### 8.2 Test Cases Selected for Automation

TBD

### 8.3 Test Data File

`automation/test-data/fr13-dashboard.json`

### 8.4 Automation Script

`automation/tests/fr13-dashboard.spec.ts`

### 8.5 Assertions Used

TBD

### 8.6 Browser Execution Results

| Browser | Result |
| ------- | ------ |
| Chromium | NOT RUN |
| Firefox | NOT RUN |
| WebKit | NOT RUN |

### 8.7 AI-generated Problems Found

TBD

### 8.8 Human Revisions

TBD

### 8.9 Genuine SUT Bugs, if any

TBD – Only confirmed SUT defects will be reported here.

### 8.10 Limitations, if any

TBD

## 9. Data-driven Testing

Each selected feature will read reviewed test data from its own JSON file. Credentials, tokens, personal data, and unreviewed expected results must not be stored in these files.

Status: implemented for FR-01 and FR-07; FR-13 remains pending.

## 10. Assertion Patterns

- Exact status and URL assertions.
- Semantic visibility/count/text/attribute assertions.
- Numeric money assertions after removing display separators.
- Soft assertions where multiple independent contract violations should be captured in one report.
- Deep equality for unchanged API cart state.

## 11. Multi-browser Execution

| Feature | Chromium | Firefox | WebKit |
| ------- | -------- | ------- | ------ |
| FR-01 | 7 PASS / 11 FAIL | 7 PASS / 11 FAIL | 7 PASS / 11 FAIL |
| FR-07 | 3 PASS / 11 FAIL | 3 PASS / 11 FAIL | 3 PASS / 11 FAIL |
| FR-13 | NOT RUN | NOT RUN | NOT RUN |

## 12. Human Review and AI Gap Analysis

| ID | Feature | Initial AI output | Problem found | Why it was a problem | Human revision | Retest result |
| -- | ------- | ----------------- | ------------- | -------------------- | -------------- | ------------- |
| GAP-01 | FR-07 | Fixed-name add button locator | Locator detached after text changed to `Đã thêm` | UI setup failed before business assertions | None; AI self-corrected to a two-state semantic locator | Setup passed in final Chromium/Firefox/WebKit runs |
| GAP-02 | FR-07 | `page.goto()` used for all setup navigation | Full reload reset in-memory cart state | Produced false failures with an empty cart | None; AI self-corrected to SPA link navigation | Cart preconditions persisted in final runs |
| GAP-03 | FR-01 | Case note says confirmation password is out of scope | Contradicts the explicit FR-01 requirement and removes the mismatch scenario | Required behavior is not covered by any selected case | Pending human review | Not retested |
| GAP-04 | FR-01 | `TC018` allows rejection or escaped text in JSON | Script requires `200`/`201` before checking the allowed handling | A correct 4xx rejection would be a false failure | Pending human review | Not retested |
| GAP-05 | FR-01 | `TC007` expects a duplicate-email message after UI submission | Valid test password is rejected before the duplicate request is made | Failure cannot establish duplicate-email behavior | Pending human review | Not retested |

## 13. Test Cases That Could Not Be Automated

All 18 selected FR-01 cases and all 14 reviewed FR-07 cases were automated. FR-01 confirmation-password mismatch behavior could not be automated from the selected set because no such test case exists; it requires a reviewed case/data addition. Feasibility for FR-13 is not concluded here.

## 14. Genuine Bug Reports

No human-confirmed bug report or GitHub Issue was created. FR-01 has 10 reproducible candidate failure cases plus one inconclusive failure (`TC007`); FR-07 has 11 reproducible candidates. All remain pending human confirmation.

## 15. Demo Video

TBD

## 16. Agent Skill

- **Automation skill:** `agent-skill/SKILL.md`
- **AI audit skill:** `audit-skill/SKILL.md`
- **Demonstration:** FR-07 interaction records script generation, selector validation, two AI self-review corrections, multi-browser execution, report verification, and audit logging.

## 17. Git Commit History

TBD – Export directly from Git only after a qualifying real commit history exists.

## 18. Test Summary

| Metric | Value |
| ------ | ----- |
| Number of features | 3 |
| Designed test cases | 46 |
| Automated test cases | 32 (FR-01: 18; FR-07: 14) |
| Executed test cases | 32 unique cases / 96 primary browser executions |
| Passed executions | 30 (FR-01: 21; FR-07: 9) |
| Failed executions | 66 (FR-01: 33; FR-07: 33) |
| Browser runs | 6 primary feature-browser runs; diagnostic reruns excluded |
| Genuine SUT bugs | 0 human-confirmed |
| Demo video | TBD |

## 19. Conclusion

FR-01 and FR-07 automation is implemented and has canonical HTML evidence for Chromium, Firefox, and WebKit. FR-01 produced 21 PASS / 33 FAIL across 54 primary executions. Its results are consistent across browsers, but the test-case contradiction around confirmation password, stale manual statuses, and several automation assertion gaps must be resolved before the suite can be treated as complete. No SUT defect is promoted beyond candidate status without human confirmation. FR-13 remains pending.
