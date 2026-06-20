# EShop Bug Report

| Bug ID | Feature | Bug Title | Severity | Priority | GitHub Issue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| BUG-FR01-01 | FR-01: Account registration | 500 Internal Server Error when registering with 12-digit phone number | Major | High | `[Insert GitHub Issue link here]` |
| BUG-FR09-01 | FR-09: Discount coupons | Expired coupon is accepted and applied during checkout | Critical | High | `[Insert GitHub Issue link here]` |

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
