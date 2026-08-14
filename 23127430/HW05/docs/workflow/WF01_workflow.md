# WF01 – Search & Single-item Purchase

## 1. SUT and Repository Survey

| Item | Source-verified value |
|---|---|
| SUT source | `src/` |
| Backend | Node.js, Express 5, CommonJS; monolithic route handlers in `src/backend/server.js` |
| Frontend Web | React 19 + Vite 8; default URL `http://localhost:5173` |
| Frontend Admin | React + Vite; configured port `5174` |
| Frontend Mobile | React Native + Expo |
| Database | SQLite file at `src/backend/database.sqlite` |
| API base URL | `http://localhost:3000` for the local default environment |
| API base path | `/api` |
| Authentication | Stateless JWT in `Authorization: Bearer <token>`; no auth cookie or server session |
| WF01 database entities | `users`, `products`, `orders` |
| Missing entities | No cart table, order-item table, inventory/stock field, or payment entity exists |

The source has no controller or service layer. Route, business logic, and database calls for WF01 are implemented directly in `src/backend/server.js`; schema and seed logic are in `src/backend/database.js`.

## 2. Business Flow

```text
Login
  → Search Product
  → View Product Detail
  → Add to Cart
  → Checkout
```

## 3. API Mapping

| No. | Business Step | Endpoint Group | Method | Endpoint | Authentication | Input | Output | Correlation |
|---:|---|---|---|---|---|---|---|---|
| 1 | Login | Auth-heavy | POST | `/api/login` | None | JSON `email`, `password` | 200 JSON with `message`, JWT `token`, and `user`; 401 invalid credentials; 403 active lock | Extract `token`; user identity is the JWT `id` claim |
| 2 | Search Product | Read-heavy | GET | `/api/products?search={keyword}` | None | Query `search` (optional; blank returns all products) | 200 JSON array of product rows | Select a product and extract `id`, `name`, and `price` |
| 3 | Product Detail | Read-heavy | GET | `/api/products/{productId}` | None | Path parameter `productId` from Search | 200 JSON product; missing ID also returns 200 with `{}` | Assert response `id` equals the correlated `productId` |
| 4 | Add to Cart | Transactional | POST | `/api/cart` | Bearer JWT | JSON `id`, `name`, `price`, `quantity` | 200 `{"message":"Added to cart"}` | JWT `id` selects `userCarts[userId]`; no `cartId` exists |
| 5 | Checkout | Transactional | POST | `/api/checkout` | Bearer JWT | Handler reads JSON `total_amount`, `shipping_address` | 200 with `message` and integer `orderId` | JWT `id` becomes `orders.user_id`; extract `orderId` |

## 4. Step-by-step Source Analysis

### 4.1 Login

The login handler reads `email` and `password`, queries `users`, compares the stored plaintext password, resets lock state after success, and signs a JWT containing `id` and `role`. No expiry is passed to `jwt.sign`, so the implementation does not set an application-defined token lifetime.

The authentication middleware reads the second whitespace-delimited value from the `Authorization` header, verifies it with the application secret, and assigns the decoded claims to `req.user`. Missing and invalid tokens return 401 and 403 respectively.

#### Source Evidence

- Route and handler: `src/backend/server.js:32-66`
- JWT middleware: `src/backend/server.js:100-110`
- User schema and lock fields: `src/backend/database.js:48-61`
- Frontend login call and token persistence: `src/frontend-web/src/context/AuthContext.jsx:8-35`
- UI call into the auth context: `src/frontend-web/src/pages/Login.jsx:10-19`
- API specification: `src/api_specification.md:24-32`

### 4.2 Search Product

The route reads the optional `search` query parameter. A non-empty keyword applies a SQL `LIKE '%keyword%'` filter to the product name; a blank query returns all products. There is no pagination and no authentication middleware. The response is a JSON array whose product identifier field is `id`.

#### Source Evidence

- Route and handler: `src/backend/server.js:141-157`
- Product schema: `src/backend/database.js:63-71`
- Frontend search call and product rendering: `src/frontend-web/src/pages/Home.jsx:12-23`, `src/frontend-web/src/pages/Home.jsx:75-98`
- API specification: `src/api_specification.md:78-82`

### 4.3 Product Detail

The route parameter `:id` receives the `id` extracted from Search. A found product is returned as JSON. A missing product incorrectly returns HTTP 200 with an empty object, so status-only assertions are insufficient. Even-ID products have `price` converted to a string before the response. The schema has no stock or availability field, and this route performs no purchasability validation.

#### Source Evidence

- Route and handler: `src/backend/server.js:159-165`
- Search-to-detail frontend correlation: `src/frontend-web/src/pages/Home.jsx:75-92`
- Frontend detail call and empty-object handling: `src/frontend-web/src/pages/ProductDetail.jsx:7-19`, `src/frontend-web/src/pages/ProductDetail.jsx:33-35`
- API specification: `src/api_specification.md:84-85`

### 4.4 Add to Cart

The backend keeps carts in the process-local `userCarts` object. The JWT `id` claim chooses the array for the current user; the POST handler appends the entire request body without validating product existence, quantity, price, or stock. It returns only a message. There is no cart table, cart ID, database write, duplicate-item merge, delete endpoint, or server-side cart-clear endpoint.

Multiple VUs sharing one account therefore share and concurrently append to the same backend array. VUs using different accounts get different arrays within one backend process. All carts disappear on backend restart and are not shared across multiple backend processes.

The Web frontend does not call `POST /api/cart`: it stores cart data separately in React state. Direct API performance testing of `/api/cart` therefore exercises a real backend endpoint but does not reproduce the Web frontend's cart implementation exactly.

#### Source Evidence

- Process-local cart store: `src/backend/server.js:14`
- GET/POST cart handlers: `src/backend/server.js:284-295`
- Frontend-only cart state: `src/frontend-web/src/context/CartContext.jsx:5-25`
- Home add-to-cart UI: `src/frontend-web/src/pages/Home.jsx:97-102`
- Detail add-to-cart UI: `src/frontend-web/src/pages/ProductDetail.jsx:21-30`
- API specification: `src/api_specification.md:110-127`

### 4.5 Checkout

The checkout handler does not read the backend cart. It takes client-supplied `total_amount` and `shipping_address`, inserts one row into `orders` with status `pending`, and returns `orderId`. It does not create order items, validate or decrement stock, validate an address, calculate the total, process payment, or clear either frontend or backend cart state.

The Web frontend sends `items`, `total_amount`, and optional `coupon_id`, but does not send `shipping_address`; the backend ignores `items` and `coupon_id`. Although `clearCart` is imported, it is not called after checkout success.

#### Source Evidence

- Checkout route and order insert: `src/backend/server.js:297-309`
- Order read-back route: `src/backend/server.js:311-319`
- Order schema: `src/backend/database.js:73-81`
- Frontend checkout payload: `src/frontend-web/src/pages/Checkout.jsx:40-51`
- Frontend success path: `src/frontend-web/src/pages/Checkout.jsx:61-75`
- API specification: `src/api_specification.md:129-137`

## 5. Authentication and Correlation Flow

```text
users.csv: email, password, shipping_address
   │
   ▼
POST /api/login
   │
   ├── token ───────────────────────────────────────┐
   └── user.id (also encoded in token)              │
   ▼                                                │
GET /api/products?search={keyword}                  │
   │                                                │
   └── product.id + product.name + product.price    │
   ▼                                                │
GET /api/products/{product.id}                      │
   │                                                │
   └── assert returned id; retain product fields    │
   ▼                                                │
POST /api/cart  ◄──────── Authorization: Bearer ────┤
   │                                                │
   └── implicit cart key = token user.id            │
   ▼                                                │
POST /api/checkout ◄────── Authorization: Bearer ───┘
   │
   └── orderId
```

There is no cookie, session ID, or cart ID to correlate. Checkout is source-verified to be independent of the backend cart; the sequence is a workflow chosen for testing, not a transactional dependency enforced by this implementation.

## 6. WF01 Preconditions

- Run only against an authorized local/test EShop environment.
- Node.js 18 or later and backend dependencies must be available.
- Port 3000 must be free, or the deployment/base URL must be explicitly configured outside the current hard-coded source.
- Use a controlled copy of the database. Importing `database.js` calls `initDatabase()`, which drops and recreates all application tables on every backend start (`src/backend/database.js:13-20`, `src/backend/database.js:117`).
- Each test account must exist, have a valid password, and not be actively locked.
- Use an account pool large enough to avoid shared `userId` cart state across concurrent VUs.
- Each keyword must return at least one product with `id`, `name`, and numeric-coercible `price`.
- The direct API workflow intentionally calls the backend cart endpoint even though the current Web frontend uses React-only cart state.
- Do not use coupons in WF01 unless the workflow is explicitly expanded and separately reviewed.
- A cleanup/reset procedure must be approved before repeated checkout traffic.

No stock precondition can be enforced because the current product schema and checkout logic contain no stock field or stock update.

## 7. Account Lockout Handling

The requirements document says one increment per failed login, lock after three failures, and a 30-second demo lock (`src/README.md:39-44`). The implementation differs:

- each incorrect password adds **2** to `login_attempts` (`src/backend/server.js:54`);
- lock is set when the resulting value is at least 3, so a newly reset account is locked after the **second** consecutive wrong password;
- lock duration is 180,000 ms, or **3 minutes** (`src/backend/server.js:56-57`);
- lock state is stored in SQLite columns `login_attempts` and `locked_until`;
- a successful login resets both values (`src/backend/server.js:46-50`);
- an active lock rejects even a correct password with 403;
- there is no dedicated unlock endpoint. After expiry, a successful login clears the stored state; destructive database reseeding also clears it but must not be used casually.

Stress/Spike data must contain correct credentials. A shared account or bad CSV row can amplify lockout and invalidate results.

## 8. Test Data Strategy

### Users CSV

Final header:

```csv
email,password,shipping_address
```

Recommendation: one account per simultaneously active VU, allocated deterministically from a pool. `email` must be unique per active VU. The committed pool contains synthetic `local.test` credentials only; never replace it with production credentials or reuse its passwords outside this SUT. Runtime tokens remain secret. `shipping_address` may be reused if the test environment permits, but it must be non-production data.

A shared account is not recommended because all matching JWTs contain the same user ID and therefore append to the same backend cart and create orders under the same owner.

### Products CSV

Final header:

```csv
keyword
```

Do not supply `product_id` in the CSV for WF01. Search must remain meaningful: extract `id` from its response, use it for Product Detail, and carry verified `id`/`name`/`price` into Add to Cart. Prefer keywords that return one stable product; if a keyword returns multiple rows, the later test design must define a deterministic selection rule.

## 9. Test Repeatability and Data Cleanup

- Every Add to Cart call appends another object to an in-memory array. Repeating WF01 with the same account grows that cart without bound for the life of the backend process.
- Sharing one account creates cart collisions between VUs. Separate accounts isolate arrays but do not prevent per-VU growth across iterations.
- Checkout creates one new `orders` row per call. There is no order cleanup endpoint, so repeated runs grow the SQLite database.
- Checkout does not read or clear the backend cart. The Web frontend also does not call its imported `clearCart` function on success.
- There is no stock field or stock decrement, so stock depletion cannot occur in the current implementation. This is a business-realism gap, not evidence that a performance defect exists.
- Restarting the backend clears in-memory carts but also invokes destructive database drop/reseed logic. Do not use restart as cleanup against a database that must be preserved.
- No destructive cleanup script was implemented in this step. Before performance execution, approve either an isolated disposable database per run or a purpose-built, narrowly scoped reset strategy.

## 10. Assertions for the Future Performance Script

| Step | Required functional assertions beyond HTTP status |
|---|---|
| Login | JSON token is non-empty; `user.id` exists; response does not contain `error` |
| Search | Response is a non-empty JSON array; selected row has `id`, `name`, and numeric-coercible `price` |
| Product Detail | Response object is non-empty; returned `id` exactly matches the correlated ID; price is numeric-coercible |
| Add to Cart | Response message equals `Added to cart`; follow-up `GET /api/cart` contains the correlated product and quantity for that user |
| Checkout | Response message equals `Checkout successful`; `orderId` is an integer; follow-up `GET /api/orders/my-orders` contains that order for the authenticated user |

## 11. Functional Verification

One sequential functional verification was completed against an isolated temporary copy of the backend and its freshly seeded temporary SQLite database. All five WF01 steps passed their business assertions. The original `src/backend/database.sqlite` hash and modification time were unchanged, and the temporary environment was removed.

See [WF01_verification.md](WF01_verification.md) for the evidence record and limitations.

## 12. Open Questions / Human Decisions

- Should the performance assignment benchmark `POST /api/cart` as implemented, even though the Web frontend does not call it and Checkout does not consume it?
- Should `shipping_address` become a validated required checkout field, or should the future script mirror the current frontend payload that omits it?
- What disposable database/reset strategy is approved for repeated checkout and cart growth?
- Will the actual performance environment use one backend process or multiple instances? Process-local carts behave differently across instances.
- Which approved disposable database should receive the prepared 50-account synthetic pool, and when should provisioning occur relative to the final backend start?
- Workload, hardware, acceptance thresholds, and the final performance tool remain intentionally undecided for the next phase.

## 13. Readiness Assessment

**READY FOR LOAD TEST DESIGN**

The API mapping, authentication, correlation, state model, assertions, minimal functional behavior, and a validated 50-account/5-keyword dataset are ready. Load execution is not yet ready until the pool is provisioned into an approved disposable database and cleanup/isolation, hardware, workload, thresholds, and the backend-cart/frontend-cart scope decision receive human approval.
