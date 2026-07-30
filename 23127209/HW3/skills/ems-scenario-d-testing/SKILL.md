---
name: ems-scenario-d-testing
description: Execute and document evidence-based GUI, usability, and compatibility testing for EMS Scenario D (user creates a support request and Admin resolves it). Use when testing D1-D4, applying a shared Markdown checklist, recording Pass/Fail/N/A/Pending results, producing findings with Nielsen severity 0-4, checking a user-admin-user lifecycle, or validating the final HW03 submission artifacts.
---

# EMS Scenario D Testing

Test the live product and preserve evidence. Never infer a Pass from source code,
another screen, or an untested environment.

## Workflow

1. Read the assignment, shared checklist, SUT source file, and
   [Scenario D reference](references/scenario-d.md).
2. Select D1-D4 and reuse the same screens across GUI and compatibility testing.
3. Before changing live data, use a uniquely identifiable test title and obtain
   authorization for the create/respond actions.
4. Execute the lifecycle:
   - User creates a request with a neutral image.
   - User verifies Pending in My Requests.
   - Admin finds it in Pending.
   - Admin verifies the attachment, adds an internal note, and sends an official response.
   - User verifies Resolved and confirms the internal note is absent.
5. For every checklist item and screen, record only:
   - `P` after direct verification.
   - `F (finding-id)` after direct verification and evidence capture.
   - `N/A` when the widget or behavior is absent, with a reason.
   - `Pending` when not tested.
6. Capture screenshots from the live EMS. For compatibility evidence, require the
   student-email overlay plus visible browser, OS/device identity, and EMS URL.
7. Consolidate every defect and usability recommendation in one findings log.
   Rate severity using frequency, impact, and persistence on the 0-4 Nielsen scale.
8. Run the artifact validator before packaging:

```powershell
python scripts/audit_submission.py --root <submission-root>
```

## Evidence Rules

- Do not generate or alter EMS screenshots to fabricate product state.
- A generated neutral image may be used only as an upload input and must be labelled as such.
- Do not fabricate participants, SUS/UEQ-S data, browser runs, devices, timestamps,
  form submissions, or Git commits.
- Keep Google Form timestamps blank until the form has actually been submitted.
- Keep unavailable compatibility cells `Pending`.

## Output Contract

Produce these artifacts under the submission root:

- `execution/Checklist-Execution.md`
- `findings/Bug-Usability-Findings-Log.md`
- `compatibility/`
- `evidence/`
- `reports/Scenario-D-Test-Report.md`
- `reports/AI-Audit-Log.md`
- `reports/AI-Critique.md`
- `README.md`
- `git-log.txt`

