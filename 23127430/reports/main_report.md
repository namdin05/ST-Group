# HW02 – Domain Testing

## 1. Student Information

- Student name: Dinh Hoang Nam
- Student ID: 23127430
- Class: 23KTPM1

## 2. Assignment Overview

### 2.1 Selected Features

| Pool | Feature |
|--------|--------|
| A | FR-01 Web Registration |
| B | FR-07 Shopping Cart |
| C | FR-13 Admin Dashboard |
| D | FR-01 Mobile Registration |


## 3 FR-01 Web Registration

### 3.1 Domain Testing

#### 3.1.1 Requirement scope

FR-01 covers the web registration flow for a new customer account in EShop. The user must provide Full Name, Email, Password, and Confirm Password. Email must have a valid format and be unique in the system. Password must satisfy the strong-password rule: at least 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character from the allowed set. Confirm Password must match Password exactly. After successful registration, the system redirects the user to the Login page.

#### 3.1.2 Input variables

| Variable | Meaning | Domain Notes |
|---|---|---|
| Full Name | User's display name for the account | Required; the specification does not define length or character-set limits |
| Email | Account identifier | Must be valid and unique in the system |
| Password | Account secret | Must satisfy all password-strength rules |
| Confirm Password | Re-entry of Password | Must match Password exactly |

#### 3.1.3 System states and constraints

| State ID | System State | Why it matters |
|---|---|---|
| ST-01 | Guest user is on the registration page | Normal precondition for registration |
| ST-02 | Target email does not exist in the database | Required for successful registration |
| ST-03 | Target email already exists in the database | Must be rejected because email must be unique |
| ST-04 | Registration succeeds and the system redirects to Login | Expected postcondition after success |

| Constraint ID | Constraint |
|---|---|
| C-01 | Full Name is required; blank or whitespace-only input is invalid |
| C-02 | Email must satisfy format validity and uniqueness at the same time |
| C-03 | Password must satisfy all strength rules at the same time |
| C-04 | Confirm Password must equal Password exactly |
| C-05 | Successful registration requires all input partitions to be valid and the system state to be ST-01 and ST-02 |

#### 3.1.4 Equivalence partitions

| Partition ID | Description | Type | Representative Value |
|---|---|---|---|
| N-V1 | Full Name is provided and contains a normal non-empty value | Valid | Nguyen Van A |
| N-I1 | Full Name is empty or only spaces | Invalid | empty string |
| E-V1 | Email has a valid format and is not used by any existing account | Valid | newuser01@eshop.com |
| E-I1 | Email format is invalid | Invalid | newuser01@eshop |
| E-I2 | Email already exists in the system | Invalid | test@eshop.com |
| P-V1 | Password satisfies all strength rules | Valid | Password123! |
| P-I1 | Password length is less than 8 characters | Invalid | Abc1!d |
| P-I2 | Password has no uppercase letter | Invalid | password123! |
| P-I3 | Password has no lowercase letter | Invalid | PASSWORD123! |
| P-I4 | Password has no digit | Invalid | Password!!! |
| P-I5 | Password has no special character | Invalid | Password1234 |
| C-V1 | Confirm Password matches Password exactly | Valid | Password123! |
| C-I1 | Confirm Password does not match Password | Invalid | Password124! |

#### 3.1.5 Test case design

Strategy used: one-factor-at-a-time to avoid combinatorial explosion. The baseline valid data is:

- Full Name: Nguyen Van A
- Email: newuser01@eshop.com
- Password: Password123!
- Confirm Password: Password123!
- Precondition: guest user on the registration page, and the email does not already exist

| TC ID | Objective | Test Data | Steps | Expected Result | Status | Source |
|---|---|---|---|---|---|---|
| TC-01 | Verify successful registration with fully valid data | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password123!; Precondition: email not in DB | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Account is created successfully, success message is shown, and the user is redirected to Login. | NOT RUN | AI Generated |
| TC-02 | Verify blank full name is rejected | Name: blank; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, the Full Name field shows a validation error, and no account is created. | NOT RUN | AI Generated |
| TC-03 | Verify invalid email format is rejected | Name: Nguyen Van A; Email: newuser01@eshop; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, the Email field shows a format error, and no account is created. | NOT RUN | AI Generated |
| TC-04 | Verify duplicate email is rejected | Name: Nguyen Van A; Email: test@eshop.com; Password: Password123!; Confirm Password: Password123!; Precondition: test@eshop.com already exists | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, the system reports that the email already exists, and no account is created. | NOT RUN | AI Generated |
| TC-05 | Verify password shorter than 8 characters is rejected | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Abc1!d; Confirm Password: Abc1!d | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, password strength validation is shown, and no account is created. | NOT RUN | AI Generated |
| TC-06 | Verify password without uppercase letter is rejected | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: password123!; Confirm Password: password123! | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, password strength validation is shown, and no account is created. | NOT RUN | AI Generated |
| TC-07 | Verify password without lowercase letter is rejected | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: PASSWORD123!; Confirm Password: PASSWORD123! | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, password strength validation is shown, and no account is created. | NOT RUN | AI Generated |
| TC-08 | Verify password without digit is rejected | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Password!!!; Confirm Password: Password!!! | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, password strength validation is shown, and no account is created. | NOT RUN | AI Generated |
| TC-09 | Verify password without special character is rejected | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Password1234; Confirm Password: Password1234 | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, password strength validation is shown, and no account is created. | NOT RUN | AI Generated |
| TC-10 | Verify confirm password mismatch is rejected | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password124! | 1. Open registration page. 2. Enter the test data. 3. Submit the form. | Registration is blocked, the confirm password mismatch is reported, and no account is created. | NOT RUN | AI Generated |

### 3.2 Boundary Value Analysis

#### 3.2.1 Boundary identification

FR-01 contains one explicit numeric boundary and several required-field boundaries:

| Boundary ID | Feature Area | Minimum / Boundary Condition | Just Below | Exactly at Boundary | Just Above |
|---|---|---|---|---|---|
| B-01 | Full Name presence | Full Name must not be empty | Empty string or whitespace only | One valid character, for example A | Two or more characters, for example An |
| B-02 | Email format completeness | Email must contain a valid local part and domain format | Missing @ or missing domain, for example usereshop.com | Minimal valid email, for example a@b.co | Longer valid email, for example alex.smith@eshop.com |
| B-03 | Password length | Password must be at least 8 characters | 7 characters | 8 characters | 9 characters |
| B-04 | Password complexity | Password must contain uppercase, lowercase, digit, and special character | One required class missing | All required classes present | All required classes present with additional characters |
| B-05 | Confirm Password match | Confirm Password must exactly equal Password | One character different | Exact match | Exact match with additional allowed characters in the password value |

Note: the specification does not define any maximum length for Full Name, Email, Password, or Confirm Password, so the BVA focus is on the minimum and adjacency around the required conditions.

#### 3.2.2 Boundary value test cases

| TC ID | Boundary Tested | Test Data | Execution Steps | Expected Result | Status | Source |
|---|---|---|---|---|---|---|
| BVA-01 | Full Name boundary - empty value | Name: empty; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Leave Full Name empty. 3. Fill the remaining fields. 4. Submit. | Registration is blocked and Full Name is reported as required. | NOT RUN | AI Created |
| BVA-02 | Full Name boundary - minimum non-empty value | Name: A; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration succeeds if all other fields are valid. | NOT RUN | AI Created |
| BVA-03 | Full Name boundary - above minimum | Name: An; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration succeeds if all other fields are valid. | NOT RUN | AI Created |
| BVA-04 | Email format boundary - invalid structure | Name: Nguyen Van A; Email: newusereshop.com; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration is blocked and Email format validation is shown. | NOT RUN | AI Created |
| BVA-05 | Email format boundary - minimal valid email | Name: Nguyen Van A; Email: a@b.co; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration succeeds if the email is unique and all other fields are valid. | NOT RUN | AI Created |
| BVA-06 | Password length boundary - just below minimum | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Abc1!d7; Confirm Password: Abc1!d7 | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration is blocked because the password length is below 8 characters. | NOT RUN | AI Created |
| BVA-07 | Password length boundary - exact minimum | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Abc1!d78; Confirm Password: Abc1!d78 | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration succeeds if password complexity and all other fields are valid. | NOT RUN | AI Created |
| BVA-08 | Password length boundary - just above minimum | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Abc1!d789; Confirm Password: Abc1!d789 | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration succeeds if password complexity and all other fields are valid. | NOT RUN | AI Created |
| BVA-09 | Confirm Password boundary - exact match | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password123! | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration succeeds if all other fields are valid. | NOT RUN | AI Created |
| BVA-10 | Confirm Password boundary - one character mismatch | Name: Nguyen Van A; Email: newuser01@eshop.com; Password: Password123!; Confirm Password: Password124! | 1. Open registration page. 2. Enter the test data. 3. Submit. | Registration is blocked because Confirm Password does not match Password. | NOT RUN | AI Created |

### **3.3 AI Gap Analysis (FR-01: Account Registration)**
#### **1. Gaps in Domain Testing**

- **Locale and Input Normalization Omissions:** The AI generated standard ASCII values (`Nguyen Van A`) but completely ignored Vietnamese-specific data behaviors. It missed partitions for accented characters (`Nguyễn Văn Á`), complex Unicode normalization forms (NFC vs. NFD), double spaces, and leading/trailing whitespaces in fields like `Full Name` and `Email`.  
- **Security & Vulnerability Blind Spots:** The automated suite treats inputs as clean text values. It completely missed data domains for adversarial testing, such as Cross-Site Scripting (XSS) payloads in `Full Name` (e.g., `<script>alert(1)</script>`) or SQL Injection strings in input fields.  
- **Workflow & State Abuse Neglect:** AI assumes a clean, single-action desktop session. It omitted domain partitions for race conditions and structural multi-click abuse (e.g., clicking the "Register" button rapidly multiple times, resubmitting during a partial server delay, or attempting registration while already authenticated in another tab).  
- **E-Commerce Context Ignorance:** The domain analysis treated registration as an isolated form. In a real e-commerce system like EShop, registration triggers secondary domain dependencies (e.g., initializing a Shopping Cart ID, mapping default guest session states, or issuing initial welcome coupons), none of which were covered.  

#### **2. Gaps in Boundary Value Analysis**

- **Conceptual Confusion Between Techniques:** The AI miscategorized pure equivalence partitions (such as structural email regex components and password complexity character classes) as BVA boundaries. BVA requires testing along a measurable, discrete numeric continuum.  
- **Missing Implicit / System-Level Boundaries:** Because the specification lacks explicit maximum limits, the AI strictly tested the minimum bounds and refused to probe unstated upper edges. It missed structural architectural limits like the standard database field constraint (e.g., 255 characters for `VARCHAR` fields) or the RFC 5321 maximum length limit for email processing (254 characters).  
- **Whitespace Boundary Handling:** The BVA overlooked boundary behavior regarding trailing spaces. For example, a password consisting of 7 characters followed by a single space equals 8 characters in length; the AI failed to verify whether the system handles or trims this edge value correctly.  

#### **3. Root Cause of AI Failures**

- **Over-Reliance on Explicit Specifications:** The model strictly optimizes for stated criteria to avoid hallucination, making it blind to hidden operational, database, and backend-enforcement constraints.  
- **Lack of Adversarial Bias:** AI naturally generates deterministic, "happy-path" test designs instead of thinking like a malicious user or stress-testing the application's boundaries and infrastructure.  