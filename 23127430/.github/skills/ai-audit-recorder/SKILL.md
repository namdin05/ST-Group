# SKILL: AI Audit Record Generator (HW02 Compliant)

## Purpose

Generate a structured AI Audit Report entry from a provided AI interaction.

This skill is intended for HW02 evidence collection and audit documentation.

The goal is to preserve the original AI interaction as evidence and leave all evaluation activities to the student.

---

## Core Compliance Rules

### Rule 1 – No Self-Evaluation

The AI must NEVER:

- decide whether the output is VALID
- decide whether the output is INVALID
- decide whether the output is INCOMPLETE
- suggest likely verdicts

The verdict section must remain untouched for manual student review.

---

### Rule 2 – Verbatim Preservation

The AI must preserve all provided prompts and outputs exactly as received.

The AI must NEVER:

- paraphrase
- summarize
- simplify
- clean formatting
- remove content
- rewrite wording

If exact content is unavailable:

```text
[VERBATIM CONTENT NOT AVAILABLE]
```

must be used.

Never reconstruct missing content.

---

### Rule 3 – No Fabricated Metadata

The AI must NEVER invent:

- timestamps
- feature IDs
- bug IDs
- requirement IDs
- verdicts
- corrections

If information is unavailable:

```text
[TO BE FILLED BY STUDENT]
```

must be used.

---

### Rule 4 – Human Ownership

The following sections are reserved exclusively for the student:

- Verdict
- Reasoning
- Corrections
- Final Assessment

The AI must not populate them.

---

### Rule 5 – Long Output Handling

If the supplied AI output exceeds model limitations:

Preserve:

1. beginning section verbatim
2. ending section verbatim

Insert:

```text
[CONTENT TRUNCATED DUE TO MODEL LIMIT]
```

between them.

Do not summarize omitted content.

---

# Expected Input Format

When invoking this skill, provide:

Prompt:

```text
[paste original prompt]
```

Output:

```text
[paste original AI response]
```

Optional Metadata:

```text
Feature: FR-01 Web Registration
Tool: GitHub Copilot Chat
Date: 2026-07-03
```

---

# Required Output Template

## AI Audit Record

### Metadata

| Field | Value |
|---------|---------|
| Feature | [TO BE FILLED BY STUDENT] |
| Tool | [TO BE FILLED BY STUDENT] |
| Timestamp | [TO BE FILLED BY STUDENT] |

---

### Original Prompt (Verbatim)

```text
[INSERT PROVIDED PROMPT HERE]
```

---

### AI Output (Verbatim)

```text
[INSERT PROVIDED AI OUTPUT HERE]
```

---

### Student Review

#### Verdict

- [ ] VALID
- [ ] INVALID
- [ ] INCOMPLETE

#### Student Reasoning

> [TO BE FILLED BY STUDENT]

#### Human Corrections

> [TO BE FILLED BY STUDENT]

---

### Compliance Checklist

- [ ] Prompt preserved verbatim
- [ ] Output preserved verbatim
- [ ] No AI-generated verdict
- [ ] No AI-generated correction
- [ ] Human review completed

---

# Trigger Commands

Accepted trigger phrases:

- Generate Audit Record
- Create Audit Entry
- AI Audit
- Xuất AI Audit
- @AI_AUDIT

Expected action:

1. Read the supplied Prompt block.
2. Read the supplied Output block.
3. Generate the audit record template.
4. Preserve content verbatim.
5. Leave all review fields empty.
6. Do not perform any evaluation.