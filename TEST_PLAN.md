# TEST PLAN

Below is a 2-week test plan designed for a 3-person team, based on the proposal. It uses **Playwright as the main automation framework**, with optional AI assistance from Copilot/Codex, and focuses on EShop’s highest-risk flows.

**Test Plan: EShop Web Automation Pilot**

**Objective**

Validate the key EShop user and admin flows using Playwright automation, while measuring correctness, reliability, maintainability, flakiness, and debugging quality.

Main goals:

- Build a small but meaningful automated regression suite.
- Cover risky EShop features identified in the proposal.
- Compare manual understanding vs automated evidence.
- Produce results suitable for seminar demonstration.

**Scope**

In scope:

1. Login and account behavior
2. Add to cart
3. Cart quantity/state validation
4. Checkout and coupon
5. Reset password
6. Profile update security
7. Order cancellation
8. Admin role enforcement
9. CSV import behavior, if time allows

Out of scope for 2 weeks:

- Full performance testing
- Full security penetration testing
- Mobile app testing
- Complete cross-browser matrix for every test
- Full AI-native tool comparison unless trial access is ready

**Test Strategy**

Use a mixed approach:

| Test Type | Purpose | Tool |
| --- | --- | --- |
| Manual exploratory testing | Understand behavior and confirm expected results | Browser |
| Automated E2E testing | Regression and repeatability | Playwright |
| Negative testing | Validate invalid input and abuse cases | Playwright + manual |
| Security-focused functional checks | Verify role and server-side validation | Playwright/API if available |
| Flakiness testing | Run tests repeatedly to detect instability | Playwright repeat/CI |
| Evidence collection | Screenshot, trace, report | Playwright Trace Viewer |

**Priority Features**

| Priority | Feature | Reason |
| --- | --- | --- |
| P0 | Login | Entry point for most flows |
| P0 | Add to Cart | Core shopping behavior |
| P0 | Checkout / Coupon | Business-critical and has known risk around client-side total |
| P1 | Profile Update | Risk of client sending unauthorized `role` |
| P1 | Admin Access Control | Risk of valid token being accepted without admin role |
| P1 | Reset Password | Known mismatch: 4-digit token vs expected 6-digit token |
| P2 | Order Cancellation | Needs state machine validation |
| P2 | CSV Import | Risk of partial success instead of all-or-nothing behavior |

**Test Scenarios**

| ID | Scenario | Expected Result | Priority |
| --- | --- | --- | --- |
| TC01 | Login with valid account | User logs in and reaches authenticated area | P0 |
| TC02 | Login with invalid password | Error message appears, user remains unauthenticated | P0 |
| TC03 | Account lockout after repeated failed logins | Account is locked or correct lockout behavior occurs | P0 |
| TC04 | Add one product to cart | Product appears in cart with correct name, price, quantity | P0 |
| TC05 | Add same product multiple times | Quantity is updated or duplicate behavior matches requirement | P0 |
| TC06 | Remove item from cart | Cart updates correctly | P1 |
| TC07 | Checkout with valid cart | Order is created with correct total | P0 |
| TC08 | Checkout after modifying client-side total | Server recalculates or rejects manipulated total | P0 |
| TC09 | Apply valid coupon | Discount is applied correctly | P0 |
| TC10 | Apply invalid/expired coupon | Coupon is rejected with clear message | P1 |
| TC11 | Reset password request | Token behavior matches requirement | P1 |
| TC12 | Profile update without role change | User profile updates but role remains unchanged | P1 |
| TC13 | Normal user accesses admin endpoint/page | Access is denied | P1 |
| TC14 | Cancel order in cancellable state | Order status changes correctly | P2 |
| TC15 | Cancel order in invalid state | Cancellation is rejected | P2 |
| TC16 | Import valid CSV | All records are imported successfully | P2 |
| TC17 | Import CSV with one invalid row | System rejects all or follows documented rollback behavior | P2 |

**Automation Design**

Recommended structure:

```
tests/
  auth.spec.ts
  cart.spec.ts
  checkout.spec.ts
  profile.spec.ts
  admin.spec.ts
  order.spec.ts
  import.spec.ts

pages/
  LoginPage.ts
  ProductPage.ts
  CartPage.ts
  CheckoutPage.ts
  ProfilePage.ts
  AdminPage.ts

fixtures/
  users.ts
  products.ts
  coupons.ts

utils/
  testData.ts
  assertions.ts
```

Locator rules:

- Prefer `getByRole`, `getByLabel`, `getByText`, and stable `data-testid`.
- Avoid fragile CSS chains and XPath unless necessary.
- No hard waits such as `waitForTimeout` except for debugging.

Assertion rules:

- Assert business result, not only UI visibility.
- Example: after checkout, verify order total, order status, and cart state.
- For security-related tests, assert that unauthorized changes do not happen.

**Team Allocation**

| Member | Main Responsibility | Secondary Responsibility |
| --- | --- | --- |
| Member 1 | Test lead, planning, reporting, login/profile/admin tests | Review test quality |
| Member 2 | Cart, checkout, coupon automation | Test data and fixtures |
| Member 3 | Reset password, order cancellation, CSV import | Flakiness runs and evidence collection |

**2-Week Schedule**

| Day | Work |
| --- | --- |
| Day 1 | Read requirements, confirm EShop setup, define test data |
| Day 2 | Install Playwright, create project structure, smoke test setup |
| Day 3 | Manual exploration of login, cart, checkout |
| Day 4 | Automate login and add-to-cart flows |
| Day 5 | Automate checkout and coupon flows |
| Day 6 | Automate negative login, cart edge cases, invalid coupon |
| Day 7 | Automate profile role-change and admin access tests |
| Day 8 | Automate reset password and order cancellation tests |
| Day 9 | CSV import tests if feasible; otherwise strengthen P0/P1 tests |
| Day 10 | Run full suite repeatedly, collect pass rate/flakiness |
| Day 11 | Fix unstable tests, improve locators and fixtures |
| Day 12 | Cross-browser smoke run: Chromium + Firefox/WebKit if possible |
| Day 13 | Prepare report: results, failures, screenshots, traces |
| Day 14 | Final demo preparation and risk summary |

**Entry Criteria**

Testing can start when:

- EShop runs locally.
- Test accounts are available.
- Product and coupon test data are known.
- Playwright is installed and can open the app.
- Team agrees on expected behavior for each tested feature.

**Exit Criteria**

The 2-week test cycle is complete when:

- All P0 tests are automated and executed.
- At least most P1 tests are automated or manually verified.
- Test suite can be run by all 3 members.
- Each failed test has evidence: screenshot, trace, or clear log.
- Flaky tests are identified and documented.
- Final report includes pass/fail result, defects found, and tool evaluation.

**Metrics**

| Metric | Target |
| --- | --- |
| P0 automation coverage | 100% |
| P1 automation/manual coverage | At least 70% |
| Repeated run count | 10 runs for core suite |
| Acceptable flaky failure rate | 0-10% |
| Setup reproducibility | All 3 members can run tests |
| Evidence quality | Every failure has trace/screenshot |
| Maintainability | Common actions use page objects/helpers |

**Deliverables**

1. Playwright test suite
2. Test case table
3. Bug/issue list
4. Test execution report
5. Trace/screenshots for failed cases
6. Short seminar demo flow:
    - Login
    - Add to cart
    - Checkout/coupon
    - One security or negative test

**Recommended Demo Flow**

For the seminar, show:

1. A passing flow: `Login -> Add to Cart -> Checkout`
2. A negative flow: invalid coupon or failed login
3. A risk-based flow: checkout total tampering    or profile role change
4. Playwright trace viewer to explain failure analysis

This keeps the plan realistic for 3 people in 2 weeks while still matching the theory in the proposal: correctness, locator quality, synchronization, maintainability, flakiness, and diagnosability.