---
name: audit-skill
description: Record a complete, verbatim user-AI interaction in the HW04 AI Audit Report using the actual AI tool name and real ISO 8601 timestamp. Use whenever the user explicitly invokes `$audit-skill` to perform a task and preserve its prompt and complete user-visible AI output, or asks to add or verify an AI audit interaction.
---

# HW04 AI Audit Conversation Logger

## Purpose

Record exactly one genuine AI interaction for each explicit invocation of `$audit-skill`. Keep audit logging independent from Playwright automation work.

## Inputs

- Capture the complete current user message that invoked `$audit-skill`.
- Identify the actual AI product in use.
- Obtain the actual current date, time, and timezone from the runtime.
- Use `../ai_audit_report.md` as the destination relative to this skill file.
- Capture every user-visible assistant message produced during the invocation.

## Preconditions

- Confirm that `../ai_audit_report.md` exists and is writable.
- Read all existing `AI Interaction` headings before selecting a number.
- Preserve every existing genuine interaction.
- If the prompt or planned output contains a credential, token, personal data, or another secret, pause and ask the user before storing it. Do not silently redact content required to be verbatim.

## Capture Boundary

- Store only the invoking user message in `Your prompt`.
- Store all user-visible assistant commentary and the final response, in chronological order, in `The AI output`.
- Exclude system instructions, developer instructions, hidden reasoning, hidden context, tool calls, and raw tool results unless they were explicitly displayed to the user.
- Treat each explicit invocation as one interaction, even when the task uses multiple tools.

## Workflow

1. Capture the invoking user message verbatim.
2. Maintain an exact transcript of user-visible assistant messages during the task.
3. Complete the requested task.
4. Draft the exact final response before updating the audit.
5. Obtain the real current timestamp with timezone in ISO 8601 format.
6. Use the real AI product name; use `Codex` when running in Codex.
7. Replace `AI Interaction 01` only when it is still the untouched `TBD` sample. Otherwise, append the next sequential interaction.
8. Format the prompt and complete output as Markdown blockquotes.
9. Save the audit record.
10. Re-read the saved record and verify the four fields, interaction number, timestamp, prompt, and output.
11. Send the already-drafted final response only after verification succeeds.
12. If writing or verification fails, report the failure and do not claim that the interaction was recorded.

## Required Interaction Format

Use exactly four fields:

```markdown
## AI Interaction NN

**Name of the AI tool:** <actual tool name>

**Date and time:** <actual ISO 8601 timestamp with timezone>

**Your prompt:**

> <complete verbatim user prompt>

**The AI output:**

> <complete verbatim user-visible AI output>
```

Prefix every prompt and output line with Markdown blockquote syntax while preserving the original text, order, blank lines, lists, and code blocks.

## Numbering Rules

- Keep interaction numbers sequential.
- Never overwrite, reorder, or renumber genuine historical entries.
- Use two digits for numbers 01 through 99.
- Resolve duplicate or malformed existing numbers through human review instead of silently rewriting history.

## Verification Rules

- Confirm that each interaction contains only `Name of the AI tool`, `Date and time`, `Your prompt`, and `The AI output`.
- Confirm that the stored prompt matches the invoking user message.
- Confirm that the stored output matches all user-visible assistant text for the invocation.
- Confirm that the timestamp came from the current runtime and includes a timezone offset.
- Confirm that no existing interaction changed.

## Safety and Anti-fabrication Rules

- Never invent, summarize, rewrite, translate, truncate, or silently redact a prompt or AI output.
- Never fabricate the AI tool name, timestamp, interaction, or execution evidence.
- Never store system instructions, developer instructions, hidden reasoning, or hidden tool data.
- Never overwrite genuine historical content.
- Never claim successful logging before re-reading and verifying the saved entry.
- Stop and request human direction when the destination, sensitive-data handling, or historical record is ambiguous.
