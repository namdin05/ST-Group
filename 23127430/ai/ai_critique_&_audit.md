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

## AI Audit Record

### Metadata

| Field | Value |
|---------|---------|
| Feature | FR-01 Web Registration |
| Tool | GitHub Copilot Chat |
| Timestamp | [TO BE FILLED BY STUDENT] |

---

### Original Prompt (Verbatim)

```text
Apply Domain Testing for FR-01 Account Registration and structure the result into step-by-step explanation plus a test case table.
```

---

### AI Output (Verbatim)

```text
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
```

---

### Student Review

#### Verdict

- [ ] VALID
- [ ] INVALID
- [ ] INCOMPLETE

#### Student Reasoning

> [TO BE FILLED BY STUDENT]

#### Human Corrections

> [TO BE FILLED BY STUDENT]

---

### Compliance Checklist

- [ ] Prompt preserved verbatim
- [ ] Output preserved verbatim
- [ ] No AI-generated verdict
- [ ] No AI-generated correction
- [ ] Human review completed

## AI Audit Record

### Metadata

| Field | Value |
|---------|---------|
| Audit ID | [TO BE FILLED BY STUDENT] |
| Feature | FR-07 Shopping Cart |
| Tool | GitHub Copilot Chat |
| Timestamp | [TO BE FILLED BY STUDENT] |

---

### Original Prompt (Verbatim)

```text
Apply Test Design to FR-07
```

---

### AI Output (Verbatim)

```text
````markdown
# FR-07 Shopping Cart Test Design

Assumption: Platform is Web (frontend-web) with Backend API coverage, because FR-07 is implemented in the web client and backed by the server API.

## Stage A – Domain variables

| Variable Type | Variable | Description | Constraint / Relation | Scope |
| --- | --- | --- | --- | --- |
| Input | Cart item list | The set of products currently in the cart | Can be empty or populated; same product must map to one logical line item | UI and API |
| Input | Product identity | Product selected from Home or Product Detail | Must reference an existing product; same product should not create duplicate lines | UI and API |
| Input | Quantity adjustment | User action to increase or decrease quantity | Quantity changes by one step using plus/minus controls | UI |
| Input | Delete action | User triggers item removal | Removal must be preceded by a confirmation dialog | UI |
| Input | Continue shopping action | User clicks the link/button to return to Home | Must navigate back to the home page | UI |
| Input | Authorization header | JWT header for cart API calls | Required for /api/cart endpoints | API |
| Input | Cart item payload | JSON body sent to POST /api/cart | Expected fields: id, name, price, quantity | API |
| System state | Cart ownership | Cart is associated with a user token | Cart data must be isolated per user | API |
| System state | Empty cart state | Cart contains zero items | Must render empty-state feedback | UI and API |
| Output | Rendered table | Cart rows and column headings | Must show Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác | UI |
| Output | Total amount | Sum of all line totals | Must display the correct cart total and the label Tổng cộng | UI |
| Cross-variable constraint | Same-product merge | Same product added repeatedly | Must increase quantity instead of creating a new row | UI and API |
| Cross-variable constraint | Deletion confirmation | Delete intent versus confirmed deletion | Only confirmed deletion mutates the cart | UI |
| Cross-variable constraint | Cart isolation | Two users accessing cart data | One user must not see another user’s cart | API |

## Stage B – Equivalence partitions

| Partition ID | Description | Valid or invalid | Representative value | Requirement basis | Risk | Type |
| --- | --- | --- | --- | --- | --- | --- |
| UI-V1 | Empty cart state renders empty message and shopping link | Valid | 0 items | FR-07 empty cart requirement | Medium | Specification-derived |
| UI-V2 | Cart shows one or more distinct products with required columns | Valid | 1 product line | FR-07 table columns | High | Specification-derived |
| UI-V3 | Same product added twice should merge into one line with increased quantity | Valid | 2 adds of the same product | FR-07 same-product rule | High | Specification-derived |
| UI-V4 | Quantity can be increased or decreased through +/- controls | Valid | Quantity 1 and 2 | FR-07 quantity adjustment | High | Specification-derived |
| UI-I1 | Delete action without confirmation does not remove item | Invalid | Cancel in confirmation dialog | FR-07 delete confirmation | High | Specification-derived |
| UI-V5 | Continue shopping returns the user to Home | Valid | Click continue shopping | FR-07 continue shopping requirement | Medium | Specification-derived |
| API-V1 | Authorized GET /api/cart returns current cart for the signed-in user | Valid | Bearer token with empty or populated cart | Cart API auth requirement | High | Specification-derived |
| API-V2 | Authorized POST /api/cart accepts a complete item payload | Valid | {"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1} | API contract for cart add | High | Specification-derived |
| API-I1 | Missing or malformed Authorization header | Invalid | No token or wrong scheme | Cart API auth requirement | High | Specification-derived |
| API-I2 | Partial or malformed cart payload | Invalid | Missing quantity, non-numeric quantity, or quantity 0 | API schema and quantity behavior | High | Specification-derived |
| API-V3 | Cart data is isolated per user token | Valid | User A token vs User B token | Per-user cart scope | High | Specification-derived |
| API-R1 | Very large quantity value for robustness observation | Exploratory | 999999 | No explicit upper bound in spec | Medium | Exploratory |

## Stage C – Boundary analysis

| Boundary | Just below | At boundary | Just above |
| --- | --- | --- | --- |
| Empty versus populated cart | 0 items | 1 item | 2 items |
| Line-item quantity | 0 | 1 | 2 |
| Same-product merge count | 0 repeated adds | 1 repeated add | 2 repeated adds |
| Authorization header presence | Missing header | Valid Bearer token | Malformed Bearer token |
| Cart line total | 0 ₫ | Price of 1 item × quantity 1 | Price of 1 item × quantity 2 |

## Stage D – Combination strategy

The test design uses one-factor-at-a-time around a stable baseline so the cart’s core behaviors stay traceable without creating a full Cartesian product. For UI coverage, the baseline is a cart with one seeded product and the factors are empty versus populated state, same-product repetition, quantity adjustment, delete confirmation, and navigation back to Home.

For API coverage, the baseline is a valid JWT and a complete item payload. The key factor combinations are token presence, header format, payload completeness, quantity validity, and user isolation. Decision-table thinking is used for the most important interactions: valid token plus valid payload, valid token plus duplicate add, missing or malformed token, and invalid payload values. The exploratory large-quantity case is kept separate from the boundary set so no unstated maximum is implied.

## Stage E – Test cases

| TC ID | Feature | Platform | Layer (UI / API) | Technique | Requirement ID | Objective | Preconditions | Test Data | Steps | Expected Result | Actual Result | Status | Evidence | AI origin | Human revision | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR07-UI-01 | Shopping Cart | Web | UI | Domain partition | FR-07 | Verify the empty-cart presentation | Cart is empty | Empty cart | Open /cart | Empty-state illustration and clear message are shown, along with a continue-shopping link |  | NOT RUN | N/A | AI Generated | Pending | Specification-derived |
| TC-FR07-UI-02 | Shopping Cart | Web | UI | Domain partition | FR-07 | Verify cart table layout and total label | Cart contains one seeded product | iPhone 15 Pro Max x1 | Open /cart | Table shows Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác; total label reads Tổng cộng |  | NOT RUN | N/A | AI Generated | Pending | Specification-derived |
| TC-FR07-UI-03 | Shopping Cart | Web | UI | Equivalence partition | FR-07 | Verify same-product merging in the UI | Cart is empty; product is available | Add product id 1 twice | Add the same product twice, then open cart | One row is shown for that product and quantity becomes 2 |  | NOT RUN | N/A | AI Generated | Pending | Same-product rule |
| TC-FR07-UI-04 | Shopping Cart | Web | UI | Boundary value analysis | FR-07 | Verify quantity increment behavior | Cart has one item with quantity 1 | Quantity 1, then click + | Open cart and click + once | Quantity becomes 2 and line total plus cart total increase accordingly |  | NOT RUN | N/A | AI Generated | Pending | Boundary at 1 to 2 |
| TC-FR07-UI-05 | Shopping Cart | Web | UI | Boundary value analysis | FR-07 | Verify quantity decrement behavior around the minimum logical quantity | Cart has one item at quantity 1 and one item at quantity 2 for comparison | Quantity 1 and 2, then click - | Open cart and click - on the quantity control | Quantity does not go below 1; when starting at 2 it decreases to 1 |  | NOT RUN | N/A | AI Generated | Pending | Minimum logical boundary |
| TC-FR07-UI-06 | Shopping Cart | Web | UI | Decision table | FR-07 | Verify delete confirmation flow | Cart has one item | One cart item | Click Xóa, cancel once, then confirm on the second attempt | Cancel keeps the item; confirm removes the item from the cart |  | NOT RUN | N/A | AI Generated | Pending | Confirmation required before mutation |
| TC-FR07-UI-07 | Shopping Cart | Web | UI | State transition | FR-07 | Verify continue-shopping navigation | Any cart state | Any cart contents | Click Tiếp tục mua sắm | User returns to Home |  | NOT RUN | N/A | AI Generated | Pending | Navigation requirement |
| TC-FR07-API-01 | Shopping Cart | Web | API | Domain partition | FR-07 | Verify cart retrieval for an authenticated user with an empty cart | Valid JWT for a user with no cart items | Authorization: Bearer valid token | Send GET /api/cart | 200 response and an empty array |  | NOT RUN | N/A | AI Generated | Pending | API read path |
| TC-FR07-API-02 | Shopping Cart | Web | API | Equivalence partition | FR-07 | Verify authorized add-to-cart with a complete payload | Valid JWT; product exists | {"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1} | Send POST /api/cart, then GET /api/cart | Item is stored for that user and returned by GET /api/cart |  | NOT RUN | N/A | AI Generated | Pending | Direct backend add |
| TC-FR07-API-03 | Shopping Cart | Web | API | Equivalence partition | FR-07 | Verify duplicate add of the same product is merged logically | Valid JWT; cart starts empty | Same product payload posted twice | Send POST /api/cart twice with the same product, then GET /api/cart | One logical cart item is kept and quantity increases instead of creating a new row |  | NOT RUN | N/A | AI Generated | Pending | Critical business rule |
| TC-FR07-API-04 | Shopping Cart | Web | API | Invalid header | FR-07 | Verify missing or malformed Authorization header is rejected | No valid token supplied | Missing header or Authorization: Token abc | Send GET /api/cart or POST /api/cart | Request is rejected with unauthorized or forbidden status and cart data is unchanged |  | NOT RUN | N/A | AI Generated | Pending | Header handling |
| TC-FR07-API-05 | Shopping Cart | Web | API | Invalid payload | FR-07 | Verify malformed cart payload is rejected | Valid JWT | Missing quantity, non-numeric quantity, or quantity 0 | Send POST /api/cart with invalid body | Request is rejected and the cart is not mutated |  | NOT RUN | N/A | AI Generated | Pending | Bypass UI validation |
| TC-FR07-API-06 | Shopping Cart | Web | API | State isolation | FR-07 | Verify cart isolation between two users | Two distinct valid JWTs | User A adds item; user B checks cart | User A posts an item; User B sends GET /api/cart | User B does not see User A’s items |  | NOT RUN | N/A | AI Generated | Pending | Per-user cart scope |
| TC-FR07-API-07 | Shopping Cart | Web | API | Exploratory robustness test | FR-07 | Observe server behavior for an unusually large quantity value | Valid JWT; product exists | {"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":999999} | Send POST /api/cart and inspect the stored value | System behavior is observed and recorded without assuming a maximum that is not specified |  | NOT RUN | N/A | AI Generated | Pending | Exploratory, not a boundary |

## Stage F – Self-audit

- Potential duplicate test cases: TC-FR07-UI-02 and TC-FR07-UI-04 both observe totals, but one checks layout/labeling and the other checks quantity change; TC-FR07-API-02 and TC-FR07-API-03 both add items, but one checks single insertion and the other checks duplicate handling.
- Missing partitions: no explicit upper bound for cart quantity or cart line count exists in the specification, so no maximum boundary is asserted; mobile-device-specific cases are out of scope because the chosen platform is Web.
- Possibly invented assumptions: the minimum logical quantity of 1 is treated as an implicit boundary for cart adjustment; per-user cart isolation is treated as the intended server-side behavior because the backend stores cart state by user token.
- Cases that depend on environment or seed data: TC-FR07-UI-02, TC-FR07-UI-03, TC-FR07-UI-04, TC-FR07-API-02, TC-FR07-API-03, and TC-FR07-API-06 depend on seeded products and valid user tokens.
- Cases requiring API-level testing: TC-FR07-API-01 through TC-FR07-API-07, especially the invalid header, malformed payload, duplicate-add, and isolation checks.
- Cases requiring a real mobile device: none for this FR-07 report because the selected platform is Web.
````
```

---

### Student Review

#### Verdict

- [ ] VALID
- [ ] INVALID
- [ ] INCOMPLETE

#### Student Reasoning

> [TO BE FILLED BY STUDENT]

#### Human Corrections

> [TO BE FILLED BY STUDENT]

---

### Compliance Checklist

- [ ] Prompt preserved verbatim
- [ ] Output preserved verbatim
- [ ] No AI-generated verdict
- [ ] No AI-generated correction
- [ ] Human review completed
