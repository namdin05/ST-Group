---
name: record-ai-audit
description: Record an AI interaction after a user asks to log a prompt/output, generate a five-part audit entry, update the HW03 prompt log, or prepare/update the AI Audit Report. Use for verbatim, privacy-checked logging and confirmed-verdict metrics without evaluating the AI on the student's behalf.
---

# Record AI Audit

Preserve the source exactly and separate factual logging from student evaluation.
Read [references/audit_schema.md](references/audit_schema.md) before writing an
entry.

## Required inputs

Obtain:

- interaction/artifact ID or permission to allocate the next stable ID;
- AI tool and model, when known;
- real date/time, when available;
- stage/task and affected artifact;
- verbatim user prompt;
- verbatim AI output or a labelled allowed external-artefact reference;
- optional student-supplied verdict, reasoning citation, and correction.

Use explicit TODO fields for unavailable metadata. Do not guess.

## Workflow

1. Scan the source for credentials, secrets, recordings, and unmasked participant
   PII. Stop and request a student-redacted source if detected.
2. Allocate a stable `AI-###` ID or reject a duplicate.
3. Preserve prompt and output verbatim. Do not clean up, shorten, or paraphrase.
   For long content, split it into ordered files and link every part; never
   silently truncate.
4. Create one five-part entry under `AI/audit_entries/`.
5. Add one index row to `AI/prompt_log.md` without duplicating the ID.
6. Leave `Verdict`, `Reasoning`, and `Student Fix` as human-owned TODOs unless the
   student supplies them. Confirmed verdicts are only `VALID`, `INVALID`, or
   `INCOMPLETE`; correct the legacy transposed-letter misspelling without changing
   meaning.
7. Update `AI/ai_audit_report.md` and calculate counts/percentages from confirmed
   verdicts only. Exclude TODO entries from the denominator.
8. Preserve the assignment disclosure and keep the 200–300 word critique
   separate.

## Deterministic helper

Prepare a UTF-8 JSON input matching the reference schema, then run:

```text
python scripts/append_audit_entry.py --root <repository-root> --input-json <interaction.json>
```

Use `--id AI-###` to require a specific ID and `--dry-run` to validate without
writing. The script rejects duplicates and likely sensitive data. Review its
output before finalizing.

## Safeguards

- Never infer a model name, timestamp, link, verdict, citation, or correction.
- Never count TODO reviews as evaluated.
- Never replace unavailable verbatim output with an unlabeled summary.
- Never expose passwords, tokens, private recordings, or unmasked contacts.
