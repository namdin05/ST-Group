# WF01 Load Test Design

## 1. Objective

Evaluate whether WF01 remains functionally stable under a conservative, sustained normal-load candidate while observing per-endpoint and end-to-end latency, p90/p95, throughput, error rate, and Windows/Node.js resource consumption.

This Load Test is not intended to find the breaking point, create a sudden spike, or establish final capacity. Stress and Spike profiles are explicitly out of scope.

**Hardware context: PROVIDED BY HUMAN REVIEW; screenshot capture remains pending.**

**Selected tool: k6 v2.0.0.** The accepted plan is implemented in `test-plans/load/23127430_Load_20260814.js`.

### Hardware and Execution Context

| Item | Human-provided value | Evidence status |
|---|---|---|
| Device | MSI Thin GF63 12VE | Reported from Windows Settings -> System -> About; repository screenshot pending |
| Operating system | Windows | Reported; Windows edition/version not provided |
| CPU | 12th Gen Intel(R) Core(TM) i5-12450H | Reported; core/thread counts not inferred |
| CPU speed displayed by Windows | 2.00 GHz | Recorded exactly as displayed; not treated as measured sustained clock |
| RAM | 16.0 GB, 3200 MT/s | Reported |
| Storage capacity shown | 477 GB | Reported; disk model/type and free space not provided |
| Graphics memory | 6 GB | Reported; GPU model not inferred |
| Evidence source | Windows Settings -> System -> About | Human-provided source; capture checklist is in `evidence/hardware/README.md` |

The source-backed default deployment is a Node.js backend on local port `3000` with embedded SQLite. For the measured run, k6, the Node.js backend, and SQLite ran locally on the same Windows host. To protect the original 119-user source database, the exact backend source was executed from an OS temporary directory against a newly created disposable SQLite database. Port `3000` was closed after cleanup.

This is a local test environment, not evidence of production capacity. The 16 GB RAM and reported CPU identify the machine on which resource evidence is expected, but they do not justify higher concurrency or a throughput target without a valid baseline. Option A remains deliberately conservative, especially if the future load generator, backend, and embedded database share this machine.

## 2. Workflow

One complete iteration preserves the approved WF01 sequence and all three endpoint groups:

```text
Login                Auth-heavy
  → Search Product   Read-heavy
  → Product Detail   Read-heavy
  → Add to Cart      Transactional
  → Checkout         Transactional
```

Recommendation: Login again at the start of **every iteration**. Logging in only once during setup would under-represent the auth-heavy endpoint and would no longer apply the same complete WF01 to every iteration.

Each VU keeps one unique account throughout the scenario. A new token replaces the previous token after each successful Login. If Login, correlation, or a functional assertion fails, stop that iteration before Checkout and record the failure category; do not create an invalid order merely to complete the sequence.

## 3. API Sequence

| Order | Request | Purpose | Side effect |
|---:|---|---|---|
| 1 | `POST /api/login` | Authenticate and produce JWT/user identity | Resets lock fields after successful login |
| 2 | `GET /api/products?search={keyword}` | Search and produce product fields | None |
| 3 | `GET /api/products/{productId}` | Validate selected product | None |
| 4 | `POST /api/cart` | Add one correlated product, quantity 1 | Appends to process-local `userCarts[userId]` |
| 5 | `GET /api/cart` | Validate actual cart mutation | Initializes/reads per-user in-memory cart |
| 6 | `POST /api/checkout` | Create one pending order | Inserts one SQLite `orders` row |
| 7 | `GET /api/orders/my-orders` | Validate `orderId` persistence/ownership | None |

The approved business sequence contains five primary calls. The recommended performance iteration contains **seven HTTP requests** because Cart and Checkout responses alone do not prove state mutation. The two read-backs are assertion support, not extra business steps.

Checkout does not consume backend cart state in the current source. This design still preserves Add to Cart → Checkout ordering, but does not claim a nonexistent `cartId` or transactional dependency.

## 4. Test Data

### Current Inventory

| CSV | Header | Rows | Allocation |
|---|---|---:|---|
| `test-data/users.csv` | `email,password,shipping_address` | 50 | One unique row per active VU |
| `test-data/products.csv` | `keyword` | 5 | Deterministic rotation across iterations/VUs |

### Account Allocation

- Assign account rows sequentially and deterministically by VU index.
- Read an account once during VU initialization and reuse only that account for the VU's iterations.
- Do not randomly share accounts and do not recycle one account into another concurrent VU.
- Fail preflight if requested concurrency exceeds 50; do not silently wrap to the first row.
- If a tool requires EOF settings, configure user data as non-recycling with stop/fail on insufficient rows. Exact JMeter/k6 mechanics remain pending tool selection.
- Provision the synthetic pool only after the final backend start and only into an approved disposable database.

### Product Allocation

- Rotate the five keywords deterministically, for example by `(VU index + iteration index) mod 5`, to distribute Search traffic without randomness-related reproducibility loss.
- Product keywords may recycle because Search is read-only.
- Never read `productId` from CSV. Extract it from the Search response each iteration.

## 5. Authentication

- Login has no authentication header.
- Extract the non-empty JWT `token` from the Login JSON response.
- Send `Authorization: Bearer <token>` to Cart, Checkout, and both authenticated read-backs.
- There is no cookie or server session. A cookie manager is not the authentication mechanism for WF01.
- The token has no application-defined expiry in the source, but the current iteration should still use its freshly returned token.
- Correct credentials are mandatory. The implementation can lock a newly reset account after the second consecutive wrong password for approximately three minutes.

## 6. Correlation

| Data | Produced By | Consumed By | Extraction / Validation Method |
|---|---|---|---|
| `authToken` | Login | Cart, Checkout, cart/order read-backs | JSON extraction `$.token`; assert non-empty string |
| `userId` | Login | Ownership diagnostics | JSON extraction `$.user.id`; assert present/numeric |
| `productId` | Search | Detail, Cart, validation | JSON extraction `$[0].id` after asserting a non-empty array |
| `productName` | Search | Cart body/diagnostics | JSON extraction `$[0].name` |
| `productPrice` | Search/Detail | Cart body and one-item `total_amount` | Extract `$[0].price`; confirm Detail ID and numeric-coercible price |
| `shippingAddress` | Users CSV | Checkout | Read from the VU's assigned CSV row |
| cart confirmation | Add to Cart + `GET /api/cart` | Assertion only | Find an entry matching correlated product ID and quantity; no `cartId` exists |
| `orderId` | Checkout | Order read-back/result validation | JSON extraction `$.orderId`; assert positive integer and presence in `my-orders` |

Do not pass cart data to Checkout as correlation: the actual backend ignores cart state and reads only `total_amount` and `shipping_address` from the request body.

## 7. Assertions

| Step | Required assertions beyond timing |
|---|---|
| Login | HTTP 200; `message == "Login successful"`; non-empty `token`; numeric/present `user.id`; no `error` |
| Search | HTTP 200; valid non-empty JSON array; selected row has `id`, `name`, and numeric-coercible `price` |
| Product Detail | HTTP 200; response is not `{}`; returned `id` equals correlated `productId`; price is numeric-coercible |
| Add to Cart | HTTP 200; `message == "Added to cart"`; read-back cart contains correlated ID and quantity 1 |
| Checkout | HTTP 200; `message == "Checkout successful"`; positive integer `orderId`; read-back contains that ID for the authenticated user |

### Failure Classification

| Observation | Initial classification | Review action |
|---|---|---|
| Timeout, connection reset/refused, or rising 5xx under concurrency | Possible performance/infrastructure failure | Correlate with load phase, Node CPU/RAM, and logs |
| HTTP 500 with stable low resource use | Functional/server failure, not automatically performance | Inspect backend error and reproduction at 1 VU |
| HTTP 401 | Authentication header/token problem | Validate extractor and request header |
| HTTP 403 | Invalid token or active account lock | Check token/CSV/lock state; classify as data/auth unless load-dependent evidence says otherwise |
| Search empty or missing fields | Test-data/functional failure | Check keyword and source data; do not continue iteration |
| Detail returns 200 `{}` or wrong ID | Functional/correlation failure | Fail assertion; do not treat 200 as success |
| Cart message succeeds but read-back lacks item | Functional/state failure | Check account isolation and cart assertion |
| Checkout lacks/loses `orderId` | Functional/state failure | Check response and authenticated order read-back |
| Assertion failure with HTTP 200 | Functional/correlation failure | Track separately from transport/server error rate |

The current schema has no stock. Do not classify a nonexistent out-of-stock condition or invent stock-exhaustion results.

## 8. Workload Proposal

Human Review accepted **Option A as the final initial Load configuration**. Option B is retained only as a later candidate; it was not selected for the initial run. Both profiles assume one account per VU, a disposable database, correct credentials, one backend process, and the think-time model in Section 9.

### Option A — Conservative Initial Load

| Parameter | Proposed Value | Reason |
|---|---:|---|
| Initial VUs | 1 | Confirms the seven-request iteration remains valid as concurrency begins |
| Target VUs | 5 | Uses only 10% of the 50-account pool and limits initial cart/order growth on an unprofiled local machine |
| Ramp-up | 2 minutes | Adds concurrency gradually so functional/data failures can be separated from immediate saturation |
| Hold | 5 minutes | Provides a short sustained observation window without turning the first run into an endurance test |
| Ramp-down | 1 minute | Avoids terminating all in-flight checkout writes simultaneously |
| Iteration | Repeat full WF01, including Login and two read-backs | Preserves auth-heavy/read-heavy/transactional coverage and business validation |
| Think-time | Per-transition random ranges plus 3–6 seconds between iterations | Prevents an unrealistic tight loop and reduces synchronized order bursts |

At the minimum configured pauses, a full loop has at least 9 seconds of pacing before response time is included. This bounds first-run side effects better than a zero-delay loop; it is a planning property, not a throughput prediction.

### Option B — Normal Load Candidate

| Parameter | Proposed Value | Reason |
|---|---:|---|
| Initial VUs | 2 | Starts above single-user verification while avoiding an immediate ten-user burst |
| Target VUs | 10 | Uses 20% of the account pool and doubles Option A concurrency without account sharing |
| Ramp-up | 3 minutes | Gives SQLite/Node resource trends time to become visible during increasing concurrent checkout writes |
| Hold | 10 minutes | Produces a more useful sustained-load window while remaining distinct from the later soak test |
| Ramp-down | 2 minutes | Lets in-flight workflows complete progressively and reduces end-of-run truncation |
| Iteration | Repeat full WF01, including Login and two read-backs | Keeps the exact workflow mix comparable with Option A |
| Think-time | Same per-transition distribution and 3–6 second inter-iteration pause | Keeps workload-shape differences attributable mainly to concurrency/duration |

Option B can generate substantially more in-memory cart entries and SQLite orders than Option A. It is not wrong or rejected as a future profile, but it is **not selected for the initial run** and must not be used until Option A evidence and a database-state budget are reviewed.

## 9. Think-time

Use an independently sampled uniform random pause for each transition:

| Transition | Proposed Range | Reason |
|---|---:|---|
| Login → Search | 1–2 seconds | Brief navigation/intent pause after authentication |
| Search → Detail | 2–4 seconds | Allows scanning the returned product list before selection |
| Detail → Add to Cart | 2–5 seconds | Represents reading details and choosing quantity |
| Add to Cart → Checkout | 1–3 seconds | Represents reviewing the cart/continuing to checkout |
| End of Checkout → next Login | 3–6 seconds | Prevents immediate order loops and gives a realistic boundary between purchases |

The four in-workflow pauses total 6–14 seconds per iteration, excluding response times and the 3–6 second inter-iteration pause. Zero think-time is rejected because it would benchmark a tight API loop rather than expected user pacing.

## 10. Metrics

Collect overall, per endpoint, and end-to-end iteration metrics:

- response time: average, median when available, p90, p95, maximum for diagnostics;
- throughput: requests/second and completed WF01 iterations/second;
- total, successful, and failed requests;
- server/transport error rate;
- functional/data assertion failure rate as a separate category;
- active VUs and completed/aborted iterations by phase;
- connect time, latency/time-to-first-byte, sent bytes, and received bytes when the selected tool supports them;
- Windows total CPU and RAM;
- Node backend process CPU, working set/private memory, handle/thread count if available;
- SQLite has no separate process in this SUT; observe its effects through the Node process and database-file growth/order count.

Do not combine assertion failures with timeouts/5xx without retaining the underlying failure class.

## 11. Candidate Thresholds

**Human-Accepted Initial Guardrails**

| Metric | Candidate | Status / Rationale |
|---|---|---|
| p95 | Derive after the first valid Option A baseline | Hardware identity is documented, but no measured baseline or assignment SLO exists |
| Throughput | Derive after baseline | No evidence-backed minimum is available |
| Server/transport error rate | `< 1%` | Accepted initial guardrail; measured result was 0% |
| Functional/data assertion failures | `0%` | Accepted initial guardrail; measured result was 0% |
| CPU/RAM | Observe trend; no threshold yet | Hardware is documented, but no valid measured baseline exists |

No claim is made that the SUT meets any candidate threshold.

## 12. Resource Monitoring

The current workspace is Windows. For the future run:

1. Record hardware/hostname evidence before execution.
2. Run the selected tool in non-GUI/CLI mode for the measured execution when supported.
3. Arrange the screen so the tool/controller output is visible beside Task Manager.
4. In Task Manager, show overall CPU/RAM and the specific Node backend process; SQLite is embedded and has no separate database process.
5. Capture genuine evidence near ramp completion and during the middle of the hold period; record timestamps/load phase.
6. Retain backend logs and raw tool output for correlation with any error/latency change.

The measured Option A run captured 80 genuine samples in `evidence/hardware/23127430_Load_20260814_resources.csv`. Hardware screenshots remain separate pending evidence and were not fabricated.

## 13. Data and State Risks

| Risk | Load-test impact | Mitigation before execution |
|---|---|---|
| Shared account | VUs append to the same `userCarts[userId]` and share order owner | One deterministic unique account per VU |
| Cart growth | Every iteration appends; no clear endpoint | Start from a disposable fresh process, cap VUs/duration, measure memory, review post-run cart implications |
| Order/database growth | One order row per completed iteration | Approve side-effect budget; use disposable DB snapshot/reset between runs |
| Backend restart | Clears carts but drops/reseeds DB and removes provisioned users | Final backend start first, then provision accounts; never restart mid-run |
| Account lockout | Bad credentials can produce 401 then 403 and invalidate results | Pre-validate CSV, provision/reset lock state, abort on auth failure |
| Product correlation | Empty/multiple unexpected results can send invalid downstream data | Five validated keywords, non-empty assertion, deterministic first result only after validation |
| Frontend/backend cart mismatch | API test exercises a route the Web UI does not call | Human must approve backend Cart API as the assignment's transactional endpoint |
| Checkout ignores cart/client total trusted | Successful order does not prove true cart transaction | Retain source limitation, validate order ID/ownership, do not claim full transactional integrity |
| Stock depletion | Not applicable to current schema | Do not invent stock reset or out-of-stock behavior |
| Multiple backend instances | Each process has a different in-memory cart map | Run one documented instance or redesign state handling before distributed execution |

## 14. Repeatability Strategy

1. Use only an authorized disposable copy of the SUT/database.
2. Start the backend once; its startup resets/reseeds the database.
3. Provision the 50 synthetic accounts **after** that final start.
4. Run the test-data validator and one 1-VU functional preflight.
5. Capture the baseline database hash/order count and confirm carts begin in a fresh process.
6. Execute only the human-approved profile.
7. Record post-run order count/database size and preserve genuine raw evidence.
8. For a rerun, stop the process and recreate the disposable environment; then repeat startup → provisioning → validation. Do not write a destructive cleanup against a database that must be preserved.

## 15. AI Recommendation

**Human Review accepted Option A as the final initial Load Test configuration.**

Reasons:

- hardware identity is documented, but measured baseline latency and usable-capacity evidence are unavailable;
- the tool is not selected;
- every iteration creates an order and permanently grows the process-local cart;
- Option A covers the complete seven-request validated iteration with only five isolated accounts concurrently;
- its evidence can justify accepting, reducing, or advancing toward Option B.

Human acceptance makes Option A final for the initial Load run. It does **not** authorize execution while the tool-selection, script-generation, environment-readiness, and technical dry-run gates remain incomplete.

### Report View Reservation

- **Tool selection status:** k6 SELECTED / IMPLEMENTED.
- **If JMeter is selected:** provisionally reserve **Summary Report** for the Load scenario because it gives compact count/average/min/max/error/throughput feedback. Use it for design/post-run inspection, not as a heavy GUI listener during the measured run. Execute non-GUI and generate required raw/HTML artifacts afterward.
- A one-user debug run may temporarily use View Results Tree, but it must not be treated as the final Load report type.
- Stress and Spike must not reuse Summary Report if this reservation is approved.
- **k6 Load output:** raw JSON, summary JSON, console summary, and an exported k6 HTML dashboard.

## 16. Human Review

**HUMAN REVIEW COMPLETED - 2026-08-14**

The human accepted:

- Option A as the final initial configuration; Option B remains an unselected future candidate;
- VU counts, ramp/hold/ramp-down, think-time, and inter-iteration pacing;
- seven-request iteration with Cart/Order read-backs;
- one-account-per-VU allocation and 50-VU hard ceiling;
- backend Cart API scope despite frontend-only cart behavior;
- checkout payload, especially `shipping_address` and client-supplied total;
- disposable database, side-effect budget, and rerun strategy;
- candidate error/functional thresholds;
- k6 as the selected tool with raw JSON, summary JSON, console summary, and HTML dashboard artifacts;
- Windows hardware/resource evidence plan.

## 17. Final Configuration

### Human-Accepted Option A

| Parameter | Final value |
|---|---:|
| Initial VUs | 1 |
| Target VUs | 5 |
| Ramp-up | 2 minutes |
| Hold | 5 minutes |
| Ramp-down | 1 minute |
| Iteration | Full seven-request WF01, including Login, Cart read-back, and Order read-back |
| Login to Search | Random 1-2 seconds |
| Search to Detail | Random 2-4 seconds |
| Detail to Add to Cart | Random 2-5 seconds |
| Add to Cart to Checkout | Random 1-3 seconds |
| Inter-iteration pause | Random 3-6 seconds |

### Traceability from Human Decision to Implementation

| Accepted decision | Planned implementation |
|---|---|
| Option A `1 -> 5 VUs`, `2m/5m/1m` | Encode exactly after JMeter or k6 is selected; no automatic switch to Option B |
| Full WF01 on every iteration | Execute Login, Search, Detail, Cart mutation/read-back, Checkout, and Order read-back |
| One account per VU | Allocate one unique row from `test-data/users.csv`; fail rather than recycle insufficient user rows |
| Product input | Rotate `test-data/products.csv` keywords deterministically and correlate the first validated product result |
| Authentication | Extract the Login JWT and send `Authorization: Bearer <token>` to protected calls |
| Correlation | Extract and validate `userId`, product fields, and `orderId`; do not invent a `cartId` |
| Functional checks | Apply the accepted status/body/state assertions from Section 7 and stop invalid iterations before Checkout |
| Think-time | Sample each accepted range independently for every transition/iteration |
| Initial report view | If JMeter is chosen, use Summary Report only for inspection and run the measurement non-GUI; otherwise document a distinct k6 equivalent |
| Hardware evidence | Capture the provided MSI/Windows context and Task Manager evidence using `evidence/hardware/README.md` |

**EXECUTED / PASS on 2026-08-14.** The k6 script passed a `1 VU / 1 iteration` technical dry run and then executed the accepted Option A profile without switching to Option B.

## 18. Execution Result

| Metric | Result |
|---|---:|
| Completed iterations | 139 |
| HTTP requests | 973 |
| Checks | 3,197 passed / 0 failed |
| HTTP failures | 0% |
| Functional failures | 0% |
| HTTP average / p90 / p95 / max | 12.51 / 24.34 / 33.01 / 87.28 ms |
| Throughput | 2.0254 requests/s; 0.2893 iterations/s |
| Total CPU average / max | 16.13% / 59.91% |
| Available memory minimum | 3,840 MB |

Both accepted initial guardrails passed. The result is a local baseline rather than evidence of production capacity. Detailed traceability, per-endpoint metrics, safety controls, and artifact paths are in `results/23127430_Load_20260814_report.md`.
