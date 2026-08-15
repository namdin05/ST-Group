# WF01 Functional API Verification

## Environment

- Base URL: `http://127.0.0.1:3000`
- Backend: exact `src/backend/server.js` and `src/backend/database.js` executed from an isolated temporary directory
- Database: fresh temporary SQLite seed; original `src/backend/database.sqlite` was not opened by the verification server
- Verification date: `2026-08-14T14:21:52.9267566+07:00`
- Execution type: one sequential functional workflow; **not a performance test**

## Data-safety Controls

The repository database contained 119 users before verification. Starting the backend in place would import `database.js`, drop all application tables, and reseed only the built-in sample data. Therefore:

1. `server.js` and `database.js` were copied to an OS temporary directory.
2. The temporary server resolved the existing installed Node dependencies but created its own temporary `database.sqlite`.
3. WF01 was called once and the temporary server was stopped.
4. The temporary directory was removed.
5. SHA-256 and modification time checks confirmed the original database remained unchanged.

No credential or JWT value is recorded in this document.

## Results

| Step | Request | Expected | Actual | Status |
|---|---|---|---|---|
| Login | `POST /api/login` | 200 and non-empty JWT token | 200; authentication token returned | VERIFIED |
| Search | `GET /api/products?search=iPhone` | Non-empty JSON list with extractable product `id` | 200; one product returned; `id` extracted | VERIFIED |
| Product Detail | `GET /api/products/{productId}` | Returned product ID matches Search correlation | 200; response ID matched | VERIFIED |
| Add to Cart | `POST /api/cart`, then `GET /api/cart` | Add response succeeds and authenticated cart contains product/quantity | Both 200; cart contained one matching item with quantity 1 | VERIFIED |
| Checkout | `POST /api/checkout`, then `GET /api/orders/my-orders` | Integer `orderId` returned and matching order persists | 200; integer ID returned; order found for authenticated user | VERIFIED |

## Correlation Verification

```text
Login response token
  → Bearer token for Cart, Checkout, and order read-back

Search response id
  → Product Detail path parameter
  → Add to Cart body id

Search/Detail product fields
  → Add to Cart name and price
  → Checkout total_amount for this minimal one-item verification

Checkout response orderId
  → matched in GET /api/orders/my-orders
```

No cookie, server session, or cart ID was observed.

## Issues Found During Source/Verification Review

- Backend startup is destructive to its colocated database because `database.js` always drops and recreates tables.
- Backend cart is process-local and keyed by JWT user ID; the Web frontend instead uses React-only state.
- Checkout creates an order without reading cart data, creating order items, validating stock, recalculating the total, or clearing the cart.
- Product Detail returns 200 with `{}` for a missing ID, so HTTP status alone is not a valid assertion.
- The functional workflow passes against the implementation, but passing does not prove conformance with the EShop requirements document.

These are source/behavior observations, not performance-test bug claims.

## Resolution After the Performance Phase

- Human Review accepted benchmarking the backend Cart API while documenting the frontend/backend state difference.
- k6 v2.0.0 was selected and the same verified seven-request workflow was implemented for Load, Stress, Spike, and Endurance.
- Fifty synthetic accounts were provisioned only into disposable SQLite databases, with one unique account per VU.
- Hardware screenshots, Task Manager/process evidence, raw JSON, summary, console, and HTML artifacts were captured for the completed scenarios.
- The original source database was protected and verified unchanged during the evidence reruns.
- Endurance completed the authorized 20-VU/12-minute hold with 1,081 workflows, zero failures, and exact-hold/result/resource evidence.
