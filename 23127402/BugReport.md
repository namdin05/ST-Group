# EShop Bug Report

| Bug ID | Feature | Bug Title | GitHub Issue |
| :--- | :--- | :--- | :--- |
| BUG-FR03-01 | FR-03: Forgot Password & Password Reset | The interface does not display the Step Indicator ("Step 1/2") when the user performs the password recovery steps. | `[Insert GitHub Issue link here]` |
| BUG-FR03-02 | FR-03: Forgot Password & Password Reset | The system doesn't check the email format on the interface but sends the error request directly to the server, leading to the server processing incorrectly and returning a "User not found" message instead of blocking and reporting "Invalid email". | `[Insert GitHub Issue link here]` |
| BUG-FR03-03 | FR-03: Forgot Password & Password Reset | The interface lacks a "Back to Login" button. | `[Insert GitHub Issue link here]` |
| BUG-FR03-04 | FR-03: Forgot Password & Password Reset | The password reset interface is missing the "Confirm password" input field. | `[Insert GitHub Issue link here]` |
| BUG-FR03-05 | FR-03: Forgot Password & Password Reset | Password recovery was unsuccessful the user entered the correct valid password. | `[Insert GitHub Issue link here]` |
| BUG-FR03-06 | FR-03: Forgot Password & Password Reset | The system generates a 4-digit OTP instead of the required 6-digit OTP. | `[Insert GitHub Issue link here]` |
| BUG-FR03-07 | FR-03: Forgot Password & Password Reset | The system does not check the OTP format. | `[Insert GitHub Issue link here]` |
| BUG-FR03-08 | FR-03: Forgot Password & Password Reset | The system accepts invalid passwords that contain space characters. | `[Insert GitHub Issue link here]` |

## BUG-FR03-01 - Missing step indicator during password recovery flow

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Minor
* **Priority:** Medium
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the forgot password and password reset flow, the interface does not display the required step indicator for the current recovery step. According to the FR03 test expectations, the user should see `Bước 1 / 2` while requesting an OTP and `Bước 2 / 2` while resetting the password. Without this indicator, users have less context about where they are in the multi-step recovery process.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Observe the email/OTP request screen.
4. Enter a valid registered email and submit the request.
5. Observe the password reset screen after the OTP is generated.

### 4. Expected Result
* The Step 1 screen should display a visible step indicator such as `Bước 1 / 2`.
* The Step 2 screen should display a visible step indicator such as `Bước 2 / 2`.
* The indicator should help users understand their current position in the password recovery flow.

### 5. Actual Result
* The password recovery screens do not display the required step indicator.
* Users can proceed through the flow, but the UI does not clearly communicate the current step.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-01-screenshot.png)`

---

## BUG-FR03-02 - Invalid email format is submitted to server during password recovery

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the forgot password flow, the email field does not block invalid email formats on the client side. Instead of using browser or interface validation to stop the request and show an `Invalid email` message, the invalid value is submitted to the server. The server then processes the malformed input as a lookup request and returns a misleading `User not found` message.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Enter an invalid email format into the email field, for example `invalidemailformat`.
4. Submit the OTP request form.
5. Observe the validation behavior and error message.

### 4. Expected Result
* The form submission should be blocked before sending the request to the server.
* The email field should enforce valid email format validation, such as using `type="email"` or equivalent client-side validation.
* The interface should display a clear validation message such as `Invalid email` or `Email không hợp lệ`.

### 5. Actual Result
* The invalid email format is submitted to the server.
* The server handles the invalid value as an account lookup request.
* The interface displays a misleading `User not found` message instead of an invalid email format error.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-02-screenshot.png)`

---

## BUG-FR03-05 - Password recovery fails with valid reset information

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the password reset step, the system fails to recover the account even when the user enters valid reset information. According to the FR03 happy-path requirement, a correct OTP, valid new password, and matching confirmation password should update the password successfully, display a success notification, and redirect the user to the login page. Instead, the password recovery attempt is unsuccessful despite using valid input.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Enter a valid registered email and request an OTP.
4. On the reset password screen, enter a correct OTP.
5. Enter a valid new password, for example `Abcd123!`.
6. Enter the same value in the confirm password field.
7. Submit the password reset form.
8. Observe whether the password is updated successfully.

### 4. Expected Result
* The password should be updated successfully when the OTP and password inputs are valid.
* A success message or toast should be displayed.
* The user should be redirected to the login page after the reset succeeds.

### 5. Actual Result
* The password recovery process fails even though the user enters valid reset information.
* The password is not updated successfully.
* The expected success notification and redirect to the login page do not occur.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-05-screenshot.png)`

---

## BUG-FR03-06 - System generates a 4-digit OTP instead of a 6-digit OTP

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Critical
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the forgot password flow, the system generates an OTP with only 4 digits. According to the FR03 requirement and the happy-path test case, the OTP must contain exactly 6 numeric digits. Generating a 4-digit OTP creates a mismatch between the OTP generation behavior and the reset password validation rules, which can prevent users from completing password recovery successfully.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Enter a valid registered email and request an OTP.
4. Observe the OTP generated or displayed by the system.
5. Count the number of digits in the generated OTP.

### 4. Expected Result
* The system should generate an OTP with exactly 6 numeric digits.
* The generated OTP should match the format accepted by the reset password screen.
* The user should be able to use the generated OTP to continue the password reset process.

### 5. Actual Result
* The system generates an OTP with only 4 digits.
* The generated OTP does not satisfy the required 6-digit OTP format.
* Password recovery may fail because the generated OTP does not match the expected validation rule.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-06-screenshot.png)`

---

## BUG-FR03-07 - OTP format is not validated during password reset

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the password reset step, the system does not properly validate the OTP format before processing the reset request. According to the FR03 validation requirements, the OTP must contain exactly 6 numeric digits. Inputs with incorrect length, such as 5 or 7 digits, or inputs containing non-numeric characters should be rejected with a clear validation message. Instead, invalid OTP values are allowed to proceed or are not handled with the correct format-specific error.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Enter a valid registered email and request an OTP.
4. On the reset password screen, enter an invalid OTP format, for example `12345`, `1234567`, or `12345a`.
5. Enter a valid new password, for example `Abcd123!`.
6. Enter the same value in the confirm password field.
7. Submit the password reset form.
8. Observe the OTP validation behavior and displayed error message.

### 4. Expected Result
* The system should reject OTP values that are not exactly 6 digits.
* The system should reject OTP values containing non-numeric characters.
* A clear validation message should be displayed, such as `Mã OTP phải có đúng 6 chữ số` or `Mã OTP chỉ được chứa chữ số`.
* The reset request should not be processed until the OTP format is valid.

### 5. Actual Result
* The system does not correctly validate the OTP format.
* Invalid OTP values are allowed to proceed or are handled with an incorrect/non-specific error response.
* The user does not receive the expected OTP format validation message.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-07-screenshot.png)`

---

## BUG-FR03-08 - Password with space characters is accepted during reset

---
### 1. Metadata
* **Feature Under Test:** FR-03: Forgot Password & Password Reset
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During the password reset step, the system accepts a new password that contains space characters. Password validation should reject whitespace characters because they can make passwords ambiguous, difficult to enter consistently, and inconsistent with the expected password complexity rules. Instead, the reset form allows the invalid password to be submitted and processed successfully.

### 3. Steps to Reproduce
1. Go to the EShop login page.
2. Click the forgot password option.
3. Enter a valid registered email and request an OTP.
4. On the reset password screen, enter a correct OTP.
5. Enter a new password that contains a space character, for example `Abcd 123!`.
6. Enter the same value in the confirm password field.
7. Submit the password reset form.
8. Observe whether the password is accepted or rejected.

### 4. Expected Result
* The system should reject passwords that contain space characters.
* A clear validation message should be displayed, such as `Mật khẩu không được chứa khoảng trắng`.
* The password should not be updated until the user enters a valid password without spaces.

### 5. Actual Result
* The system accepts a password that contains a space character.
* The password reset request is processed even though the new password is invalid.
* No clear validation message is displayed for the whitespace character.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr03-08-screenshot.png)`
