# Task 2 Requirement Audit

Audit basis: the course Task 2 requirements, the repository-local AI-audit
safeguards, and cross-consistency among `test_plan.md`, P01–P05 session notes,
`metrics_summary.md`, `sus_responses.md`, `usability_findings.md`,
`findings/bug_usability_findings_log.md`, and `main_report.md`.

| Requirement | Status | Evidence | Audit result / remaining gap |
| --- | --- | --- | --- |
| Goal-oriented scenario on C1–C3 | PASS | [Test plan](test_plan.md) | Starts at Admin → Users List and states goals rather than click steps. |
| Operational metrics and SUS | PASS | [Test plan](test_plan.md) | Success, time, error, hesitation, assistance, probes, and SUS formula are defined. The hesitation threshold remains unset. |
| Separate pilot and refinements | BLOCKED | No current pilot artefact | The required extra pilot participant, observed problem, and evidence-backed refinement are missing. |
| Five real participants outside class | PARTIAL | [Session notes](sessions/) | Five names, masked contacts, dates, outside-class confirmations, metrics, and recording references are present. Target profiles and independent verification remain human-owned. |
| Consent and neutral session procedure | PARTIAL | [Session notes](sessions/) | Recording consent is noted; general informed/observation consent, think-aloud observations, and moderator-procedure evidence are not documented. |
| Task metrics analysis | PASS | [Metrics summary](metrics_summary.md) | 100% available-task success, 60.0-second mean, and zero mean errors/hesitations/assistance. P02/P04 time contradictions were corrected from raw notes. |
| SUS analysis | PASS | [SUS scoring](sus_responses.md) | Scores were corrected using odd/even reverse scoring; mean SUS is 68.5. |
| Task 2 conclusion and screenshot | PARTIAL | [Usability conclusion](usability_findings.md) | The 5/5 system-block conclusion is supported by session notes and a genuine SUT screenshot. It corroborates `C3-RESET-001` without creating a duplicate finding ID. Probe-answer gaps limit additional conclusions. |
| Prioritised recommendations | PASS | [Usability conclusion](usability_findings.md) | Recommendations directly address the existing functional bug `C3-RESET-001`. |
| Unified log and Google Form | PARTIAL | [Consolidated log](../findings/bug_usability_findings_log.md) | No duplicate Task 2 row is created. Manual Form submission, timestamp, and receipt for `C3-RESET-001` remain missing. |
| Privacy and recording governance | PARTIAL | Session notes | Contacts are masked and recordings were not analysed by AI. Central access/retention documentation and public-sharing permission require human review. |

## Audit conclusion

The five official sessions can now be reported and their quantitative analysis
is internally consistent. Task 2 is not fully complete until the pilot evidence,
missing session-procedure/profile/environment details, probe answers, recording
governance, and Google Form receipt are supplied by the student.
