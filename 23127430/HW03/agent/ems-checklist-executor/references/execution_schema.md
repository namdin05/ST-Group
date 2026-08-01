# EMS Checklist Execution Schema

## Checklist table

Required columns:

| Column | Rule |
| --- | --- |
| `ID` | Unique ID matching `IA01-01` style |
| `IA` | One of IA-01, IA-02, IA-03, IA-04 |
| `Checklist Item` | Nonblank, testable criterion |
| `Origin` | `AI Draft`, `AI-Assisted Review`, or `Human Added` |
| `Human review` | Review state or traceable review note |

The final table must have more than 40 nonblank items and cover every IA.

## Execution table

Required base columns:

`ID` · `Checklist Item`

For every exact screen code `<S>`, add:

`<S> Status` · `<S> Failure Reason` · `<S> Screenshot Ref` · `<S> Bug ID`

Example for C1:

| ID | Checklist Item | C1 Status | C1 Failure Reason | C1 Screenshot Ref | C1 Bug ID |
| --- | --- | --- | --- | --- | --- |
| IA01-01 | Alignment criterion | BLOCKED | `TODO-HUMAN-EVIDENCE` | `TODO-HUMAN-EVIDENCE` | — |

## Status rules

- Final: only `Passed` or `Failed`.
- Working: `BLOCKED` is allowed but blocks finalization.
- `Failed` requires a non-placeholder failure reason, real screenshot reference,
  and stable bug ID.
- `Passed` does not require a screenshot.
- A status cannot be inferred from an expected result, filename, or another
  screen.

## Bug table

| Bug ID | Screen | Preconditions | Reproduction Steps | Expected | Actual | Severity Candidate | Screenshot Ref | Google Form Status | Retest Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Bug IDs must be unique. A candidate such as the reported missing Reset Password
action remains `Evidence Required` until reproduced.

## Screenshot convention

Task 1 failure:
`task1_<screen>_<bug-id>_<sequence>.<ext>`.

The reference must resolve to a real SUT capture. Synthetic fixtures used to test
the validator must stay outside evidence folders and be clearly labelled.
