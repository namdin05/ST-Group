# EShop Bug Report

| Bug ID | Feature | Bug Title | GitHub Issue |
| :--- | :--- | :--- | :--- |
| BUG-FR03-01 | FR-03: Forgot Password & Password Reset | The interface does not display the Step Indicator ("Step 1/2") when the user performs the password recovery steps. | `[Insert GitHub Issue link here]` |
| BUG-FR03-02 | FR-03: Forgot Password & Password Reset | The system doesn't check the email format on the interface but sends the error request directly to the server, leading to the server processing incorrectly and returning a "User not found" message instead of blocking and reporting "Invalid email". | `[Insert GitHub Issue link here]` |

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

## BUG-FR01-01 - 500 Internal Server Error when registering with 12-digit phone number

---
### 1. Metadata
* **Feature Under Test:** FR-01: Account registration
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> During account registration, submitting a phone number containing 12 digits causes the system to return a `500 Internal Server Error`. The application fails to handle the invalid phone number through client-side or server-side validation and exposes an internal server failure instead of a clear validation message.

### 3. Steps to Reproduce
1. Go to the EShop account registration page.
2. Fill in all required registration fields with otherwise valid data.
3. Input a 12-digit phone number into the phone number field, for example `012345678901`.
4. Submit the registration form.
5. Observe the system response.

### 4. Expected Result
* The system should reject the invalid phone number and display a clear validation message, such as `Số điện thoại không hợp lệ` or `Số điện thoại phải có 10 hoặc 11 chữ số`.
* The registration request should not trigger an internal server error.

### 5. Actual Result
* The system returns a `500 Internal Server Error` after the registration form is submitted with a 12-digit phone number.
* No user-friendly validation message is displayed.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr01-01-screenshot.png)`

---

## BUG-FR09-01 - Expired coupon is accepted and applied during checkout

---
### 1. Metadata
* **Feature Under Test:** FR-09: Discount coupons
* **Severity:** Critical
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> The discount coupon feature incorrectly accepts an expired coupon code. The system applies the discount and allows checkout to proceed successfully, even though expired coupons should be rejected based on the coupon validity rules.

### 3. Steps to Reproduce
1. Go to the EShop shopping cart or checkout page.
2. Ensure the cart contains at least one product eligible for checkout.
3. Enter an expired coupon code into the discount coupon field.
4. Click the apply coupon button.
5. Continue to checkout after the discount is applied.
6. Observe the coupon validation and checkout behavior.

### 4. Expected Result
* The system should reject the expired coupon and display a clear validation message, such as `Mã giảm giá đã hết hạn sử dụng`.
* No discount should be applied to the order total.
* Checkout should proceed only with the original order total or require a valid coupon.

### 5. Actual Result
* The expired coupon is accepted by the system.
* The discount is applied to the order total.
* The user can complete checkout successfully with an invalid expired coupon.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr09-01-screenshot.png)`

---
