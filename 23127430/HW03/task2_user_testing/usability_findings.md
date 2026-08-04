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

## SUS-derived usability signals

The official mean SUS is **68.5/100**. The recorded responses consistently
support perceived ease of use, learnability, and confidence: Q1, Q3, Q7, and Q9
all have a mean response of 4.0. The clearest caution is cumbersomeness (Q8 mean
3.4), followed by a mixed inconsistency signal (Q6 mean 2.8). P02's score of 50
comes from answering `4` to every positive and negative statement, so it is
reported cautiously rather than converted into a specific interface finding.

These SUS-derived attitudes do not create a separate bug/finding ID. The
participant-level and item-level derivation is documented in
[sus_responses.md](sus_responses.md).

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

No separate participant-derived finding ID is claimed.

## Remaining submission action

- Complete the manual Google Form submission for `C3-RESET-001`.
