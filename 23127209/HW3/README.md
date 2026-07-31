# HW03 — Scenario D

## Submission status

| Field | Current value |
| --- | --- |
| Student email | `nakhoa232@clc.fitus.edu.vn` |
| Scenario | D — User requests support and Admin resolves it |
| Screens | D1, D2, D3, D4 |
| Executed platform | Windows, in-app Chromium, desktop 1280×720 |
| Shared checklist | 56 items / 224 screen-item cells |
| Checklist results | 95 Pass, 31 Fail, 78 N/A, 20 Pending |
| Findings | 11 (5 severity-3, 6 severity-2) |
| User testing | Not performed; no participant data was fabricated |
| Compatibility | 4 Windows desktop cells complete; other environments pending |
| Google Form | Not submitted |

## Completed

- Created and resolved linked EMS request `#33`.
- Verified Pending→Resolved state across D1–D4.
- Verified official response is user-visible and the internal note remains Admin-only.
- Tested valid, invalid-type, oversize, more-than-five, preview, and removal upload cases.
- Tested empty validation, Cancel/discard, lightbox Escape/focus restoration,
  signed-out redirect, wrong-role denial, loading disablement, and notification.
- Verified D2/D3 search and filter persistence, D3 no-result/reset behaviour, and
  D3 page-2 return context.
- Measured contrast and 320 CSS px reflow; recorded D-F10 and D-F11.
- Verified D1/D4 alert semantics and timing, D2/D4 signed-out callbacks, and
  D3/D4 localization behaviour.
- Saved screenshots for confirmed Fail findings.
- Added MSSV/email overlays to all four Windows compatibility cells.
- Created the checklist execution matrix, finding log, report, AI audit, critique,
  source record, Agent Skill, validator, and PDF build tooling.

## Intentionally excluded or blocked

- Task 2 with five real participants is intentionally excluded by the student.
- macOS/Linux, five-browser coverage, tablet, and phone require genuine additional
  environments. These cells remain Pending rather than being simulated.
- Google Form submission requires explicit student permission.
- Original group checklist-generation prompts are absent and were not reconstructed.

## Deliverables

- [Main Scenario D report](reports/Scenario-D-Test-Report.md)
- [Checklist execution](execution/Checklist-Execution.md)
- [Bug & usability findings](findings/Bug-Usability-Findings-Log.md)
- [Windows compatibility matrix](compatibility/Windows-Baseline.md)
- [Evidence index](evidence/README.md)
- [Checklist sources](references/Checklist-Sources.md)
- [AI audit report](reports/AI-Audit-Report.md)
- [AI prompt record](reports/AI-Prompts.md)
- [AI critique](reports/AI-Critique.md)
- [Reusable Agent Skill](skills/ems-scenario-d-testing/SKILL.md)
- [PDF output](output/pdf/)
- [Git log export](git-log.txt)
- [Next-session handoff](reports/NEXT-SESSION.md)

## Self-assessment

| No. | Criterion | Maximum | Current | Basis |
| --- | --- | ---: | ---: | --- |
| 1a | Shared checklist, sources and AI prompts | 15 | 10 | Checklist/sources exist; original group prompts missing |
| 1b | D1–D4 execution and bug reports | 15 | 14 | End-to-end complete; 20 cells remain Pending |
| 2 | Five-person user testing | 25 | 0 | Intentionally not performed |
| 3 | Cross-browser/platform matrix | 25 | 4 | Four Windows Chromium desktop cells only |
| 4 | Google Form and consolidated log | 10 | 4 | Complete local log; Form not submitted |
| 5 | Agent Skill | 10 | 9 | Reusable skill and validator complete; video not supplied |
|  | **Total** | **100** | **41** | Honest evidence-based estimate |
