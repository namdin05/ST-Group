# AI Critique

AI was useful for converting a long assignment into a structured Scenario D
workflow, mapping 56 checklist items across four screens, and maintaining consistent
evidence references. It also highlighted accessibility problems that mouse-only
testing can miss, including unnamed controls, validation focus remaining on the
submit button, low contrast, and the generic attachment label `attachment_1`.

Its first analysis was nevertheless too optimistic. Some visually plausible
behaviors were initially treated as passes before the required interaction had
been executed. A language model can generalize from familiar interface patterns,
whereas a tester must require direct evidence for each state. The process was
corrected by adding `Pending` and refusing to convert it to Pass without a
repeatable observation.

AI could not provide genuine evidence for other operating systems, browsers,
tablets, or phones. A 320 CSS px viewport test can reveal reflow defects but is not
equivalent to a physical mobile environment. Likewise, automated keyboard events,
network interception, and Excel download capture were inconclusive, so those checks
remain Pending. Inventing results or editing screenshots would violate the
assignment's evidence rules.

The same integrity rule applies to audit history. The group's original
checklist-generation prompts are absent, and reconstructing them would create a
false record. Generated imagery was used only as neutral upload input and was kept
separate from EMS evidence.

Overall, AI should organize testing, expose assumptions, and automate deterministic
checks, not act as the source of truth. Every Pass, participant, browser cell,
form timestamp, screenshot, and commit must correspond to a real execution. Human
review remains necessary for severity, scope, and final submission integrity.
