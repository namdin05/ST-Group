---
name: record-ai-audit
description: Record an AI interaction after a user asks to log a prompt/output, generate a four-field audit entry, update the HW03 prompt log, or prepare/update the AI Audit Report. Use for privacy-checked logging of the AI tool name, date/time, verbatim prompt, and AI output.
---

# Record AI Audit

Preserve the source exactly and keep the audit factual. Read
[references/audit_schema.md](references/audit_schema.md) before writing an entry.

## Required inputs

Obtain:

- interaction/artifact ID or permission to allocate the next stable ID;
- AI tool name;
- real date/time, when available;
- verbatim user prompt;
- verbatim AI output or a labelled allowed external-artefact reference.

Use explicit TODO fields for unavailable metadata. Do not guess.

## Workflow

1. Scan the source for credentials, secrets, recordings, and unmasked participant
   PII. Stop and request a student-redacted source if detected.
2. Allocate a stable `AI-###` ID or reject a duplicate.
3. Preserve prompt and output verbatim. Do not clean up, shorten, or paraphrase.
   For long content, split it into ordered files and link every part; never
   silently truncate.
4. Create one four-field entry under `AI/audit_entries/`.
5. Add one index row to `AI/prompt_log.md` without duplicating the ID.
6. Update `AI/ai_audit_report.md` with the same factual index fields.
7. Preserve the assignment disclosure and keep any separate course-required
   critique outside the audit-entry schema.

## Deterministic helper

Prepare a UTF-8 JSON input matching the reference schema, then run:

```text
python scripts/append_audit_entry.py --root <repository-root> --input-json <interaction.json>
```

Use `--id AI-###` to require a specific ID and `--dry-run` to validate without
writing. The script rejects duplicates and likely sensitive data. Review its
output before finalizing.

## Safeguards

- Never infer a timestamp or output.
- Never replace unavailable verbatim output with an unlabeled summary.
- Never expose passwords, tokens, private recordings, or unmasked contacts.
