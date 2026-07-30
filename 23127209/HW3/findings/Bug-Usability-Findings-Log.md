# Bug & Usability Findings Log

Status: **Ready for review — not submitted to Google Form**

Severity follows Nielsen’s 0–4 scale.

| ID | Screen | Type | Reproduction / heuristic | Expected | Actual | Severity | Suggested fix | Screenshot |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| D-F01 | D1 | Accessibility | Open D1 and inspect the request-type control. IA02-01; Nielsen H4; WCAG 1.3.1/3.3.2. | “Request type, required” is announced. | Native select has no accessible name; visual text is separate. | 3 | Bind a `<label>`/`aria-labelledby` and expose required state. | [D1 empty validation](../evidence/screenshots/D1-empty-form-validation.png) |
| D-F02 | D1 | Usability | Leave required fields empty and press Submit. IA02-07/08; Nielsen H9. | Inline errors identify each field; focus moves to the first invalid field. | One aggregate alert appears at the bottom; focus remains on Submit. | 3 | Add per-field errors, `aria-describedby`, summary links, and move focus. | [D1 empty validation](../evidence/screenshots/D1-empty-form-validation.png) |
| D-F03 | D3 | Accessibility | Inspect the Category filter. IA02-01; Nielsen H4. | “Category, All categories” is announced. | Native select is unnamed; trigger is announced as “All categories Category”. | 2 | Bind the visible label and keep label before value in the accessible name. | [D3 category filter](../evidence/screenshots/D3-category-filter-unlabeled.png) |
| D-F04 | D4 | Usability | On a Pending request, leave Response content empty and press Send response. IA02-07/08; Nielsen H9. | Inline error appears beside the textbox and focus moves there. | Page-level alert appears; focus remains on Send response. | 3 | Add inline `aria-describedby`/`aria-invalid` feedback and move focus. | [D4 empty response](../evidence/screenshots/D4-empty-response-validation.png) |
| D-F05 | D4 | Accessibility | Inspect Response content, then attempt empty Send. IA02-02; Nielsen H5; WCAG 3.3.2. | Required state is communicated before submission. | No visual/programmatic required indicator; the rule appears only after Send. | 2 | Add visible required text plus `required`/`aria-required="true"`. | [D4 empty response](../evidence/screenshots/D4-empty-response-validation.png) |
| D-F06 | D2 | Accessibility | Inspect the status filter. IA02-01; Nielsen H4. | “Status, All statuses” is announced. | Only “All statuses” is exposed; purpose must be inferred. | 2 | Add a visible Status label and bind it with `aria-labelledby`. | [D2 status filter](../evidence/screenshots/D2-status-filter-unlabeled.png) |
| D-F07 | D1/D2 | i18n | Compare the English H1/UI with the browser title. IA01-08; Nielsen H4. | Document title follows the selected locale. | D1/D2 titles remain Vietnamese while visible UI is English. | 1 | Generate title from the same active locale as page content. | [D1 context](../evidence/screenshots/D1-empty-form-validation.png) |
| D-F08 | D1→D2 | Usability | Submit a valid request and inspect the destination. IA04-03; Nielsen H1. | Accessible success message names the created request and next action. | Redirect shows the new record; no explicit creation confirmation is visible. | 2 | Show “Request #ID created” with a link to detail. | [D2 resulting record](../evidence/screenshots/D2-request-33-list-resolved.png) |
| D-F09 | D2/D4 | Accessibility | Open request #33 and inspect its attachment. IA01-06; WCAG 1.1.1. | Meaningful filename or alternative description is retained. | Image/button expose only `attachment_1`. | 2 | Preserve the sanitized original filename or add descriptive alt text. | [D2 request detail](../evidence/screenshots/D2-request-33-resolved.png) |

## Submission integrity

- Findings come from the live EMS UI observed on 2026-07-30.
- No Google Form submission has been made because explicit permission was not given.
- Task 2 participant data, SUS, and UEQ-S were not created.
