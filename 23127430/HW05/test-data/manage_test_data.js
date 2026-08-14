const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DEFAULT_USERS = path.join(__dirname, "users.csv");
const DEFAULT_PRODUCTS = path.join(__dirname, "products.csv");
const DEFAULT_DATABASE = path.join(PROJECT_ROOT, "src", "backend", "database.sqlite");

function usage() {
  console.log(`Usage:
  node test-data/manage_test_data.js
  node test-data/manage_test_data.js --verify-products [--database <sqlite-file>]
  node test-data/manage_test_data.js --provision-users --database <sqlite-file> --confirm-disposable

Default mode validates both CSV files without changing the database.
Provisioning never deletes users, but it inserts or updates the 50 synthetic
performance accounts and resets only their lock state.`);
}

function parseArgs(argv) {
  const args = {
    users: DEFAULT_USERS,
    products: DEFAULT_PRODUCTS,
    database: DEFAULT_DATABASE,
    databaseProvided: false,
    verifyProducts: false,
    provisionUsers: false,
    confirmDisposable: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    } else if (arg === "--users") {
      args.users = path.resolve(argv[++i] || "");
    } else if (arg === "--products") {
      args.products = path.resolve(argv[++i] || "");
    } else if (arg === "--database") {
      args.database = path.resolve(argv[++i] || "");
      args.databaseProvided = true;
    } else if (arg === "--verify-products") {
      args.verifyProducts = true;
    } else if (arg === "--provision-users") {
      args.provisionUsers = true;
    } else if (arg === "--confirm-disposable") {
      args.confirmDisposable = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.provisionUsers && !args.databaseProvided) {
    throw new Error("--provision-users requires an explicit --database path");
  }
  if (args.provisionUsers && !args.confirmDisposable) {
    throw new Error(
      "Provisioning refused: add --confirm-disposable only after verifying the database is local/test and recoverable",
    );
  }

  return args;
}

function parseCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const records = [];
  let record = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      if (field.length !== 0) throw new Error(`Malformed CSV quoting in ${filePath}`);
      quoted = true;
    } else if (char === ",") {
      record.push(field);
      field = "";
    } else if (char === "\n") {
      record.push(field.replace(/\r$/, ""));
      records.push(record);
      record = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error(`Unclosed CSV quote in ${filePath}`);
  if (field.length > 0 || record.length > 0) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }

  return records.filter((row) => row.some((value) => value !== ""));
}

function rowsAsObjects(filePath, expectedHeader) {
  const records = parseCsv(filePath);
  if (records.length === 0) throw new Error(`CSV is empty: ${filePath}`);
  const header = records[0];
  if (header.join(",") !== expectedHeader.join(",")) {
    throw new Error(
      `Unexpected header in ${filePath}: expected ${expectedHeader.join(",")}`,
    );
  }

  return records.slice(1).map((row, index) => {
    if (row.length !== header.length) {
      throw new Error(`Row ${index + 2} in ${filePath} has ${row.length} columns`);
    }
    return Object.fromEntries(header.map((key, column) => [key, row[column]]));
  });
}

function validateUsers(filePath) {
  const users = rowsAsObjects(filePath, ["email", "password", "shipping_address"]);
  if (users.length !== 50) {
    throw new Error(`Expected exactly 50 performance accounts, found ${users.length}`);
  }

  const emails = new Set();
  users.forEach((user, index) => {
    const row = index + 2;
    if (!/^perf-vu-\d{3}@local\.test$/.test(user.email)) {
      throw new Error(`Row ${row}: email must use the synthetic local.test pattern`);
    }
    if (emails.has(user.email)) throw new Error(`Row ${row}: duplicate email`);
    emails.add(user.email);

    if (
      user.password.length < 12 ||
      !/[A-Z]/.test(user.password) ||
      !/[a-z]/.test(user.password) ||
      !/[0-9]/.test(user.password) ||
      !/[^A-Za-z0-9]/.test(user.password)
    ) {
      throw new Error(`Row ${row}: synthetic password does not meet strength rules`);
    }
    if (!/^PERF-TEST-ADDRESS-\d{3}$/.test(user.shipping_address)) {
      throw new Error(`Row ${row}: invalid synthetic shipping address`);
    }
  });

  return users;
}

function validateProducts(filePath) {
  const products = rowsAsObjects(filePath, ["keyword"]);
  if (products.length === 0) throw new Error("At least one product keyword is required");
  const keywords = new Set();
  products.forEach((product, index) => {
    const keyword = product.keyword.trim();
    if (!keyword) throw new Error(`Row ${index + 2}: keyword is empty`);
    const normalized = keyword.toLowerCase();
    if (keywords.has(normalized)) throw new Error(`Row ${index + 2}: duplicate keyword`);
    keywords.add(normalized);
  });
  return products;
}

function loadSqlite() {
  const modulePath = path.join(
    PROJECT_ROOT,
    "src",
    "backend",
    "node_modules",
    "sqlite3",
  );
  return require(modulePath).verbose();
}

function openDatabase(sqlite3, databasePath, mode) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(databasePath, mode, (error) => {
      if (error) reject(error);
      else resolve(db);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => (error ? reject(error) : resolve(rows)));
  });
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) reject(error);
      else resolve({ changes: this.changes, lastID: this.lastID });
    });
  });
}

function close(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => (error ? reject(error) : resolve()));
  });
}

async function verifyProducts(databasePath, products) {
  if (!fs.existsSync(databasePath)) throw new Error(`Database not found: ${databasePath}`);
  const sqlite3 = loadSqlite();
  const db = await openDatabase(sqlite3, databasePath, sqlite3.OPEN_READONLY);
  try {
    for (const product of products) {
      const rows = await all(
        db,
        "SELECT id, name, price FROM products WHERE name LIKE ?",
        [`%${product.keyword}%`],
      );
      if (rows.length !== 1) {
        throw new Error(
          `Keyword '${product.keyword}' must match exactly one product; found ${rows.length}`,
        );
      }
      if (!rows[0].id || !rows[0].name || !Number.isFinite(Number(rows[0].price))) {
        throw new Error(`Keyword '${product.keyword}' returned an invalid product row`);
      }
    }
  } finally {
    await close(db);
  }
  console.log(`PRODUCT_DB_CHECK_OK keywords=${products.length}`);
}

async function provisionUsers(databasePath, users) {
  if (!fs.existsSync(databasePath)) throw new Error(`Database not found: ${databasePath}`);
  const sqlite3 = loadSqlite();
  const db = await openDatabase(sqlite3, databasePath, sqlite3.OPEN_READWRITE);
  let inserted = 0;
  let updated = 0;

  try {
    await run(db, "BEGIN IMMEDIATE TRANSACTION");
    for (let index = 0; index < users.length; index += 1) {
      const user = users[index];
      const matches = await all(db, "SELECT id FROM users WHERE email = ?", [user.email]);
      if (matches.length > 1) {
        throw new Error(`Refusing ambiguous update: duplicate database email ${user.email}`);
      }

      if (matches.length === 1) {
        await run(
          db,
          `UPDATE users
             SET name = ?, password = ?, role = 'user', login_attempts = 0,
                 locked_until = NULL, shipping_address = ?
           WHERE id = ?`,
          [
            `Performance VU ${String(index + 1).padStart(3, "0")}`,
            user.password,
            user.shipping_address,
            matches[0].id,
          ],
        );
        updated += 1;
      } else {
        await run(
          db,
          `INSERT INTO users
             (name, email, password, role, login_attempts, locked_until, shipping_address)
           VALUES (?, ?, ?, 'user', 0, NULL, ?)`,
          [
            `Performance VU ${String(index + 1).padStart(3, "0")}`,
            user.email,
            user.password,
            user.shipping_address,
          ],
        );
        inserted += 1;
      }
    }
    await run(db, "COMMIT");
  } catch (error) {
    try {
      await run(db, "ROLLBACK");
    } catch {
      // Preserve the original provisioning error.
    }
    throw error;
  } finally {
    await close(db);
  }

  console.log(`PROVISION_OK accounts=${users.length} inserted=${inserted} updated=${updated}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const users = validateUsers(args.users);
  const products = validateProducts(args.products);
  console.log(`CSV_VALIDATION_OK users=${users.length} keywords=${products.length}`);

  if (args.verifyProducts) await verifyProducts(args.database, products);
  if (args.provisionUsers) await provisionUsers(args.database, users);
}

main().catch((error) => {
  console.error(`TEST_DATA_ERROR: ${error.message}`);
  process.exitCode = 1;
});
