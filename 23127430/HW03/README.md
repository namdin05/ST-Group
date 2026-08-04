# HW03-AI — GUI & Usability Testing on EMS

| Field | Value |
| --- | --- |
| Student | Đinh Hoàng Nam |
| Student ID | 23127430 |
| Class / Cohort | 23KTPM1 |
| Course | CS423 / CSC13003 — Software Testing |
| AI agent | OpenAI Codex |
| Scenario | Scenario C — Admin manages users |
| Owned screens | C1 Users List; C2 Assign Role / Edit User; C3 Block/Unblock and Reset Password dialogs |
| Working SUT | <https://prod-dev.ems-fitus.cloud/> |
| Package status | **Testing content complete and synchronized; five final submission actions remain** |

## Test summary

| Required summary field | Current evidence-backed value |
| --- | --- |
| Scenario | Scenario C — Admin manages users |
| Screens | Exactly C1, C2, C3; C4 is excluded |
| Checklist items designed | 56 preserved AI Draft items; group-reviewed and approved 56/56 unchanged; 0 additions |
| Checklist screen-item cells run | 168 of 168 |
| Passed / Failed | 150 / 18 |
| Verified bugs | 10 total: 9 from Task 1B and 1 from Task 3 |
| User-testing participants | 1 separate pilot documented as a 100% scenario-comprehension pass; 5 official participants supplied and student-confirmed outside class |
| Task 2 metrics | 100% available-task success; 60.0 s mean; Reset Password system-blocked for 5/5 |
| SUS mean | 68.5 / 100 |
| Task 2 usability conclusion | 5/5 participants were system-blocked by the existing bug `C3-RESET-001`; no separate usability-finding ID is counted |
| Compatibility cells | 15 of 15 executed; 14 Passed, 1 Failed (`C1-RESPONSIVE-001`) |
| Demo videos | One `ems-checklist-executor` demonstration; video link pending |

## Self-assessment

This is the student's self-assessment. Final submission requires completing the
five actions listed below.

| **No.** | **Criteria** | **Grade** | **Self-Assessed Grade** |
| --- | --- | ---: | ---: |
| **1a** | Task 1A — Shared checklist (> 40 items, IA-01…IA-04) + reference sources + AI prompts *(group)* | 15 | 15 |
| **1b** | Task 1B — Checklist execution on ≥ 3 screens + bug reports *(individual)* | 15 | 15 |
| **2** | Task 2 — User testing with 5 real users (scenario + 5 sessions + analysis → Usability Report) | 25 | 25 |
| **3** | Task 3 — Cross-Browser / Cross-Platform matrix | 25 | 25 |
| **4** | Google Form findings + aggregated log | 10 | 10 |
| **5** | Agent Skills | 10 | 10 |
|  | **Total** | **100** | **100** |

## Remaining finalization actions

1. Fill and submit the Google Form for the consolidated findings.
2. Record the `ems-checklist-executor` skill demo and add its video link.
3. Generate the final Git commit log.
4. Export the required reports to PDF.
5. ZIP the completed package and submit it.
