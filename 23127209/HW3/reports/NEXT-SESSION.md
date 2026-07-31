# Scenario D — Next-session handoff

Saved on: 2026-07-31

Workspace: `D:\Code\ST-Group\23127209\HW3`  
Branch: `23127209`

## Current live EMS state

- SUT: `https://prod-dev.ems-fitus.cloud`
- Linked test request: `#33`
- Title: `HW03 Scenario D end-to-end test 23127209`
- Final status: **Resolved**
- User detail route: `/complaints/33`
- Admin detail route: `/dashboard/admin/complaints/33`
- Official response is visible to the user.
- Internal note `HW03-INTERNAL-NOTE-23127209` is visible to Admin and absent from
  the user detail.
- Accounts and access information remain in `Source.md`.

## Completed

- Executed the D1 → D2 → D3 → D4 user→Admin→user lifecycle.
- Verified Pending → Resolved and Pending-count transition 11 → 12 → 11.
- Tested valid PNG, invalid file type, image larger than 5 MB, more than five
  images, preview/removal, Cancel/discard, empty validations, loading disablement,
  lightbox Escape/focus restoration, signed-out callback, wrong-role denial, and
  notification/official-response visibility.
- Recorded eleven findings:
  - Severity 3: D-F01, D-F02, D-F04, D-F10, D-F11.
  - Severity 2: D-F03, D-F05, D-F06, D-F07, D-F08, D-F09.
- Checklist status: **95 Pass, 31 Fail, 78 N/A, 20 Pending**.
- Saved nine live EMS screenshots and four Windows compatibility screenshots
  containing the student-email/environment overlay.
- Verified D2/D3 search and filter persistence, D3 Reset/no-result behaviour, and
  D3 page-2 context after opening a request and returning.
- Measured cyan/white contrast at 2.08:1 and documented low-contrast helper/error
  text. Verified D1/D2 horizontal overflow at a 320 CSS px reflow viewport.
- Extended exact reflow measurements to D3/D4, verified D1/D4 alert semantics and
  timing, D2/D4 signed-out callbacks, and D3/D4 localization inconsistencies.
- Saved deterministic results and automation limits in
  `evidence/measurements/2026-07-31-automated-ui.md`.
- Completed Markdown reports, finding log, AI audit, AI critique, prompt record,
  evidence index, compatibility matrix, and README.
- Generated and visually checked:
  - `output/pdf/Scenario-D-Test-Report.pdf`
  - `output/pdf/AI-Audit-Report.pdf`
  - `output/pdf/AI-Critique.pdf`
- Created and validated `skills/ems-scenario-d-testing`.
- Submission validator result: **0 errors, 1 expected warning** for the current
  20 Pending cells.
- Commits already created:
  - `26aeed7 test(hw3): complete Scenario D Windows evidence`
  - `79adfb7 docs(hw3): add Scenario D git log export`
  - `610a22a docs(hw3): save Scenario D next-session handoff`
  - `85f8721 test(hw3): expand Scenario D usability coverage`

## Intentionally excluded

- Task 2 with five real participants.
- SUS and UEQ-S participant data.
- No participant data may be invented later.

## Remaining work

### Highest priority

1. Obtain genuine compatibility environments and expand every D1–D4 screen to
   cover at least three OSes, five browsers, and desktop/tablet/phone.
2. Save one real screenshot per compatibility cell with the student email,
   screen ID, OS, browser, device/viewport, and date overlay.
3. Update `compatibility/Windows-Baseline.md`, the checklist, README counts, report,
   and evidence index after each genuine run.

### Windows checklist items still Pending

- Reliable keyboard-only traversal and focus order.
- Complete hover/focus/disabled-state coverage.
- Optional D3/D4 narrow-viewport screenshots; direct measurements already close
  their checklist cells, but the screenshot API repeatedly timed out.
- D2 pagination context, if enough records become available.
- Network/upload failure recovery and D3 Export Excel; the current browser API
  could not intercept requests or capture the download.

### Submission actions requiring a decision

- Do not submit findings to Google Form without explicit permission.
- Obtain the group’s original checklist-generation prompts if the course requires
  a complete historical AI audit; do not reconstruct them.
- Record a demonstration video for the Agent Skill if required.

## Start here tomorrow

1. Read `README.md` and this file.
2. Run:

   ```powershell
   python skills/ems-scenario-d-testing/scripts/audit_submission.py --root .
   ```

3. Open `execution/Checklist-Execution.md` and work only on cells marked `Pending`.
4. When a genuine compatibility environment is available, start with D1 and save
   evidence before changing its cell from Pending.
5. Rebuild PDFs with `scripts/build_reports.py` after report changes.

## Integrity reminders

- Never infer a Pass from Windows Chromium for another OS/browser/device.
- Only use screenshots captured from the live EMS.
- Generated images are test inputs, not product evidence.
- Keep Google Form timestamps blank until an actual submission succeeds.
