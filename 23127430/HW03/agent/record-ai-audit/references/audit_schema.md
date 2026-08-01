# AI Audit Entry Schema

## JSON input

```json
{
  "tool": "REAL TOOL OR TODO-HUMAN-EVIDENCE",
  "model": "REAL MODEL OR TODO-HUMAN-EVIDENCE",
  "datetime": "REAL ISO-8601 VALUE OR TODO-HUMAN-EVIDENCE",
  "stage": "Task/stage",
  "artifact": "Affected artifact",
  "prompt": "Verbatim user prompt",
  "output": "Verbatim AI output",
  "output_ref": null,
  "verdict": null,
  "reasoning": null,
  "student_fix": null
}
```

Supply exactly one of `output` or `output_ref`. `output_ref` must be explicitly
labelled as an external artefact/reference; it is not a verbatim output.

## Five required Markdown sections

1. **Prompt + Tool**
   - ID, tool/model, real date/time or TODO, stage/artifact, verbatim prompt.
2. **AI Output**
   - Verbatim output, ordered part links, or labelled external reference.
3. **Verdict**
   - Student-owned `VALID`, `INVALID`, or `INCOMPLETE`; otherwise
     `TODO-HUMAN-REVIEW`.
4. **Reasoning with Course/ISTQB/Standard Reference**
   - Student-owned reasoning and precise citation; otherwise TODO.
5. **Student Fix**
   - Verbatim correction or explicit no-change decision; otherwise TODO.

## Summary rule

`evaluated = VALID + INVALID + INCOMPLETE`.

For each confirmed verdict:
`percentage = verdict count ÷ evaluated × 100`.

When `evaluated = 0`, show `0.0%` and state that no entry has been evaluated.
Never include TODO entries in the denominator.

## Privacy gate

Reject likely credentials, bearer tokens, API keys, unmasked email addresses,
telephone numbers, or recording payloads. The student must redact the source;
the skill must not transform sensitive input into a supposedly safe copy.
