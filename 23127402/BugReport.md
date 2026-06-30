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
| BUG-FR09-01 | FR-09: Discount Coupons | The system incorrectly calculates the final price as `total * 10` when applying the SAVE10 discount code. | `[Insert GitHub Issue link here]` |
| BUG-FR09-02 | FR-09: Discount Coupons | The system allows a coupon to be applied while the user is not logged in. | `[Insert GitHub Issue link here]` |
| BUG-FR09-03 | FR-09: Discount Coupons | Coupon is rejected at the exact minimum order threshold (off-by-one error). | `[Insert GitHub Issue link here]` |
| BUG-FR15-01 | FR-15: Product CRUD | The system can create a product with negative price | `[Insert GitHub Issue link here]` |
| BUG-FR15-02 | FR-15: Product CRUD | All other products are changed when the product update occurs. | `[Insert GitHub Issue link here]` |
| BUG-FR15-03 | FR-15: Product CRUD | Product can be created with a name exceeding the maximum 255-character limit. | `[Insert GitHub Issue link here]` |
| BUG-FR05-01 | FR-05: View Product List & Search on Mobile | Product images on Mobile are missing the `alt` attribute. | `[Insert GitHub Issue link here]` |
| BUG-FR05-01 | FR-05: View Product List & Search | With product don't have valid image, it will not display alt text | `[Insert GitHub Issue link here]` |



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

---

## BUG-FR09-01 - Final price is calculated incorrectly when applying SAVE10 coupon

---
### 1. Metadata
* **Feature Under Test:** FR-09: Discount Coupons
* **Severity:** Critical
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When applying the `SAVE10` discount coupon, the system calculates the final price using an incorrect formula. Instead of subtracting 10% of the order total from the original total, the system appears to multiply the total by 10. For example, with an order total of `400,000 ₫`, the final amount is shown as approximately `4,000,000 ₫` instead of the correct discounted amount. This causes the payable amount to increase significantly after applying a discount coupon.

### 3. Steps to Reproduce
1. Go to the EShop cart or checkout page.
2. Ensure the cart total is `400,000 ₫`.
3. Enter the coupon code `SAVE10`.
4. Apply the coupon.
5. Observe the calculated discount and final payable amount.

### 4. Expected Result
* The system should calculate the discount as 10% of the order total.
* For a `400,000 ₫` order, the discount should be `40,000 ₫`.
* The final price should be `360,000 ₫`.
* The final amount should not be greater than the original order total after applying a discount coupon.

### 5. Actual Result
* The system calculates the final price using an incorrect formula similar to `total * 10`.
* For a `400,000 ₫` order, the displayed final amount becomes approximately `4,000,000 ₫` instead of `360,000 ₫`.
* Applying the discount coupon increases the payable amount instead of decreasing it.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr09-01-screenshot.png)`

---

## BUG-FR09-02 - Coupon can be applied while user is not logged in

---
### 1. Metadata
* **Feature Under Test:** FR-09: Discount Coupons
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When applying a discount coupon, the system accepts and applies the coupon even though the user is not logged in. According to the FR09 requirement, coupon usage requires a logged-in user with a valid JWT token so the system can validate user eligibility and usage limits. Guest users should be blocked from applying coupons and should receive a login-required validation message.

### 3. Steps to Reproduce
1. Go to the EShop cart or checkout page.
2. Make sure the user is not logged in.
3. Ensure the cart contains at least one product eligible for checkout.
4. Enter a valid coupon code, for example `SAVE10`.
5. Apply the coupon.
6. Observe whether the coupon is accepted or rejected.

### 4. Expected Result
* The system should reject coupon application when the user is not logged in.
* A clear validation message should be displayed, such as `Vui lòng đăng nhập để áp dụng mã giảm giá`.
* No discount should be applied to the order total.
* The coupon usage count should not be updated for a guest request.

### 5. Actual Result
* The system accepts and applies the coupon while the user is not logged in.
* The discount is applied to the order total without validating user authentication.
* The guest user can receive a coupon benefit that should be restricted to authenticated users.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr09-02-screenshot.png)`

---

## BUG-FR09-03 - Coupon is rejected at the exact minimum order threshold (off-by-one error)

---
### 1. Metadata
* **Feature Under Test:** FR-09: Discount Coupons
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When applying the `SAVE10` coupon with an order total exactly at the minimum threshold of 300,000 ₫, the system rejects the coupon instead of accepting it. According to TC-FR09-BVA-002, the coupon should be applied successfully when the order total is exactly 300,000 ₫ (the boundary value). The system appears to use `>` (strictly greater than) instead of `>=` (greater than or equal to) when comparing the order total against the minimum threshold, causing an off-by-one error at the boundary.

### 3. Steps to Reproduce
1. Log in to the EShop web application with a valid user account.
2. Add products to the cart so that the order total is exactly 300,000 ₫.
3. Enter the coupon code `SAVE10` in the coupon input field.
4. Click the apply button to submit the coupon.
5. Observe that the coupon is rejected.

### 4. Expected Result
* The `SAVE10` coupon should be applied successfully when the order total is exactly 300,000 ₫ (the minimum threshold).
* The discount should be calculated as 30,000 ₫ (10% of 300,000 ₫).
* The final payable amount should be 270,000 ₫.
* No validation error should be displayed.

### 5. Actual Result
* The system rejects the `SAVE10` coupon when the order total is exactly 300,000 ₫.
* An error message similar to `"Đơn hàng chưa đạt giá trị tối thiểu 300.000 ₫"` is displayed.
* The coupon is not applied, and the order total remains unchanged.
* This off-by-one error indicates the system uses a strict greater-than (`>`) comparison instead of greater-than-or-equal (`>=`) when validating the minimum order threshold.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr09-03-screenshot.png)`

---

## BUG-FR15-01 - System allows creating a product with a negative price

---
### 1. Metadata
* **Feature Under Test:** FR-15: Product CRUD
* **Severity:** Critical
* **Priority:** High
* **Environment:** Chrome v120, Web App (Admin)
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When an admin creates a new product, the system accepts a negative price value and creates the product successfully. According to the FR-15 specification, the price must be strictly positive (`Giá: bắt buộc, phải là số dương (> 0)`). The test case TC-FR15-EP-002 expects this input to be blocked with the error message `"Giá sản phẩm phải lớn hơn 0"`. Allowing negative prices violates the business requirement and can lead to incorrect order totals, financial discrepancies, and inventory valuation errors.

### 3. Steps to Reproduce
1. Log in to the Web Admin interface with an admin account.
2. Navigate to the product management section.
3. Click the "Add product" button.
4. Enter a valid product name, for example `Test Product`.
5. Enter a negative price value, for example `-10000`.
6. Select an existing category from the dropdown list.
7. Click the "Save" or "Create" button to submit the form.
8. Observe that the product is created successfully despite having a negative price.

### 4. Expected Result
* The system should reject the product creation request when the price is negative.
* A clear validation message should be displayed, such as `Giá sản phẩm phải lớn hơn 0`.
* The product should not be saved to the database.
* The form should remain on the creation page with the error message visible to the admin.

### 5. Actual Result
* The system accepts the negative price and creates the product successfully.
* The product is saved to the database with a negative price value.
* The product list displays the newly created product with a negative price.
* No validation error is shown to the admin user.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr15-01-screenshot.png)`

---

## BUG-FR15-02 - All other products are changed when the product update occurs

---
### 1. Metadata
* **Feature Under Test:** FR-15: Product CRUD
* **Severity:** Critical
* **Priority:** High
* **Environment:** Chrome v120, Web App (Admin)
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When an admin updates a single product, the changes are propagated to other products in the system. According to the FR-15 specification, when editing a product, only that product should be modified — other products must remain unchanged (`Khi Sửa một sản phẩm, chỉ sản phẩm đó bị thay đổi — các sản phẩm khác giữ nguyên`). The test case TC-FR15-EP-005 expects that updating Product #1 does not affect Product #2, #3, or any other product. This defect can cause widespread data corruption across the entire product catalog.

### 3. Steps to Reproduce
1. Log in to the Web Admin interface with an admin account.
2. Navigate to the product management section.
3. Ensure there are at least two products in the list (e.g., Product #1 and Product #2).
4. Click the "Edit" button for Product #1.
5. Change the product name to `Sản phẩm A_V2` and the price to `160,000 ₫`.
6. Click the "Save" or "Update" button to submit the changes.
7. Observe the product list and check the details of Product #2 (and other products).

### 4. Expected Result
* Only Product #1 should be updated with the new name and price.
* Product #2 and all other products should retain their original name, price, and other attributes unchanged.
* The system should perform a targeted update affecting only the selected product.

### 5. Actual Result
* Product #1 is updated successfully.
* Product #2 and other products are also modified with the same changes (e.g., their names and prices are overwritten).
* The side-effect violates the requirement that editing one product must not alter other products.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr15-02-screenshot.png)`

---

## BUG-FR15-03 - Product can be created with a name exceeding the maximum 255-character limit

---
### 1. Metadata
* **Feature Under Test:** FR-15: Product CRUD
* **Severity:** Major
* **Priority:** High
* **Environment:** Chrome v120, Web App (Admin)
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When an admin creates a new product with a name exceeding 255 characters, the system accepts the input and creates the product successfully. According to TC-FR15-BVA-006, the system must block product names longer than 255 characters and display the error `"Tên sản phẩm tối đa 255 ký tự"` above the submit button. Accepting overly long product names violates the FR-15 specification and can lead to database truncation, display issues, and data integrity problems.

### 3. Steps to Reproduce
1. Log in to the Web Admin interface with an admin account.
2. Navigate to the product management section.
3. Click the "Add product" button.
4. Enter a product name containing 256 characters.
5. Enter a valid price, for example `150,000 ₫`.
6. Select an existing category from the dropdown list.
7. Click the "Save" or "Create" button to submit the form.
8. Observe that the product is created successfully despite the name exceeding the maximum length.

### 4. Expected Result
* The system should reject the product creation request when the name exceeds 255 characters.
* A clear validation message should be displayed, such as `"Tên sản phẩm tối đa 255 ký tự"`.
* The error should appear ABOVE the submit button.
* The product should not be saved to the database.

### 5. Actual Result
* The system accepts the product name with 256 characters and creates the product successfully.
* The product is saved to the database with the overly long name.
* No validation error is shown to the admin user.
* The product list displays the newly created product despite the invalid name length.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr15-03-screenshot.png)`

---

## BUG-FR05-01 - Product images on Mobile are missing the `alt` attribute

---
### 1. Metadata
* **Feature Under Test:** FR-05: View Product List & Search on Mobile
* **Severity:** Minor
* **Priority:** Medium
* **Environment:** Mobile App (React Native / Expo)
* **Reporter:** 23127402 - Truong Hoang Lam

### 2. Description
> When viewing the product list on the Mobile app, product images are displayed without a non-empty `alt` attribute (or equivalent accessibility label). According to TC-FR05-EP-005, each product image must have a descriptive `alt` text that describes the product. Missing `alt` attributes violate accessibility standards (WCAG) and reduce usability for users relying on screen readers.

### 3. Steps to Reproduce
1. Open the Mobile app and navigate to the Home/Product list screen.
2. Wait for the product grid to load.
3. Inspect any product image element in the grid.
4. Check for the presence and content of the `alt` attribute (or accessibility label on React Native).

### 4. Expected Result
* Each product image should have a non-empty `alt` attribute (or `accessibilityLabel` in React Native) that describes the product, e.g., `"iPhone 15"` or `"Áo thun nam"`.

### 5. Actual Result
* Product images are missing the `alt` attribute or have an empty `alt=""` value.
* Screen readers cannot describe the product image to visually impaired users.

### 6. Evidence
* **GitHub Issue Link:** `[Insert GitHub Issue link here]`
* **Screenshot/Video:** `![Bug Screenshot](path/to/bug-fr05-01-screenshot.png)`
