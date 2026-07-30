# AI Audit Report

Student: `nakhoa232@clc.fitus.edu.vn`  
Scenario: D  
Execution date: 2026-07-30

## AI-assisted work

| Activity | Tool / skill | Result | Human verification |
| --- | --- | --- | --- |
| Interpret assignment and plan Scenario D | Codex | D1–D4 workflow and deliverables | Student chose to exclude Task 2 |
| Apply usability heuristics | Codex + `ux-heuristics` | Nine findings with severity 0–4 | Findings tied to live observations |
| Operate live EMS | Codex + Browser | Request #33 executed user→Admin→user | Screenshots and state transitions retained |
| Create upload input | ImageGen | Neutral PNG test asset | Clearly separated from EMS evidence |
| Organise submission artefacts | Codex | Checklist, reports, logs, compatibility matrix | Pending cells remain explicit |
| Create reusable workflow | Codex + `skill-creator` | `ems-scenario-d-testing` skill and validator | Validator executed locally |

## Integrity controls

- No participant, SUS, or UEQ-S data was generated.
- No macOS, Linux, Safari, Firefox, Edge, Opera, tablet, or phone result was
  inferred from Windows Chromium.
- No finding was submitted to Google Form.
- Generated test assets are labelled as inputs and are not presented as screenshots.
- Every Pass requires an observed state; unexecuted cells remain Pending.
- The group’s original checklist-generation prompts were not reconstructed because
  they are absent from the workspace.

## Prompt record

The available user prompts are preserved verbatim in
[`AI-Prompts.md`](AI-Prompts.md). The complete AI output remains in the exported
Codex task and should accompany the submission if verbatim output is required.

## Limitations

The AI cannot manufacture genuine multi-platform evidence or recover missing prompt
history. Severity and final submission decisions remain subject to student review.
