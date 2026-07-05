# Skill: Write Bug Analysis Into BugReport.md

## Purpose

Use this skill when adding or updating a bug analysis in `BugReport.md`, especially for bugs following the format `BUG-FRxx-yy`.

## Workflow

### Step 1: Check Existing Bug Report

Open `BugReport.md` and check whether the bug ID already exists in the summary table.

### Step 2: Search Related Test Cases

Search related test cases in `testcase.md` or `MainReport.md` using the feature ID, for example `FR03`, `TC-FR03`, or the bug behavior keyword.

### Step 3: Add or Update Summary Table Row

If the bug ID is missing from the summary table, add a new row using this format:

```markdown
| BUG-FRxx-yy | FR-xx: Feature Name | Short bug title. | `[Insert GitHub Issue link here]` |
```

### Step 4: Add Detailed Bug Section

Add or update the detailed bug section below the existing related bug sections. Use the bug section template below.

## Bug Section Template

```markdown
---

## BUG-FRxx-yy - Clear bug title

---
### 1. Metadata
* **Feature Under Test:** FR-xx: Feature Name
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> Describe the defect clearly. Mention the violated requirement or related test case. Explain why the behavior is incorrect and how it affects the user or system.

### 3. Steps to Reproduce
1. Go to the relevant EShop page.
2. Perform the user action that reaches the feature under test.
3. Enter the required test data.
4. Submit or trigger the action.
5. Observe the incorrect behavior.

### 4. Expected Result
* State what the system should do.
* Include the expected validation message, redirect, generated value, or blocked action.
* Mention that invalid requests should not be processed when applicable.

### 5. Actual Result
* State what the system actually does.
* Explain the incorrect output, missing validation, wrong message, failed redirect, or failed process.
* Mention user impact when useful.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-frxx-yy-screenshot.png)`
```

## Severity Guide

* **Critical:** Security issue, data loss, checkout/payment failure, or complete feature failure.
* **Major:** Core requirement fails, validation is missing, or user cannot complete an important flow.
* **Minor:** UI issue, missing indicator, wording issue, or non-blocking navigation/usability problem.

## Priority Guide

* **High:** Must be fixed soon because it blocks a requirement, affects security, or causes incorrect processing.
* **Medium:** Should be fixed because it affects usability or clarity but has a workaround.
* **Low:** Cosmetic or low-impact issue.

## Apply to BugReport.md

Each bug entry in `BugReport.md` should follow this structure:

```markdown
## BUG-FRxx-yy - Clear bug title

---
### 1. Metadata
* **Feature Under Test:** FR-xx: Feature Name
* **Severity:** [Critical / Major / Minor]
* **Priority:** [High / Medium / Low]
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> ...

### 3. Steps to Reproduce
1. ...

### 4. Expected Result
* ...

### 5. Actual Result
* ...

### 6. Evidence
* **GitHub Issue Link:** `...`
* **Screenshot/Video:** `...`
```

## Naming Conventions

- Bug ID: `BUG-FRxx-yy` (e.g., `BUG-FR03-08`)
- Use 2-digit sequence numbers after the feature ID.
- Screenshot filenames: lowercase, aligned with bug ID (e.g., `bug-fr03-08-screenshot.png`)
- Use Vietnamese for system error messages when the application uses Vietnamese.

## Writing Rules

* Keep the section structure consistent with the existing report.
* Use clear expected and actual results based on the test case requirement.
* Add evidence placeholders using the bug ID in the screenshot filename.
* Verify the final markdown formatting after editing.
* Use the exact bug ID format from the summary table.
* Keep feature naming consistent, for example `FR-03: Forgot Password & Password Reset`.
* Keep descriptions factual and test-focused.
* Do not invent GitHub issue links; keep the placeholder if no link is provided.
* Use Vietnamese validation messages when the test case expects Vietnamese text.

## Example

```markdown
## BUG-FR03-08 - Password with space characters is accepted during reset

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the password reset step, the system accepts a new password that contains space characters. Password validation should reject whitespace characters because they can make passwords ambiguous and inconsistent with password rules.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Request an OTP with a valid registered email.
4. Enter a correct OTP.
5. Enter `Abcd 123!` as the new password and confirm password.
6. Submit the reset form.

### 4. Expected Result
* The system should reject passwords that contain space characters.
* A clear validation message should be displayed, such as `Mật khẩu không được chứa khoảng trắng`.

### 5. Actual Result
* The system accepts a password that contains a space character.
* The password reset request is processed even though the password is invalid.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-08-screenshot.png)`
```

## Source

This skill is based on the bug report format used in `BugReport.md` for the EShop system. Testing methodology follows the Domain Testing lecture (CSC13003 - Software Testing).
