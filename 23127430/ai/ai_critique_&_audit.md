### Session: FR-01 Web Registration
- **AI Tool:** GitHub Copilot Chat (Inline/Sidebar)
- **Date and Time:** YYYY-MM-DD HH:MM
- **Technique applied:** Both

#### Prompts & AI Outputs Log:

##### Interaction 1 - Domain Testing Design
- **Prompt:** Apply Domain Testing for FR-01 Account Registration and structure the result into step-by-step explanation plus a test case table.
- **AI Output:**
	* **Input Variables & Constraints:** Full Name, Email, Password, Confirm Password; constraints: Full Name required; Email must be valid and unique; Password must be strong with Min length = 8, >=1 uppercase, >=1 lowercase, >=1 digit, >=1 special char from allowed set (@, $, !, %, *, ?, &); Confirm Password must match Password; success redirects to Login.
	* **Equivalence Partitions / Boundaries Identified:**
		* *Partition N-V1:* Full Name valid non-empty value, representative Nguyen Van A.
		* *Partition N-I1:* Full Name empty/whitespace, representative empty string.
		* *Partition E-V1:* Email valid and unique, representative newuser01@eshop.com.
		* *Partition E-I1:* Email format invalid, representative newuser01@eshop.
		* *Partition E-I2:* Email already exists, representative test@eshop.com.
		* *Partition P-V1:* Password meets all strength rules, representative Password123!.
		* *Partition P-I1:* Password length < 8, representative Abc1!d.
		* *Partition P-I2:* Password missing uppercase, representative password123!.
		* *Partition P-I3:* Password missing lowercase, representative PASSWORD123!.
		* *Partition P-I4:* Password missing digit, representative Password!!!.
		* *Partition P-I5:* Password missing special character, representative Password1234.
		* *Partition C-V1:* Confirm Password matches Password exactly, representative Password123!.
		* *Partition C-I1:* Confirm Password mismatch, representative Password124!.
	* **Generated Test Cases Structural Summary:** TC-01 (Happy Path), TC-02 (Blank Full Name), TC-03 (Invalid Email Format), TC-04 (Duplicate Email), TC-05 (Password Too Short), TC-06 (No Uppercase), TC-07 (No Lowercase), TC-08 (No Digit), TC-09 (No Special Character), TC-10 (Confirm Password Mismatch).

##### Interaction 2 - Report Integration
- **Prompt:** Continue filling the FR-01 content into main_report.md.
- **AI Output:** Inserted the Domain Testing analysis into the report under the FR-01 section, keeping the heading hierarchy and adding requirement scope, input variables, system states ST-01 to ST-04, constraints C-01 to C-05, partitions N-V1 through C-I1, and test cases TC-01 through TC-10.

##### Interaction 3 - Boundary Value Analysis Design
- **Prompt:** Apply Boundary Value Analysis for FR-01 and provide boundary identification plus a boundary-focused test case table.
- **AI Output:**
	* **Input Variables & Constraints:** Same FR-01 inputs; explicit numeric boundary only for Password Length Min = 8; also checked required name presence, email format completeness, password complexity, and Confirm Password equality.
	* **Equivalence Partitions / Boundaries Identified:**
		* *Boundary B-01 Full Name presence:* below = empty/whitespace, at = A, above = An.
		* *Boundary B-02 Email format completeness:* below = missing @ or domain (newusereshop.com), at = minimal valid email (a@b.co), above = longer valid email (alex.smith@eshop.com).
		* *Boundary B-03 Password length:* below = 7 chars, at = 8 chars, above = 9 chars.
		* *Boundary B-04 Password complexity:* below = one required class missing, at = all required classes present, above = all required classes present with extra characters.
		* *Boundary B-05 Confirm Password match:* below = one character different, at = exact match, above = exact match with longer acceptable password value.
	* **Generated Test Cases Structural Summary:** BVA-01 (Full Name Empty), BVA-02 (Full Name Minimum Non-Empty), BVA-03 (Full Name Above Minimum), BVA-04 (Invalid Email Structure), BVA-05 (Minimal Valid Email), BVA-06 (Password Length 7), BVA-07 (Password Length 8), BVA-08 (Password Length 9), BVA-09 (Confirm Password Exact Match), BVA-10 (Confirm Password Mismatch).

##### Interaction 4 - AI Gap Analysis / Audit Review
- **Prompt:** Conduct an independent AI gap analysis on the FR-01 test cases that were generated.
- **AI Output:** Identified likely omissions: Vietnamese/Unicode name handling and whitespace normalization; malicious payloads such as XSS/SQL injection; backend-side validation bypass checks; email-enumeration leakage via duplicate-email messaging; password edge cases beyond length (allowed special set, Unicode, spaces); workflow abuse and repeated submissions; field interaction defects; undefined max-length risks; accessibility and error-message quality; and hidden e-commerce logic not visible in the short FR-01 spec. Explained that AI tends to miss these because it follows explicit spec text, favors clean nominal data, and lacks real-world/localized context.

##### Interaction 5 - Bug Template Generation
- **Prompt:** Create a standard Markdown bug report template for FR-01 to use in main_report.md during actual testing.
- **AI Output:** Added a reusable bug-report template with Bug ID, Summary, Severity, Steps to reproduce, Actual result, Expected result, GitHub Issue link, and Screenshot placeholder; intended for consistent defect capture during EShop test execution.
