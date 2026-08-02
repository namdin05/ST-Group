# Workbook-to-Markdown Migration Manifest

Status: **Complete — spreadsheet files removed after Markdown coverage
verification on 2026-08-01**.

The supplied macro-enabled workbook and repaired working copy were used as source
material only. Their required content is now maintained in Markdown so the
working package has one editable source of truth.

## Removed source files

| File | Size (bytes) | SHA-256 before removal |
| --- | ---: | --- |
| `HW03_Working_Pack.xlsm` | 90,128 | `DC6A7BEB111F74F46CEDD0E2E1FD4309043C3F523444189C4F6DB0DF6DF677FD` |
| `HW03_Working_Pack.xlsx` | 79,554 | `E023B4A02388BD7362CA048B66A9A2DADDF317319EB4F4A43AE0B132853E6089` |

## Sheet-to-Markdown mapping

| Former sheet | Markdown source of truth | Coverage |
| --- | --- | --- |
| Read Me | [`README.md`](../README.md), [`main_report.md`](../main_report.md) | Metadata, workflow, integrity gates, summary, rubric, and next actions |
| Sources | [`group/reference_sources.md`](../group/reference_sources.md) | 14 source rows and verification notes |
| AI Prompts | [`group/checklist_ai_prompts.md`](../group/checklist_ai_prompts.md), [`AI/prompt_log.md`](../AI/prompt_log.md), [`AI/audit_entries/`](../AI/audit_entries/) | Known interaction, reusable templates, timestamps, output references, and review gates |
| Execution | [`task1_checklist_execution/execution_C1_C2_C3.md`](../task1_checklist_execution/execution_C1_C2_C3.md) | 56 checklist rows × C1–C3 = 168 working result cells |
| User Testing | [`task2_user_testing/test_plan.md`](../task2_user_testing/test_plan.md), [`task2_user_testing/sessions/`](../task2_user_testing/sessions/), [`task2_user_testing/metrics_summary.md`](../task2_user_testing/metrics_summary.md) | Pilot and five-session plan, definitions, notes, probes, and metrics |
| SUS | [`task2_user_testing/test_plan.md`](../task2_user_testing/test_plan.md), [`task2_user_testing/sus_responses.md`](../task2_user_testing/sus_responses.md) | Standard ten-item questionnaire, P01–P05 response table, and scoring formula |
| Compatibility | [`task3_compatibility/compatibility_matrix.md`](../task3_compatibility/compatibility_matrix.md) | 15 planned cells across C1–C3 |
| Usability Findings | [`task2_user_testing/usability_findings.md`](../task2_user_testing/usability_findings.md) | Severity, evidence, heuristic, recommendation, and status fields |
| Findings Log | [`findings/bug_usability_findings_log.md`](../findings/bug_usability_findings_log.md), [`findings/google_form_receipts.md`](../findings/google_form_receipts.md) | Consolidated finding schema and Google Form reconciliation |
| Report Outline | [`main_report.md`](../main_report.md) | Full report structure and evidence index |
| Master Checklist | [`group/shared_gui_checklist.md`](../group/shared_gui_checklist.md), [`group/checklist_review_log.md`](../group/checklist_review_log.md) | 56 unique rows, all group-approved unchanged |

## Verification snapshot

| Check | Result |
| --- | ---: |
| Unique checklist IDs | 56 |
| Group-approved checklist rows | 56 |
| Execution rows | 56 |
| Screen-item working cells | 168 |
| Compatibility plan cells | 15 |
| Official session-note files | 5 |
| Reference-source rows | 14 |

All live execution, participant, screenshot, device, timestamp, SUS response, and
Google Form evidence remains `BLOCKED` or `TODO-HUMAN-EVIDENCE` until supplied by
the student. The migration does not convert planned data into completed results.
