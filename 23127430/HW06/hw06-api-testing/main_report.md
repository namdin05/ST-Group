# HW06 – API Testing Report

## Student Information

TBD

## Selected APIs and Scope

TBD

## Test Environment

TBD

## AI-assisted Test Design Process

TBD

## FR-01

TBD

## FR-07

TBD

## FR-13

TBD

## Postman Features

TBD

## Test Execution Summary

Execution environment: Node.js `v22.17.1`; backend reset from `src/database.js` and executed at `http://127.0.0.1:3000`; Newman `6.2.2` with CLI, JSON, and HTML Extra reporters. Each feature run includes the collection `Setup` folder and starts from a fresh database reset.

| Feature | Executed | Passed | Failed | Blocked | Evidence |
| --- | ---: | ---: | ---: | ---: | --- |
| FR-01 Registration | 40 | 16 | 24 | 0 | `reports/newman/fr01-registration.json`, `reports/newman/fr01-registration.html` |
| FR-07 Shopping Cart | 43 | 30 | 11 | 2 | `reports/newman/fr07-shopping-cart.json`, `reports/newman/fr07-shopping-cart.html` |
| FR-13 Dashboard Data | 48 | 36 | 2 | 10 | `reports/newman/fr13-dashboard.json`, `reports/newman/fr13-dashboard.html` |
| **Total** | **131** | **82** | **37** | **12** | Machine-readable case map: `reports/newman/test-case-execution-results.json` |

FR-01 candidate-defect observations are consolidated rather than converted automatically into bug records: password-strength validation is not enforced across multiple invalid partitions; malformed, missing, empty, null, and wrong-type registration fields are frequently accepted; and duplicate email registration is not rejected. The workbook `Bug ID` column remains unchanged pending human triage.

FR-07 candidate-defect observations are consolidated into two implementation themes: invalid quantity/product values can create or mutate cart rows, and adding an existing product creates an additional row instead of increasing the existing quantity. `FR07-API-TC001` is retained as FAIL but classified as a test-oracle inconsistency (valid-JWT objective versus a `401/403` assertion), not as a candidate SUT defect. `FR07-API-TC018` and `FR07-API-TC031` are BLOCKED by automation/prerequisite failures and are not candidate SUT defects.

FR-13 candidate-defect observation: `FR13-API-TC031` and `FR13-API-TC040` show that `GET /api/admin/orders` returns the protected all-system order dataset to a valid normal-user JWT, including when the client supplies an `X-Role` header. This is one consolidated role-enforcement candidate defect, not two automatically created bugs.

Environment and automation failures: FR-07 TC018 is blocked by a test-script null dereference and TC031 by a missing expired-user token. FR-13 TC006–TC011 require data fixtures that the setup does not provision; TC030 lacks an expired-admin token; TC032 lacks a no-role JWT; and TC034/TC048 require an actual non-GET request while the approved FR-13 suite is constrained to `GET /api/admin/orders`. These 12 cases remain `BLOCKED` and are excluded from candidate SUT defects.

The workbook records the real observed result in `Actual Result` and the case-level outcome in `Execution Status`. Expected-result cells and existing Bug ID cells were not changed during execution.

## Bugs

TBD

## CI/CD

TBD

## AI-driven Test Generator

TBD

## AI Critique

TBD

## AI Audit Appendix

TBD
