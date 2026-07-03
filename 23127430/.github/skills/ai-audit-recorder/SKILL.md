# SKILL: Automated Verbatim AI Audit Logger

## Purpose
Automatically scan the active chat session history to extract the most recent interaction (User Prompt and AI Response) and format it verbatim into a structured row for the AI Audit Report, leaving evaluation fields open for subsequent manual human review.

## Strict Restrictions (Core Compliance)
- **Verbatim Preservation:** You MUST extract and output the user's prompt and the AI's response completely verbatim. Never paraphrase, summarize, shorten, or clean up the technical text.
- **No Timestamp Fabrication:** Set the timestamp to the current real date format `2026-07-03` with a placeholder for exact hours `[HH:MM]`.
- **No Self-Generated Verdicts:** Do NOT evaluate your own output. You must set the Student Verdict field to a pending status and leave placeholders `[ ]` for the student to fill in manually later.
- **Single Interaction Scope:** One trigger command extracts exactly ONE interaction block.

---

## Required Automated Row Output Schema
Whenever the user triggers this skill, immediately generate the following Markdown block (ready to be appended directly to `ai_logs/ai_critique_&_audit.md`):

### Audit Record: [Feature ID / Task Name - Auto-Generated]
- **Timestamp:** 2026-07-03 [HH:MM - Please adjust exact minutes if needed]
- **AI Tool & Interface:** GitHub Copilot Chat (Sidebar/Inline)
- **Student Verdict:** [ ] VALID  |  [ ] INVALID  |  [ ] INCOMPLETE *(Mark 'X' manually in markdown later)*

#### Raw Logs (Verbatim)
- **User Prompt:**
```text
[Insert EXACT verbatim user prompt from the current session here]
```
- **AI Raw Output:**
```text
[Insert EXACT verbatim AI output from the current session here]
```

#### Student Review & Interventions (For Manual Entry)
- **Student Reasoning:** 
  > *[Type your manual analysis here: Why was this output valid, invalid, or incomplete? What did the AI miss?]*
- **Human Corrections Made:**
  - [ ] No changes needed.
  - [ ] Manually refined existing test cases (Specify: _____________)
  - [ ] Manually added new test cases / fixed boundaries (Specify: _____________)

---

## Trigger Commands
- **Command:** `Extract Session Row`, `Xuất Audit Log`, hoặc `@SKILL.md Auto-Record`
- **Expected Action:** Instantly look at the immediate previous prompt and response, inject them into the raw text blocks above, and output the result. Do not ask follow-up questions.