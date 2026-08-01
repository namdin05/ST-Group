---
name: ems-checklist-executor
description: Run, apply, or execute an evidence-backed EMS GUI checklist on one or more named screens, prepare an unexecuted EMS checklist session, or audit a completed EMS checklist execution for structural and evidence gaps. Use when a user asks to test EMS screens with the shared checklist or review existing Passed/Failed results.
---

# EMS Checklist Executor

Prepare, execute, or audit the checklist without inventing live UI observations.
Read [references/execution_schema.md](references/execution_schema.md) before
creating or validating an execution file.

## Required inputs

Obtain:

- SUT URL and explicit test authorization;
- scenario and exact screen names;
- final shared-checklist path;
- execution-output path;
- evidence/screenshot folder;
- tester identity and environment when available.

If authorization or a required path is missing, stop the live run. Preparation
may continue with `BLOCKED` working statuses.

## Workflow

1. Validate that the checklist has more than 40 nonblank, unique items and covers
   IA-01 through IA-04.
2. Confirm the exact screens. For this repository, default only to C1, C2, and C3;
   do not add C4.
3. Select the mode:
   - **Prepare:** create rows and mark them `BLOCKED`; do not infer results.
   - **Execute:** require a real authorised run and directly observed evidence.
   - **Audit:** preserve tester-owned results and report structural gaps only.
4. Cover every final checklist item on every confirmed screen. Use `Passed` or
   `Failed` only when evidence supports the result. Keep `BLOCKED` for inaccessible,
   unobservable, or unexecuted working cells and stop finalization.
5. For each `Failed` cell, record a concise reason, expected and actual behaviour,
   severity candidate, stable bug ID, and real screenshot reference.
6. Accept or capture only genuine SUT screenshots. Never generate synthetic UI
   evidence or infer a result from a requirement or filename. Task 1 screenshots
   are required for failed items only.
7. Check contradictions, missing rows, unsupported statuses, duplicate IDs,
   blank failure reasons, and missing screenshot references. Never silently
   change a tester's result.
8. Run the deterministic validator and produce a human-review summary.

## Validation

Working scaffold:

```text
python scripts/validate_execution.py --checklist <checklist.md> --execution <execution.md> --screens C1 C2 C3 --allow-working-statuses
```

Final gate:

```text
python scripts/validate_execution.py --checklist <checklist.md> --execution <execution.md> --screens C1 C2 C3 --final
```

The validator checks structure and evidence fields. It never decides whether the
EMS interface passed.

## Safeguards

- Do not expose passwords, tokens, unmasked participant PII, or recordings.
- Do not convert a requirement, preliminary report, or expected behaviour into a
  Passed/Failed observation.
- Keep the Reset Password absence as `Evidence Required` until a real
  reproduction and screenshot exist.
- Return changed paths, counts, blockers, and items needing human review.
