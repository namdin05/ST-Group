# SKILL: AI Audit Appendix Generator (HW02 Section 9)

## Purpose

Generate an AI Audit Appendix entry that matches Section 9 of the HW02 assignment.

This skill is for documentation only. It records the AI interaction as evidence and does not assess the correctness of the content.

---

## Section 9 Alignment

The generated audit text must support the following assignment requirement:

- If AI was used, the report must state: "I use AI tools for the following tasks,"
- Each interaction must include:
	- the AI tool name
	- the date and time
	- the prompt
	- the AI output

When generating a report appendix, include the declaration line above the interaction log if the user asks for a full appendix structure.

If the user did not provide one of these items, use the placeholder:

```text
[TO BE FILLED BY STUDENT]
```

---

## Core Rules

### Rule 1 - No Evaluation

Do not decide whether the AI output is valid, invalid, complete, or incomplete.

Do not add verdicts, reasoning, corrections, or final assessments.

### Rule 2 - Verbatim Preservation

Preserve the supplied prompt and output exactly as received.

Do not paraphrase, summarize, clean up, or rewrite the content.

If the exact prompt or output is unavailable, use:

```text
[VERBATIM CONTENT NOT AVAILABLE]
```

### Rule 3 - No Invented Metadata

Do not invent timestamps, feature names, tool names, or any other metadata.

Only reuse metadata that was supplied by the user.

### Rule 4 - Long Output Handling

If the provided AI output is too long to preserve fully, keep the beginning and ending verbatim and insert:

```text
[CONTENT TRUNCATED DUE TO MODEL LIMIT]
```

in the middle.

Do not summarize omitted content.

---

## Expected Input Format

When invoked, the skill should receive three blocks in this order:

Prompt:

```text
[paste original prompt]
```

Output:

```text
[paste original AI response]
```

Optional Metadata:

```text
Feature: FR-06 Mobile Product Detail
Tool: GitHub Copilot Chat
Date: 2026-07-05 14:30
```

---

## Required Output Template

I use AI tools for the following tasks,

## AI Audit Record

### Metadata

| Field | Value |
|---|---|
| Feature | [TO BE FILLED BY STUDENT] |
| Tool | [TO BE FILLED BY STUDENT] |
| Timestamp | [TO BE FILLED BY STUDENT] |

---

### Original Prompt (Verbatim)

```text
[INSERT PROVIDED PROMPT HERE]
```

---

### AI Output (Verbatim)

```text
[INSERT PROVIDED AI OUTPUT HERE]
```

---

## Trigger Commands

Accepted trigger phrases:

- Generate Audit Record
- Create Audit Entry
- AI Audit
- Xuất AI Audit
- @AI_AUDIT

Expected action:

1. Read the supplied Prompt block.
2. Read the supplied Output block.
3. Generate the audit record template in English.
4. Preserve the prompt and output verbatim.
5. Leave all review fields for the student.
6. Do not perform any evaluation.