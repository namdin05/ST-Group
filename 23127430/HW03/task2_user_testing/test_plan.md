# Task 2 — User-Testing Plan

## Scope and starting state

- SUT: <https://prod-dev.ems-fitus.cloud/>
- Scenario: Scenario C — Admin manages users.
- Measured screens: C1, C2, C3 only.
- Starting state: **Admin → Users List**.
- Switching from the user interface to the admin interface is a pre-task setup and
  is outside the measured C1–C3 task unless separately reported.

## Goal-oriented participant scenario

> Starting from the Admin Users List, find the specified user and verify that it
> is the intended account. Assign the Event Organizer role, block the account,
> restore access by unblocking it, and then attempt to reset its password. Tell
> the moderator when you believe each requested account state has been saved.

This scenario states the goal and does not reveal click-by-click actions.

If the Reset Password action is genuinely unavailable, record that subtask as
`Blocked by system defect`; do not score it as participant failure. Capture proof
separately before confirming a defect.

## Participants and pilot

- Pilot: one extra participant; never include the pilot in the five-person
  aggregates.
- Official sessions: P01–P05, all real people outside class 23KTPM1 and matching
  the target administrator/event-management profile.
- Store only masked, verifiable contacts in submission artefacts. Keep the
  unmasked verification record outside AI tools.
- Obtain informed consent for observation and separate consent for recording.

## Moderator script

1. Confirm consent and explain that the product—not the participant—is being
   tested.
2. Confirm the start state at Admin → Users List without timing pre-task setup.
3. Read the goal-oriented scenario verbatim and ask the participant to think
   aloud.
4. Start timing when the participant begins the measured task.
5. Observe neutrally; do not lead. Use a neutral probe only when necessary.
6. Record assistance only when the participant is completely stuck and the
   moderator intervenes.
7. Stop timing at task completion, participant abandonment, or a system block.
8. Collect the ten SUS responses and open-ended probe answers.

## Operational measures

| Measure | Definition |
| --- | --- |
| Completed | All observable, available subtasks completed with the requested user state achieved and verified without moderator assistance. A separately proven system-blocked Reset Password subtask is excluded from blaming the participant and reported explicitly. |
| Partial | At least one available subtask is completed, but one or more available subtasks remain incomplete or require assistance. |
| Failed | No meaningful available goal is achieved, the participant abandons, or the moderator must perform the available task. |
| Time on task | Seconds from the first task action at Users List to the terminal state; record any system-block interval separately. |
| Error count | Distinct participant action that moves away from the goal, changes the wrong object/state, or requires recovery. Do not count a verified system defect as participant error. |
| Hesitation count | Observable pause of at least `TODO-HUMAN-EVIDENCE` seconds or an explicit uncertainty statement; the group must set the threshold before the pilot. |
| Assistance count | Each moderator intervention that gives task-relevant help. Neutral reminders to think aloud are not assistance. |
| Think-aloud | Participant verbalises expectations and interpretation while working; reminders must remain neutral. |

## Neutral probes

- Clarity: “Which part of the page or wording was least clear?”
- Recovery: “When something went wrong, what helped or blocked your recovery?”
- Speed: “Which step felt slower or more effortful than expected?”
- Trust: “At which point did you feel most or least confident that EMS had saved
  the correct state?”
- Improvement: “If you could change one thing in this flow, what would it be?”

## SUS questionnaire

Use a 1–5 scale from Strongly Disagree to Strongly Agree.

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use
   this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

Scoring: odd-item contribution = response − 1; even-item contribution = 5 −
response; SUS = contribution sum × 2.5. The pilot is excluded from official
aggregates.

## Evidence naming

- Notes: `sessions/P01_notes.md` … `P05_notes.md`.
- Recordings: keep private and list only access-controlled references. The
  supplied session notes currently contain the references; a central
  access/retention record is still required before final submission.
- Screenshots: `task2_<session>_<screen>_<finding-id>_<sequence>.<ext>`.
- Never upload raw contacts or recordings to an AI tool.
