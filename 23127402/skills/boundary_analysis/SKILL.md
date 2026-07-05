# Skill: Boundary Value Analysis Into MainReport.md

## Purpose

Use this skill when writing or updating the **Boundary Value Analysis (BVA)** sections in `MainReport.md`. This skill follows the BVA methodology from `documents/S04_Domain_Testing.md` (Software Testing - CSC13003 lecture).

## Why BVA?

The program is more likely to fail at a boundary. Common error types:
- **Inequalities mis-specified** (e.g., `INPUT <= 25` instead of `< 25`) — detectable only at boundary.
- **Boundary value mistyped** (e.g., `INPUT < 52` instead of `< 25`, transposition error) — detectable at boundary and any value handled incorrectly.

Boundary values catch ALL two errors; non-boundary values may catch NONE.

## Workflow

### Step 1: Identify Boundary Limits

For each ordered/numeric variable in the feature, identify:
- **Lower Bound (LB):** minimum valid value
- **Upper Bound (UB):** maximum valid value
- **Single bound** (e.g., `price > 0`, `count >= 1`)

### Step 2: Define Boundary Test Values

For each boundary threshold, select values at these positions:

```
LB-1    LB    LB+1    ...    UB-1    UB    UB+1
  1      2      3               7       8      9
```

| Position Label | Meaning | Classification |
|---|---|---|
| **LB-1** (Min-1) | Just below lower bound | Invalid |
| **LB** (Min) | Exactly at lower bound | Valid |
| **LB+1** (Min+1) | Just above lower bound | Valid |
| **UB-1** (Max-1) | Just below upper bound | Valid |
| **UB** (Max) | Exactly at upper bound | Valid |
| **UB+1** (Max+1) | Just above upper bound | Invalid |

For a **single bound** (e.g., `price > 0`):

| Position | Value | Classification |
|---|---|---|
| Min-1 | 0 | Invalid |
| Min | 1 | Valid |
| Min+1 | 2 | Valid |

For a **two-sided range** (e.g., `-99 <= A <= 99`), the full set is:

| Position | Value | Type |
|---|---|---|
| LB-1 (A < -99) | -100 | Invalid |
| LB (A = -99) | -99 | Valid |
| LB+1 (A = -98) | -98 | Valid |
| UB-1 (A = 98) | 98 | Valid |
| UB (A = 99) | 99 | Valid |
| UB+1 (A > 99) | 100 | Invalid |

### Step 3: Write Boundary Value Identification Section

For each variable, document its boundaries:

```markdown
* `VariableName` (description of constraint):
  * Just-below (Min-1): value (Invalid)
  * At boundary (Min): value (Valid)
  * Just-above (Min+1): value (Valid)
  * Just-below (Max-1): value (Valid)
  * At boundary (Max): value (Valid)
  * Just-above (Max+1): value (Invalid)
```

### Step 4: Write BVA Test Case Table

Use the table format with these columns:
- **Test Case ID** — unique ID per feature
- **Scenario / Description** — short description
- **Test Inputs** — the input values used
- **Expected Result** — what should happen
- **Testing Technique** — must be `BVA`
- **Pass/Fail Criteria** — both pass and fail conditions

**Example BVA table from S04 (A: -99 <= A <= 99, B: -99 <= B <= 99):**

| # | Partition Tested | Input 1 (A) | Input 2 (B) | Expected Output |
|---|---|---|---|---|
| TC1 | A < -99 | -100 | 9 | Invalid Input |
| TC2 | -99 <= A <= 99 (LB) | -99 | 9 | 90 |
| TC3 | -99 <= A <= 99 (LB+1) | -98 | 9 | 89 |
| TC4 | -99 <= A <= 99 (UB-1) | 98 | 9 | 107 |
| TC5 | -99 <= A <= 99 (UB) | 99 | 9 | 108 |
| TC6 | A > 99 | 100 | 9 | Invalid Input |
| TC7 | B < -99 | -10 | -100 | Invalid Input |
| TC8 | -99 <= B <= 99 (LB) | 10 | -99 | -89 |
| TC9 | -99 <= B <= 99 (LB+1) | 10 | -98 | -88 |
| TC10 | -99 <= B <= 99 (UB-1) | 10 | 98 | 108 |
| TC11 | -99 <= B <= 99 (UB) | 10 | 99 | 109 |
| TC12 | B > 99 | 10 | 100 | Invalid Input |

**Example BVA table format for MainReport.md:**

```markdown
##### BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FRxx-BVA-001** | Description of the test | `Variable` = "value" | What should happen | BVA | **Pass:** ...<br>**Fail:** ... |
```

## Apply to MainReport.md

For each feature in MainReport, the BVA section should appear after the Domain Testing (EP) section:

```markdown
#### [Feature ID]: [Feature Name]

##### [EP Analysis + Test Cases — already covered by equivalence_analysis skill]

##### Boundary Value Identification
* `Variable1` (constraint):
  * Just-below (Min-1): value (Invalid)
  * At boundary (Min): value (Valid)
  * Just-above (Min+1): value (Valid)
  * Just-below (Max-1): value (Valid)
  * At boundary (Max): value (Valid)
  * Just-above (Max+1): value (Invalid)
* `Variable2` (constraint):
  * ... (similar structure)

##### BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FRxx-BVA-001** | Short description | `Input` = "value" | Expected result | BVA | **Pass:** ...<br>**Fail:** ... |
```

## Naming Conventions

- BVA test cases: `TC-FRxx-BVA-001`, `TC-FRxx-BVA-002`, ...
- Use 3-digit sequence numbers, incrementing per feature.
- Use Vietnamese for system error messages when the application uses Vietnamese.

## Writing Rules

- Use the exact feature ID from the summary table (`FR-03`, `FR-09`, `FR-15`, `FR-05`).
- Keep descriptions concise and based on test case requirements.
- Expected result must clearly state what the system should do.
- Pass/Fail criteria must specify both pass and fail conditions.
- Testing Technique column must be `BVA`.
- Use markdown tables with consistent column alignment.
- Use `₫` for currency formatting.

## Source

Lecture slides: `documents/S04_Domain_Testing.md` — Software Testing CSC13003, Domain Testing, Boundary Value Analysis section.
