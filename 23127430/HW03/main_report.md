# HW03-AI — GUI & Usability Testing on EMS

## 1. Cover and Metadata

| Field | Value |
| --- | --- |
| Student | Đinh Hoàng Nam |
| Student ID | 23127430 |
| Class / Cohort | 23KTPM1 |
| Course | CS423 / CSC13003 — Software Testing |
| Assignment | HW03-AI — GUI & Usability Testing on EMS |
| AI agent | OpenAI Codex |
| Scenario | Scenario C — Admin manages users |
| Owned screens | Exactly C1, C2, and C3 |
| C1 | Users List — search, role/active filters, and user columns |
| C2 | Assign Role / Edit User |
| C3 | Block/Unblock and Reset Password dialogs — confirmation and audit feedback |
| Current SUT | <https://prod-dev.ems-fitus.cloud/> |
| Report status | **Task 1B live execution complete; Task 2 participant and Task 3 compatibility evidence remain pending** |
| Test dates | Task 1B: 2026-08-02, 13:08:06–14:54:02 (UTC+07:00); other tasks pending |
| Test environment | Task 1B: authenticated Codex in-app browser, 510 × 698 observed viewport; exact engine/version unavailable |
| Student-ID evidence overlay | `23127430@[TODO-INSTITUTION-DOMAIN]` |

Task 1B reports a completed authorised live EMS execution with genuine SUT screenshots. Remaining `BLOCKED` and `TODO-HUMAN-EVIDENCE` markers apply only to unfinished participant, compatibility, submission-receipt, and demo evidence.

### Source discrepancy

The official brief and the student-supplied scope both specify
`https://prod-dev.ems-fitus.cloud/`; there is no conflicting URL value. The brief
also calls the service an ngrok tunnel. That infrastructure statement is not
demonstrated by the supplied hostname and is retained only as historical course
text. The current SUT URL above governs this working scope.

## 2. Executive Test Summary

Scenario C is an end-to-end user-administration flow across C1–C3. The group approved all 56 checklist items, and Task 1B live execution is complete. Participant and compatibility evidence remain pending.

| Measure | Current evidence-backed value |
| --- | --- |
| Shared checklist | 56 preserved AI Draft items: 14 each in IA-01…IA-04; approved unchanged |
| Human checklist review/additions | 56/56 group-approved; 0 AI-Assisted Review additions; 0 Human Added |
| Checklist screen-item cells | 168 executed; 150 Passed; 18 Failed; 0 `BLOCKED` |
| Passed / Failed | 150 / 18 |
| Verified bugs | 9 |
| Evidence-required bug candidates | 0; Reset Password absence is confirmed as C3-RESET-001 |
| Pilot / official participants | 0 / 0 evidence supplied; required 1 / 5 |
| Mean SUS | `TODO-HUMAN-EVIDENCE` |
| Usability findings by severity 0–4 | `TODO-HUMAN-EVIDENCE` |
| Compatibility cells | 15 planned; 0 executed |
| Skill demo videos | 2 required; `TODO-HUMAN-EVIDENCE` |

Primary artefacts:
[Task 1 execution](task1_checklist_execution/execution_C1_C2_C3.md),
[Task 2 plan](task2_user_testing/test_plan.md),
[Task 3 matrix](task3_compatibility/compatibility_matrix.md), and
[findings log](findings/bug_usability_findings_log.md). The former workbook
structure is mapped to Markdown in
[workbook_migration_manifest.md](docs/workbook_migration_manifest.md).

## 3. Scope, Screen Selection, and Exclusions

C1 provides the user inventory and identification/filtering context; C2 changes
the selected user's role; C3 controls account access and password recovery with
confirmation/audit feedback. Together they form one coherent administrator goal:
locate a user, change authority, manage access, and verify system state.

C4 Export to Excel is explicitly excluded. Task 2 starts at **Admin → Users
List**. Switching from the ordinary user interface to the admin interface is
pre-task setup and is outside the measured C1–C3 task unless separately timed and
reported.

Compatibility uses only Windows, iPadOS, and Android. macOS is outside the available environment and is not tested.

## 4. Task 1A — Shared GUI Checklist Method

### 4.1 Draft, sources, and provenance

The supplied workbook had a broken external reference to `[1]Master Checklist`.
Its cached external-link data retained 56 checklist rows, which were recovered
without changing their wording. The student has since confirmed that the group
reviewed and approved all 56 rows unchanged. The distribution is:

| Interface aspect | Items |
| --- | ---: |
| IA-01 General UI | 14 |
| IA-02 Forms | 14 |
| IA-03 Navigation | 14 |
| IA-04 Feedback / State | 14 |
| **Total** | **56** |

The authoritative row-level checklist is stored in
[shared_gui_checklist.md](group/shared_gui_checklist.md). The supplied workbook
content was migrated to Markdown and the spreadsheet files were then removed at
the student's request; see the
[migration manifest](docs/workbook_migration_manifest.md). References cover the
course slides, Nielsen, Norman, Shneiderman, W3C/WCAG, SUS, ISTQB, BrowserStack,
and EMS materials; see
[reference_sources.md](group/reference_sources.md).

### 4.2 Origin labels

- `AI Draft`: one of the 56 preserved original rows.
- `AI-Assisted Review`: any later item or rewrite proposed by an AI tool, even if
  accepted or edited by a student.
- `Human Added`: only a genuinely student-originated addition, with an
  explanation of why the prior AI work missed it.

Current counts are 56 AI Draft, 0 AI-Assisted Review additions, and 0 Human Added
items. All 56 draft items were group-reviewed and approved unchanged. Exact
reviewer names and the review date remain `TODO-HUMAN-EVIDENCE`.

### 4.3 Prompt and review trace

The prior kickoff prompt is preserved, but the verbatim prompt/output that
generated the 56 rows is not present in the supplied files and must not be
invented. See [checklist_ai_prompts.md](group/checklist_ai_prompts.md).

| Review subject | Duplicate/rewrite/addition decision | Why AI missed it | Status |
| --- | --- | --- | --- |
| 56 preserved draft rows | Approved unchanged; no deletion or rewrite reported | Not applicable — no new item was added | Approved 56/56 |
| EMS-specific human addition(s) | None reported | Not applicable — no addition was made | 0 additions |
| Accessibility, keyboard, EN/VI, RTL/dark-mode relevance | Covered where represented in the approved draft; no change was requested | Live applicability still depends on Task 1 execution | Approved as part of the 56-row review |

The complete before/after log is
[checklist_review_log.md](group/checklist_review_log.md).

## 5. Task 1B — Checklist Execution on Scenario C

The approved 56-item checklist was executed against all three owned screens on
the live SUT, producing 168 final screen-item results with no `BLOCKED` cells.

- SUT: <https://prod-dev.ems-fitus.cloud/>.
- Live run: 2026-08-02, 13:08:06–14:54:02 (UTC+07:00).
- Environment: authenticated Codex in-app browser; observed 510 × 698 viewport;
  exact browser engine/version was not exposed.
- Dedicated C2/C3 account: Dinh Nam (`hnam23@clc.fitus.edu.vn`).
- Restoration: temporary profile, role, and Active-state changes were restored
  to Dinh Nam, Student, blank Phone/Member Code, and Active. The audit Updated
  timestamp changed as an expected consequence of the authorised saves.
- Final validator: 56 checklist rows, 168 result cells, 150 Passed, 18 Failed,
  0 working statuses; 0 errors and 0 warnings.

`Passed` records either an applicable behaviour observed without a violation or
a criterion whose control/state is not instantiated on that screen. `Failed`
records a directly observed violation with a stable bug ID and genuine SUT
screenshot in the supporting execution file.

| ID | Checklist criterion | C1 | C2 | C3 |
| --- | --- | --- | --- | --- |
| IA01-01 | Consistent grid/alignment; no overlap or clipping | Passed | Passed | Passed |
| IA01-02 | Responsive on desktop/tablet/phone without hidden actions | Passed | Passed | Passed |
| IA01-03 | Clear, consistent typography hierarchy | Passed | Passed | Passed |
| IA01-04 | Sufficient contrast in all control states | Passed | Passed | Passed |
| IA01-05 | Meaning is not communicated by colour alone | Passed | Passed | Passed |
| IA01-06 | Images/icons are sharp, correctly proportioned, and accessible | Failed | Passed | Passed |
| IA01-07 | Interactive states are visibly distinguishable | Passed | Passed | Passed |
| IA01-08 | EN/VI text is complete and consistent | Passed | Failed | Passed |
| IA01-09 | Locale formats are unambiguous and consistent | Failed | Passed | Passed |
| IA01-10 | Loading/empty/error/denied states are distinct and stable | Passed | Passed | Passed |
| IA01-11 | Terms/icons/roles/statuses match user mental models | Passed | Failed | Passed |
| IA01-12 | Only relevant content/actions compete for attention | Passed | Passed | Passed |
| IA01-13 | Page title, heading, and route identify the screen | Passed | Passed | Failed |
| IA01-14 | Content works with zoom and long translations | Passed | Passed | Passed |
| IA02-01 | Inputs have persistent programmatic labels | Passed | Passed | Passed |
| IA02-02 | Required fields are marked visibly and programmatically | Passed | Passed | Passed |
| IA02-03 | Formats, limits, and examples appear before entry | Passed | Failed | Passed |
| IA02-04 | Form keyboard order and focus indicators are logical | Passed | Passed | Passed |
| IA02-05 | Input type/keyboard/autocomplete/masking fits data | Passed | Passed | Passed |
| IA02-06 | Validation timing does not interrupt entry | Passed | Passed | Passed |
| IA02-07 | Errors are specific, plain, proximal, and not colour-only | Passed | Failed | Passed |
| IA02-08 | Failed submission focuses useful error and identifies all invalid fields | Passed | Failed | Passed |
| IA02-09 | Non-sensitive values survive validation/server errors | Passed | Passed | Passed |
| IA02-10 | Related dates/times enforce ordering and explain conflicts | Passed | Passed | Passed |
| IA02-11 | Upload communicates constraints, preview, progress, and recovery | Passed | Passed | Passed |
| IA02-12 | Rich-text controls are labelled, keyboard-operable, predictable | Passed | Passed | Passed |
| IA02-13 | Selectors/toggles show state and enforce dependencies | Passed | Passed | Passed |
| IA02-14 | Submit prevents duplicates, shows progress, explains disabled state | Passed | Passed | Passed |
| IA03-01 | Global navigation is consistent across screens/roles | Passed | Passed | Passed |
| IA03-02 | Current location is visibly indicated | Passed | Passed | Passed |
| IA03-03 | Links/buttons and labels match their navigation/action semantics | Failed | Failed | Failed |
| IA03-04 | Back/Cancel/Close/Return preserve predictable context | Passed | Passed | Passed |
| IA03-05 | Deep links and invalid/unauthorized links recover safely | Passed | Passed | Passed |
| IA03-06 | Tabs/filters show state and preserve meaningful location | Passed | Passed | Passed |
| IA03-07 | Search/filters show labels, state, count, clear, persistence | Failed | Passed | Passed |
| IA03-08 | Essential navigation works by keyboard without trap | Passed | Passed | Passed |
| IA03-09 | Modal/drawer/menu focus moves and restores logically | Passed | Failed | Failed |
| IA03-10 | Overlays support Escape, close/cancel, safe outside click | Passed | Passed | Passed |
| IA03-11 | Drag-and-drop has feedback, recovery, and alternative | Passed | Passed | Passed |
| IA03-12 | Pagination/infinite lists preserve filters/context | Passed | Passed | Passed |
| IA03-13 | External links/downloads are identifiable and non-disruptive | Passed | Passed | Passed |
| IA03-14 | Responsive navigation keeps destinations/actions discoverable | Failed | Passed | Passed |
| IA04-01 | Actions receive timely, proportionate, understandable feedback | Passed | Passed | Passed |
| IA04-02 | Async operations show progress and prevent conflicts | Passed | Passed | Passed |
| IA04-03 | Success feedback states change and next action | Passed | Passed | Passed |
| IA04-04 | Failure feedback explains, preserves state, and supports recovery | Passed | Failed | Passed |
| IA04-05 | Toasts/alerts are readable, dismissible, unobstructive, announced | Passed | Passed | Passed |
| IA04-06 | Status badges are consistent across views | Passed | Passed | Passed |
| IA04-07 | Confirmation identifies object/consequence/action and safe focus | Passed | Passed | Failed |
| IA04-08 | Actions can be cancelled/undone/reversed when reasonable | Passed | Passed | Passed |
| IA04-09 | Progress indicators are accurate/labeled/determinate-aware | Passed | Passed | Passed |
| IA04-10 | Real-time updates preserve context and announce changes | Passed | Passed | Passed |
| IA04-11 | Empty/no-result states explain and offer next action | Failed | Passed | Passed |
| IA04-12 | Auth/session feedback distinguishes states without disclosure | Passed | Passed | Passed |
| IA04-13 | Disabled controls expose unmet prerequisites | Passed | Passed | Passed |
| IA04-14 | Repeats/retries/reconnects do not duplicate or conflict | Passed | Passed | Passed |

| Screen | Items | Passed | Failed | Blocked | Execution status |
| --- | ---: | ---: | ---: | ---: | --- |
| C1 | 56 | 50 | 6 | 0 | Final live execution |
| C2 | 56 | 48 | 8 | 0 | Final live execution |
| C3 | 56 | 52 | 4 | 0 | Final live execution |
| **Total** | **168** | **150** | **18** | **0** | **Final validator passed** |

Confirmed failure themes are modal focus handling, missing accessible navigation
labels, ambiguous locale dates, weak no-result recovery, inconsistent field
microcopy and validation, missing Block/Unblock confirmation, and unavailable
Reset Password functionality. Detailed reasons and per-cell evidence are in
[execution_C1_C2_C3.md](task1_checklist_execution/execution_C1_C2_C3.md).
## 6. Bug Reports from Checklist Execution

Nine genuine Task 1B bugs remain after student review. Two preliminary C1
findings were removed when IA01-07, IA02-04, IA02-13, IA03-06, and IA03-12 were
confirmed Passed in practice. Google Form submission has not been claimed.

| Bug ID | Screen | Severity | Confirmed actual result | Screenshot evidence | Google Form |
| --- | --- | --- | --- | --- | --- |
| C1-LOCALE-001 | C1 | 2 — Minor/medium localisation defect | Values such as `02/08/2026 13:35` are shown without a locale cue, so day/month order is ambiguous. | findings/screenshots/failed/task1_C1_C1-LOCALE-001_01.png | Not submitted |
| C1-NAV-001 | C1 | 3 — Major accessibility defect | Six sidebar links have no text, `aria-label`, `title`, or `aria-labelledby` value. | findings/screenshots/failed/task1_C1_C1-NAV-001_01.png | Not submitted |
| C1-SEARCH-001 | C1 | 2 — Minor/medium recovery defect | “No users found matching your filters.” is shown, but there is no visible Clear or next-action control. | findings/screenshots/failed/task1_C1_C1-SEARCH-001_01.png | Not submitted |
| C2-FORM-001 | C2 | 2 — Minor/medium form clarity defect | First Name displays “Last Name”; Last Name displays “First Name”. | findings/screenshots/failed/task1_C2_C2-FORM-001_01.png | Not submitted |
| C2-FOCUS-001 | C2 | 3 — Major keyboard/accessibility defect | Focus remains on the background Edit user button while the dialog is open; after Cancel, focus moves to the document body. | findings/screenshots/failed/task1_C2_C2-FOCUS-001_01.png | Not submitted |
| C2-VALIDATION-001 | C2 | 2 — Minor/medium validation defect | The modal remains open but displays “Last name is required” even though First Name is empty. | findings/screenshots/failed/task1_C2_C2-VALIDATION-001_01.png | Not submitted |
| C3-CONFIRM-001 | C3 | 3 — Major safety/confirmation defect | The generic Edit User modal presents only Active and Save Changes; no Block/Unblock warning or confirmation is shown before either persistent state change. | findings/screenshots/failed/task1_C3_C3-CONFIRM-001_01.png; findings/screenshots/failed/task1_C3_C3-CONFIRM-001_02.png | Not submitted |
| C3-FOCUS-001 | C3 | 3 — Major keyboard/accessibility defect | Focus remains on Edit user behind the modal and falls to the document body after Cancel. | findings/screenshots/failed/task1_C3_C3-FOCUS-001_01.png | Not submitted |
| C3-RESET-001 | C3 | 3 — Major functional gap | The row exposes only Edit user and Delete user; Edit User exposes Close, Cancel, and Save Changes. No Reset Password action is present. | findings/screenshots/failed/task1_C3_C3-RESET-001_01.png | Not submitted |

The canonical detailed bug and usability records are maintained in the single
[bug_usability_findings_log.md](findings/bug_usability_findings_log.md). Per-cell
checklist failure reasons and bug IDs remain in
[execution_C1_C2_C3.md](task1_checklist_execution/execution_C1_C2_C3.md).
## 7. Task 2 — User-Testing Plan and Pilot

### 7.1 Goal and procedure

Starting state: **Admin → Users List**.

> Find the specified user and verify the intended account. Assign the Event
> Organizer role, block the account, restore access by unblocking it, and then
> attempt to reset its password. Tell the moderator when you believe each
> requested account state has been saved.

The moderator tests the product, asks the participant to think aloud, gives no
leading hints, and records assistance only when the participant is completely
stuck. Consent and separate recording consent are mandatory.

### 7.2 Measures

| Measure | Operational definition |
| --- | --- |
| Completed | All available subtasks achieved/verified without moderator assistance |
| Partial | Some available subtasks achieved; another available subtask incomplete or assisted |
| Failed | No meaningful available goal achieved, participant abandons, or moderator performs the available task |
| Time | Seconds from first measured C1 action to terminal state; system-block time noted separately |
| Error | Participant action away from goal or requiring recovery; verified system defects excluded |
| Hesitation | Pause threshold must be fixed before pilot: `TODO-HUMAN-EVIDENCE` |
| Assistance | Each task-relevant moderator intervention |

If Reset Password is unavailable, that subtask is **Blocked by system defect**
and is not participant failure.

### 7.3 Neutral probes

- Clarity: Which page or wording was least clear?
- Recovery: What helped or blocked recovery?
- Speed: Which step felt slower or more effortful than expected?
- Trust: When was confidence highest/lowest that EMS saved the right state?
- Improvement: What one change would help most?

### 7.4 Pilot

The pilot is one separate person and is excluded from P01–P05 aggregates.
Profile, masked contact, notes, procedural problems, and changes are all
`TODO-HUMAN-EVIDENCE`. See [pilot notes](task2_user_testing/pilot/pilot_notes.md)
and [changes after pilot](task2_user_testing/pilot/changes_after_pilot.md).

## 8. Task 2 — Five Official Sessions

All five participants must be real and outside 23KTPM1. Store only masked,
verifiable contacts in this submission and never send raw contacts/recordings to
AI.

| ID | Target profile | Outside class | Masked contact | Success | Time | Errors | Hesitations | Assistance | Notes/recording | Observation |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| P01 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | [P01 notes](task2_user_testing/sessions/P01_notes.md) | `TODO-HUMAN-EVIDENCE` |
| P02 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | [P02 notes](task2_user_testing/sessions/P02_notes.md) | `TODO-HUMAN-EVIDENCE` |
| P03 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | [P03 notes](task2_user_testing/sessions/P03_notes.md) | `TODO-HUMAN-EVIDENCE` |
| P04 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | [P04 notes](task2_user_testing/sessions/P04_notes.md) | `TODO-HUMAN-EVIDENCE` |
| P05 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | [P05 notes](task2_user_testing/sessions/P05_notes.md) | `TODO-HUMAN-EVIDENCE` |

## 9. Task 2 — SUS, Metrics, Findings, and Recommendations

### 9.1 SUS

Use the ten standard statements in
[test_plan.md](task2_user_testing/test_plan.md). For each official participant:
odd item contribution = response − 1; even item contribution = 5 − response;
SUS = contribution sum × 2.5. The pilot is excluded.

| Metric | Result |
| --- | --- |
| Success rate | `TODO-HUMAN-EVIDENCE` |
| Mean time | `TODO-HUMAN-EVIDENCE` |
| Mean errors | `TODO-HUMAN-EVIDENCE` |
| Mean hesitations | `TODO-HUMAN-EVIDENCE` |
| Mean SUS | `TODO-HUMAN-EVIDENCE` |

Raw de-identified response and formula tables are in
[sus_responses.md](task2_user_testing/sus_responses.md) and
[metrics_summary.md](task2_user_testing/metrics_summary.md).

### 9.2 Ranked findings

No official Task 2 usability finding is ranked because participant observation
evidence has not yet been supplied. Nielsen severity 0–4 must be justified using
frequency, impact, and persistence.

All genuine Task 2 findings will be appended as `UF-###` rows to the single
[Consolidated Bug & Usability Findings Log](findings/bug_usability_findings_log.md).
That unified schema also records affected participants/screens, evidence,
heuristic, recommendation, functional-bug relationship, and Form status.
## 10. Task 3 — Cross-Browser / Cross-Platform

Every screen uses the same five planned configurations:

1. Windows + Edge + Desktop
2. Windows + Firefox + Desktop
3. Windows + Opera + Desktop
4. iPadOS + Safari + Tablet
5. Android + Chrome + Phone

| Cell | Screen | OS | Browser | Class | Version/device/viewport/date/environment | Result | Screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C1-01 | C1 | Windows | Edge | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C1-02 | C1 | Windows | Firefox | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C1-03 | C1 | Windows | Opera | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C1-04 | C1 | iPadOS | Safari | Tablet | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C1-05 | C1 | Android | Chrome | Phone | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C2-01 | C2 | Windows | Edge | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C2-02 | C2 | Windows | Firefox | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C2-03 | C2 | Windows | Opera | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C2-04 | C2 | iPadOS | Safari | Tablet | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C2-05 | C2 | Android | Chrome | Phone | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C3-01 | C3 | Windows | Edge | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C3-02 | C3 | Windows | Firefox | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C3-03 | C3 | Windows | Opera | Desktop | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C3-04 | C3 | iPadOS | Safari | Tablet | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |
| C3-05 | C3 | Android | Chrome | Phone | `TODO-HUMAN-EVIDENCE` | BLOCKED | `TODO-HUMAN-EVIDENCE` |

### Coverage proof

| Screen | OS (3) | Browsers (5) | Classes (3) | Planned | Executed |
| --- | --- | --- | --- | ---: | ---: |
| C1 | Windows, iPadOS, Android | Edge, Firefox, Opera, Safari, Chrome | Desktop, Tablet, Phone | 5 | 0 |
| C2 | Windows, iPadOS, Android | Edge, Firefox, Opera, Safari, Chrome | Desktop, Tablet, Phone | 5 | 0 |
| C3 | Windows, iPadOS, Android | Edge, Firefox, Opera, Safari, Chrome | Desktop, Tablet, Phone | 5 | 0 |

Every final cell requires a real screenshot showing the student-ID overlay, EMS
URL, browser, OS, and device identity. See the complete
[compatibility matrix](task3_compatibility/compatibility_matrix.md).

## 11. Consolidated Bug & Usability Findings Log

The unified log currently contains nine confirmed Task 1B bugs and no official Task 2 participant finding. Future `UF-###` rows will use the same schema. Google Form timestamps and confirmation references remain unclaimed until the student submits the Form manually.

| ID | Screen | Type | Description | Evidence | Form status | Overall status |
| --- | --- | --- | --- | --- | --- | --- |
| C1-LOCALE-001 | Scenario C / C1 Users List | Localisation / usability defect | Created and Updated dates use an ambiguous numeric format in the English UI. | findings/screenshots/failed/task1_C1_C1-LOCALE-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C1-NAV-001 | Scenario C / C1 Users List | Accessibility / navigation defect | Six sidebar destination links have no accessible names. | findings/screenshots/failed/task1_C1_C1-NAV-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C1-SEARCH-001 | Scenario C / C1 Users List | Usability / recovery defect | The no-result search state offers no Clear or next action. | findings/screenshots/failed/task1_C1_C1-SEARCH-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C2-FORM-001 | Scenario C / C2 Assign Role/Edit User | Form clarity defect | First Name and Last Name placeholders are reversed. | findings/screenshots/failed/task1_C2_C2-FORM-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C2-FOCUS-001 | Scenario C / C2 Assign Role/Edit User | Accessibility / modal focus defect | Edit User does not move focus into the modal or restore it after Cancel. | findings/screenshots/failed/task1_C2_C2-FOCUS-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C2-VALIDATION-001 | Scenario C / C2 Assign Role/Edit User | Validation defect | Empty First Name produces a Last Name required error. | findings/screenshots/failed/task1_C2_C2-VALIDATION-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C3-CONFIRM-001 | Scenario C / C3 Block/Unblock | Safety / confirmation defect | Active-state changes have no Block/Unblock warning or confirmation. | findings/screenshots/failed/task1_C3_C3-CONFIRM-001_01.png; findings/screenshots/failed/task1_C3_C3-CONFIRM-001_02.png | Not submitted | Confirmed — pending Google Form submission |
| C3-FOCUS-001 | Scenario C / C3 Block/Unblock | Accessibility / modal focus defect | The Block/Unblock modal path does not move or restore focus. | findings/screenshots/failed/task1_C3_C3-FOCUS-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C3-RESET-001 | Scenario C / C3 Reset Password | Functional gap | Reset Password is absent from the dedicated user's available actions. | findings/screenshots/failed/task1_C3_C3-RESET-001_01.png | Not submitted | Confirmed — pending Google Form submission |

The detailed log also contains preconditions, reproduction steps, expected and
actual results, suggested fixes, source-task references, reporter email, and
submission status.
## 12. Agent Skills and Demonstration

### 12.1 EMS checklist executor

[SKILL.md](agent/ems-checklist-executor/SKILL.md) accepts the SUT/authorization,
scenario/screens, checklist/output/evidence paths, and tester environment. It
prepares, executes, or audits every item while requiring live evidence for
Passed/Failed. Its validator checks IA coverage, row completeness, statuses,
failure metadata, and duplicate IDs; it never decides UI quality.

### 12.2 Record AI audit

[SKILL.md](agent/record-ai-audit/SKILL.md) accepts real interaction metadata,
verbatim prompt/output or a labelled artefact reference, and optional
student-owned review. It blocks likely secrets/PII, allocates stable IDs, rejects
duplicates, writes five-part entries, updates the prompt log, and counts only
confirmed verdicts.

### 12.3 Demonstrations and limitations

Both skills are repository-local submission artefacts and are not globally
installed. They cannot replace human EMS observation, participant recruitment,
student verdicts, or Google Form actions. Video links are tracked in
[demo_video_links.md](agent/demo_video_links.md); the two required end-to-end
demos remain `TODO-HUMAN-EVIDENCE`.

### 12.4 Validation results

| Check | Result |
| --- | --- |
| `quick_validate.py` — `ems-checklist-executor` | Valid |
| `quick_validate.py` — `record-ai-audit` | Valid |
| Synthetic execution metadata — valid final structure | Passed |
| Synthetic Failed row without evidence | Correctly rejected |
| Synthetic audit append and summary update | Passed |
| Synthetic duplicate audit ID | Correctly rejected |
| Current scaffold working-mode validation | 56 checklist rows, 56 execution rows, 168 cells, 168 working blockers; structurally valid |
| Current scaffold final-mode validation | Correctly rejected because all 168 cells remain `BLOCKED` |

## 13. AI Use, Human Review, and Critique

Codex was used for requirement comparison, scaffold generation, workbook
content recovery and Markdown migration, skill/script creation, and
deterministic consistency checks.
It was not used for live UI outcomes or human evidence.

Mandatory assignment declaration:

> I use AI tools for the following tasks,

The detailed list is in [ai_disclosure.md](AI/ai_disclosure.md), the factual log
is in [ai_audit_report.md](AI/ai_audit_report.md), and verbatim interaction
records are in [prompt_log.md](AI/prompt_log.md).

### 200–300 word AI Critique

`TODO-HUMAN-EVIDENCE`: the student must write 200–300 words based on concrete
review evidence. The scaffold questions are in
[ai_critique.md](AI/ai_critique.md). No fake critique is pre-written.

## 14. Appendices

### Appendix A — AI Audit Report Snapshot

Four interactions are indexed: AI-000 (preserved prior record, INCOMPLETE),
AI-007 (this scaffold, pending human review), and AI-008 (checklist approval
status update, pending human review), and AI-009 (spreadsheet removal after
Markdown migration, pending human review). Confirmed verdict counts: VALID 0,
INVALID 0, INCOMPLETE 1; pending 3. The authoritative detailed appendix is
[AI/ai_audit_report.md](AI/ai_audit_report.md) and must be copied exactly into
this report at finalization.

### Appendix B — Prompt Log Snapshot

- AI-000: prior Vietnamese kickoff prompt, 2026-07-30; exact output/time/model
  unavailable.
- AI-007: current Vietnamese request to complete HW03 from `docs/` and the master
  prompt, recorded 2026-08-01T19:05:18+07:00; artefact output references recorded.
- AI-008: student confirmation that the group reviewed and approved all 56
  checklist items, recorded 2026-08-01T19:58:58+07:00; synchronized status
  references recorded.
- AI-009: student request to keep the working package in Markdown and remove
  Excel files after migration verification, recorded 2026-08-01T20:20:25+07:00.

See [AI/prompt_log.md](AI/prompt_log.md). Later material interactions must be
appended verbatim.

### Appendix C — Git Commit Log

No HW03-specific commit is claimed at scaffold time. See
[git_commit_log.txt](git_commit_log.txt); regenerate it from real future commits.

### Appendix D — Evidence Index and Demo Links

| Evidence group | Path | Status |
| --- | --- | --- |
| Workbook migration | `docs/workbook_migration_manifest.md` | Complete; source hashes preserved; spreadsheet files removed |
| Shared checklist/review | `group/` | Approved 56/56 unchanged; exact reviewer/date record TODO |
| Task 1 failed screenshots | `findings/screenshots/failed/` | 13 genuine SUT PNGs present; 10 referenced by the 9 confirmed bugs |
| Pilot and P01–P05 notes | `task2_user_testing/` | Templates only |
| Recordings | `task2_user_testing/recordings/recording_links.md` | TODO |
| Compatibility screenshots | `task3_compatibility/screenshots/C1/`, `C2/`, `C3/` | Empty |
| Google Form receipts | `findings/google_form_receipts.md` | None claimed |
| Skill demos | `agent/demo_video_links.md` | Two required links TODO; one old link preserved/unclassified |
| Final PDFs | `main_report.pdf`, `AI/ai_audit_report.pdf` | Intentionally not generated |

Final PDFs and ZIP are blocked until all unresolved evidence markers are reviewed.
