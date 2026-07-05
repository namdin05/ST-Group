# Skill: Equivalence Analysis (Domain Testing) Into MainReport.md

## Purpose

Use this skill when writing or updating the **Domain Testing (EP)** and **Boundary Value Analysis (BVA)** sections in `MainReport.md`. This skill follows the methodology from `documents/S04_Domain_Testing.md` (Software Testing - CSC13003 lecture).

## Workflow

### Step 1: Identify Input & Output Variables

- Based on program specification / feature description.
- List all input fields, parameters, or states that affect feature behavior.
- List expected output(s): success result, error message, redirect, etc.

### Step 2: Identify Equivalence Classes

Partition the value domain into **Valid** (acceptable inputs) and **Invalid** (inputs that should be rejected or handled gracefully).

| Condition Type | Valid Classes | Invalid Classes |
|---|---|---|
| **Range** (e.g., `1 <= count <= 999`) | 1 class (`1 <= count <= 999`) | 2 classes (`count < 1`, `count > 999`) |
| **Set of values** (e.g., `BUS, TRUCK, TAXI, PASSENGER, MOTORCYCLE`) | 1 class per value | 1 class (value not in set, e.g., `TRAILER`) |
| **"Must be"** (e.g., `first character must be a letter`) | 1 class (`it is a letter`) | 1 class (`it is not a letter`) |
| **Boolean/State** | 1 class (valid state) | 1 class (invalid state) |

> **Important:** If there is reason to believe elements in the same equivalence class are **NOT handled identically**, split into smaller classes.

**Examples from S04_Domain_Testing.md:**

```
Input: Enter a positive integer less than 100
- C1: is an integer
  → EC1: is an integer (valid)
  → EC2: not an integer (invalid)
- C2: (0, 100)
  → EC3: 0 < x < 100 (valid)
  → EC4: x <= 0 (invalid)
  → EC5: x >= 100 (invalid)

Valid: is an integer, 0 < x < 100
Invalid: is an integer + x <= 0; is an integer + x >= 100; not an integer
```

```
Input: A string of 7 characters, first character must be upper-case
Valid: Length = 7, first character is upper-case
Invalid: Length = 7 + first is lower-case; Length < 7; Length > 7
```

```
Input: Coordinate point (X,Y): 3 <= X <= 7, 5 <= Y <= 9
Valid: 3 <= X <= 7, 5 <= Y <= 9
Invalid: X < 3; X > 7; Y < 5; Y > 9
```

```
Input: Widget identifier — 3–15 alphanumeric chars, first two must be letters
Condition 1 (must be alphanumeric): EC1 valid, EC2 invalid
Condition 2 (range 3–15): EC3 valid (3–15), EC4 invalid (<3), EC5 invalid (>15)
Condition 3 (first two must be letters): EC6 valid, EC7 invalid

Valid: alphanumeric + 3-15 chars + first two are letters
Invalid: not alphanumeric; <3 chars; >15 chars; first two not letters
```

### Step 3: Select Test Cases

- **Valid classes:** Combine multiple valid classes into one test case for maximum coverage.
- **Invalid classes:** Each test case covers **ONLY ONE** invalid class (to isolate which condition causes the error).

**Example EP test case table from S04:**

| # | Partition Tested | Input 1 (A) | Input 2 (B) | Expected Output |
|---|---|---|---|---|
| TC1 | EC1 + EC5 + EC9 (-99<=A<=99, -99<=B<=99, SUM) | 10 | 9 | 19 |
| TC2 | EC2 (A < -99) + EC10 (Invalid) | -102 | 9 | Invalid Input |
| TC3 | EC3 (A > 99) | 102 | 9 | Invalid Input |
| TC4 | EC4 (A not integer) | Abc | 9 | Invalid Input |
| TC5 | EC6 (B < -99) | 10 | -200 | Invalid Input |
| TC6 | EC7 (B > 99) | 10 | 200 | Invalid Input |
| TC7 | EC8 (B not integer) | 10 | 1.25 | Invalid Input |

### Step 4: Boundary Value Analysis (BVA)

For each boundary of an ordered field, test the following positions:

```
Lower Boundary (LB):        LB-1    LB    LB+1
Upper Boundary (UB):        UB-1    UB    UB+1
```

Positions (from S04):
```
LB-1    LB    LB+1    ...    UB-1    UB    UB+1
  1      2      3               7       8      9
```

**Example from S04 (A: -99 <= A <= 99):**

| Position | Value | Type |
|---|---|---|
| LB-1 (A < -99) | -100 | Invalid |
| LB (A = -99) | -99 | Valid |
| LB+1 (A = -98) | -98 | Valid |
| UB-1 (A = 98) | 98 | Valid |
| UB (A = 99) | 99 | Valid |
| UB+1 (A > 99) | 100 | Invalid |

**Example BVA test case table from S04:**

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

## Apply to MainReport.md

For each feature in MainReport, follow this structure:

### 1. Analysis Section

```markdown
#### [Feature ID]: [Feature Name]

##### Analysis
* **Input Variables:**
  * `Variable1`: Type (description)
  * `Variable2`: Type (description)
* **Equivalence Classes:**
  * **Valid:**
    * `Variable1`: Valid class details.
    * `Variable2`: Valid class details.
  * **Invalid:**
    * `Variable1`: Invalid class details.
    * `Variable2`: Invalid class details.
```

### 2. Domain Testing (EP) Test Cases Table

```markdown
##### Domain Testing (EP) Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FRxx-EP-001** | Short description | `Input` = "value" | Expected result | EP | **Pass:** ...<br>**Fail:** ... |
```

### 3. Boundary Value Analysis Section

```markdown
##### Boundary Value Identification
* `Variable` (boundary description):
  * Just-below (Min-1): value (Invalid)
  * At boundary (Min): value (Valid)
  * Just-above (Min+1): value (Valid)

##### BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FRxx-BVA-001** | Short description | `Input` = "value" | Expected result | BVA | **Pass:** ...<br>**Fail:** ... |
```

## Naming Conventions

- EP: `TC-FRxx-EP-001`, `TC-FRxx-EP-002`, ...
- BVA: `TC-FRxx-BVA-001`, `TC-FRxx-BVA-002`, ...
- Use 3-digit sequence numbers, incrementing.
- Use Vietnamese for system error messages when the application uses Vietnamese.

## Writing Rules

- Use the exact feature ID from the summary table (`FR-03`, `FR-09`, `FR-15`, `FR-05`).
- Keep descriptions concise and based on test case requirements.
- Expected result must clearly state what the system should do.
- Pass/Fail criteria must specify both pass and fail conditions.
- Testing Technique column must be either `EP` or `BVA`.
- Use markdown tables with consistent column alignment.
- Use `₫` for currency formatting.

## Source

Lecture slides: `documents/S04_Domain_Testing.md` — Software Testing CSC13003, Domain Testing (Equivalence Partitioning + Boundary Value Analysis).
