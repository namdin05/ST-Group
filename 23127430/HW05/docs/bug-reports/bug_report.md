# Bug Report — Cart and Checkout Conformance

## 1. Review Result

The four completed k6 profiles did **not** expose a performance defect: Load, Spike, Stress, and Endurance all completed with zero HTTP failures, zero functional failures, zero failed checks, and no breached threshold. The review did, however, confirm three functional defects by tracing the limitations recorded in the performance documentation back to the requirements and implementation.

These defects are source-confirmed requirement mismatches. They were not reported as k6 failures because the current scripts validate successful responses and basic read-back, but do not assert duplicate-line merging, server-side price calculation, or post-checkout cart state.

| ID | Defect | Severity | Confirmation | GitHub Issue |
|---|---|---:|---|---|
| BUG-01 | Adding the same product creates another cart row | Medium | Requirement/source traceability | [#50](https://github.com/namdin05/ST-Group/issues/50) |
| BUG-02 | Checkout accepts a client-controlled `total_amount` | High | Requirement/source traceability | [#32](https://github.com/namdin05/ST-Group/issues/32) |
| BUG-03 | Successful checkout does not clear the cart | Medium | Requirement/source traceability | [#31](https://github.com/namdin05/ST-Group/issues/31) |

## 2. BUG-01 — Duplicate Cart Rows Instead of Quantity Merge

- **Status:** Confirmed from requirement/source mismatch; API regression execution recommended
- **Area:** Shopping Cart / `POST /api/cart`
- **Severity:** Medium
- **GitHub Issue:** [#50 — API allows duplicate items instead of merging quantity](https://github.com/namdin05/ST-Group/issues/50)
- **Requirement:** FR-07 states that adding the same product must increase its quantity and must not create another row ([`src/README.md`](../../src/README.md#fr-07-giỏ-hàng-shopping-cart)).

### Reproduction Steps

1. Log in and retain the JWT.
2. Send `POST /api/cart` with a product ID and `quantity: 1`.
3. Send the same request again for the same product.
4. Send `GET /api/cart`.

### Expected Result

The response contains one row for the product with quantity `2`.

### Actual Implementation Behavior

The route unconditionally executes `userCarts[userId].push(req.body)`, so every call adds another array entry ([`src/backend/server.js`](../../src/backend/server.js#L290-L294)). The client-side cart uses the same unconditional append behavior ([`CartContext.jsx`](../../src/frontend-web/src/context/CartContext.jsx#L7-L10)). The load-test design also records that each iteration appends to the cart and that no clear endpoint exists ([`load_test_design.md`](../test-design/load_test_design.md#test-data-and-side-effect-risks)).

### Impact

Users can see duplicate lines and inconsistent quantities. Repeated requests also retain unnecessary cart objects in the backend process, which can contribute to memory growth during long runs.

### Suggested Fix and Regression Check

Find an existing item by product ID and increment its quantity; only append when no match exists. Add an assertion that two identical add requests produce one row whose quantity equals the sum of both requests.

## 3. BUG-02 — Checkout Trusts Client-Controlled Total

- **Status:** Confirmed from requirement/source mismatch; API security regression execution recommended
- **Area:** Checkout / `POST /api/checkout`
- **Severity:** High
- **GitHub Issue:** [#32 — Checkout accepts arbitrary client-provided totals](https://github.com/namdin05/ST-Group/issues/32)
- **Requirement:** FR-08 requires the backend to recalculate the total and reject the client-provided `total_amount` ([`src/README.md`](../../src/README.md#fr-08-thanh-toán-checkout)).

### Reproduction Steps

1. Log in and add a known product to the cart.
2. Send `POST /api/checkout` with a manipulated `total_amount`, such as `1`.
3. Send `GET /api/orders/my-orders` and inspect the created order.

### Expected Result

The backend calculates the payable amount from authoritative product prices, quantities, and any valid coupon. A conflicting client total is ignored or rejected.

### Actual Implementation Behavior

The checkout route reads `total_amount` directly from the request and inserts it into `orders` without recalculation ([`src/backend/server.js`](../../src/backend/server.js#L297-L306)). The current frontend also sends this value in the checkout request ([`Checkout.jsx`](../../src/frontend-web/src/pages/Checkout.jsx#L42-L51)).

### Impact

A caller can create an order with an arbitrary total, compromising order and revenue data integrity.

### Suggested Fix and Regression Check

Load the authenticated user's cart on the server, fetch authoritative prices, validate quantities and coupon rules, and calculate the final total inside a transaction. Add a negative test that submits a forged total and verifies that the persisted order uses the server-calculated value.

## 4. BUG-03 — Cart Remains After Successful Checkout

- **Status:** Confirmed from requirement/source mismatch; API/UI regression execution recommended
- **Area:** Checkout state transition
- **Severity:** Medium
- **GitHub Issue:** [#31 — Cart is not cleared after successful checkout](https://github.com/namdin05/ST-Group/issues/31)
- **Requirement:** FR-08 states that the cart must be cleared after successful checkout ([`src/README.md`](../../src/README.md#fr-08-thanh-toán-checkout)).

### Reproduction Steps

1. Log in and add at least one product to the cart.
2. Complete `POST /api/checkout` successfully.
3. Send `GET /api/cart` or return to the cart in the UI.

### Expected Result

The authenticated user's cart is empty after the order is created successfully.

### Actual Implementation Behavior

The backend checkout route inserts the order and returns success without reading or clearing `userCarts[userId]` ([`src/backend/server.js`](../../src/backend/server.js#L297-L307)). The UI imports `clearCart` but does not invoke it in the checkout success path ([`Checkout.jsx`](../../src/frontend-web/src/pages/Checkout.jsx#L8-L8), [`Checkout.jsx`](../../src/frontend-web/src/pages/Checkout.jsx#L42-L64)).

### Impact

Purchased products remain visible and may be purchased again unintentionally. Retained cart entries also make later performance iterations less representative and increase process-local state.

### Suggested Fix and Regression Check

Clear the server-side cart only after the order transaction commits, then synchronize the client cart. Add an assertion that `GET /api/cart` returns an empty array after successful checkout and that a failed checkout preserves the cart.

## 5. Why the Performance Runs Still Passed

The current workflow asserts that Add to Cart succeeds and that a matching item exists, but it does not assert uniqueness or accumulated quantity. Checkout asserts order creation and read-back, but it does not send an adversarial total or inspect the cart afterward. Consequently, all performance checks can pass while these functional defects remain present.

The three functional defects are already tracked in GitHub Issues [#50](https://github.com/namdin05/ST-Group/issues/50), [#32](https://github.com/namdin05/ST-Group/issues/32), and [#31](https://github.com/namdin05/ST-Group/issues/31), where the existing issue bodies include screenshot evidence. No separate performance issue was created because the four measured profiles passed. Runtime evidence for those profiles remains in [`results/`](../../results/); this report does not relabel the passing performance results as performance bugs.
