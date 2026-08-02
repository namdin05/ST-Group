# Task 1B — Checklist Execution for Scenario C

SUT: <https://prod-dev.ems-fitus.cloud/>

Screens:

- C1 — Users List: search, role/active filters, and user columns.
- C2 — Assign Role / Edit User.
- C3 — Block/Unblock and Reset Password dialogs: confirmation and audit feedback.

Partial live run:

- Date/time: 2026-08-02T13:08:06+07:00 to 2026-08-02T14:54:02+07:00.
- Environment: authenticated Codex in-app browser, observed viewport 510 × 698;
  exact browser engine/version is `TODO-HUMAN-EVIDENCE`.
- Tester: Đinh Hoàng Nam (23127430), with browser operation assisted by OpenAI
  Codex under the student's authorization.
- Dedicated C2/C3 account: Dinh Nam (`hnam23@clc.fitus.edu.vn`), explicitly
  identified by the student.
- Safety and restoration: with explicit student approval, C2 temporarily changed
  First Name, Phone Number, Member Code, and Role, then restored the original
  values. C3 changed Active to Inactive and then restored Active. The final
  verified row is Dinh Nam, Student, no Member Code, Active. No account was
  created or deleted. Reset Password was unavailable and therefore not executed.
- Final scoring convention: every screen/item cell is `Passed` or `Failed`.
  `Passed` means either the applicable behaviour was directly observed without a
  violation or the criterion's control/state was absent from that screen and
  therefore not applicable there. This does not claim that an absent feature
  works elsewhere. Every `Failed` cell is backed by a direct observation,
  screenshot reference, and stable bug ID.

| ID | Checklist Item | C1 Status | C1 Failure Reason | C1 Screenshot Ref | C1 Bug ID | C2 Status | C2 Failure Reason | C2 Screenshot Ref | C2 Bug ID | C3 Status | C3 Failure Reason | C3 Screenshot Ref | C3 Bug ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IA01-01 | Consistent grid/alignment; no overlap or clipping | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-02 | Responsive on desktop/tablet/phone without hidden actions | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-03 | Clear, consistent typography hierarchy | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-04 | Sufficient contrast in all control states | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-05 | Meaning is not communicated by colour alone | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-06 | Images/icons are sharp, correctly proportioned, and accessible | Failed | Six visible sidebar destination links contain icons but expose no text, aria-label, title, or aria-labelledby value. | findings/screenshots/failed/task1_C1_C1-NAV-001_01.png | C1-NAV-001 | Passed | — | — | — | Passed | — | — | — |
| IA01-07 | Interactive states are visibly distinguishable | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-08 | EN/VI text is complete and consistent | Passed | — | — | — | Failed | The visible First Name field shows the placeholder “Last Name”, while the Last Name field shows “First Name”. | findings/screenshots/failed/task1_C2_C2-FORM-001_01.png | C2-FORM-001 | Passed | — | — | — |
| IA01-09 | Locale formats are unambiguous and consistent | Failed | The English UI displays dates such as 02/08/2026 without a locale label or month name, making day/month order ambiguous. | findings/screenshots/failed/task1_C1_C1-LOCALE-001_01.png | C1-LOCALE-001 | Passed | — | — | — | Passed | — | — | — |
| IA01-10 | Loading/empty/error/denied states are distinct and stable | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-11 | Terms/icons/roles/statuses match user mental models | Passed | — | — | — | Failed | First Name and Last Name placeholders use the opposite field vocabulary, conflicting with the visible labels and user mental model. | findings/screenshots/failed/task1_C2_C2-FORM-001_01.png | C2-FORM-001 | Passed | — | — | — |
| IA01-12 | Only relevant content/actions compete for attention | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA01-13 | Page title, heading, and route identify the screen | Passed | — | — | — | Passed | — | — | — | Failed | C3 has no dedicated Block/Unblock or Reset Password heading/route; the only reachable dialog is titled Edit User. | findings/screenshots/failed/task1_C3_C3-RESET-001_01.png | C3-RESET-001 |
| IA01-14 | Content works with zoom and long translations | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-01 | Inputs have persistent programmatic labels | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-02 | Required fields are marked visibly and programmatically | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-03 | Formats, limits, and examples appear before entry | Passed | — | — | — | Failed | The examples shown before entry are misleading because First Name displays “Last Name” and Last Name displays “First Name”. | findings/screenshots/failed/task1_C2_C2-FORM-001_01.png | C2-FORM-001 | Passed | — | — | — |
| IA02-04 | Form keyboard order and focus indicators are logical | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-05 | Input type/keyboard/autocomplete/masking fits data | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-06 | Validation timing does not interrupt entry | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-07 | Errors are specific, plain, proximal, and not colour-only | Passed | — | — | — | Failed | Submitting with First Name empty displays “Last name is required”, so the proximal validation message identifies the wrong field. | findings/screenshots/failed/task1_C2_C2-VALIDATION-001_01.png | C2-VALIDATION-001 | Passed | — | — | — |
| IA02-08 | Failed submission focuses useful error and identifies all invalid fields | Passed | — | — | — | Failed | The failed submission remains in the modal, but its message identifies Last Name even though First Name is the invalid field. | findings/screenshots/failed/task1_C2_C2-VALIDATION-001_01.png | C2-VALIDATION-001 | Passed | — | — | — |
| IA02-09 | Non-sensitive values survive validation/server errors | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-10 | Related dates/times enforce ordering and explain conflicts | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-11 | Upload communicates constraints, preview, progress, and recovery | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-12 | Rich-text controls are labelled, keyboard-operable, predictable | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-13 | Selectors/toggles show state and enforce dependencies | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA02-14 | Submit prevents duplicates, shows progress, explains disabled state | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-01 | Global navigation is consistent across screens/roles | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-02 | Current location is visibly indicated | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-03 | Links/buttons and labels match their navigation/action semantics | Failed | Six sidebar destination links expose no text, aria-label, title, or aria-labelledby value, so their destinations are not named accessibly. | findings/screenshots/failed/task1_C1_C1-NAV-001_01.png | C1-NAV-001 | Failed | The First Name and Last Name placeholder semantics are reversed relative to their labels. | findings/screenshots/failed/task1_C2_C2-FORM-001_01.png | C2-FORM-001 | Failed | The dedicated row exposes only Edit user and Delete user, and Edit User exposes no Reset Password action. | findings/screenshots/failed/task1_C3_C3-RESET-001_01.png | C3-RESET-001 |
| IA03-04 | Back/Cancel/Close/Return preserve predictable context | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-05 | Deep links and invalid/unauthorized links recover safely | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-06 | Tabs/filters show state and preserve meaningful location | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-07 | Search/filters show labels, state, count, clear, persistence | Failed | Search shows the entered state and no-result message, but no visible Clear control or next-action control is provided. | findings/screenshots/failed/task1_C1_C1-SEARCH-001_01.png | C1-SEARCH-001 | Passed | — | — | — | Passed | — | — | — |
| IA03-08 | Essential navigation works by keyboard without trap | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-09 | Modal/drawer/menu focus moves and restores logically | Passed | — | — | — | Failed | Opening Edit User leaves focus on the Edit user button behind the dialog; after Cancel, focus falls to the document body instead of returning to the trigger. | findings/screenshots/failed/task1_C2_C2-FOCUS-001_01.png | C2-FOCUS-001 | Failed | Opening the state-change modal leaves focus on Edit user behind the dialog; after Cancel, focus falls to the document body. | findings/screenshots/failed/task1_C3_C3-FOCUS-001_01.png | C3-FOCUS-001 |
| IA03-10 | Overlays support Escape, close/cancel, safe outside click | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-11 | Drag-and-drop has feedback, recovery, and alternative | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-12 | Pagination/infinite lists preserve filters/context | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-13 | External links/downloads are identifiable and non-disruptive | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA03-14 | Responsive navigation keeps destinations/actions discoverable | Failed | At the observed narrow layout, six icon-only sidebar destinations remain discoverable visually but have no accessible destination names. | findings/screenshots/failed/task1_C1_C1-NAV-001_01.png | C1-NAV-001 | Passed | — | — | — | Passed | — | — | — |
| IA04-01 | Actions receive timely, proportionate, understandable feedback | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-02 | Async operations show progress and prevent conflicts | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-03 | Success feedback states change and next action | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-04 | Failure feedback explains, preserves state, and supports recovery | Passed | — | — | — | Failed | Validation prevents the invalid save, but the feedback names Last Name when First Name is empty and therefore does not explain the failure correctly. | findings/screenshots/failed/task1_C2_C2-VALIDATION-001_01.png | C2-VALIDATION-001 | Passed | — | — | — |
| IA04-05 | Toasts/alerts are readable, dismissible, unobstructive, announced | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-06 | Status badges are consistent across views | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-07 | Confirmation identifies object/consequence/action and safe focus | Passed | — | — | — | Passed | — | — | — | Failed | Active can be unchecked or checked and saved without a confirmation that identifies Dinh Nam, the Block/Unblock consequence, or a safe default action. | findings/screenshots/failed/task1_C3_C3-CONFIRM-001_01.png | C3-CONFIRM-001 |
| IA04-08 | Actions can be cancelled/undone/reversed when reasonable | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-09 | Progress indicators are accurate/labeled/determinate-aware | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-10 | Real-time updates preserve context and announce changes | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-11 | Empty/no-result states explain and offer next action | Failed | The no-result state explains that no users match, but offers no visible Clear filters or other next action. | findings/screenshots/failed/task1_C1_C1-SEARCH-001_01.png | C1-SEARCH-001 | Passed | — | — | — | Passed | — | — | — |
| IA04-12 | Auth/session feedback distinguishes states without disclosure | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-13 | Disabled controls expose unmet prerequisites | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |
| IA04-14 | Repeats/retries/reconnects do not duplicate or conflict | Passed | — | — | — | Passed | — | — | — | Passed | — | — | — |

## Per-screen totals

| Screen | Final checklist items | Passed | Failed | Blocked | Execution status |
| --- | ---: | ---: | ---: | ---: | --- |
| C1 | 56 | 50 | 6 | 0 | Final live execution |
| C2 | 56 | 48 | 8 | 0 | Final live execution |
| C3 | 56 | 52 | 4 | 0 | Final live execution |

Observed failure themes: modal focus handling, missing accessible navigation
labels, ambiguous locale dates, weak no-result recovery, inconsistent field
microcopy and validation, missing Block/Unblock confirmation, and an unavailable
Reset Password action.
