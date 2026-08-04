# AI Audit Entry Schema

## JSON input

```json
{
  "tool": "REAL TOOL OR TODO-HUMAN-EVIDENCE",
  "datetime": "REAL ISO-8601 VALUE OR TODO-HUMAN-EVIDENCE",
  "prompt": "Verbatim user prompt",
  "output": "Verbatim AI output",
  "output_ref": null
}
```

Supply exactly one of `output` or `output_ref`. `output_ref` must be explicitly
labelled as an external artefact/reference; it is not a verbatim output.

## Four required Markdown fields

1. **AI tool**
   - Real AI tool name.
2. **Date/time**
   - Real date/time or an explicit evidence-unavailable marker.
3. **Prompt**
   - Verbatim user prompt.
4. **AI output**
   - Verbatim output, ordered part links, or labelled external reference.

## Privacy gate

Reject likely credentials, bearer tokens, API keys, unmasked email addresses,
telephone numbers, or recording payloads. The student must redact the source;
the skill must not transform sensitive input into a supposedly safe copy.
