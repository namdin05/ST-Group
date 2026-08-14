# WF01 Test Data

This directory contains a ready-to-provision synthetic dataset for up to 50 concurrent VUs. It is intended only for an authorized local/disposable EShop environment.

## Dataset Inventory

| File | Rows | Purpose |
|---|---:|---|
| `users.csv` | 50 | One isolated login/cart/order owner per active VU |
| `products.csv` | 5 | Stable Search keywords; product IDs are correlated at runtime |
| `manage_test_data.js` | N/A | Validate CSVs, verify keywords read-only, and explicitly provision users |

## Users

```csv
email,password,shipping_address
```

- Emails use the reserved `local.test` domain and are unique from `001` to `050`.
- Passwords are synthetic, strong-format local test credentials. Never reuse them outside this SUT.
- Shipping addresses are synthetic identifiers without personal data.
- Allocate CSV rows deterministically so each active VU owns exactly one account.
- Do not share an account: all JWTs for that account contain the same user ID and therefore share the same in-memory backend cart and order owner.

The current source database is not modified merely by creating this dataset.

## Products

```csv
keyword
```

Five keywords were selected to match the five current seed products one-to-one. `product_id` is deliberately excluded so WF01 retains its required correlation:

```text
keyword
  → Search response product.id/name/price
  → Product Detail
  → Add to Cart
```

## Validate Without Database Writes

Validate schemas, row count, uniqueness, strong-format passwords, addresses, and keywords:

```powershell
node test-data/manage_test_data.js
```

Verify that each keyword matches exactly one current product using read-only SQLite access:

```powershell
node test-data/manage_test_data.js --verify-products --database src/backend/database.sqlite
```

Both commands are safe and make no database changes.

## Provision the 50 Accounts

Backend startup imports `database.js`, which drops and reseeds application tables. Provisioning must therefore happen **after the final backend start** and before the test run. If the backend restarts, provision again.

Only after confirming the target is a disposable local/test database and creating any required backup, run:

```powershell
node test-data/manage_test_data.js `
  --provision-users `
  --database src/backend/database.sqlite `
  --confirm-disposable
```

Safety behavior:

- provisioning refuses to run without an explicit database path;
- provisioning refuses to run without `--confirm-disposable`;
- it uses one transaction and rolls back on failure;
- it inserts missing synthetic accounts or updates only the same synthetic emails;
- it resets lock state only for those 50 synthetic accounts;
- it never deletes users and never prints passwords.

Provisioning was self-tested twice against a disposable temporary copy: the first run inserted 50 accounts and the second updated the same 50 without duplicates. The temporary copy was removed, and the repository database hash remained unchanged. Provisioning was **not run against `src/backend/database.sqlite`**.

## Repeatability Constraints

- Correct credentials are essential: the implementation locks a newly reset account after the second consecutive wrong password for about three minutes.
- Each Add to Cart appends to a process-local per-user array; repeated iterations grow that cart until backend restart.
- Each Checkout inserts an order row; no cleanup endpoint exists.
- Backend restart clears carts but also resets the database, removing provisioned accounts.
- Approve a disposable database/reset strategy before Load, Stress, Spike, or Endurance execution.

## Secret Policy

The included values are synthetic local-only credentials, not real user secrets. Do not replace them with production credentials or personal addresses, and do not expose runtime JWTs in logs, screenshots, prompts, or reports.
