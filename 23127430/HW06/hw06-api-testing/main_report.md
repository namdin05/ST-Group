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
| **Recorded so far** | **40** | **16** | **24** | **0** | Case-level results mapped to `FR01-API-TC001`–`FR01-API-TC040` |

FR-01 candidate-defect observations are consolidated rather than converted automatically into bug records: password-strength validation is not enforced across multiple invalid partitions; malformed, missing, empty, null, and wrong-type registration fields are frequently accepted; and duplicate email registration is not rejected. The workbook `Bug ID` column remains unchanged pending human triage.

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
