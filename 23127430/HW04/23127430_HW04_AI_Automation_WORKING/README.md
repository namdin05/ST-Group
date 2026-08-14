# HW04 - AI Automation Testing

## 1. Assignment Information

- **Student ID:** 23127430
- **Student name:** Đinh Hoàng Nam
- **Assignment:** HW04 - AI Automation Testing
- **Framework:** Playwright + TypeScript
- **Self-assessed grade:** 100/100

## 2. Selected Features

| Pool | Feature ID | Feature name |
| ---- | ---------- | ------------ |
| A | FR-01 | Account Registration |
| B | FR-07 | Shopping Cart |
| C | FR-13 | Dashboard |

## 3. Public GitHub Repository

- **Repository:** [namdin05/ST-Group](https://github.com/namdin05/ST-Group)
- **Submission branch:** [`23127430-HW04`](https://github.com/namdin05/ST-Group/tree/23127430-HW04)
- **HW04 directory:** [23127430_HW04_AI_Automation_WORKING](https://github.com/namdin05/ST-Group/tree/23127430-HW04/23127430/HW04/23127430_HW04_AI_Automation_WORKING)

## 4. Test Summary

| Metric | Value |
| ------ | ----- |
| Number of features | 3 |
| Designed test cases | 46 |
| Automated test cases | 46 (FR-01: 18; FR-07: 14; FR-13: 14) |
| Executed test cases | 46 unique cases / 138 primary browser executions |
| Passed executions | 54 (FR-01: 21; FR-07: 9; FR-13: 24) |
| Failed executions | 84 (FR-01: 33; FR-07: 33; FR-13: 18) |
| Browser runs | 9 primary feature-browser runs |
| Human-confirmed issues for selected features | 17 (FR-01: 9; FR-07: 7; FR-13: 1) |
| Task 2 demo video | [YouTube](https://youtu.be/8xCs55BQZdI) |
| Agent Skill video | [YouTube](https://youtu.be/s8mPdyEnvX8) |

A failed execution is not automatically a genuine SUT bug. The 17 confirmed issues above are the selected-feature entries documented with GitHub Issue links in [`bug_report.md`](bug_report.md).

## 5. Multi-browser HTML Reports

| Feature | Chromium | Firefox | WebKit |
| ------- | -------- | ------- | ------ |
| FR-01 | [7 PASS / 11 FAIL](html-reports/fr01/chromium/index.html) | [7 PASS / 11 FAIL](html-reports/fr01/firefox/index.html) | [7 PASS / 11 FAIL](html-reports/fr01/webkit/index.html) |
| FR-07 | [3 PASS / 11 FAIL](html-reports/fr07/chromium/index.html) | [3 PASS / 11 FAIL](html-reports/fr07/firefox/index.html) | [3 PASS / 11 FAIL](html-reports/fr07/webkit/index.html) |
| FR-13 | [8 PASS / 6 FAIL](html-reports/fr13/chromium/index.html) | [8 PASS / 6 FAIL](html-reports/fr13/firefox/index.html) | [8 PASS / 6 FAIL](html-reports/fr13/webkit/index.html) |

Every canonical report contains `Run by: 23127430` and an ISO execution timestamp.

## 6. Bug Evidence

- [Bug report - Markdown](bug_report.md)
- [Bug report - PDF](bug_report.pdf)
- [Bug screenshot](bug_screenshot.png)
- Confirmed selected-feature issues: FR-01 (9), FR-07 (7), FR-13 (1).
- Other reproducible failures remain candidates until a matching human-reviewed GitHub Issue exists.

## 7. Demonstration Videos

- **Task 2 - end-to-end automation demonstration:** [https://youtu.be/8xCs55BQZdI](https://youtu.be/8xCs55BQZdI)
- **Agent Skill - complete feature demonstration:** [https://youtu.be/s8mPdyEnvX8](https://youtu.be/s8mPdyEnvX8)

## 8. Agent Skills and AI Records

- **Automation skill:** [`agent-skill/SKILL.md`](agent-skill/SKILL.md)
- **AI audit skill:** [`audit-skill/SKILL.md`](audit-skill/SKILL.md)
- **AI Audit Report:** [`ai_audit_report.md`](ai_audit_report.md)
- **AI Critique:** [`ai_critique.md`](ai_critique.md)

The recorded demonstrations cover data-driven generation, selector inspection, synchronization fixes, isolation, multi-browser execution, evidence verification, and audit logging.

## 9. Required Deliverables

- [Main report](main_report.md)
- [AI Critique](ai_critique.md)
- [AI Audit Report](ai_audit_report.md)
- [Git commit log](git_commit_log.txt)
- [Automation tests](automation/tests/)
- [External test data](automation/test-data/)
- [Multi-browser HTML reports](html-reports/)
- [Main report - PDF](output/pdf/main_report.pdf)
- [AI Critique - PDF](output/pdf/ai_critique.pdf)
- [AI Audit Report - PDF](output/pdf/ai_audit_report.pdf)

## 10. Self-assessment

| Criteria | Maximum score | Self-assessed score | Rationale |
| -------- | ------------: | ------------------: | --------- |
| Task 1 - Pool A: FR-01 | 25 | 25 | 18 data-driven UI/API cases, three canonical browser reports, reviewed defects, and explicit AI-gap analysis are included. |
| Task 1 - Pool B: FR-07 | 25 | 25 | 14 isolated cases, three canonical browser reports, confirmed issues, and selector/state corrections are documented. |
| Task 1 - Pool C: FR-13 | 25 | 25 | 14 UI/API cases, controlled fixtures, three canonical browser reports, and synchronization/assertion corrections are documented. |
| Task 2 - Demo video | 15 | 15 | Unlisted YouTube link supplied for the end-to-end demonstration. |
| Agent Skill | 10 | 10 | Reusable automation/audit skills and a separate demonstration video are included. |
| **Total** | **100** | **100** | Student's final evidence-backed self-assessment. |
