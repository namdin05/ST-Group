# Bug report

## 1 Bug Report Template

Use this template to record defects found during actual testing on the EShop SUT.

The defects below were reproduced against the live backend using the FR-13 admin routes.

### Bug Report 1

| Field | Details |
|---|---|
| Bug ID | BUG-001 |
| Summary | Non-admin authenticated users can access `/api/admin/users` and retrieve the full user list |
| Severity | High |
| Steps to reproduce | 1. Log in with a normal user account such as `test@eshop.com` / `Test1234!`.<br>2. Send `GET /api/admin/users` with `Authorization: Bearer <user token>`.<br>3. Inspect the HTTP status and response body. |
| Actual result | The endpoint returned `200 OK` and exposed the user list to the non-admin token. |
| Expected result | The request should be rejected with `401 Unauthorized` or `403 Forbidden` because FR-12 requires admin role authorization for `/api/admin/*` endpoints. |
| GitHub Issue link | [TO BE FILLED BY STUDENT] |
| Screenshot | Insert screenshot here: [TO BE FILLED BY STUDENT] |

### Bug Report 2

| Field | Details |
|---|---|
| Bug ID | BUG-002 |
| Summary | Anyone can create products through `POST /api/products` without authentication |
| Severity | Critical |
| Steps to reproduce | 1. Send `POST /api/products` without an `Authorization` header.<br>2. Use a JSON body such as `{"name":"API Unauthorized Test Product","price":12345,"description":"temp","imageUrl":"","category_id":1}`.<br>3. Inspect the response and search the product list for the created item. |
| Actual result | The API returned `200 OK`, created product id `6`, and the new product appeared in `GET /api/products?search=API%20Unauthorized%20Test%20Product`. |
| Expected result | The request should be rejected because FR-12 requires `POST/PUT/DELETE /api/products` to require a valid JWT and admin role. |
| GitHub Issue link | [TO BE FILLED BY STUDENT] |
| Screenshot | Insert screenshot here: [TO BE FILLED BY STUDENT] |