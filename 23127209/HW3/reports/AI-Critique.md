# AI Critique

The AI was useful for turning a long assignment specification into a structured
Scenario D workflow, mapping 56 checklist items across four screens, and maintaining
consistent finding fields. It also helped identify accessibility problems that are
easy to miss during mouse-only testing, such as an unnamed request-type control,
validation focus remaining on the submit button, and the generic attachment label
`attachment_1`. However, its first analysis was incomplete. It initially treated
several visually plausible behaviours as passes before every required interaction
had been executed. This happened because a language model tends to generalise from
the visible interface and common design patterns, while a tester must require direct
evidence for each state. The process was corrected by introducing a `Pending` state
and refusing to convert it to Pass without a live observation.

The AI also could not independently provide genuine compatibility evidence for
macOS, iOS, Android, Safari, Firefox, Edge, Opera, tablets, or phones. Simulating
those results or editing screenshots would violate the assignment's evidence rules.
Similarly, it could not supply the group's original checklist-generation prompts
because they were not present in the workspace. Reconstructing them would create a
false audit history. A generated PNG was used only as neutral upload input and was
explicitly separated from live EMS screenshots.

The main lesson is that AI should organise testing and challenge assumptions, not
act as the source of truth. Every Pass, screenshot, participant, browser cell, form
timestamp, and Git commit must correspond to a real execution. Human review remains
necessary for severity, scope decisions, and final submission integrity.

A later pass reinforced this rule: automated keyboard events and Export-download
capture were inconclusive, so those cells stayed Pending. In contrast, numeric
contrast ratios, direct 320 CSS px overflow measurements, and repeatable navigation
state checks were strong enough to update the checklist and add two findings. The
320 px browser viewport was documented only as a reflow test, never as genuine phone
or mobile-browser compatibility evidence.

The final automated pass also exposed an important limit of automation coverage.
Computed styles, exact viewport dimensions, alert semantics, and authentication
redirects were deterministic. In contrast, the available browser surface did not
support request interception, produced no capturable Excel download, and could not
faithfully reproduce a physical keyboard Tab sequence. The report therefore closes
only deterministic cells and retains Pending for the rest instead of treating tool
limitations as product failures.
