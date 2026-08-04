# Checklist AI Prompts

This file separates prompts that are known to have been used from reusable
templates that have not yet been run. Do not relabel a template as an interaction.

## Known prior interaction

Source before spreadsheet removal: cached `AI Prompts` sheet in the supplied
macro-enabled workbook. The source hash and Markdown destination are recorded in
the repository migration notes.

> Đây là bài tập HW03 của tôi, bạn hãy hướng dẫn cho nhóm tôi và tôi hoàn thành đầy đủ bài tập này. AI Agent mà tôi sử dụng: Codex. Link website mới: https://prod-dev.ems-fitus.cloud/

- Stage: Kickoff / requirements analysis
- Tool: OpenAI Codex
- Date recorded in source: 2026-07-30

## Preserved template prompts — not evidence of use

### Checklist critique

> Audit the attached EMS GUI checklist against Nielsen's 10 heuristics, Norman's principles, Shneiderman's 8 golden rules, WCAG 2.2, and IA-01..IA-04. Do not invent EMS behavior. Return only: duplicates, ambiguous/non-testable items, uncovered risks, and proposed rewrites. Tag every proposal as AI-generated.

### Checklist execution review

> Review my completed checklist execution for [SCENARIO] on [SCREEN 1], [SCREEN 2], and [SCREEN 3]. Use only the Passed/Failed values, notes, and screenshot references I provide. Flag contradictions, missing failure reasons, duplicate bug IDs, and claims not supported by evidence. Do not change test results or invent observations.

### Final compliance audit

> Perform a requirement-by-requirement audit of my HW03 package against the course brief. For each requirement, return PASS, FAIL, or BLOCKED and cite the exact artifact/evidence path. Check cross-consistency among the main report, findings log, Google Form timestamps, screenshot references, AI audit, prompt log, README summary, and Git commit log. Do not fill missing evidence.

If any template is used later, copy it verbatim into `AI/prompt_log.md` with the
real tool name, date/time, prompt, and AI output.
