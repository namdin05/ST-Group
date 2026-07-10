# Test Summary Report & Self-Assessment

This repository contains the software testing artifacts (Equivalence Partitioning, Boundary Value Analysis, Test Case Design, Bug Reports, and GitHub Issue templates) for the e-commerce platform.

---

## 1. Self-Assessment

The table below outlines the self-assessed grades based on the project's criteria:

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| **1** | Feature A (Domain + Boundary) | 25 | 25 |
| **2** | Feature B (Domain + Boundary) | 25 | 25 |
| **3** | Feature C (Domain + Boundary) | 25 | 25 |
| **4** | Feature D (Mobile, Domain + Boundary) | 15 | 15 |
| **5** | Agent Skills | 10 | 10 |
| | **Total** | **100** | **100** |

### Self-Assessment Justification:
* **Feature A (FR-02: Login & Lock Account - Grade: 25/25)**: Completed a thorough domain and boundary analysis. Identified 23 equivalence classes (10 valid, 13 invalid) and covered all with 10 standard test cases. Added 5 boundary value analysis test cases. Successfully captured all 4 failed test cases and documented them.
* **Feature B (FR-08: Checkout - Grade: 25/25)**: Completed complete equivalence partitioning (18 classes) and boundary value analysis (6 boundaries). Mapped all 5 failed checkouts from the bug report into 3 high-severity issues.
* **Feature C (FR-14: Category CRUD - Grade: 25/25)**: Analyzed category name length (BVA) and permissions. Generated 8 test cases covering 10 equivalence classes. Mapped 5 failed test cases into 4 distinct bugs.
* **Feature D (FR-04: Profile Management - Mobile - Grade: 15/15)**: Handled unique mobile phone validation criteria (starts with 0, 10-11 digits) with detailed boundary value checks. Documented client-side vs. backend validation mismatch. Consolidated 10 failed test cases into 4 clean issues.
* **Agent Skills (skill.md compliance - Grade: 10/10)**: Strict adherence to the 4-step technical process (Inputs/Outputs, Equivalence Partitioning, Best Representative Selection, BVA, and mitigating test blind spots).

---

## 2. Test Summary Report

This section provides a statistical overview of the testing process, covering test design, execution results, and bug logging.

### High-level Statistics

* **Number of Features Tested**: 4
  * [FR-02: Login & Lock Account]
  * [FR-04: Profile Management - Mobile]
  * [FR-08: Checkout]
  * [FR-14: Category CRUD]
* **Number of Test Cases Designed**: 44
* **Number of Test Cases Executed**: 44
* **Number of Test Cases Passed**: 20
* **Number of Test Cases Failed**: 24
* **Number of Test Cases Not Yet Executed**: 0
* **Number of Unique Bugs Logged**: 14 (Consolidated from 24 raw test failures)

### Breakdown by Feature

| Feature | Designed | Executed | Passed | Failed | Unique Bugs Logged |
|---|:---:|:---:|:---:|:---:|:---:|
| **FR-02 (Login & Lock)** | 15 | 15 | 11 | 4 | 3 |
| **FR-04 (Profile - Mobile)** | 13 | 13 | 3 | 10 | 4 |
| **FR-08 (Checkout)** | 8 | 8 | 3 | 5 | 3 |
| **FR-14 (Category CRUD)** | 8 | 8 | 3 | 5 | 4 |
| **Total** | **44** | **44** | **20** | **24** | **14** |

---

## 3. Bug Catalog Reference

Below is the list of unique bugs:

### Feature A: FR-02 (Login & Lock)
* **Bug 1**: [TC-I2] Login Email Input Field Lacks HTML5 Validation (Medium)
* **Bug 2**: [TC-I6 / TC-BVA1] Account is Locked Prematurely on 2nd Failure (High)
* **Bug 3**: [TC-BVA5] Temporary Lockout Duration Extends to 3 Minutes instead of 30 Seconds (High)

### Feature D: FR-04 (Profile - Mobile)
* **Bug 4**: [TC-V1 / TC-BVA1 / TC-I3] Inverted Client-side Phone Number Validation Logic (High)
* **Bug 5**: [TC-I8][Security] Privilege Escalation: API Allows Changing User Roles (Critical)
* **Bug 6**: [TC-I4 / TC-I5 / TC-I6 / TC-I11] Missing Backend API Validation for Phone Number (High)
* **Bug 7**: [TC-I9 / TC-I10] Profile accepts Empty Name and Default Shipping Address (Medium)

### Feature B: FR-08 (Checkout)
* **Bug 8**: [TC-V1] Shopping Cart Items are Not Cleared After Successful Checkout (High)
* **Bug 9**: [TC-I2 / TC-BVA2 / TC-BVA3][Security] Checkout API Accepts Tampered total_amount Without Recalculation (Critical)
* **Bug 10**: [TC-I4] Checkout Flow Permits Order Creation with Empty Cart on Reload (High)

### Feature C: FR-14 (Category CRUD)
* **Bug 11**: [TC-I1 / TC-I5] Category Creation Permits Empty and Whitespace-only Names (High)
* **Bug 12**: [TC-I2][Security] Backend API Lacks Role Checks and Permits Non-admin Deletions (Critical)
* **Bug 13**: [TC-I3] Delete Category API Returns Successful Status Code on Non-existent IDs (Low)
* **Bug 14**: [TC-I4] Category Management Allows Creation of Duplicate Category Names (Medium)
