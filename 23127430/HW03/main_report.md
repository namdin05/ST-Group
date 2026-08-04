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
| Report status | **Content synchronized; remaining finalization actions are Google Form submission, one skill-demo video, final Git log, PDF export, and ZIP packaging** |
| Test dates | Task 1B: 2026-08-02, 13:08:06–14:54:02 (UTC+07:00); Task 2 official sessions: 2026-08-02 to 2026-08-03; Task 3: 2026-08-04 |
| Test environment | Task 1B: authenticated Codex in-app browser, 510 × 698 observed viewport; Task 3: physical Windows, iPadOS, and Android devices |
| Student evidence overlay | `dhnam23@clc.fitus.edu.vn` with student/device identification |

Task 1B reports a completed authorised live EMS execution with genuine SUT
screenshots. Task 2 reports one pilot, five official sessions, corrected
aggregate analysis, and SUS-derived conclusions. Task 3 contains 15 executed
physical-device cells and one confirmed Android responsive-layout failure. The
only remaining actions are the Google Form, one skill-demo video, the final Git
log, PDF export, and ZIP packaging/submission.

### Source discrepancy

The official brief and the student-supplied scope both specify
`https://prod-dev.ems-fitus.cloud/`; there is no conflicting URL value. The brief
also calls the service an ngrok tunnel. That infrastructure statement is not
demonstrated by the supplied hostname and is retained only as historical course
text. The current SUT URL above governs this working scope.

## 2. Executive Test Summary

Scenario C is an end-to-end user-administration flow across C1–C3. The group
approved all 56 checklist items, Task 1B live execution is complete, the pilot
and five official Task 2 sessions have been analysed, and all 15 Task 3
compatibility cells have been executed.

| Measure | Current evidence-backed value |
| --- | --- |
| Shared checklist | 56 preserved AI Draft items: 14 each in IA-01…IA-04; approved unchanged |
| Human checklist review/additions | 56/56 group-approved; 0 AI-Assisted Review additions; 0 Human Added |
| Checklist screen-item cells | 168 executed; 150 Passed; 18 Failed; 0 `BLOCKED` |
| Passed / Failed | 150 / 18 |
| Verified bugs | 10 total: 9 from Task 1B and 1 from Task 3 |
| Evidence-required bug candidates | 0; Reset Password absence is confirmed as C3-RESET-001 |
| Pilot / official participants | 1 / 5 documented; pilot achieved a 100% scenario-comprehension pass |
| Official-session metrics | 100% available-task success; mean time 60.0 s; mean errors/hesitations/assistance 0.0; Reset Password system-blocked for 5/5 |
| Mean SUS | 68.5 / 100 |
| Task 2 usability conclusion | 5/5 participants were system-blocked by existing bug `C3-RESET-001`; no separate usability-finding ID is counted |
| Compatibility cells | 15 planned and executed; 14 Passed, 1 Failed (`C1-RESPONSIVE-001`) |
| Skill demo videos | 1 required for `ems-checklist-executor`; link pending |

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
the student's request. References cover the
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
items. All 56 draft items were group-reviewed and approved unchanged.

### 4.3 Prompt and review trace

The prior kickoff prompt and reusable review templates are preserved in
[checklist_ai_prompts.md](group/checklist_ai_prompts.md).

| Review subject | Duplicate/rewrite/addition decision | Why AI missed it | Status |
| --- | --- | --- | --- |
| 56 preserved draft rows | Approved unchanged; no deletion or rewrite reported | Not applicable — no new item was added | Approved 56/56 |
| EMS-specific human addition(s) | None reported | Not applicable — no addition was made | 0 additions |
| Accessibility, keyboard, EN/VI, RTL/dark-mode relevance | Covered where represented in the approved draft; no change was requested | Live applicability still depends on Task 1 execution | Approved as part of the 56-row review |

## 5. Task 1B — Checklist Execution on Scenario C

The approved 56-item checklist was executed against all three owned screens on
the live SUT, producing 168 final screen-item results with no `BLOCKED` cells.

- SUT: <https://prod-dev.ems-fitus.cloud/>.
- Live run: 2026-08-02, 13:08:06–14:54:02 (UTC+07:00).
- Environment: authenticated Codex in-app browser; observed 510 × 698 viewport.
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

Task 3 subsequently identified the separate physical-phone responsive-layout
bug `C1-RESPONSIVE-001`. It is not retroactively counted as a Task 1B failure;
the later Android evidence is reconciled in Sections 10 and 11.

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

The moderator explains that the product—not the participant—is being tested,
asks the participant to think aloud, gives no leading hints, and records
assistance only when the participant is completely stuck. Informed observation
consent and separate recording consent are mandatory.

### 7.2 Measures

| Measure | Operational definition |
| --- | --- |
| Completed | All available subtasks achieved/verified without moderator assistance |
| Partial | Some available subtasks achieved; another available subtask incomplete or assisted |
| Failed | No meaningful available goal achieved, participant abandons, or moderator performs the available task |
| Time | Seconds from first measured C1 action to terminal state; system-block time noted separately |
| Error | Participant action away from goal or requiring recovery; verified system defects excluded |
| Hesitation | Observable pause beyond a threshold fixed before the pilot, or explicit uncertainty; the threshold was not documented in the supplied plan |
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

The pilot is one separate person and is excluded from P01–P05 aggregates. The
student confirmed on 2026-08-04 that the pilot user read and understood the
Scenario C flow and achieved a **100% scenario-comprehension pass**. No wording
or flow-order change was required.

This confirms comprehension of the test script only; it does not establish live
completion of every EMS action. Pilot identity/profile, test date, environment,
consent, timing, errors, hesitations, assistance, and recording were not
provided. See the [pilot notes](task2_user_testing/pilot/pilot_notes.md) and
[changes after pilot](task2_user_testing/pilot/changes_after_pilot.md).

## 8. Task 2 — Five Official Sessions

The student-supplied notes identify five participants and confirm that each is
outside 23KTPM1. Contacts are masked and raw recordings were not analysed by AI.

| ID | Participant | Outside class | Masked contact | Success | Time | Errors | Hesitations | Assistance | Evidence and concise observation |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| P01 | Nguyen Duy Khanh | Student-confirmed: Yes | 033****604 | Completed available subtasks | 77 s | 0 | 0 | 0 | [P01 notes](task2_user_testing/sessions/P01_notes.md); Reset Password system-blocked by `C3-RESET-001` |
| P02 | Mai Hoang Thai | Student-confirmed: Yes | 090****533 | Completed available subtasks | 42 s | 0 | 0 | 0 | [P02 notes](task2_user_testing/sessions/P02_notes.md); Reset Password system-blocked by `C3-RESET-001` |
| P03 | Tang Nhat Minh | Student-confirmed: Yes | 090****402 | Completed available subtasks | 50 s | 0 | 0 | 0 | [P03 notes](task2_user_testing/sessions/P03_notes.md); Reset Password system-blocked by `C3-RESET-001` |
| P04 | Le Long | Student-confirmed: Yes | 037****840 | Completed available subtasks | 40 s | 0 | 0 | 0 | [P04 notes](task2_user_testing/sessions/P04_notes.md); Reset Password system-blocked by `C3-RESET-001` |
| P05 | Nguyen Ngoc Bao Tram | Student-confirmed: Yes | 089****270 | Completed available subtasks | 91 s | 0 | 0 | 0 | [P05 notes](task2_user_testing/sessions/P05_notes.md); Reset Password system-blocked by `C3-RESET-001` |

“Completed” applies to every available task step. The full Reset Password goal
was completed by 0/5 because the product did not expose the action; this is not
participant failure under the predefined rule.

## 9. Task 2 — SUS, Metrics, Findings, and Recommendations

### 9.1 SUS scoring

The ten standard statements are preserved in
[test_plan.md](task2_user_testing/test_plan.md). For each official participant:
odd item contribution = response − 1; even item contribution = 5 − response;
SUS = contribution sum × 2.5. The pilot is excluded.

| Participant | Contribution sum | SUS score |
| --- | ---: | ---: |
| P01 | 26 | 65 |
| P02 | 20 | 50 |
| P03 | 30 | 75 |
| P04 | 30 | 75 |
| P05 | 31 | 77.5 |
| **Mean** | **27.4** | **68.5** |

The earlier draft treated the raw response sum as the contribution sum and
therefore did not reverse-score the even items. The values above correct that
arithmetic. For example, P02’s response of 4 to every item gives a score of 50,
not 80.

The SUS answers provide attitudinal signals and are interpreted alongside the
task metrics. Q1, Q3, Q7, and Q9 all average 4.0, supporting positive
perceived willingness, ease, learnability, and confidence. The clearest caution
is cumbersomeness (Q8 mean 3.4), followed by a mixed inconsistency signal (Q6
mean 2.8). P02 answered `4` to every positive and negative statement; its score
of 50 is therefore interpreted cautiously rather than mapped to a specific UI
cause. Full participant/item derivation is in
[sus_responses.md](task2_user_testing/sus_responses.md).

### 9.2 Aggregate task metrics

| Metric | Result |
| --- | --- |
| Available-task success rate | 5/5 = 100% |
| Full Reset Password completion | 0/5 = 0% (system-blocked) |
| Mean time | (77 + 42 + 50 + 40 + 91) ÷ 5 = 60.0 seconds |
| Mean errors | 0.0 |
| Mean hesitations | 0.0 |
| Mean assistance | 0.0 |
| Mean SUS | 68.5 / 100 |

Raw de-identified response and formula tables are in
[sus_responses.md](task2_user_testing/sus_responses.md) and
[metrics_summary.md](task2_user_testing/metrics_summary.md).

### 9.3 Task 2 conclusion

All five participants were unable to complete Reset Password because no such
action was exposed. Evidence consists of the
[five session notes](task2_user_testing/sessions/) and the
[genuine SUT screenshot](findings/screenshots/failed/task1_C3_C3-RESET-001_01.png).
This is the Task 2 impact of the existing functional bug `C3-RESET-001`, not an
additional bug or separate usability-finding ID. The supplied notes contain no
structured friction observations or probe answers supporting another conclusion.

### 9.4 Prioritised recommendations

1. **P0 — Restore the missing control.** Add a permission-controlled Reset
   Password action in a predictable location on the selected user’s row or
   edit/detail flow.
2. **P0 — Make the action safe and trustworthy.** Use an account-specific
   confirmation with a safe default, explain the consequence, avoid disclosing
   credentials, show clear success/failure feedback, and record an audit event.
3. **P1 — Validate the repair.** Retest C3 with real users and capture structured
   think-aloud notes plus the clarity, recovery, speed, trust, and improvement
   probe answers.

The detailed Task 2 conclusion is in
[usability_findings.md](task2_user_testing/usability_findings.md).
`C3-RESET-001` remains the single canonical row in the
[Consolidated Bug & Usability Findings Log](findings/bug_usability_findings_log.md).

### 9.5 Remaining submission action

- `C3-RESET-001` still requires manual Google Form submission and a real
  timestamp/receipt.

## 10. Task 3 — Cross-Browser / Cross-Platform

Every screen uses the same five planned configurations:

1. Windows + Edge + Desktop
2. Windows + Firefox + Desktop
3. Windows + Opera + Desktop
4. iPadOS + Safari + Tablet
5. Android + Chrome + Phone

| Cell | Screen | OS | Browser | Class | Device; date; environment | Result | Screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C1-01 | C1 | Windows | Edge | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C1-01](task3_compatibility/screenshots/C1/C1-01_C1_Windows_Edge_Desktop_20260804.jpg) |
| C1-02 | C1 | Windows | Firefox | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C1-02](task3_compatibility/screenshots/C1/C1-02_C1_Windows_Firefox_Desktop_20260804.jpg) |
| C1-03 | C1 | Windows | Opera | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C1-03](task3_compatibility/screenshots/C1/C1-03_C1_Windows_Opera_Desktop_20260804.jpg) |
| C1-04 | C1 | iPadOS | Safari | Tablet | iPad Air M6; 2026-08-04; Physical | PASS | [C1-04](task3_compatibility/screenshots/C1/C1-04_C1_iPadOS_Safari_Tablet_20260804.jpg) |
| C1-05 | C1 | Android | Chrome | Phone | Samsung Galaxy A70; 2026-08-04; Physical | FAIL | [C1-05](task3_compatibility/screenshots/C1/C1-05_C1_Android_Chrome_Phone_20260804.jpg) |
| C2-01 | C2 | Windows | Edge | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C2-01](task3_compatibility/screenshots/C2/C2-01_C2_Windows_Edge_Desktop_20260804.jpg) |
| C2-02 | C2 | Windows | Firefox | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C2-02](task3_compatibility/screenshots/C2/C2-02_C2_Windows_Firefox_Desktop_20260804.jpg) |
| C2-03 | C2 | Windows | Opera | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C2-03](task3_compatibility/screenshots/C2/C2-03_C2_Windows_Opera_Desktop_20260804.jpg) |
| C2-04 | C2 | iPadOS | Safari | Tablet | iPad Air M6; 2026-08-04; Physical | PASS | [C2-04](task3_compatibility/screenshots/C2/C2-04_C2_iPadOS_Safari_Tablet_20260804.jpg) |
| C2-05 | C2 | Android | Chrome | Phone | Samsung Galaxy A70; 2026-08-04; Physical | PASS | [C2-05](task3_compatibility/screenshots/C2/C2-05_C2_Android_Chrome_Phone_20260804.jpg) |
| C3-01 | C3 | Windows | Edge | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C3-01](task3_compatibility/screenshots/C3/C3-01_C3_Windows_Edge_Desktop_20260804.jpg) |
| C3-02 | C3 | Windows | Firefox | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C3-02](task3_compatibility/screenshots/C3/C3-02_C3_Windows_Firefox_Desktop_20260804.jpg) |
| C3-03 | C3 | Windows | Opera | Desktop | MSI GF63; 2026-08-04; Physical | PASS | [C3-03](task3_compatibility/screenshots/C3/C3-03_C3_Windows_Opera_Desktop_20260804.jpg) |
| C3-04 | C3 | iPadOS | Safari | Tablet | iPad Air M6; 2026-08-04; Physical | PASS | [C3-04](task3_compatibility/screenshots/C3/C3-04_C3_iPadOS_Safari_Tablet_20260804.jpg) |
| C3-05 | C3 | Android | Chrome | Phone | Samsung Galaxy A70; 2026-08-04; Physical | PASS | [C3-05](task3_compatibility/screenshots/C3/C3-05_C3_Android_Chrome_Phone_20260804.jpg) |

Overall result: **14 PASS and 1 FAIL**. `C1-RESPONSIVE-001` records
horizontal overflow and severe compression on the Android/Chrome phone cell.
The C3 PASS values apply only to the available Edit User/Active compatibility
path; Reset Password remains unavailable as the already confirmed functional
gap `C3-RESET-001`.

### Coverage proof

| Screen | OS (3) | Browsers (5) | Classes (3) | Planned | Executed |
| --- | --- | --- | --- | ---: | ---: |
| C1 | Windows, iPadOS, Android | Edge, Firefox, Opera, Safari, Chrome | Desktop, Tablet, Phone | 5 | 5 |
| C2 | Windows, iPadOS, Android | Edge, Firefox, Opera, Safari, Chrome | Desktop, Tablet, Phone | 5 | 5 |
| C3 | Windows, iPadOS, Android | Edge, Firefox, Opera, Safari, Chrome | Desktop, Tablet, Phone | 5 | 5 |

All 15 cells have real screenshots showing the student email overlay, EMS URL,
browser, OS, and device identity. See the complete
[compatibility matrix](task3_compatibility/compatibility_matrix.md).

## 11. Consolidated Bug & Usability Findings Log

The unified log contains nine confirmed Task 1B bugs and one confirmed Task 3
compatibility/UI bug. Task 2 adds no duplicate row: its 5/5 system-block
conclusion corroborates `C3-RESET-001`. Google Form timestamps and confirmation
references remain unclaimed until the student submits the Form manually.

| ID | Screen | Type | Description | Evidence | Form status | Overall status |
| --- | --- | --- | --- | --- | --- | --- |
| C1-LOCALE-001 | Scenario C / C1 Users List | Localisation / usability defect | Created and Updated dates use an ambiguous numeric format in the English UI. | findings/screenshots/failed/task1_C1_C1-LOCALE-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C1-NAV-001 | Scenario C / C1 Users List | Accessibility / navigation defect | Six sidebar destination links have no accessible names. | findings/screenshots/failed/task1_C1_C1-NAV-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C1-SEARCH-001 | Scenario C / C1 Users List | Usability / recovery defect | The no-result search state offers no Clear or next action. | findings/screenshots/failed/task1_C1_C1-SEARCH-001_01.png | Not submitted | Confirmed — pending Google Form submission |
| C1-RESPONSIVE-001 | Scenario C / C1 Users List | Responsive/mobile UI defect | Users List overflows horizontally and is severely compressed on Android/Chrome phone. | task3_compatibility/screenshots/C1/C1-05_C1_Android_Chrome_Phone_20260804.jpg | Not submitted | Confirmed — pending Google Form submission |
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
the verbatim prompt, and the verbatim AI output or a labelled artefact reference.
It blocks likely secrets/PII, allocates stable IDs, rejects duplicates, writes
the four required fields, and updates the prompt log and audit-report index.

### 12.3 Demonstration scope

Both skills are repository-local submission artefacts and are not globally
installed. They cannot replace human EMS observation, participant recruitment,
or Google Form actions. Only the `ems-checklist-executor` demonstration is
required. Its video link is tracked in
[demo_video_links.md](agent/demo_video_links.md) and will be added after the
student records the demo.

### 12.4 Validation results

| Check | Result |
| --- | --- |
| Current `ems-checklist-executor` final validation | `OK`: 56 checklist rows, 56 execution rows, 168 cells, 150 Passed, 18 Failed, 0 working blockers |
| `record-ai-audit` privacy/schema dry-run for `AI-010` | Passed |
| `record-ai-audit` entry/index generation for `AI-010` | Passed |
| Task 2 numerical recomputation | Passed: 300 total seconds, 60.0-second mean, 68.5 mean SUS |
| Checked local Markdown links in changed report artefacts | All resolved |
| `git diff --check` | Passed; line-ending conversion warnings only |

## 13. AI Use and Human Review

Codex was used for requirement comparison, scaffold generation, workbook
content recovery and Markdown migration, skill/script creation, the authorised
Task 1B live browser run and evidence capture, deterministic consistency checks,
and recalculation/cross-reconciliation of the student-supplied de-identified
Task 2 metrics and SUS responses.

Codex did not recruit participants, answer SUS on their behalf, open or analyse
the participant recordings, invent probe answers or pilot evidence, perform the
student's physical-device Task 3 runs, or submit Google Forms.

Mandatory assignment declaration:

> I use AI tools for the following tasks,

The disclosure and factual interaction index are in
[ai_audit_report.md](AI/ai_audit_report.md), and verbatim interaction records
are in [prompt_log.md](AI/prompt_log.md).

### 13.1 AI Critique

The 200–300 word student critique documents the incorrect initial SUS
calculation, duplicate `UF-001`, Task 3 mobile-overflow consolidation, excessive
placeholders, and the audit-schema fields removed during human review. See
[ai_critique.md](AI/ai_critique.md).

## 14. Conclusion and Self-Assessment

All planned testing content is complete and synchronized: the shared checklist
contains 56 approved items; Task 1B executed all 168 screen-item cells; Task 2
documents one pilot and five official participants; and Task 3 executed all 15
compatibility cells. The consolidated result is 10 verified bugs, including the
mobile overflow defect `C1-RESPONSIVE-001`, and no duplicate Task 2 usability
finding for the already recorded Reset Password defect `C3-RESET-001`.

| No. | Criterion | Maximum | Self-assessment |
| --- | --- | ---: | ---: |
| 1a | Task 1A — Shared checklist, sources, and AI prompts | 15 | 15 |
| 1b | Task 1B — Checklist execution and bug reports | 15 | 15 |
| 2 | Task 2 — User testing and usability report | 25 | 25 |
| 3 | Task 3 — Cross-browser/cross-platform testing | 25 | 25 |
| 4 | Google Form findings and aggregated log | 10 | 10 |
| 5 | Agent Skills | 10 | 10 |
|  | **Total** | **100** | **100** |

The claimed score is finalized after the five submission actions listed at the
end of this report.

## 15. Appendices

### Appendix A — AI Audit Report Snapshot

Four interactions are indexed: AI-007 (scaffold), AI-008 (checklist approval
update), AI-009 (spreadsheet removal after Markdown migration), and AI-010
(Task 2 analysis and audit). Each record contains only
the AI tool name, date/time, prompt, and AI output or a clearly labelled output
reference. The authoritative detailed appendix is
[AI/ai_audit_report.md](AI/ai_audit_report.md).

### Appendix B — Prompt Log Snapshot

- AI-007: current Vietnamese request to complete HW03 from supplied materials and the master
  prompt, recorded 2026-08-01T19:05:18+07:00; artefact output references recorded.
- AI-008: student confirmation that the group reviewed and approved all 56
  checklist items, recorded 2026-08-01T19:58:58+07:00; synchronized status
  references recorded.
- AI-009: student request to keep the working package in Markdown and remove
  Excel files after migration verification, recorded 2026-08-01T20:20:25+07:00.
- AI-010: student request to finish Task 2 from five supplied session records and
  audit the result with a skill, recorded 2026-08-03T22:41:45+07:00; affected
  artefact references recorded without participant PII or recording content.

See [AI/prompt_log.md](AI/prompt_log.md).

### Appendix C — Git Commit Log

The student has intentionally deferred generation of the submission commit log
until all HW03 content is complete. See [git_commit_log.txt](git_commit_log.txt).

### Appendix D — Evidence Index and Demo Links

| Evidence group | Path | Status |
| --- | --- | --- |
| Shared checklist/review | `group/` | Approved 56/56 unchanged |
| Task 1 failed screenshots | `findings/screenshots/failed/` | 10 genuine SUT PNG files present; 8 unique hashes because individual captures support more than one finding |
| Task 2 official sessions | `task2_user_testing/sessions/` | Five participant notes, metrics, and recording references supplied |
| Task 2 metrics/SUS/conclusion | `task2_user_testing/metrics_summary.md`, `sus_responses.md`, `usability_findings.md` | Aggregates corrected; 5/5 system-block conclusion linked to existing bug `C3-RESET-001` without a duplicate finding ID |
| Task 2 pilot | `task2_user_testing/pilot/` | 100% scenario-comprehension pass documented; no flow wording change required |
| Compatibility screenshots | `task3_compatibility/screenshots/C1/`, `C2/`, `C3/` | 15 executed cells and 15 distinct JPG files; 14 Passed, 1 Failed |
| Google Form | External submission | Pending completion |
| Skill demo | `agent/demo_video_links.md` | One `ems-checklist-executor` video link pending |
| Git commit log | `git_commit_log.txt` | Generate after content finalization |
| Final PDFs | `main_report.pdf`, `AI/ai_audit_report.pdf` | Export after final review |

The only remaining actions are: complete the Google Form, record and add the
`ems-checklist-executor` demo link, generate the final Git commit log, export
the required PDFs, then create the ZIP and submit the package.
