# Shared Checklist Execution — Scenario D

Status: **Windows execution expanded through 2026-07-31; cross-platform items pending**

Legend: `P` = Pass, `F` = Fail, `N/A` = not applicable to the screen, and
`Pending` = not executed with sufficient evidence. A Pending cell is never counted
as a Pass.

| Checklist ID | D1 Create | D2 My Requests | D3 Admin List | D4 Admin Detail | Notes |
| --- | --- | --- | --- | --- | --- |
| IA01-01 | P | P | P | P | No overlap or clipping at 1280×720 |
| IA01-02 | Pending | Pending | Pending | Pending | Tablet/phone deferred |
| IA01-03 | P | P | P | P | Basic visual hierarchy inspected |
| IA01-04 | F (D-F10) | F (D-F10) | F (D-F10) | F (D-F10) | Shared cyan/white controls measure 2.08:1; additional D1 helper/error text is also below 4.5:1 |
| IA01-05 | N/A | N/A | P | P | Status uses text as well as colour |
| IA01-06 | P | F (D-F09) | N/A | F (D-F09) | Detail renames the attachment to `attachment_1` |
| IA01-07 | Pending | Pending | Pending | Pending | Full focus/hover/disabled sweep pending |
| IA01-08 | F (D-F07) | F (D-F07) | F (D-F07) | F (D-F07) | D1/D2 keep Vietnamese titles in English; D3/D4 keep English titles in Vietnamese |
| IA01-09 | N/A | P | P | P | Displayed dates are readable and consistent |
| IA01-10 | N/A | P | P | N/A | D2 empty state and D3 no-result state verified |
| IA01-11 | P | P | P | F (D-F07) | D4 mixes localized support-request wording with English “Complaint” and “Internal note” |
| IA01-12 | P | P | P | P | Primary information visible |
| IA01-13 | P | P | P | P | Heading and route identify each screen |
| IA01-14 | F (D-F11) | F (D-F11) | F (D-F11) | F (D-F11) | D1/D2 overflow at 320 CSS px; D3/D4 measure 516 px against a 305 px content viewport |
| IA02-01 | F (D-F01) | F (D-F06) | F (D-F03) | P | Programmatic labels inspected |
| IA02-02 | P | N/A | N/A | F (D-F05) | D4 response is required but unmarked |
| IA02-03 | P | N/A | N/A | N/A | D1 attachment constraints are visible |
| IA02-04 | Pending | Pending | Pending | Pending | Reliable keyboard-order run pending |
| IA02-05 | N/A | N/A | N/A | N/A | No matching input in Scenario D |
| IA02-06 | P | N/A | N/A | P | Errors appear after attempted submission |
| IA02-07 | F (D-F02) | N/A | N/A | F (D-F04) | Errors are page-level rather than inline |
| IA02-08 | F (D-F02) | N/A | N/A | F (D-F04) | Focus remains on submit/send |
| IA02-09 | P | N/A | P | P | Values persist; D3 search/tab state survives detail/back; saved note persists |
| IA02-10 | N/A | N/A | N/A | N/A | Event date ordering is outside Scenario D |
| IA02-11 | P | P | N/A | P | Valid, invalid-type, oversize, count, remove and lightbox tested |
| IA02-12 | N/A | N/A | N/A | N/A | No rich-text editor |
| IA02-13 | N/A | N/A | N/A | N/A | No dependent role/toggle input |
| IA02-14 | P | N/A | N/A | P | Submit disables while loading; resolved response closes |
| IA03-01 | P | P | P | P | Navigation is consistent within each role |
| IA03-02 | P | P | P | P | Headings and active Admin navigation visible |
| IA03-03 | P | P | P | P | Controls match their actions |
| IA03-04 | P | P | P | P | Cancel discards unsaved D1 data; Back works |
| IA03-05 | P | P | P | P | Signed-out D1/D2/D4 deep links preserve callback; user→Admin-list denial tested |
| IA03-06 | N/A | N/A | P | N/A | Pending/Resolved updates the table |
| IA03-07 | N/A | P | P | N/A | D2/D3 search and status/tab state persist through detail/back; D3 Reset verified |
| IA03-08 | Pending | Pending | Pending | Pending | Keyboard-only navigation pending |
| IA03-09 | N/A | N/A | N/A | P | Lightbox restores attachment focus |
| IA03-10 | N/A | N/A | N/A | P | Escape closes lightbox |
| IA03-11 | N/A | N/A | N/A | N/A | No drag-and-drop reorder |
| IA03-12 | N/A | Pending | P | N/A | D3 page 2 and filters persist after opening an item and returning |
| IA03-13 | N/A | N/A | Pending | P | Two automated Export attempts produced no captured download; manual verification required |
| IA03-14 | F (D-F11) | F (D-F11) | F (D-F11) | F (D-F11) | User header and Admin sidebar/actions extend beyond the 320 px viewport |
| IA04-01 | P | P | P | F (D-F04) | D4 recovery feedback is weak |
| IA04-02 | P | P | P | P | Observed async transitions remained responsive |
| IA04-03 | F (D-F08) | P | P | P | D1 success is implicit only |
| IA04-04 | F (D-F02) | N/A | N/A | F (D-F04) | Recovery guidance/focus insufficient |
| IA04-05 | P | N/A | Pending | P | D1/D4 validation alerts use `role=alert`, remain visible beyond 5 seconds, and do not cover the primary action |
| IA04-06 | N/A | P | P | P | Pending/Resolved is consistent |
| IA04-07 | N/A | N/A | N/A | N/A | No confirmation dialog in scope |
| IA04-08 | P | N/A | N/A | N/A | D1 Cancel verified; resolved official response is outside the checklist’s technically reversible-action cases |
| IA04-09 | Pending | N/A | N/A | N/A | Upload progress during network transfer pending |
| IA04-10 | P | P | P | P | User→Admin→User state and notification verified |
| IA04-11 | N/A | P | P | N/A | D2 empty state offers Create request; D3 no-result state explains the filter outcome and offers Reset |
| IA04-12 | P | P | P | P | Signed-out D1/D2/D4 redirects preserve callback; wrong-role Admin route returns no Admin data |
| IA04-13 | N/A | N/A | N/A | N/A | No prerequisite-disabled control exists in the Scenario D D1–D4 scope |
| IA04-14 | P | N/A | N/A | P | D1 disabled while submitting; one linked record created; D3 has no record-creating action |

## Confirmed finding references

- D-F01: D1 request-type label.
- D-F02: D1 empty-form validation and focus.
- D-F03: D3 category-filter label.
- D-F04: D4 empty-response validation and focus.
- D-F05: D4 required response is not communicated in advance.
- D-F06: D2 status filter lacks a persistent label.
- D-F07: D1–D4 titles/terminology do not consistently follow the selected language.
- D-F08: D1 creation has no explicit success confirmation.
- D-F09: Attachment detail exposes only generic `attachment_1` text.
- D-F10: Cyan controls and small helper/error text have insufficient contrast.
- D-F11: D1–D4 overflow horizontally at 320 CSS px and push navigation/actions off-screen.
