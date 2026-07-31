# Google Form Draft - Do Not Submit Automatically

Status: **Prepared locally; not submitted**

The exact Google Form field labels could not be verified without an authenticated
session. Copy each row from the consolidated finding log into the matching form
fields after signing in. Do not add a form timestamp until Google confirms a real
submission.

## Common values

- Student ID: `23127209`
- Student email: `nakhoa232@clc.fitus.edu.vn`
- Scenario: `D`
- Form submission timestamp: leave blank until submitted

## Copy-ready finding index

| ID | Screen | Type | Category | Severity | Description | Screenshot |
| --- | --- | --- | --- | ---: | --- | --- |
| D-F01 | D1 | Bug | Accessibility | 3 | Request-type select has no accessible name. | `evidence/screenshots/D1-empty-form-validation.png` |
| D-F02 | D1 | Usability | Validation recovery | 3 | Empty submission does not guide recovery at field level. | `evidence/screenshots/D1-empty-form-validation.png` |
| D-F03 | D3 | Bug | Accessibility | 2 | Category filter has an incorrect accessible name. | `evidence/screenshots/D3-category-filter-unlabeled.png` |
| D-F04 | D4 | Usability | Validation recovery | 3 | Empty response validation does not move users to the error. | `evidence/screenshots/D4-empty-response-validation.png` |
| D-F05 | D4 | Bug | Accessibility | 2 | Required response state is not communicated before submission. | `evidence/screenshots/D4-empty-response-validation.png` |
| D-F06 | D2 | Bug | Accessibility | 2 | Status filter has no persistent accessible purpose. | `evidence/screenshots/D2-status-filter-unlabeled.png` |
| D-F07 | D1-D4 | Bug | Internationalization | 2 | Document titles and terminology do not consistently follow the active locale. | `evidence/screenshots/D1-empty-form-validation.png` |
| D-F08 | D1 to D2 | Usability | System feedback | 2 | Successful creation lacks an explicit confirmation. | `evidence/screenshots/D2-request-33-list-resolved.png` |
| D-F09 | D2 and D4 | Bug | Accessibility | 2 | Attachment is exposed with a generic name. | `evidence/screenshots/D2-request-33-resolved.png` |
| D-F10 | D1-D4 | Bug | Accessibility | 3 | Shared control and helper colors fail normal-text contrast. | `evidence/screenshots/D1-empty-form-validation.png` |
| D-F11 | D1-D4 | Bug | Responsive layout | 3 | Navigation and content overflow at 320 CSS px. | `evidence/screenshots/D2-reflow-320-overflow.png` |

For reproduction steps, expected/actual behavior, suggested fixes, and screenshot
links, copy the corresponding row from
[`Bug-Usability-Findings-Log.md`](Bug-Usability-Findings-Log.md).
