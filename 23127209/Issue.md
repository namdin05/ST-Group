# GitHub Issue Descriptions for FR-02 & FR-04

This document contains consolidated, highly detailed, and professional GitHub Issue descriptions for the bugs identified in [Bug report.md](file:///d:/Code/ST-Group/23127209/Bug%20report.md). The reports include references to functional requirements from [feature.md](file:///d:/Code/ST-Group/23127209/feature.md) and test cases defined in [FR-02.md](file:///d:/Code/ST-Group/23127209/FR-02.md) and [FR-04_Mobile.md](file:///d:/Code/ST-Group/23127209/FR-04_Mobile.md).

---

## 1. [Bug][FR-02][TC-I2] Login Email Input Field Lacks HTML5 Validation For Format Verification

### Description
The login form allows users to enter and submit email inputs that do not follow standard email formats (e.g., strings lacking the `@` character, missing domains, or missing top-level domains). According to the functional requirements, the email input field must employ HTML5's native validation format (`type="email"`) to verify the structure of the input before permitting form submission. Currently, the form allows malformed emails to be sent to the backend authentication server.

### Severity
Medium

### Component
Frontend / Login Page UI

### Preconditions
None. The user is on the guest/unauthenticated login page.

### Steps to Reproduce
1. Open the application and navigate to the login screen.
2. Locate the "Email" input field.
3. Enter an invalid email format string, such as `invalid-email-address` (without the `@` symbol and domain).
4. Enter a password in the password field (e.g., `Test1234!`).
5. Click the "Login" submit button (or press the Enter key within the input fields).

### Actual Behavior
The login form is successfully submitted, and the page triggers a network login request to the server, sending the invalid email address. No browser-level HTML5 validation error is shown to prevent the submission.

### Expected Behavior
* The email input field must be configured as an `<input type="email">` element.
* The web browser must intercept the form submission attempt, block the network request, and display a localized validation error warning bubble (e.g., "Please include an '@' in the email address...") pointing directly to the email input field.
* The error notification should appear above the submit button according to the UI positioning requirements.

### Suggested Fix / Technical Hypothesis
Inspect the HTML/React/Vue structure of the login form and ensure the email input element is defined with `type="email"` and not `type="text"`. Additionally, ensure that the form submission handler does not bypass or disable native HTML5 form validation (e.g., by ensuring `novalidate` is not set on the `<form>` element).

---

## 2. [Bug][FR-02][TC-I6 / TC-BVA1] Account is Locked Prematurely on the Second Consecutive Failed Login Attempt Instead of the Third

### Description
The temporary lockout mechanism is triggered too early in the login failure cycle. The specification mandates that a user account should only be temporarily locked (for 30 seconds in the demo environment) after **3 or more consecutive failed login attempts**. However, testing shows that the lock is activated immediately after the **second** failed attempt. This prevents the user from trying a third login attempt, violating the specified grace limit.

### Severity
High

### Component
Backend / Authentication Logic

### Preconditions
* A valid registered user account exists (e.g., `test@eshop.com`).
* The account's failed login attempt counter is currently reset to zero (`failedAttempts = 0`).
* The account is in an active, unlocked state.

### Steps to Reproduce
1. Navigate to the login page.
2. Input the correct email (`test@eshop.com`) but a wrong password (e.g., `WrongPass1`). Submit the login form -> Attempt fails (1st failure, `failedAttempts` increases from 0 to 1).
3. Input the correct email but a wrong password (e.g., `WrongPass2`). Submit the login form -> Attempt fails (2nd failure, `failedAttempts` increases from 1 to 2).
4. Attempt a 3rd login with any credentials.

### Actual Behavior
* The account is locked immediately after the 2nd failed attempt is completed.
* At the 3rd attempt, the user is already greeted with a lockout error message, and access is blocked, demonstrating that the lock was activated prematurely on the 2nd failure.
* **Test Case Outcomes**:
  * `TC-BVA1` (2nd failed attempt, counter 1->2, expected not locked): actual result is that the account gets locked.
  * `TC-I6` (3rd failed attempt -> Expected lockout trigger): actual result is that the account was already locked after the 2nd attempt.

### Expected Behavior
* After the 2nd failed attempt, the account must remain in an unlocked state (`failedAttempts = 2` is below the threshold of 3). The user should see a generic credentials error and still be allowed to perform a 3rd attempt.
* The account must only transition to the locked state upon the 3rd consecutive failed attempt (`failedAttempts >= 3`).

### Suggested Fix / Technical Hypothesis
Locate the authentication controller/middleware handling the failed attempts counter. Check the condition that triggers the account lock. It is highly likely checking `failedAttempts >= 2` (or using `>` instead of `>=` on a pre-incremented variable, or vice versa). Correct the comparison logic to ensure locking only occurs when `failedAttempts >= 3`.

---

## 3. [Bug][FR-02][TC-BVA5] Temporary Lockout Duration Extends to 3 Minutes Instead of the Specified 30 Seconds

### Description
When an account gets locked due to consecutive failed login attempts, the lockout period lasts for 3 minutes (180 seconds) instead of the 30-second duration specified for the demo environment. This prevents locked users from logging back in after the documented 30-second wait time has passed.

### Severity
High

### Component
Backend / Lockout Management

### Preconditions
* The user account has been locked due to consecutive failed login attempts.

### Steps to Reproduce
1. Fail the login attempts consecutive times to trigger the account lock.
2. Start a timer immediately upon the lockout trigger.
3. Wait for 31 seconds (satisfying the `elapsed >= 30s` boundary condition, specifically testing at `31s` to be past the limit).
4. Attempt to log in using the correct email and correct password.

### Actual Behavior
* The login attempt at 31 seconds is rejected with a lockout error message.
* The login attempts continue to be rejected until exactly 3 minutes (180 seconds) have elapsed, indicating that the lockout duration is hardcoded or configured as 3 minutes instead of 30 seconds.

### Expected Behavior
* Since the lockout duration for the demo environment is specified as exactly 30 seconds, the account must be automatically unlocked after 30 seconds.
* The login attempt at 31 seconds with correct credentials must succeed, return a valid JWT token, and reset the failed attempts counter to 0.

### Suggested Fix / Technical Hypothesis
Locate the lockout duration configuration in the backend settings or within the lockout check middleware. Change the duration variable from 180 seconds (3 minutes) to 30 seconds for the demo/testing environment profile.

---

## 4. [Bug][FR-04][TC-V1 / TC-BVA1 / TC-I3] Inverted Client-side Phone Number Validation Logic on Profile Update Form

### Description
The client-side validation logic for updating the phone number on the mobile interface is completely inverted. The validation rejects phone numbers that start with `0` (which is the correct, specified format) while accepting numbers that do not start with `0` (which is an invalid format). This prevents users from updating their profile with a correct phone number on the UI.

### Severity
High

### Component
Frontend / Profile Management UI

### Preconditions
* The user is logged into the application.
* The user is on the Profile Update screen on the mobile interface.

### Steps to Reproduce
* **Scenario A (Valid input fails)**:
  1. Enter a valid name and default shipping address.
  2. In the Phone Number field, enter `0912345678` (10 digits starting with `0`, `TC-V1`) or `09123456789` (11 digits starting with `0`, `TC-BVA1`).
  3. Click the save/update profile button.
  4. *Result*: The UI shows a validation error, and the update fails.
* **Scenario B (Invalid input passes)**:
  1. Enter a valid name and default shipping address.
  2. In the Phone Number field, enter `9123456789` (10 digits without leading `0`) or `1234567890` (10 digits without leading `0`, `TC-I3`).
  3. Click the save/update profile button.
  4. *Result*: The UI accepts the number, and the profile is successfully updated.

### Actual Behavior
* The validation error occurs specifically when a leading `0` is present.
* Removing the leading `0` allows the submission to succeed, violating the requirement that phone numbers must start with `0`.
* **Test Case Outcomes**:
  * `TC-V1`: "Phone number validation fails even with correct input (does not accept leading '0')"
  * `TC-BVA1`: "Failed due to containing leading '0'. If the leading '0' is omitted and the number is exactly 11 digits, the update succeeds"
  * `TC-I3`: "Still able to update as long as the length is correct (without a leading '0')"

### Expected Behavior
* The phone number input must be validated such that it is only accepted if it starts with the digit `0` and has a total length of 10 or 11 numeric digits.
* Valid inputs (starting with `0`) must pass validation, and invalid inputs (not starting with `0`) must be rejected on the UI.

### Suggested Fix / Technical Hypothesis
Inspect the phone number validation regex or conditional expression in the frontend form validator. It is likely that the expression checks `!phoneNumber.startsWith('0')` but handles it incorrectly, or the regex has an inverted negative lookahead. Update the regex to ensure a leading `0` is mandatory (e.g., `/^0\d{9,10}$/`).

---

## 5. [Bug][FR-04][TC-I8][Security] Privilege Escalation: Profile Update Endpoint Accepts 'role' Parameter and Modifies User Privilege

### Description
The backend profile update API endpoint is vulnerable to Mass Assignment / Privilege Escalation. The endpoint accepts the `role` attribute directly from the client request payload and updates the database accordingly. An authenticated regular user can escalate their account privileges to `admin` simply by adding `"role": "admin"` to the profile update request payload.

### Severity
Critical

### Component
Backend / Profile Update API

### Preconditions
* An authenticated user account with a regular role (e.g., `user`).
* Access to an API client tool (e.g., Postman, CURL) or intercepting proxy (e.g., Burp Suite).

### Steps to Reproduce
1. Authenticate as a standard user and obtain the JWT token.
2. Construct a PATCH or PUT HTTP request to the profile update API endpoint (e.g., `/api/profile` or `/api/user/update`).
3. Include the JWT token in the `Authorization: Bearer <token>` header.
4. Send a payload that includes the name, phone number, default shipping address, and add `"role": "admin"` (e.g., `{"name": "John Doe", "phone": "9123456789", "address": "123 Main St", "role": "admin"}`).
5. Check the updated user information or use the token to access admin-only endpoints.

### Actual Behavior
The API accepts the payload and updates the user's role to `"admin"` in the database, returning a success status code and granting the user administrative privileges.

### Expected Behavior
* Standard users must not be allowed to self-modify their role.
* The backend API must either ignore/strip the `role` parameter from the profile update input schema (using a whitelist-only approach) or reject the request with a `403 Forbidden` status code if a client attempts to modify the `role`.

### Suggested Fix / Technical Hypothesis
Implement strict request payload validation / DTO validation (Data Transfer Object) on the backend profile update endpoint. Exclude the `role` field from the allowed update parameters list. Only permit changes to `name`, `phone_number`, and `default_shipping_address`.

---

## 6. [Bug][FR-04][TC-I4 / TC-I5 / TC-I6 / TC-I11] Missing Backend API Validation for Phone Number Format, Length, and Presence Constraints

### Description
The backend API endpoint does not validate phone number inputs. While the client-side UI might block invalid values, any client can bypass the UI by calling the API directly to save invalid phone numbers (numbers shorter than 10 digits, longer than 11 digits, containing alphabetic/special characters, or entirely empty/null).

### Severity
High

### Component
Backend / Profile Update API Validation

### Preconditions
* The user is authenticated and bypasses the UI to send raw HTTP requests directly to the backend API.

### Steps to Reproduce
Send profile update API requests with the following payloads:
* **TC-I4 (Too short)**: `{"phone_number": "012345678"}` (9 digits) -> Send request.
* **TC-I5 (Too long)**: `{"phone_number": "012345678901"}` (12 digits) -> Send request.
* **TC-I6 (Non-numeric)**: `{"phone_number": "0123abc456"}` -> Send request.
* **TC-I11 (Empty/Null)**: `{"phone_number": ""}` or `{"phone_number": null}` -> Send request.

### Actual Behavior
The backend accepts and successfully saves all invalid inputs (`TC-I4`, `TC-I5`, `TC-I6`, and `TC-I11`) to the database.

### Expected Behavior
* The backend server must enforce the same business rules as the frontend: phone numbers must start with `0`, contain only digits, have a length of 10-11, and cannot be empty.
* All invalid API requests must be rejected with a `400 Bad Request` status code and a clear validation error response.

### Suggested Fix / Technical Hypothesis
Implement backend schema validation rules (e.g., using Joi, Zod, or class-validator) on the profile update payload. Ensure the phone number field is validated with a regex matching the exact specifications: `/^0\d{9,10}$/` and marked as required.

---

## 7. [Bug][FR-04][TC-I9 / TC-I10] Profile Update API and UI Permit Empty/Null Values for Name and Default Shipping Address

### Description
The application allows users to update their profile with empty strings for Name and Default Shipping Address. While the specification does not explicitly state these are mandatory, clearing these fields makes the user profile invalid for e-commerce transactions, which is a logical flaw.

### Severity
Medium

### Component
Frontend & Backend / Profile Form Validation

### Preconditions
* The user is logged in.

### Steps to Reproduce
1. Navigate to the profile update form (or send a direct request to the API).
2. Clear the Name field (`TC-I9`) and the Default Shipping Address field (`TC-I10`) to empty strings.
3. Click Save (or submit the API payload: `{"name": "", "address": ""}`).

### Actual Behavior
The profile updates successfully, saving empty values for Name and Default Shipping Address.

### Expected Behavior
* Name and Default Shipping Address are critical profile fields and must be mandatory.
* The frontend UI and backend API must reject empty strings or null values for these fields, prompting the user with a validation error (e.g., "Name cannot be empty").

### Suggested Fix / Technical Hypothesis
Add non-empty validations (e.g., `.trim().min(1)` or `required`) to both the frontend form validators and backend schema controllers for the `name` and `address` fields.

---

## 8. [Bug][FR-08][TC-V1] Shopping Cart Items are Not Cleared/Deleted After a Successful Checkout Process

### Description
Following a successful checkout process and order creation, the products in the user's shopping cart are not cleared. When the user returns to the store interface, the items remain in the cart, allowing duplicate purchases. According to functional requirements, the cart must be emptied immediately upon successful checkout.

### Severity
High

### Component
Frontend/Backend - Checkout Process Flow

### Preconditions
* The user is logged in.
* The user has items in their shopping cart.

### Steps to Reproduce
1. Add one or more products to the shopping cart.
2. Navigate to the checkout page.
3. Submit the payment to complete the order successfully.
4. Once redirected or after the order-success page load, check the shopping cart status (on UI or via API).

### Actual Behavior
The order is created successfully, but the shopping cart remains populated with the purchased products.
* **Test Case Outcome**:
  * `TC-V1`: "Order was successfully created but the shopping cart was not cleared"

### Expected Behavior
* Upon successful order creation and database transaction commit, the user's cart must be cleared completely (`cartState` becomes empty).
* Subsequent views of the cart page or widget must show an empty cart state (0 items, 0đ).

### Suggested Fix / Technical Hypothesis
Ensure the database transaction that creates the order also calls the cart clearance logic (e.g., `DELETE FROM cart_items WHERE user_id = ?` or equivalent service method). Verify that this is executed only after payment/order confirmation succeeds.

---

## 9. [Bug][FR-08][TC-I2 / TC-BVA2 / TC-BVA3][Security] Checkout API Accepts Arbitrary client-provided total_amount Values (Including Zero and Negative Values) Without Server-side Validation or Recalculation

### Description
The checkout API endpoint is vulnerable to price tampering. The server accepts whatever value is sent in the `total_amount` property of the client request payload and stores it as the final order cost. The backend fails to recalculate the sum based on the items in the user's cart. This allows attackers to change the price of orders to any value, including zero (`0đ`) or negative numbers (making the order have a negative value).

### Severity
Critical (High Financial Risk)

### Component
Backend / Checkout API

### Preconditions
* The user is authenticated.
* The user has items in the cart.
* Access to an API tool (e.g., Postman, CURL) to send direct request payloads.

### Steps to Reproduce
1. Add items to the cart (e.g., two items totaling `500,000đ`).
2. Construct a checkout API request.
3. Modify the payload's `total_amount` field:
   * **TC-I2**: Modify to `1` (e.g., `{"total_amount": 1, ...}`) -> Send request.
   * **TC-BVA2**: Modify to `-500000` (e.g., `{"total_amount": -500000, ...}`) -> Send request.
   * **TC-BVA3**: Modify to `0` (e.g., `{"total_amount": 0, ...}`) -> Send request.
4. Send the request and check the created order amount in the database or order history.

### Actual Behavior
The backend successfully creates the order using the exact fake price sent in the payload. The system creates orders with prices of `1đ`, `0đ`, or `-500,000đ`, violating financial logic.
* **Test Case Outcomes**:
  * `TC-I2`: "Submitting a fake total_amount payload creates the order with that fake total_amount stored in the database"
  * `TC-BVA2`: "Allows submitting a negative total_amount payload. The order is successfully created with a negative price"
  * `TC-BVA3`: "Similarly, the payload can be falsified with any arbitrary total_amount value"

### Expected Behavior
* The backend must never trust or use the `total_amount` sent by the client.
* The backend must fetch the cart items directly from the database, look up the active product prices on the server, and calculate the total amount server-side.
* If a `total_amount` is provided in the client payload, the backend should compare it with the server-recalculated total. If they do not match, or if any invalid (<= 0) value is sent, the API must reject the request with a `400 Bad Request` or `422 Unprocessable Entity` status code.

### Suggested Fix / Technical Hypothesis
In the checkout controller, calculate the order total by summing `quantity * unit_price` from the backend database records. Use this calculated value to populate the order record. Do not read the input payload's `total_amount` parameter or ignore it entirely.

---

## 10. [Bug][FR-08][TC-I4] Checkout Flow Permits Order Creation with Empty Cart and Zero Products Upon Page Reload

### Description
Reloading the checkout page causes the application to lose the product information intended for checkout. Despite having no product information, the interface still allows the user to complete the checkout flow. The backend server does not verify that the order contains products, resulting in the creation of a blank order worth `0đ` containing no items.

### Severity
High

### Component
Frontend & Backend / Checkout Page

### Preconditions
* The user is logged in.
* The user has navigated to the checkout step.

### Steps to Reproduce
1. Add items to the cart and proceed to the checkout page.
2. Perform a page reload (refresh) in the browser.
3. Observe that product details for the checkout are cleared/lost.
4. Click the payment submit/confirm button.

### Actual Behavior
The payment goes through and creates a successful order of `0đ` containing no items.
* **Test Case Outcome**:
  * `TC-I4`: "Upon reaching the checkout page and reloading the page, checkout item details are lost, but payment can still be completed. The created order has a price of 0đ and contains no products"

### Expected Behavior
* If the checkout details or items are lost upon page reload, the client UI should redirect the user back to the cart or display a "Your checkout session has expired" message.
* The backend API must reject checkout/order creation if the order has no items or the cart is empty, returning an error response instead of creating an empty order.

### Suggested Fix / Technical Hypothesis
* **Frontend**: Retrieve checkout items from a persistent state (such as local storage or backend query) instead of a transient memory state that gets wiped on reload.
* **Backend**: Add a validation check in the order creation route to ensure the cart contains at least 1 item: `if (cart.items.length === 0) throw new ValidationError("Cannot checkout an empty cart");`.

---

## 11. [Bug][FR-14][TC-I1 / TC-I5] Category Creation Permits Empty and Whitespace-only Names

### Description
The system allows categories to be created with empty names (`""`) or names containing only whitespace characters (e.g., `"   "`). The functional specifications state that the category name is mandatory and cannot be left blank. The current validation fails to check for empty strings or properly trim whitespace inputs before validation, resulting in empty or blank categories in the database.

### Severity
High

### Component
Frontend & Backend / Category Management

### Preconditions
* The user is logged in as an Admin (or uses the API directly).

### Steps to Reproduce
1. Navigate to the Category Management screen.
2. In the "Category Name" field, either leave it completely blank (`TC-I1`) or enter multiple space characters (e.g., `"   "`, `TC-I5`).
3. Click the "Add Category" button.

### Actual Behavior
The category is successfully created, and the blank or empty name is stored in the database.
* **Test Case Outcomes**:
  * `TC-I1`: "Successfully created a category with an empty name"
  * `TC-I5`: "Successfully created a category with a whitespace-only name"

### Expected Behavior
* The category name must be mandatory.
* The UI and backend API must trim the input string and reject empty or whitespace-only names, displaying a validation error (e.g., "Category name cannot be empty").

### Suggested Fix / Technical Hypothesis
* Add client-side validation logic that checks `name.trim().length > 0` before submitting.
* Apply the same validation rule on the backend validator middleware or database schema level (e.g., non-empty string constraint).

---

## 12. [Bug][FR-14][TC-I2][Security] Unauthorized Category Deletion: Backend API Lacks Role Checks and Permits Non-admin Users to Delete Categories

### Description
The category deletion API endpoint does not enforce proper authorization checks. Although the specification dictates that only Admin users can add or delete categories, the backend only checks if a user is authenticated (JWT token is present) but does not verify if the user's role is `"admin"`. This allows regular users to delete category resources.

### Severity
Critical (Privilege Bypass)

### Component
Backend / Category API

### Preconditions
* A user is registered and logged in as a regular user (role: `user`).
* Access to an API client tool (e.g., Postman, CURL) to send direct requests.

### Steps to Reproduce
1. Log in as a regular user and obtain the JWT authentication token.
2. Identify a valid category ID to delete.
3. Construct a DELETE HTTP request targeting the category deletion endpoint (e.g., `/api/categories/{id}`).
4. Include the JWT token in the `Authorization: Bearer <token>` header and send the request.

### Actual Behavior
The request succeeds, and the category is deleted from the database.
* **Test Case Outcome**:
  * `TC-I2`: "Non-admin user can successfully delete a category via the API as long as they are authenticated"

### Expected Behavior
* The category deletion endpoint must verify that the authenticated user possesses the `"admin"` role.
* Requests from non-admin users must be rejected with a `403 Forbidden` status code.

### Suggested Fix / Technical Hypothesis
Add an authorization middleware (e.g., `requireRole('admin')`) to the `DELETE /api/categories/:id` route handler in the backend router.

---

## 13. [Bug][FR-14][TC-I3] Delete Category API Returns Successful Response Status Code when Attempting to Delete Non-existent Category IDs

### Description
The DELETE endpoint for categories does not verify whether the targeted category ID exists in the database before returning a success status. When a client requests to delete a category that does not exist, the API returns a successful response status code (e.g., `200 OK` or success message) instead of indicating that the resource was not found.

### Severity
Low

### Component
Backend / Category API

### Preconditions
* The user is logged in as an Admin.

### Steps to Reproduce
1. Construct a DELETE API request for a non-existent category ID (e.g., `DELETE /api/categories/999999` where ID `999999` does not exist).
2. Send the request.

### Actual Behavior
The API returns a successful response code indicating the deletion was successful, despite no database rows being affected.
* **Test Case Outcome**:
  * `TC-I3`: "Sending a delete request for a non-existent category ID returns a success response, even though no category was affected"

### Expected Behavior
* The API should verify the resource's existence or check the number of affected rows in the database.
* If the category ID does not exist, the server should return a `404 Not Found` status code.

### Suggested Fix / Technical Hypothesis
In the delete controller, verify if the delete operation actually deleted a row (e.g., check `affectedRows` or `deletedCount`). If the count is 0, return a `404 Not Found` error response.

---

## 14. [Bug][FR-14][TC-I4] Category Management Allows Creation of Duplicate Category Names

### Description
The system allows multiple categories to be created with the exact same name. While the functional requirements do not explicitly define a unique constraint, having duplicate categories creates database redundancy and UI confusion for users browsing products.

### Severity
Medium

### Component
Backend / Category API

### Preconditions
* The user is logged in as an Admin.

### Steps to Reproduce
1. Add a category named `"Electronics"`.
2. Attempt to add another category with the exact same name `"Electronics"`.

### Actual Behavior
The category is successfully created, resulting in multiple distinct category entries with identical names.
* **Test Case Outcome**:
  * `TC-I4`: "Successfully created a duplicate category with an identical name"

### Expected Behavior
* Category names should be unique.
* The API should check the database for existing categories with the same name (case-insensitive) and reject duplicates with a `400 Bad Request` or `409 Conflict` status code.

### Suggested Fix / Technical Hypothesis
* Add a unique index constraint to the `name` column in the category database schema.
* Check for name collision in the creation route before executing the insert.
