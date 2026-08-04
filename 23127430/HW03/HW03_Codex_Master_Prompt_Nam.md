# Master Prompt for Codex — HW03 GUI & Usability Testing on EMS

Copy the entire prompt below into Codex from the root of the HW03 repository.

```text
You are working inside my HW03 repository for the course CS423 / CSC13003 – Software Testing. Act as a careful testing-documentation engineer and repository maintainer. Your job in this run is to inspect the supplied source files, scaffold or repair the submission structure, create the full main-report format, fill only facts already supported by the sources, and create two reusable repository-local Agent Skills.

Do not perform or pretend to perform live EMS tests during this initial scaffolding run. Do not invent participants, contacts, SUS answers, observation notes, timestamps, screenshots, device runs, Google Form submissions, Git commits, defects, or Pass/Fail results. Missing human evidence must remain visibly marked as `TODO-HUMAN-EVIDENCE` or `BLOCKED`.

## 1. Source-of-truth order

Before editing anything, recursively inspect the current repository and read all relevant files. Use this precedence when sources disagree:

1. The current HW03 assignment brief supplied to the repository (for example a file named similar to `2026.HW03.GUI Usability EMS_En.md`).
2. The course AI templates `[AI-01]` through `[AI-06]` supplied with the assignment package.
3. My explicit facts and constraints in this prompt.
4. Existing workbook/report content, which may be an older draft and may contain obsolete platform suggestions.

Preserve existing evidence and user-written content. Never delete, overwrite, rename, or relocate an existing evidence file without first explaining the conflict. Update scaffold/template content in place where safe. Use relative Markdown links inside the repository.

## 2. Fixed project facts

Fill these facts immediately wherever relevant:

- Student: Đinh Hoàng Nam
- Student ID: 23127430
- Class / Cohort: 23KTPM1
- Course: CS423 / CSC13003 – Software Testing
- Assignment: HW03-AI — GUI & Usability Testing on EMS
- AI agent: OpenAI Codex
- Current SUT URL supplied by the student: `https://prod-dev.ems-fitus.cloud/`
- Chosen scenario: Scenario C — Admin manages users
- Owned screens: exactly C1, C2, and C3; do not add C4
- C1: Users List — search, role/active filters, and user columns
- C2: Assign Role / Edit User
- C3: Block/Unblock and Reset Password dialogs — confirmation and audit feedback
- Task 2 begins at `Admin → Users List`; switching from the user interface to the admin interface is outside the measured C1–C3 task unless separately documented as a pre-task.
- Task 2 requires one separate pilot participant plus five official real participants. The five official participants must be outside the class. Pilot data must not be included in the five-person aggregate.
- Known preliminary observation: the current interface reportedly has no visible Reset Password action. Create a draft finding with status `Evidence Required`; do not finalize it as a defect until a real screenshot and reproduction evidence are supplied. In user testing, this step may be recorded as `Blocked by system defect`, not as participant failure.
- Do not expose passwords, tokens, unmasked participant contacts, recordings, or personal data to AI tools.

If the assignment file still contains an obsolete ngrok URL, retain it only as a cited historical value and record the URL discrepancy in a short “Source discrepancy” note. Use the student-supplied current SUT URL for the working scope.

## 3. Hard compatibility constraint

For Task 3, I can test only these operating systems:

- Windows
- iPadOS
- Android

Never add macOS. If an existing workbook or template contains macOS, replace that template configuration with iPadOS; do not claim that the replaced configuration was executed.

Use this minimum evidence plan for each of C1, C2, and C3:

1. Windows + Edge + Desktop
2. Windows + Firefox + Desktop
3. Windows + Opera + Desktop
4. iPadOS + Safari + Tablet
5. Android + Chrome + Phone

This gives each screen 3 operating systems, 5 distinct browser families, and 3 device classes using 5 executed cells. Versions, physical device names, viewport sizes, test dates, environment type, and screenshot paths are unknown until real runs occur; leave them as `TODO-HUMAN-EVIDENCE`. Every final compatibility cell must have a real screenshot showing the student-ID email overlay, EMS URL, browser, OS, and device identity. The exact institutional email domain is unknown, so use `23127430@[TODO-INSTITUTION-DOMAIN]`, not an invented address.

## 4. Required repository structure

First print a concise inventory of the current structure and a change plan. Then create missing folders/files without destroying existing content. The final logical structure should be:

HW03/
├── README.md
├── main_report.md
├── main_report.pdf                         # generate only after content is ready
├── git_commit_log.txt
├── group/
│   ├── shared_gui_checklist.xlsx-or-md
│   ├── reference_sources.md
│   ├── checklist_ai_prompts.md
│   └── checklist_review_log.md
├── task1_checklist_execution/
│   ├── execution_C1_C2_C3.md
│   ├── bugs.md
│   └── screenshots/
│       └── failed/
├── task2_user_testing/
│   ├── test_plan.md
│   ├── pilot/
│   │   ├── pilot_notes.md
│   │   └── changes_after_pilot.md
│   ├── sessions/
│   │   ├── P01_notes.md
│   │   ├── P02_notes.md
│   │   ├── P03_notes.md
│   │   ├── P04_notes.md
│   │   └── P05_notes.md
│   ├── sus_responses.md
│   ├── metrics_summary.md
│   ├── usability_findings.md
│   └── recordings/
│       └── recording_links.md
├── task3_compatibility/
│   ├── compatibility_matrix.md
│   └── screenshots/
│       ├── C1/
│       ├── C2/
│       └── C3/
├── findings/
│   ├── bug_usability_findings_log.md
│   └── google_form_receipts.md
├── AI/
│   ├── prompt_log.md
│   ├── audit_entries/
│   ├── ai_audit_report.md
│   ├── ai_audit_report.pdf                 # generate at finalization
│   ├── ai_critique.md
│   └── ai_disclosure.md
└── agent/
    ├── ems-checklist-executor/
    │   ├── SKILL.md
    │   ├── agents/openai.yaml              # only if supported by this Codex environment
    │   ├── references/execution_schema.md
    │   └── scripts/validate_execution.py
    ├── record-ai-audit/
    │   ├── SKILL.md
    │   ├── agents/openai.yaml              # only if supported by this Codex environment
    │   ├── references/audit_schema.md
    │   └── scripts/append_audit_entry.py
    └── demo_video_links.md

Treat the two folders under `agent/` as portable, repository-local submission artefacts. Do not install them as personal/global skills unless I explicitly ask for installation. Do not create unnecessary README, changelog, or installation-guide files inside either skill.

If files already exist in a flatter structure, preserve them and adapt the tree with the smallest safe changes. Do not move course-provided source documents merely to make the tree prettier unless I approve the move.

## 5. Main report requirements

Create `main_report.md` as the authoritative, complete English report source. It must be understandable by an AI grader without requiring it to infer content from the folder tree. Supporting artefacts remain the evidence source, but the final report must contain the required tables, summaries, and relative links.

Use the following structure and fill the fixed facts now:

1. Cover and Metadata
   - Assignment, student, ID, class, course, scenario, C1–C3, current SUT URL, report status, test dates, and test environment.
   - Unknown dates/environments remain TODO.

2. Executive Test Summary
   - Scenario and screen scope.
   - Checklist item count, execution Pass/Fail counts, bug count, participant count, SUS mean, usability findings by severity, compatibility cells executed, and demo links.
   - Use formulas or placeholders until evidence exists; never invent counts.

3. Scope, Screen Selection, and Exclusions
   - Explain why C1–C3 form one end-to-end user-administration flow.
   - Explicitly exclude C4 Export to Excel.
   - State that compatibility OS scope is Windows, iPadOS, Android; macOS is not tested.

4. Task 1A — Shared GUI Checklist Method
   - More than 40 items across IA-01 through IA-04.
   - Sources: course slides, Nielsen, Norman, Shneiderman, WCAG/W3C, SUS source, compatibility documentation, EMS material.
   - Explain AI Draft versus AI-Assisted Review versus genuinely Human Added items.
   - Preserve the 56 original rows as `AI Draft`. Any AI-proposed additions after critique must be `AI-Assisted Review`, never `Human Added`.
   - Include the group prompts and a review/change table explaining duplicates, rewrites, additions, and why AI missed genuine human-added items.

5. Task 1B — Checklist Execution on Scenario C
   - One execution table covering every final checklist item for C1, C2, and C3.
   - Final statuses permitted by the assignment are Passed or Failed per screen.
   - During incomplete work, use TODO/BLOCKED rather than guessing. Before final PDF generation, unresolved statuses must be reported as blockers.
   - Every Failed result needs a concise reason and a real screenshot reference; Passed items do not require screenshots.
   - Include per-screen totals and a short analysis of repeated failure themes.

6. Bug Reports from Checklist Execution
   - For every genuine bug: ID, screen, preconditions, reproduction steps, expected result, actual result, severity, screenshot reference, Google Form timestamp/status, and retest status.
   - Add the missing Reset Password action only as an evidence-required draft until proof is supplied.

7. Task 2 — User-Testing Plan and Pilot
   - Goal-oriented Scenario C script beginning at Admin → Users List and covering search/identify user, assign Event Organizer role, block, unblock, and attempt Reset Password.
   - Give the goal, not click-by-click instructions.
   - Define Completed / Partial / Failed, time on task, error count, hesitation count, moderator assistance, think-aloud, consent, and the ten SUS questions.
   - Define neutral probe questions for clarity, recovery, speed, and trust.
   - Include the separate pilot profile, pilot notes, procedural problems, and changes made before official sessions.
   - If Reset Password is unavailable, classify that subtask as system-blocked and do not blame the participant.

8. Task 2 — Five Official Sessions
   - Participant table P01–P05 with target profile and masked, verifiable contact.
   - All five must be outside the class.
   - Include success, time, errors, hesitations, assistance, recording/note reference, and concise observations.
   - Never send raw contacts or recordings to AI; only de-identified/masked data may be analysed.

9. Task 2 — SUS, Metrics, Findings, and Recommendations
   - Show SUS scoring: odd items = response − 1; even items = 5 − response; sum × 2.5.
   - Exclude pilot from aggregates.
   - Show success rate, mean time, mean errors, mean hesitations, and mean SUS.
   - Rank usability findings by Nielsen severity 0–4 using frequency, impact, and persistence.
   - Each ranked finding needs affected screens/participants, evidence/screenshot, heuristic, recommendation, and relationship to any functional bug.

10. Task 3 — Cross-Browser / Cross-Platform
    - Use only the five-cell-per-screen plan defined above, repeated for C1, C2, and C3, for 15 cells total.
    - Include a coverage proof table showing that each screen has Windows/iPadOS/Android, Edge/Firefox/Opera/Safari/Chrome, and Desktop/Tablet/Phone.
    - Every executed cell requires a real screenshot. Include Pass/Fail, notes, versions, device, viewport, date, tester, and environment type.
    - Do not include macOS anywhere except a sentence stating it is outside the available environment and was not tested.

11. Consolidated Bug & Usability Findings Log
    - Reconcile every Task 1–3 finding with `findings/bug_usability_findings_log.md` and the Google Form.
    - Required fields: ID, Scenario/Screen, Type, Description, Steps/Heuristic, Expected, Actual, Severity, Suggested Fix, Screenshot Ref, Source Task, Form Submission Timestamp, Form Confirmation Ref, Reporter Email, Status.
    - Never claim that Codex submitted the Google Form. Leave manual form action as TODO.

12. Agent Skills and Demonstration
    - Explain the purpose, inputs, workflow, safeguards, outputs, validation, and limitations of both skills.
    - Link each SKILL.md and its end-to-end demo video.

13. AI Use, Human Review, and Critique
    - State which tasks used Codex.
    - Include the mandatory 200–300 word AI Critique based on concrete errors or omissions actually observed.
    - Do not pre-write a fake critique before the student has review evidence. Scaffold the questions and leave a TODO.
    - Include the Mandatory Disclosure wording from the supplied course template exactly or mark it TODO if the correct assignment-specific text has not yet been approved by the student.

14. Conclusion and Self-Assessment
    - Summarise actual coverage, key risks, limitations, and next actions.
    - Include the rubric table with criteria 1a, 1b, 2, 3, 4, 5 and a 000–100 self-assessed score. Unknown scores remain TODO.

15. Appendices
    - Appendix A: AI Audit Report.
    - Appendix B: Prompt Log.
    - Appendix C: Git Commit Log.
    - Appendix D: Evidence Index and demo-video links.

Do not use nonstandard Markdown include directives in the final file. At finalization, assemble the exact appendix content into `main_report.md` while keeping the standalone source files. Generate `main_report.pdf` and `AI/ai_audit_report.pdf`, then visually inspect the PDFs for broken tables, clipped text, missing screenshots, and unresolved template markers. Do not generate final PDFs during the scaffold stage if they would misleadingly appear complete.

## 6. Skill 1 — `ems-checklist-executor`

Create a concise, reusable `agent/ems-checklist-executor/SKILL.md` with valid YAML frontmatter containing only `name` and `description`. The description must clearly trigger when a user asks to run/apply/execute an EMS GUI checklist on one or more screens or audit a completed checklist execution.

Required input contract:

- SUT URL and test authorization.
- Scenario and exact screen names.
- Final shared checklist path.
- Execution output path.
- Evidence/screenshot folder.
- Tester identity and environment when available.

Required workflow:

1. Validate that the checklist has more than 40 items and covers IA-01…IA-04.
2. Confirm the exact screens; for this repository default to C1, C2, C3 only.
3. Require a real live run or supplied human evidence. Never infer Pass/Fail from a requirement or screenshot filename.
4. Execute every checklist item on every screen. Use `Passed` or `Failed` only when supported. Use `BLOCKED` in working files when inaccessible, unobservable, or not yet run, and stop finalization until it is resolved.
5. For every failure, record the reason, expected/actual behaviour, severity candidate, bug ID, and real screenshot reference.
6. Capture or accept real SUT screenshots only; never generate synthetic UI evidence. Task 1 needs screenshots for failed items only.
7. Detect contradictions, duplicate bug IDs, blank failure reasons, missing screenshot refs, and unsupported status claims.
8. Produce a human-review summary. Never silently change a tester’s result.

Create `references/execution_schema.md` for the exact execution and bug-table schemas. Create `scripts/validate_execution.py` only for deterministic structural validation; it must not decide whether the UI passed. Test the validator using small synthetic metadata rows, not fabricated EMS evidence.

## 7. Skill 2 — `record-ai-audit`

Create a concise, reusable `agent/record-ai-audit/SKILL.md` with valid YAML frontmatter containing only `name` and `description`. The description must clearly trigger after an AI interaction when the user asks to log a prompt/output, generate an audit entry, update the prompt log, or prepare the HW03 AI Audit Report.

Required input contract:

- Interaction/artifact ID or permission to allocate the next ID.
- AI tool and model, if known.
- Real date/time, if available.
- Stage/task and affected artifact.
- Verbatim user prompt.
- Verbatim AI output or a labelled external artefact/screenshot reference allowed by the template.
- Optional student-owned verdict, reasoning citation, and correction.

Required workflow and safeguards:

1. Preserve prompt and output verbatim. Do not paraphrase, shorten, “clean up,” or replace them with a summary.
2. If content is too long, split it into ordered audit-entry files and link all parts; never silently truncate it. Record a clear truncation marker only when the source itself is unavailable.
3. Do not invent tool/model names, links, timestamps, or metadata. Use TODO when unavailable.
4. Do not evaluate the AI on the student’s behalf. Leave `Verdict`, `Reasoning`, and `Student Fix` as explicit human-owned TODO fields unless the student supplies them.
5. Permit only `VALID`, `INVALID`, or `INCOMPLETE` for a confirmed student verdict. Correct the existing misspelling `INCOMPELTE` if found in old templates without altering the meaning.
6. Log every interaction in `AI/prompt_log.md`; add one detailed five-part audit entry per material AI-generated artefact in `AI/audit_entries/`; update `AI/ai_audit_report.md` without duplicating IDs.
7. Compute the summary counts and percentages only from confirmed verdicts. Do not count TODO entries as evaluated.
8. Detect secrets, passwords, tokens, recordings, or unmasked participant PII before writing. Stop and ask for a student-redacted source rather than copying sensitive content.
9. Preserve the course disclosure text and separate factual logging from the later 200–300 word student critique.

Create `references/audit_schema.md` with the five sections: Prompt + Tool; AI Output; Verdict; Reasoning with course/ISTQB/standard reference; Student Fix. Create `scripts/append_audit_entry.py` to allocate stable IDs, append without overwriting, detect duplicates, and update confirmed summary metrics. Test it with clearly labelled dummy text only.

## 8. README and working templates

Create or update `README.md` with:

- Student and assignment metadata.
- Scenario C and C1–C3.
- Exact test-summary fields required by the assignment.
- Rubric/self-assessment table.
- Links to main report, workbook, findings log, skills, audit report, and demo videos.
- A visible academic-integrity warning that evidence and participants must be real.

Create working Markdown templates for Task 1, Task 2, Task 3, findings, AI audit, and demo links. Fill known facts and table headers, but leave evidence cells as TODO. If `HW03_Working_Pack.xlsx` exists, audit its compatibility sheet and replace only the obsolete macOS template row with the iPadOS + Safari + Tablet plan. Preserve formulas and formatting, and do not fill any test result.

## 9. Verification gates

Before finishing this scaffolding run:

- Validate both skill folders and run their deterministic scripts on dummy input.
- Search the repository for accidental macOS test configurations. The only allowed occurrence is explanatory text saying macOS was not tested.
- Search for fabricated values, sample participants presented as real, completed Pass/Fail statuses, fake timestamps, and unresolved old Scenario IDs.
- Verify all relative links in `main_report.md` and `README.md` point to intended paths or are clearly TODO.
- Verify Scenario C uses exactly C1, C2, C3 throughout.
- Verify no participant/session aggregate includes the pilot.
- Verify the compatibility template has 15 planned cells total: 5 per screen.
- Verify report sections map to every grading criterion and mandatory appendix.
- Do not create `main_report.pdf` or final ZIP until the human evidence gates are satisfied.

## 10. Required final response from Codex

Return:

1. A concise list of files created or updated.
2. The known facts filled automatically.
3. A `TODO-HUMAN-EVIDENCE` checklist grouped by Task 1, Task 2, Task 3, Google Form, AI review, demo videos, and final export.
4. Validation results for the two skills and their scripts.
5. Any conflict found between the assignment, AI templates, workbook, and current repository.

Do not declare the homework complete. Declare only the scaffold/skill creation complete and identify the next concrete human evidence needed.
```

## Recommended first follow-up prompt

After Codex finishes the scaffold, use this prompt before running Task 1:

```text
Use @ems-checklist-executor with the final shared checklist in this repository. Prepare the C1/C2/C3 execution session, but do not assign Pass/Fail until I provide a live browser run or human evidence. Show me the exact starting state, evidence naming convention, and the first checklist item to execute.
```

## Recommended audit prompt after each material interaction

```text
Use @record-ai-audit to record this interaction. Preserve my prompt and the AI output verbatim. Tool/model: [REAL VALUE]. Date/time: [REAL LOCAL VALUE]. Stage/artifact: [REAL VALUE]. Leave Verdict, Reasoning, and Student Fix for my review unless I provide them.
```
