# AI Critique

During this assignment, I used OpenAI Codex to structure the testing package,
reconcile results, calculate metrics, and maintain consistency across the
reports. The tool accelerated repetitive work, but its output still required
careful human review.

The clearest numerical error appeared in the first SUS analysis. The AI treated
the raw response total as the SUS contribution total instead of reverse-scoring
the even-numbered items. For example, participant P02 answered 4 to every item
and was initially assigned an incorrect score of 80. After checking the official
SUS formula, I corrected P02's score to 50 and recalculated the overall mean as
68.5.

The AI also initially created a separate usability finding, `UF-001`, for the
Reset Password problem. This duplicated the already confirmed functional bug
`C3-RESET-001`. I removed `UF-001` and kept the Task 2 result as a conclusion
showing that all five participants were blocked by the same product defect.
Likewise, the mobile overflow noted during Task 3 had to be checked against the
general bug register and consolidated as `C1-RESPONSIVE-001`.

Another weakness was over-scaffolding. The AI produced placeholders for reviewer
metadata, exact browser versions, pilot details, recordings, and evidence fields
that were not required for my final submission. It also proposed audit fields
such as verdict and reasoning even though I only needed the AI tool, date/time,
prompt, and output. I removed these sections and synchronized the supporting
files with the main report.

Overall, AI was valuable for organization and consistency checks, but I did not
accept its output automatically. Formula verification, duplicate detection,
scope control, and final evidence decisions remained my responsibility.
