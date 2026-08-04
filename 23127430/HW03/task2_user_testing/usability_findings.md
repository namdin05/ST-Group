# Task 2 — Usability Conclusion and Recommendations

## Evidence boundary

This analysis uses only the de-identified structured session notes, the supplied
SUS responses, and genuine SUT evidence already captured for Task 1B. The linked
recordings were not opened or analysed by AI. The separate pilot is not included
in any official-session aggregate.

## Results overview

| Measure | Result |
| --- | ---: |
| Official participants | 5 |
| Available-task success | 5/5 (100%) |
| Reset Password completion | 0/5 (system-blocked) |
| Mean time | 60.0 seconds |
| Mean errors | 0.0 |
| Mean hesitations | 0.0 |
| Mean assistance | 0.0 |
| Mean SUS | 68.5/100 |

The five participants completed every available subtask without a recorded
error, hesitation, or moderator intervention. All five reached the same product
block at C3: the required Reset Password action was unavailable. Under the
predefined success rule, this is a system defect rather than participant
failure.

## Task 2 conclusion

All five participants were unable to complete the Reset Password goal because
the action was unavailable. This conclusion is supported by the
[session notes](sessions/) and the
[SUT screenshot](../findings/screenshots/failed/task1_C3_C3-RESET-001_01.png).
It is the observed Task 2 impact of the existing functional bug
`C3-RESET-001`, not a separate bug or usability-finding ID.

- Expected/user goal: an authorised administrator can locate Reset Password for
  the selected account, confirm the action, and receive secure completion and
  audit feedback.
- Observed behaviour: every participant note records failure at the Reset
  Password subtask. The independent Task 1B reproduction confirms that the row
  and Edit User dialog expose no Reset Password action.
- Classification: systemic product gap, not participant error.
- Existing functional bug: `C3-RESET-001`.

## Prioritised recommendations

1. **P0 — Restore the missing control.** Add a permission-controlled Reset
   Password action in a predictable location on the selected user’s row or
   detail/edit flow.
2. **P0 — Make the action safe and trustworthy.** Identify the affected account
   in a confirmation dialog, explain the consequence, default to Cancel, avoid
   disclosing credentials, show a clear success/failure message, and write an
   audit-log entry.
3. **P1 — Retest the repaired C3 flow.** Run a focused follow-up with real users
   and record structured think-aloud observations and clarity, recovery, speed,
   and trust probe answers.

No separate participant-derived finding ID is claimed. The supplied session
notes contain no structured friction observations or probe answers beyond the
common Reset Password block.

## Evidence gaps that still block a complete Task 2 submission

- The required separate pilot, procedural issue, and changes-after-pilot evidence
  are absent.
- Participant target profiles and device/browser environments are not separately
  documented.
- The notes state recording consent only; general informed/observation consent is
  not documented.
- The hesitation threshold was not fixed in the supplied plan before the
  sessions, so the reported zero hesitation count has a measurement limitation.
- Think-aloud observations and answers to the five neutral probes are not present
  in the supplied notes.
- A central access/retention record for the recordings is absent; public-sharing
  permission and access settings require human review.
- `C3-RESET-001` still requires manual Google Form submission and a real
  receipt/timestamp.
