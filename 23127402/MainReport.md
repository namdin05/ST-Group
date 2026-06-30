# HW02: Domain Testing & Boundary Value Analysis Report - EShop System

**Course:** Software Testing  
**Student ID:** 23127402  
**Full Name:** Truong Hoang Lam  
**Class:** 23KTPM1  
**GitHub Repository:** `https://github.com/namdin05/ST-Group`

---

## Selected Features
| Group | Feature ID | Feature Name |
| :--- | :--- | :--- |
| **Group A** | FR-03 | Forgot password and password reset (two steps) |
| **Group B** | FR-09 | Discount coupons |
| **Group C** | FR-15 | Product management (CRUD) |
| **Group D** | FR-20 | Mobile App (Order Cancellation & Profile Phone Validation) |

---

## I. DOMAIN TESTING REPORT

### 1. Introduction & Methodology
Equivalence Partitioning (EP) is a black-box test design technique in which the input domain of a system under test is partitioned into classes of data from which test cases can be derived. An equivalence class is a portion of the input domain where the system is expected to behave in a similar manner.

#### Step-by-Step Application of Domain Testing (Equivalence Partitioning):
1. **Identify Input Variables:** List the input fields, parameters, or states that affect the behavior of the feature.
2. **Determine Partition/Equivalence Classes:** 
   - **Valid Classes:** Inputs that are acceptable and processed normally by the system.
   - **Invalid Classes:** Inputs that should be rejected or handled gracefully with error handling, representing out-of-boundary, wrong format, or unexpected conditions.
3. **Select Representative Test Values:** Select one representative value from each equivalence class to minimize the number of test cases while maintaining strong coverage.
4. **Design Test Cases:** Map out each test scenario specifying inputs, expected results, testing technique used, and pass/fail criteria.

### 2. Feature-by-Feature Domain Testing Analysis & Test Cases

#### 2.1 FR-03: Forgot Password & Password Reset (Quên mật khẩu & Đặt lại mật khẩu)

##### 2.1.1 Analysis
* **Input Variables:**
  * `Step 1 Email`: String
  * `Step 2 OTP`: Numeric string
  * `Step 2 New Password`: String
  * `Step 2 Confirm Password`: String
* **Equivalence Classes:**
  * **Valid:**
    * `Step 1 Email`: Registered email, valid format (`user@domain.com`).
    * `Step 2 OTP`: Correct 6-digit numeric OTP generated for the specified email.
    * `Step 2 New Password`: Length $\ge 8$, contains $\ge 1$ uppercase, $\ge 1$ lowercase, $\ge 1$ digit, and $\ge 1$ special character from the approved set (`@, $, !, %, *, ?, &`).
    * `Step 2 Confirm Password`: Identical to `New Password`.
  * **Invalid:**
    * `Step 1 Email`: Empty, invalid format (e.g. missing `@`, missing domain, spaces), or unregistered email.
    * `Step 2 OTP`: Empty, invalid length, incorrect OTP, contains non-numeric characters, or valid OTP associated with another email.
    * `Step 2 New Password`: Empty, invalid length, missing uppercase, missing lowercase, missing digit, missing special character, or contains forbidden characters (e.g. `#`, ` `).
    * `Step 2 Confirm Password`: Empty, different from `New Password`.

##### 2.1.2 Domain Testing (EP) Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR03-EP-001** | Step 1 - Request OTP with valid, registered email (Happy Path) | `Step 1 Email` = "test@eshop.com" (registered) | A 6-digit OTP code is generated and displayed on the screen, along with a field for entering the new OTP and password. | EP | **Pass:** OTP displayed on screen, Step 1/2 indicator is visible.<br>**Fail:** No OTP generated, no indicator, or system crashes. |
| **TC-FR03-EP-002** | Step 1 - Request OTP with unregistered email | `Step 1 Email` = "unregistered@eshop.com" | The OTP code request was rejected. The alert message displayed was "lỗi: User not found". | EP | **Pass:** alert message is displayed; no OTP generated.<br>**Fail:** OTP generated or alert message is not displayed. |
| **TC-FR03-EP-003** | Step 1 - HTML5 format validation check for Email field | `Step 1 Email` = "invalidemailformat" | Browser native validation blocks form submission (type="email" check). | EP | **Pass:** Browser blocks submission and displays format warning.<br>**Fail:** Form is submitted to server. |
| **TC-FR03-EP-004** | Step 1 - Request OTP with empty email field | `Step 1 Email` = "" | Submission blocked. Error message "Vui lòng nhập Email" displayed. Email label has "*" indicator. | EP | **Pass:** Submission blocked, mandatory "*" constraint verified.<br>**Fail:** Empty field submitted without error. |
| **TC-FR03-EP-005** | Step 1 - Back to Login functionality | Click "Quay lại đăng nhập" button | User is successfully redirected back to the Login screen. | EP | **Pass:** Redirection succeeds.<br>**Fail:** "Quay lại đăng nhập" button fails to redirect. |
| **TC-FR03-EP-006** | Step 2 - Reset password with all valid inputs (Happy Path) | `Step 2 OTP` = "123456" (correct)<br>`New Password` = "Abcd123!"<br>`Confirm Password` = "Abcd123!" | Password updated successfully. Success toast displayed. Redirected to Login page. Step Indicator "Bước 2 / 2" is shown. | EP | **Pass:** Password resets successfully, redirected to login.<br>**Fail:** Password not reset or incorrect transition. |
| **TC-FR03-EP-007** | Step 2 - Reset password with OTP containing non-numeric characters | `Step 2 OTP` = "12345a"<br>`New Password` = "Abcd123!"<br>`Confirm Password` = "Abcd123!" | Reset rejected. Error "Mã OTP chỉ được chứa chữ số" displayed ABOVE the submit button. | EP | **Pass:** Rejected; alphanumeric OTP blocked.<br>**Fail:** Form submits. |
| **TC-FR03-EP-008** | Step 2 - Reset password with valid OTP generated for another email | `Step 1 Email` = "test@eshop.com"<br>`Step 2 OTP` = "654321" (valid but issued to "admin@eshop.com")<br>`New Password` = "Abcd123!"<br>`Confirm Password` = "Abcd123!" | Reset rejected. Error "Mã OTP không khớp hoặc không hợp lệ cho email này" displayed ABOVE the submit button. | EP | **Pass:** Cross-use of OTP is blocked.<br>**Fail:** Password reset succeeds for the wrong email. |
| **TC-FR03-EP-009** | Step 2 - Password complexity: Missing uppercase letter | `Step 2 OTP` = "123456"<br>`New Password` = "abcd123!"<br>`Confirm Password` = "abcd123!" | Reset rejected. Error "Mật khẩu phải chứa ít nhất 1 chữ hoa" displayed ABOVE the submit button. | EP | **Pass:** Rejected; displays missing uppercase error.<br>**Fail:** Reset succeeds. |
| **TC-FR03-EP-010** | Step 2 - Password complexity: Missing lowercase letter | `Step 2 OTP` = "123456"<br>`New Password` = "ABCD123!"<br>`Confirm Password` = "ABCD123!" | Reset rejected. Error "Mật khẩu phải chứa ít nhất 1 chữ thường" displayed ABOVE the submit button. | EP | **Pass:** Rejected; displays missing lowercase error.<br>**Fail:** Reset succeeds. |
| **TC-FR03-EP-011** | Step 2 - Password complexity: Missing numeric digit | `Step 2 OTP` = "123456"<br>`New Password` = "Abcdefgh!"<br>`Confirm Password` = "Abcdefgh!" | Reset rejected. Error "Mật khẩu phải chứa ít nhất 1 chữ số" displayed ABOVE the submit button. | EP | **Pass:** Rejected; displays missing digit error.<br>**Fail:** Reset succeeds. |
| **TC-FR03-EP-012** | Step 2 - Password complexity: Missing special character | `Step 2 OTP` = "123456"<br>`New Password` = "Abcd1234"<br>`Confirm Password` = "Abcd1234" | Reset rejected. Error "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt" displayed ABOVE the submit button. | EP | **Pass:** Rejected; displays missing special char error.<br>**Fail:** Reset succeeds. |
| **TC-FR03-EP-013** | Step 2 - Password complexity: Forbidden special character | `Step 2 OTP` = "123456"<br>`New Password` = "Abcd123 " (forbidden ` `  char)<br>`Confirm Password` = "Abcd123 " | Reset rejected. Error "Mật khẩu chứa ký tự đặc biệt không hợp lệ" displayed ABOVE the submit button. | EP | **Pass:** Rejected due to forbidden special character.<br>**Fail:** Reset succeeds. |
| **TC-FR03-EP-014** | Step 2 - Confirm Password mismatch | `Step 2 OTP` = "123456"<br>`New Password` = "Abcd123!"<br>`Confirm Password` = "Abcd123?" | Reset rejected. Error "Mật khẩu xác nhận không khớp" displayed ABOVE the submit button. | EP | **Pass:** Mismatch rejected; error displayed above submit button.<br>**Fail:** Reset succeeds. |
| **TC-FR03-EP-015** | Step 2 - Fields visibility (Security check) | Input `New Password` and `Confirm Password` | Input text is masked (dots or stars) on screen (`type="password"` check). | EP | **Pass:** Password text is masked.<br>**Fail:** Plaintext passwords are visible. |
| **TC-FR03-EP-016** | Step 2 - Empty mandatory fields submit | `Step 2 OTP` = ""<br>`New Password` = ""<br>`Confirm Password` = "" | Submission blocked. Error message displayed ABOVE the submit button. Labels have "*" indicator next to them. | EP | **Pass:** Empty form rejected; labels contain "*".<br>**Fail:** Empty form submitted. |

---

#### 2.2 FR-09: Discount Coupons (Mã Giảm Giá)

##### 2.2.1 Analysis
* **Input Variables:**
  * `Coupon Code`: String
  * `Order Total Amount`: Numeric
  * `Current Date`: Date
  * `User Auth State`: Boolean (JWT token status)
  * `User Coupon Usage Count`: Integer
* **Equivalence Classes:**
  * **Valid:**
    * `Coupon Code`: Exists in database and is active (`is_active = 1`).
    * `Order Total Amount`: $\ge$ Coupon's minimum threshold (`min_order_amount`).
    * `Current Date`: Date is strictly before `expired_at`.
    * `User Auth State`: Logged-in with a valid JWT Token.
    * `User Coupon Usage Count`: $< $ `max_uses_per_user` for the current user.
  * **Invalid:**
    * `Coupon Code`: Code does not exist, is inactive (`is_active = 0`), or empty.
    * `Order Total Amount`: $< $ Coupon's minimum threshold (`min_order_amount`).
    * `Current Date`: Date is on or after `expired_at`.
    * `User Auth State`: Not logged in (Guest, no JWT Token).
    * `User Coupon Usage Count`: $\ge$ `max_uses_per_user` for the current user.

##### 2.2.2 Domain Testing (EP) Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR09-EP-001** | Apply percent coupon successfully (`SAVE10` happy path) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon applied. Discount calculated: 35,000 ₫ (10% of 350k). Final amount: 315,000 ₫. Format uses "₫" and thousands separator. | EP | **Pass:** Coupon successfully applied; formulas correctly computed.<br>**Fail:** Application rejected or incorrect math/formatting. |
| **TC-FR09-EP-002** | Apply fixed coupon successfully (`BIGBUY` happy path) | `Coupon Code` = "BIGBUY"<br>`Order Total Amount` = 550,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon applied. Discount calculated: 50,000 ₫. Final amount: 500,000 ₫. Format uses "₫" and thousands separator. | EP | **Pass:** Coupon successfully applied; formulas correctly computed.<br>**Fail:** Application rejected or incorrect math/formatting. |
| **TC-FR09-EP-003** | Apply non-existent coupon code | `Coupon Code` = "NOTREALCODE"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon rejected. Error "Mã giảm giá không tồn tại" displayed. | EP | **Pass:** Rejected; non-existent error displayed.<br>**Fail:** System crashes or applies phantom discount. |
| **TC-FR09-EP-004** | Apply inactive coupon code (`is_active = 0`) | `Coupon Code` = "SAVE10" (existing but inactive)<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon rejected. Error "Mã giảm giá không còn hoạt động" displayed. | EP | **Pass:** Rejected; inactive error displayed.<br>**Fail:** Inactive coupon is applied. |
| **TC-FR09-EP-005** | Apply coupon while not logged in (Guest user) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Guest (No JWT) | Coupon rejected. Error "Vui lòng đăng nhập để áp dụng mã giảm giá" displayed. | EP | **Pass:** Guest user blocked from applying coupon.<br>**Fail:** Guest applies coupon. |
| **TC-FR09-EP-006** | Discount amount exceeds order total (Edge Case) | Admin coupon: `FREE100`<br>Type = Fixed, value = 100,000 ₫<br>Threshold = 0 ₫<br>Current Order Total = 50,000 ₫ | Coupon applied successfully. Discount capped at 50,000 ₫. Final amount: 0 ₫ (cannot be negative). | EP | **Pass:** Discount is capped; final amount is 0 ₫.<br>**Fail:** Final amount goes negative (-50,000 ₫) or system crashes. |

---

#### 2.3 FR-15: Product CRUD (Quản lý Sản phẩm)

##### 2.3.1 Analysis
* **Input Variables:**
  * `Product Name`: String
  * `Product Price`: Numeric
  * `Category`: Dropdown selection
  * `Description`: String (Optional)
  * `Image URL`: String (Optional)
* **Equivalence Classes:**
  * **Valid:**
    * `Product Name`: Length 1 to 255 characters.
    * `Product Price`: Value $> 0$ (strictly positive).
    * `Category`: Existing category selected from dropdown list.
  * **Invalid:**
    * `Product Name`: Empty (length 0) or length > 255 characters.
    * `Product Price`: Value $\le 0$ (negative, zero), empty, or non-numeric.
    * `Category`: No selection (empty selection or placeholder).

##### 2.3.2 Domain Testing (EP) Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR15-EP-001** | Create product with all valid inputs (Happy Path) | `Name` = "Sản phẩm A"<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại"<br>`Description` = "Mô tả sản phẩm" | Product created successfully. User is redirected to Product list. Success toast shown. Label has "*" next to Name, Price, Category. Price shows "₫" with thousands separator. Button is blue. | EP | **Pass:** Product created; standard formatting and layout verified.<br>**Fail:** Creation fails or GUI rules violated. |
| **TC-FR15-EP-002** | Create product with negative Price | `Name` = "Sản phẩm A"<br>`Price` = -10,000 ₫<br>`Category` = "Điện thoại" | Creation blocked. Error "Giá sản phẩm phải lớn hơn 0" is displayed ABOVE the submit button. | EP | **Pass:** Rejected; price error displayed.<br>**Fail:** Product created with negative price. |
| **TC-FR15-EP-003** | Create product with non-numeric Price | `Name` = "Sản phẩm A"<br>`Price` = "abc"<br>`Category` = "Điện thoại" | Creation blocked. Error "Giá sản phẩm phải là một số hợp lệ" is displayed ABOVE the submit button. | EP | **Pass:** Non-numeric price blocked.<br>**Fail:** Form submitted. |
| **TC-FR15-EP-004** | Create product with empty Category selection | `Name` = "Sản phẩm A"<br>`Price` = 150,000 ₫<br>`Category` = "" (default placeholder) | Creation blocked. Error "Vui lòng chọn danh mục" is displayed ABOVE the submit button. Label has "*" next to Category. | EP | **Pass:** Creation blocked; mandatory category validated.<br>**Fail:** Product created without a category. |
| **TC-FR15-EP-005** | Edit product details successfully (Side-effect check) | Modify `Name` to "Sản phẩm A_V2" & `Price` to 160,000 ₫ for Product #1 | Product #1 is updated successfully. Viewing Product #1 shows new details. Other products (Product #2, #3, etc.) are NOT modified. | EP | **Pass:** Modified product successfully updated; side effects absent.<br>**Fail:** Update fails or other products are altered. |
| **TC-FR15-EP-006** | Delete product successfully | Click "Xóa" button (red) for Product #1 | Product #1 is permanently deleted. It is removed from the list. | EP | **Pass:** Product successfully deleted; red button styling present.<br>**Fail:** Product not deleted. |

---

#### 2.4 FR-20: Mobile App (Phân hệ Mobile - React Native)

##### 2.4.1 Analysis
* **Input Variables:**
  * `Current Order Status`: State (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`)
  * `User Role`: String (`user`, `admin`) - tested on Mobile interface for regular User.
  * `Phone Number`: String
* **Equivalence Classes:**
  * **Valid:**
    * `Current Order Status` for regular User cancellation: `pending` or `confirmed`.
    * `Phone Number`: Starts with `0`, has length 10 or 11.
  * **Invalid:**
    * `Current Order Status` for regular User cancellation: `shipping`, `delivered`, `canceled`.
    * `Phone Number`: Starts with a non-zero digit, contains non-numeric characters, or is empty.

##### 2.4.2 Domain Testing (EP) Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR20-EP-001** | User cancels pending order on Mobile (Happy Path) | `Order Status` = `pending`<br>`User Role` = `user`<br>Click "Hủy đơn hàng" button | "Hủy đơn hàng" button (red) is displayed. Dialog confirmation prompts. Status updates to `canceled`. Translated to "Đã hủy" on history view. | EP | **Pass:** Order canceled; status translated to Vietnamese; dialog shown.<br>**Fail:** Order remains pending or status not updated. |
| **TC-FR20-EP-002** | User cancels confirmed order on Mobile (Happy Path) | `Order Status` = `confirmed`<br>`User Role` = `user`<br>Click "Hủy đơn hàng" button | "Hủy đơn hàng" button (red) is displayed. Dialog confirmation prompts. Status updates to `canceled`. | EP | **Pass:** Order canceled successfully.<br>**Fail:** Order remains confirmed or error shown. |
| **TC-FR20-EP-003** | Mobile Phone Validation - Must start with 0 | `Phone` = "1234567890" (10 digits, starts with 1)<br>Update Profile | Profile update blocked. Error "Số điện thoại phải bắt đầu bằng số 0" displayed. | EP | **Pass:** Phone not starting with 0 is rejected; error shown.<br>**Fail:** Accepted. |
| **TC-FR20-EP-004** | Mobile Badge and Navigation Consistency | Add 1 product to Cart on Mobile | Visual feedback (toast) displayed immediately. Cart icon/link in navigation footer updates to display badge of "1". | EP | **Pass:** Toast shown, badge increments instantly.<br>**Fail:** No toast or badge does not update. |
| **TC-FR20-EP-005** | Mobile Empty State illustration | Open Cart page while empty | Cart shows customized empty state illustration and message "Giỏ hàng trống" with a button to go back. | EP | **Pass:** Empty state message and illustration visible.<br>**Fail:** Blank screen or raw system error. |
| **TC-FR20-EP-006** | Mobile Password Form security constraint | Register on Mobile | Password field hides input with mask (`secureTextEntry=true` / `type="password"` equivalency). | EP | **Pass:** Text masked securely on mobile viewport.<br>**Fail:** Plaintext passwords visible. |

---

## II. BOUNDARY VALUE ANALYSIS REPORT

### 1. Introduction & Methodology
Boundary Value Analysis (BVA) complements Equivalence Partitioning by testing values at the boundaries of equivalence partitions. Software systems are highly prone to "off-by-one" errors precisely at these edge limits.

#### Step-by-Step Application of Boundary Value Analysis:
1. **Identify Boundary Limits:** Select variables that have numeric ranges, string length constraints, or state boundaries.
2. **Define Boundary Test Values:** For each boundary threshold (e.g. Min or Max):
   - **Boundary Value (on-the-boundary / On):** The exact threshold limit.
   - **Just-below (inside or outside boundary / Under):** Exactly one step lower than the limit.
   - **Just-above (inside or outside boundary / Over):** Exactly one step higher than the limit.
3. **Execute Boundary Test Cases:** Test inputs precisely at these boundaries to ensure correct inequality check implementations (e.g., `<` vs $\le$, `>` vs $\ge$).

### 2. Feature-by-Feature Boundary Value Analysis & Test Cases

#### 2.1 FR-03: Forgot Password & Password Reset (Quên mật khẩu & Đặt lại mật khẩu)

##### 2.1.1 Boundary Value Identification
* `OTP` length (exactly 6 characters):
  * Just-below (Min-1): 5 digits (Invalid)
  * At boundary (Min/Max): 6 digits (Valid)
  * Just-above (Max+1): 7 digits (Invalid)
* `New Password` length (minimum 8 characters):
  * Just-below (Min-1): 7 characters (Invalid)
  * At boundary (Min): 8 characters (Valid)
  * Just-above (Min+1): 9 characters (Valid)

##### 2.1.2 BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR03-BVA-001** | Step 2 - Reset password with OTP length at Min-1 (5 digits) | `Step 2 OTP` = "12345" (5 digits)<br>`New Password` = "Abcd123!"<br>`Confirm Password` = "Abcd123!" | Reset rejected. Error "Mã OTP phải có đúng 6 chữ số" displayed ABOVE the submit button. | BVA | **Pass:** Rejected; error message displayed above button.<br>**Fail:** Form submits or incorrect error message. |
| **TC-FR03-BVA-002** | Step 2 - Reset password with OTP length at Max+1 (7 digits) | `Step 2 OTP` = "1234567" (7 digits)<br>`New Password` = "Abcd123!"<br>`Confirm Password` = "Abcd123!" | Reset rejected. Error "Mã OTP phải có đúng 6 chữ số" displayed ABOVE the submit button. | BVA | **Pass:** Rejected; error message displayed above button.<br>**Fail:** Form submits or incorrect error message. |
| **TC-FR03-BVA-003** | Step 2 - Reset password with New Password length at Min-1 (7 chars) | `Step 2 OTP` = "123456"<br>`New Password` = "Abc123!" (7 chars)<br>`Confirm Password` = "Abc123!" | Reset rejected. Error "Mật khẩu tối thiểu phải có 8 ký tự" displayed ABOVE the submit button. | BVA | **Pass:** Rejected due to password length.<br>**Fail:** Password updated with 7 characters. |
| **TC-FR03-BVA-004** | Step 2 - Reset password with New Password length at Min (8 chars) | `Step 2 OTP` = "123456"<br>`New Password` = "Abcd123!" (8 chars)<br>`Confirm Password` = "Abcd123!" | Password updated successfully. Redirected to Login page. | BVA | **Pass:** Success with exactly 8 characters.<br>**Fail:** Rejected. |
| **TC-FR03-BVA-005** | Step 2 - Reset password with New Password length at Min+1 (9 chars) | `Step 2 OTP` = "123456"<br>`New Password` = "Abcde123!" (9 chars)<br>`Confirm Password` = "Abcde123!" | Password updated successfully. Redirected to Login page. | BVA | **Pass:** Success with 9 characters.<br>**Fail:** Rejected. |

---

#### 2.2 FR-09: Discount Coupons (Mã Giảm Giá)

##### 2.2.1 Boundary Value Identification
* `Order Total Amount` vs threshold limit (`SAVE10` threshold is 300,000 ₫):
  * Just-below (Min-1): 299,999 ₫ (Invalid)
  * At boundary (Min): 300,000 ₫ (Valid)
  * Just-above (Min+1): 300,001 ₫ (Valid)
* `Current Date` vs expiry date (`EXPIRED` expiry: 2020-01-01):
  * Just-below (Current date is 2019-12-31): Valid
  * At boundary (Current date is 2020-01-01): Invalid (must be strictly before)
  * Just-above (Current date is 2020-01-02): Invalid
* `User Coupon Usage Count` vs limit:
  * For `SAVE10` (limit 1): Usage = 0 (Valid), Usage = 1 (Invalid)
  * For `VIP100` (limit 2): Usage = 1 (Valid), Usage = 2 (Invalid)

##### 2.2.2 BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR09-BVA-001** | Apply coupon below threshold limit (Min-1) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 299,999 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon rejected. Error "Đơn hàng chưa đạt giá trị tối thiểu 300.000 ₫" displayed. | BVA | **Pass:** Application rejected; correct error shown.<br>**Fail:** Coupon applied at 299,999 ₫. |
| **TC-FR09-BVA-002** | Apply coupon at exact threshold limit (Min) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 300,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon applied. Discount: 30,000 ₫. Final amount: 270,000 ₫. | BVA | **Pass:** Coupon successfully applied at exactly 300,000 ₫.<br>**Fail:** Coupon rejected. |
| **TC-FR09-BVA-003** | Apply coupon just above threshold limit (Min+1) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 300,001 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon applied. Discount: 30,000 ₫ (rounded down) or 30,000.1 ₫. Final amount adjusted. | BVA | **Pass:** Coupon successfully applied.<br>**Fail:** Coupon rejected. |
| **TC-FR09-BVA-004** | Apply coupon with date strictly before expiry date (Just-below) | `Coupon Code` = "EXPIRED" (expiry: 2020-01-01)<br>`Order Total Amount` = 150,000 ₫<br>`Current Date` = 2019-12-31<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon applied. Discount: 30,000 ₫ (20% of 150k). Final amount: 120,000 ₫. | BVA | **Pass:** Coupon successfully applied on 2019-12-31.<br>**Fail:** Coupon rejected. |
| **TC-FR09-BVA-005** | Apply coupon with date equal to expiry date (At boundary) | `Coupon Code` = "EXPIRED" (expiry: 2020-01-01)<br>`Order Total Amount` = 150,000 ₫<br>`Current Date` = 2020-01-01<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon rejected. Error "Mã giảm giá đã hết hạn sử dụng" displayed. | BVA | **Pass:** Rejected; expired error shown.<br>**Fail:** Coupon applied on the day of expiry. |
| **TC-FR09-BVA-006** | Apply coupon with date after expiry date (Just-above) | `Coupon Code` = "EXPIRED" (expiry: 2020-01-01)<br>`Order Total Amount` = 150,000 ₫<br>`Current Date` = 2020-01-02<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 | Coupon rejected. Error "Mã giảm giá đã hết hạn sử dụng" displayed. | BVA | **Pass:** Rejected; expired error shown.<br>**Fail:** Coupon applied after expiry. |
| **TC-FR09-BVA-007** | Apply coupon with usage count below limit (0 uses, limit 1) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 0 (below 1) | Coupon applied successfully. Discount: 35,000 ₫. | BVA | **Pass:** Coupon successfully applied.<br>**Fail:** Rejected. |
| **TC-FR09-BVA-008** | Apply coupon with usage count at limit (1 use, limit 1) | `Coupon Code` = "SAVE10"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 1 (at limit) | Coupon rejected. Error "Bạn đã sử dụng hết lượt dùng mã giảm giá này" displayed. | BVA | **Pass:** Application blocked; limit error displayed.<br>**Fail:** Coupon applied over the usage limit. |
| **TC-FR09-BVA-009** | Apply coupon with usage count below limit (1 use, limit 2) | `Coupon Code` = "VIP100"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 1 (below 2) | Coupon applied successfully. Discount: 100,000 ₫. Final: 250,000 ₫. | BVA | **Pass:** Coupon successfully applied.<br>**Fail:** Rejected on the second use. |
| **TC-FR09-BVA-010** | Apply coupon with usage count at limit (2 uses, limit 2) | `Coupon Code` = "VIP100"<br>`Order Total Amount` = 350,000 ₫<br>`Current Date` = 2026-06-17<br>`User Auth State` = Logged-in (JWT)<br>`Usage Count` = 2 (at limit) | Coupon rejected. Error "Bạn đã sử dụng hết lượt dùng mã giảm giá này" displayed. | BVA | **Pass:** Application blocked; limit error displayed.<br>**Fail:** Coupon applied over the usage limit. |

---

#### 2.3 FR-15: Product CRUD (Quản lý Sản phẩm)

##### 2.3.1 Boundary Value Identification
* `Product Name` length (mandatory, max 255 chars):
  * Just-below (Min-1): 0 characters (Invalid)
  * At boundary (Min): 1 character (Valid)
  * Just-above (Min+1): 2 characters (Valid)
  * Just-below (Max-1): 254 characters (Valid)
  * At boundary (Max): 255 characters (Valid)
  * Just-above (Max+1): 256 characters (Invalid)
* `Product Price` (must be strictly $> 0$):
  * Just-below: 0 ₫ (Invalid)
  * At boundary (Min positive): 1 ₫ (Valid)
  * Just-above: 2 ₫ (Valid)

##### 2.3.2 BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR15-BVA-001** | Create product with empty Product Name (Min-1) | `Name` = ""<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại" | Creation blocked. Error "Tên sản phẩm không được để trống" is displayed ABOVE the submit button. Label has "*" indicator. | BVA | **Pass:** Validation error displayed above submit button.<br>**Fail:** Created with empty name or error in wrong position. |
| **TC-FR15-BVA-002** | Create product with Name at Min length (1 char) | `Name` = "A"<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại" | Product created successfully. Redirected to Product list. | BVA | **Pass:** Product created successfully.<br>**Fail:** Rejected. |
| **TC-FR15-BVA-003** | Create product with Name at Min+1 length (2 chars) | `Name` = "Ab"<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại" | Product created successfully. Redirected to Product list. | BVA | **Pass:** Product created successfully.<br>**Fail:** Rejected. |
| **TC-FR15-BVA-004** | Create product with Name at Max-1 length (254 chars) | `Name` = [String of 254 characters]<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại" | Product created successfully. Redirected to Product list. | BVA | **Pass:** Product created successfully.<br>**Fail:** Rejected. |
| **TC-FR15-BVA-005** | Create product with Name at Max length (255 chars) | `Name` = [String of 255 characters]<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại" | Product created successfully. Redirected to Product list. | BVA | **Pass:** Product created successfully.<br>**Fail:** Rejected. |
| **TC-FR15-BVA-006** | Create product with Name exceeding Max length (Max+1) | `Name` = [String of 256 characters]<br>`Price` = 150,000 ₫<br>`Category` = "Điện thoại" | Creation blocked. Error "Tên sản phẩm tối đa 255 ký tự" is displayed ABOVE the submit button. | BVA | **Pass:** Rejected; correct error displayed above button.<br>**Fail:** Product created with 256 characters. |
| **TC-FR15-BVA-007** | Create product with Price = 0 ₫ (Just-below positive) | `Name` = "Sản phẩm A"<br>`Price` = 0 ₫<br>`Category` = "Điện thoại" | Creation blocked. Error "Giá sản phẩm phải lớn hơn 0" is displayed ABOVE the submit button. | BVA | **Pass:** Rejected; price positivity error shown.<br>**Fail:** Product created with 0 ₫. |
| **TC-FR15-BVA-008** | Create product with Price = 1 ₫ (At boundary) | `Name` = "Sản phẩm A"<br>`Price` = 1 ₫<br>`Category` = "Điện thoại" | Product created successfully. Redirected to Product list. | BVA | **Pass:** Product created with 1 ₫ successfully.<br>**Fail:** Rejected. |
| **TC-FR15-BVA-009** | Create product with Price = 2 ₫ (Just-above boundary) | `Name` = "Sản phẩm A"<br>`Price` = 2 ₫<br>`Category` = "Điện thoại" | Product created successfully. Redirected to Product list. | BVA | **Pass:** Product created with 2 ₫ successfully.<br>**Fail:** Rejected. |

---

#### 2.4 FR-20: Mobile App (Phân hệ Mobile - React Native)

##### 2.4.1 Boundary Value Identification
* `Current Order Status` (State transitions boundaries):
  * Transition from `pending` to `canceled` (Allowed / State Boundary)
  * Transition from `confirmed` to `canceled` (Allowed / State Boundary)
  * Transition from `shipping` to `canceled` (Forbidden / State Boundary)
  * Transition from `delivered` to `canceled` (Forbidden / State Boundary)
  * Transition from `canceled` to `canceled` (Forbidden / State Boundary)
* `Phone Number` string length (must be 10-11 digits):
  * Just-below (Min-1): 9 digits (Invalid)
  * At boundary (Min): 10 digits (Valid)
  * At boundary (Max): 11 digits (Valid)
  * Just-above (Max+1): 12 digits (Invalid)

##### 2.4.2 BVA Test Cases
| Test Case ID | Scenario / Description | Test Inputs | Expected Result | Testing Technique (EP / BVA) | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FR20-BVA-001** | Cancel shipping order on Mobile (Forbidden State Boundary) | `Order Status` = `shipping`<br>`User Role` = `user` | "Hủy đơn hàng" button is hidden or disabled. If API request is simulated, error returned indicating "Không thể hủy đơn hàng đang giao". | BVA | **Pass:** Option to cancel is unavailable on Mobile interface.<br>**Fail:** User can cancel shipping order on Mobile. |
| **TC-FR20-BVA-002** | Cancel delivered order on Mobile (Final State Boundary) | `Order Status` = `delivered`<br>`User Role` = `user` | "Hủy đơn hàng" button is hidden. `delivered` is a final state; any change is rejected. | BVA | **Pass:** Cancellation option is hidden and transition blocked.<br>**Fail:** User can cancel delivered order. |
| **TC-FR20-BVA-003** | Cancel already canceled order on Mobile (Final State Boundary) | `Order Status` = `canceled`<br>`User Role` = `user` | "Hủy đơn hàng" button is hidden. `canceled` is a final state; further status change is blocked. | BVA | **Pass:** Already canceled order cannot be edited or canceled again.<br>**Fail:** Status machine allows double cancel or transition. |
| **TC-FR20-BVA-004** | Mobile Phone Validation - Length at Min-1 (9 digits) | `Phone` = "012345678" (9 digits)<br>Update Profile | Profile update blocked. Error "Số điện thoại không hợp lệ (phải từ 10-11 chữ số)" displayed. | BVA | **Pass:** 9-digit phone is rejected; error shown.<br>**Fail:** 9-digit phone is accepted. |
| **TC-FR20-BVA-005** | Mobile Phone Validation - Length at Min (10 digits) | `Phone` = "0123456789" (10 digits)<br>Update Profile | Profile updated successfully. Phone is stored. | BVA | **Pass:** 10-digit phone starting with 0 is accepted.<br>**Fail:** Rejected. |
| **TC-FR20-BVA-006** | Mobile Phone Validation - Length at Max (11 digits) | `Phone` = "01234567890" (11 digits)<br>Update Profile | Profile updated successfully. Phone is stored. | BVA | **Pass:** 11-digit phone starting with 0 is accepted.<br>**Fail:** Rejected. |
| **TC-FR20-BVA-007** | Mobile Phone Validation - Length at Max+1 (12 digits) | `Phone` = "012345678901" (12 digits)<br>Update Profile | Profile update blocked. Error "Số điện thoại không hợp lệ (phải từ 10-11 chữ số)" displayed. | BVA | **Pass:** 12-digit phone is rejected; error shown.<br>**Fail:** 12-digit phone is accepted. |
