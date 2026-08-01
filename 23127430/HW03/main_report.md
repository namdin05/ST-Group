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
| Report status | **Scaffold ready; evidence collection and human review are BLOCKED** |
| Test dates | `TODO-HUMAN-EVIDENCE` |
| Test environment | `TODO-HUMAN-EVIDENCE` |
| Student-ID evidence overlay | `23127430@[TODO-INSTITUTION-DOMAIN]` |

This report does not claim live EMS execution. `BLOCKED` and
`TODO-HUMAN-EVIDENCE` identify work that must be completed by the student using
real participants, observations, screenshots, devices, timestamps, and receipts.

### Source discrepancy

The official brief and the student-supplied scope both specify
`https://prod-dev.ems-fitus.cloud/`; there is no conflicting URL value. The brief
also calls the service an ngrok tunnel. That infrastructure statement is not
demonstrated by the supplied hostname and is retained only as historical course
text. The current SUT URL above governs this working scope.

## 2. Executive Test Summary

Scenario C is an end-to-end user-administration flow across C1–C3. The working
pack is ready, but human evidence has not been supplied.

| Measure | Current evidence-backed value |
| --- | --- |
| Shared checklist | 56 preserved AI Draft items: 14 each in IA-01…IA-04 |
| Human checklist review/additions | `TODO-HUMAN-EVIDENCE` |
| Checklist screen-item cells | 168 planned; 0 executed; 168 `BLOCKED` |
| Passed / Failed | `TODO-HUMAN-EVIDENCE` / `TODO-HUMAN-EVIDENCE` |
| Verified bugs | 0 |
| Evidence-required bug candidates | 1 — reported missing Reset Password action |
| Pilot / official participants | 0 / 0 evidence supplied; required 1 / 5 |
| Mean SUS | `TODO-HUMAN-EVIDENCE` |
| Usability findings by severity 0–4 | `TODO-HUMAN-EVIDENCE` |
| Compatibility cells | 15 planned; 0 executed |
| Skill demo videos | 2 required; `TODO-HUMAN-EVIDENCE` |

Primary artefacts: [workbook](docs/HW03_Working_Pack.xlsx),
[Task 1 execution](task1_checklist_execution/execution_C1_C2_C3.md),
[Task 2 plan](task2_user_testing/test_plan.md),
[Task 3 matrix](task3_compatibility/compatibility_matrix.md), and
[findings log](findings/bug_usability_findings_log.md).

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
without changing their wording. The distribution is:

| Interface aspect | Items |
| --- | ---: |
| IA-01 General UI | 14 |
| IA-02 Forms | 14 |
| IA-03 Navigation | 14 |
| IA-04 Feedback / State | 14 |
| **Total** | **56** |

The authoritative row-level checklist is embedded in the repaired workbook and
stored in [shared_gui_checklist.md](group/shared_gui_checklist.md). References
cover the course slides, Nielsen, Norman, Shneiderman, W3C/WCAG, SUS, ISTQB,
BrowserStack, and EMS materials; see
[reference_sources.md](group/reference_sources.md).

### 4.2 Origin labels

- `AI Draft`: one of the 56 preserved original rows.
- `AI-Assisted Review`: any later item or rewrite proposed by an AI tool, even if
  accepted or edited by a student.
- `Human Added`: only a genuinely student-originated addition, with an
  explanation of why the prior AI work missed it.

Current counts are 56 AI Draft, 0 AI-Assisted Review additions, and 0 Human Added
items. This is not a claim that the mandatory group critique is complete.

### 4.3 Prompt and review trace

The prior kickoff prompt is preserved, but the verbatim prompt/output that
generated the 56 rows is not present in the supplied files and must not be
invented. See [checklist_ai_prompts.md](group/checklist_ai_prompts.md).

| Review subject | Duplicate/rewrite/addition decision | Why AI missed it | Status |
| --- | --- | --- | --- |
| 56 preserved draft rows | No silent deletion or rewrite performed by Codex | Requires genuine group review | `TODO-HUMAN-EVIDENCE` |
| EMS-specific human addition(s) | None claimed | Must be explained by the human author | `TODO-HUMAN-EVIDENCE` |
| Accessibility, keyboard, EN/VI, RTL/dark-mode relevance | Coverage must be critically assessed against the real EMS | Cannot be concluded from the draft alone | `TODO-HUMAN-EVIDENCE` |

The complete before/after log is
[checklist_review_log.md](group/checklist_review_log.md).

## 5. Task 1B — Checklist Execution on Scenario C

Every row below remains `BLOCKED` until observed on the live SUT. In the final
report, only `Passed` or `Failed` is allowed. Every Failed result must include a
reason, real screenshot, and bug ID in the supporting execution file.

| ID | Checklist criterion | C1 | C2 | C3 |
| --- | --- | --- | --- | --- |
| IA01-01 | Consistent grid/alignment; no overlap or clipping | BLOCKED | BLOCKED | BLOCKED |
| IA01-02 | Responsive on desktop/tablet/phone without hidden actions | BLOCKED | BLOCKED | BLOCKED |
| IA01-03 | Clear, consistent typography hierarchy | BLOCKED | BLOCKED | BLOCKED |
| IA01-04 | Sufficient contrast in all control states | BLOCKED | BLOCKED | BLOCKED |
| IA01-05 | Meaning is not communicated by colour alone | BLOCKED | BLOCKED | BLOCKED |
| IA01-06 | Images/icons are sharp, proportioned, and accessible | BLOCKED | BLOCKED | BLOCKED |
| IA01-07 | Interactive states are visibly distinguishable | BLOCKED | BLOCKED | BLOCKED |
| IA01-08 | English/Vietnamese text is complete and consistent | BLOCKED | BLOCKED | BLOCKED |
| IA01-09 | Locale formats are unambiguous and consistent | BLOCKED | BLOCKED | BLOCKED |
| IA01-10 | Loading/empty/error/denied states are distinct and stable | BLOCKED | BLOCKED | BLOCKED |
| IA01-11 | Terms/icons/roles/statuses match user mental models | BLOCKED | BLOCKED | BLOCKED |
| IA01-12 | Only relevant content/actions compete for attention | BLOCKED | BLOCKED | BLOCKED |
| IA01-13 | Page title, heading, and route identify the screen | BLOCKED | BLOCKED | BLOCKED |
| IA01-14 | Content works with zoom and long translations | BLOCKED | BLOCKED | BLOCKED |
| IA02-01 | Inputs have persistent programmatic labels | BLOCKED | BLOCKED | BLOCKED |
| IA02-02 | Required fields are marked visibly/programmatically | BLOCKED | BLOCKED | BLOCKED |
| IA02-03 | Formats, limits, and examples appear before entry | BLOCKED | BLOCKED | BLOCKED |
| IA02-04 | Form keyboard order and focus indicators are logical | BLOCKED | BLOCKED | BLOCKED |
| IA02-05 | Input type/keyboard/autocomplete/masking fits data | BLOCKED | BLOCKED | BLOCKED |
| IA02-06 | Validation timing does not interrupt entry | BLOCKED | BLOCKED | BLOCKED |
| IA02-07 | Errors are specific, plain, proximal, and not colour-only | BLOCKED | BLOCKED | BLOCKED |
| IA02-08 | Failed submission focuses error and identifies invalid fields | BLOCKED | BLOCKED | BLOCKED |
| IA02-09 | Non-sensitive values survive validation/server errors | BLOCKED | BLOCKED | BLOCKED |
| IA02-10 | Related dates/times enforce and explain ordering | BLOCKED | BLOCKED | BLOCKED |
| IA02-11 | Upload communicates constraints, preview, progress, recovery | BLOCKED | BLOCKED | BLOCKED |
| IA02-12 | Rich-text controls are labelled/keyboard-operable/predictable | BLOCKED | BLOCKED | BLOCKED |
| IA02-13 | Selectors/toggles show state and enforce dependencies | BLOCKED | BLOCKED | BLOCKED |
| IA02-14 | Submit prevents duplicates, shows progress, explains disabled state | BLOCKED | BLOCKED | BLOCKED |
| IA03-01 | Global navigation is consistent across screens/roles | BLOCKED | BLOCKED | BLOCKED |
| IA03-02 | Current location is visibly indicated | BLOCKED | BLOCKED | BLOCKED |
| IA03-03 | Links/buttons and labels match semantics | BLOCKED | BLOCKED | BLOCKED |
| IA03-04 | Back/Cancel/Close/Return preserve predictable context | BLOCKED | BLOCKED | BLOCKED |
| IA03-05 | Deep/invalid/unauthorised links recover safely | BLOCKED | BLOCKED | BLOCKED |
| IA03-06 | Tabs/filters show state and preserve location | BLOCKED | BLOCKED | BLOCKED |
| IA03-07 | Search/filters show labels, state, count, clear, persistence | BLOCKED | BLOCKED | BLOCKED |
| IA03-08 | Essential navigation works by keyboard without traps | BLOCKED | BLOCKED | BLOCKED |
| IA03-09 | Modal/drawer/menu focus moves and restores logically | BLOCKED | BLOCKED | BLOCKED |
| IA03-10 | Overlays support expected dismissal methods | BLOCKED | BLOCKED | BLOCKED |
| IA03-11 | Drag-and-drop has feedback, recovery, and alternative | BLOCKED | BLOCKED | BLOCKED |
| IA03-12 | Pagination/infinite lists preserve filters/context | BLOCKED | BLOCKED | BLOCKED |
| IA03-13 | External links/downloads are identifiable/non-disruptive | BLOCKED | BLOCKED | BLOCKED |
| IA03-14 | Responsive navigation keeps actions discoverable | BLOCKED | BLOCKED | BLOCKED |
| IA04-01 | Actions receive timely, proportionate feedback | BLOCKED | BLOCKED | BLOCKED |
| IA04-02 | Async operations show progress and prevent conflicts | BLOCKED | BLOCKED | BLOCKED |
| IA04-03 | Success feedback states change and next action | BLOCKED | BLOCKED | BLOCKED |
| IA04-04 | Failure feedback explains, preserves state, supports recovery | BLOCKED | BLOCKED | BLOCKED |
| IA04-05 | Toasts/alerts are readable, dismissible, unobstructive, announced | BLOCKED | BLOCKED | BLOCKED |
| IA04-06 | Status badges are consistent across views | BLOCKED | BLOCKED | BLOCKED |
| IA04-07 | Confirmations identify object/consequence/action and safe focus | BLOCKED | BLOCKED | BLOCKED |
| IA04-08 | Actions can be cancelled/undone/reversed when reasonable | BLOCKED | BLOCKED | BLOCKED |
| IA04-09 | Progress indicators are accurate and labelled | BLOCKED | BLOCKED | BLOCKED |
| IA04-10 | Real-time updates preserve context and announce changes | BLOCKED | BLOCKED | BLOCKED |
| IA04-11 | Empty/no-result states explain and offer next action | BLOCKED | BLOCKED | BLOCKED |
| IA04-12 | Auth/session feedback distinguishes states safely | BLOCKED | BLOCKED | BLOCKED |
| IA04-13 | Disabled controls expose unmet prerequisites | BLOCKED | BLOCKED | BLOCKED |
| IA04-14 | Repeats/retries/reconnects do not duplicate/conflict | BLOCKED | BLOCKED | BLOCKED |

| Screen | Items | Passed | Failed | Blocked |
| --- | ---: | ---: | ---: | ---: |
| C1 | 56 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | 56 |
| C2 | 56 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | 56 |
| C3 | 56 | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | 56 |

Repeated failure themes cannot be analysed until real execution is complete.
Failure details/evidence belong in
[execution_C1_C2_C3.md](task1_checklist_execution/execution_C1_C2_C3.md).

## 6. Bug Reports from Checklist Execution

No genuine bug is confirmed. A preliminary report states that Reset Password is
not visible. It remains an evidence-required draft:

| Field | Draft value |
| --- | --- |
| ID | DRAFT-C3-RESET-001 |
| Screen | C3 |
| Preconditions | `TODO-HUMAN-EVIDENCE` |
| Reproduction steps | `TODO-HUMAN-EVIDENCE` |
| Expected | An authorised admin can locate/initiate the required Reset Password flow with confirmation and audit feedback. |
| Actual | `TODO-HUMAN-EVIDENCE` |
| Severity | `TODO-HUMAN-EVIDENCE` |
| Screenshot | `TODO-HUMAN-EVIDENCE` |
| Google Form timestamp/status | Not submitted; `TODO-HUMAN-EVIDENCE` |
| Retest | Not run |
| Status | **Evidence Required** |

See [Task 1 bug reports](task1_checklist_execution/bugs.md). Only after a real
reproduction should this candidate receive a final bug ID and Form submission.

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

Nielsen severity 0–4 must be justified using frequency, impact, and persistence.

| ID | Finding | Screens/participants | Evidence | Severity | Heuristic | Recommendation | Functional-bug relationship |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| `TODO` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO-HUMAN-EVIDENCE` | `TODO` | `TODO` | `TODO` | `TODO` |

No finding is ranked before real observation. See
[usability_findings.md](task2_user_testing/usability_findings.md).

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

Every genuine Task 1–3 finding must be reconciled with both the
[aggregated log](findings/bug_usability_findings_log.md) and the Google Form.

| ID | Screen | Type | Description | Evidence | Form status | Overall status |
| --- | --- | --- | --- | --- | --- | --- |
| DRAFT-C3-RESET-001 | C3 | Bug candidate | Reset Password action reportedly not visible | `TODO-HUMAN-EVIDENCE` | Not submitted | Evidence Required |

The final log includes steps/heuristic, expected, actual, severity, suggested
fix, screenshot, source task, Form timestamp/confirmation, reporter email, and
status. Codex did not submit and must not claim to have submitted the Form.

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
structural repair, skill/script creation, and deterministic consistency checks.
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

## 14. Conclusion and Self-Assessment

The source inventory, report structure, 56-row checklist recovery, C1–C3
execution scaffold, user-testing instruments, 15-cell compatibility plan,
findings reconciliation fields, audit system, and two skills are ready. Actual
coverage is still zero because no live/human evidence was supplied. The primary
risks are unsupported test outcomes, missing participant verification, incomplete
Form reconciliation, an unconfirmed Reset Password observation, and missing
final PDF/demo evidence.

Next actions are to complete the group checklist review, run Task 1, pilot and
five official sessions, execute all 15 compatibility cells, submit confirmed
findings manually, perform human AI review/critique, and only then generate and
visually inspect PDFs and the final ZIP.

| No. | Criterion | Grade | Self-assessed |
| --- | --- | ---: | ---: |
| 1a | Shared checklist, sources, prompts | 15 | `TODO-HUMAN-EVIDENCE` |
| 1b | C1–C3 execution and bugs | 15 | `TODO-HUMAN-EVIDENCE` |
| 2 | Five-user usability testing | 25 | `TODO-HUMAN-EVIDENCE` |
| 3 | Compatibility matrix/evidence | 25 | `TODO-HUMAN-EVIDENCE` |
| 4 | Form + aggregated findings | 10 | `TODO-HUMAN-EVIDENCE` |
| 5 | Agent Skills | 10 | `TODO-HUMAN-EVIDENCE` |
|  | **Total** | **100** | **`TODO-HUMAN-EVIDENCE`** |

## 15. Appendices

### Appendix A — AI Audit Report Snapshot

Two interactions are indexed: AI-000 (preserved prior record, INCOMPLETE) and
AI-007 (this scaffold, pending human review). Confirmed verdict counts: VALID 0,
INVALID 0, INCOMPLETE 1; pending 1. The authoritative detailed appendix is
[AI/ai_audit_report.md](AI/ai_audit_report.md) and must be copied exactly into
this report at finalization.

### Appendix B — Prompt Log Snapshot

- AI-000: prior Vietnamese kickoff prompt, 2026-07-30; exact output/time/model
  unavailable.
- AI-007: current Vietnamese request to complete HW03 from `docs/` and the master
  prompt, recorded 2026-08-01T19:05:18+07:00; artefact output references recorded.

See [AI/prompt_log.md](AI/prompt_log.md). Later material interactions must be
appended verbatim.

### Appendix C — Git Commit Log

No HW03-specific commit is claimed at scaffold time. See
[git_commit_log.txt](git_commit_log.txt); regenerate it from real future commits.

### Appendix D — Evidence Index and Demo Links

| Evidence group | Path | Status |
| --- | --- | --- |
| Shared checklist/review | `group/` | Draft recovered; human review blocked |
| Task 1 failed screenshots | `task1_checklist_execution/screenshots/failed/` | Empty |
| Pilot and P01–P05 notes | `task2_user_testing/` | Templates only |
| Recordings | `task2_user_testing/recordings/recording_links.md` | TODO |
| Compatibility screenshots | `task3_compatibility/screenshots/C1/`, `C2/`, `C3/` | Empty |
| Google Form receipts | `findings/google_form_receipts.md` | None claimed |
| Skill demos | `agent/demo_video_links.md` | Two required links TODO; one old link preserved/unclassified |
| Final PDFs | `main_report.pdf`, `AI/ai_audit_report.pdf` | Intentionally not generated |

Final PDFs and ZIP are blocked until all unresolved evidence markers are reviewed.
