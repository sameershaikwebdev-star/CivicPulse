# MySQL Practice Exercises

Hands-on MySQL exercises covering DDL, DML, DQL, TCL, and DCL — built around a simple `CompanyDB` database with `Employees` and `Accounts` tables.

## Files

| File | Covers |
|------|--------|
| `01_ddl.sql` | CREATE, ALTER, DROP, TRUNCATE, RENAME |
| `02_dml.sql` | INSERT, UPDATE, DELETE |
| `03_dql.sql` | SELECT queries (filtering, sorting, grouping) |
| `04_tcl.sql` | START TRANSACTION, SAVEPOINT, ROLLBACK, COMMIT |
| `05_dcl.sql` | GRANT, REVOKE |
| `run_all.sql` | Runs all of the above in order |

## How to Run

### Option 1 — Run a single file
```bash
mysql -u root -p < 01_ddl.sql
```

### Option 2 — Run everything at once
```bash
mysql -u root -p < run_all.sql
```

### Option 3 — Inside the MySQL shell
```sql
mysql -u root -p
SOURCE /path/to/01_ddl.sql;
```

## Order Matters
Run the files in numeric order (01 → 05). `02_dml.sql` depends on the `Employees` table created in `01_ddl.sql`, `03_dql.sql` depends on the data inserted in `02_dml.sql`, and so on.

## Requirements
- MySQL 8.0+ (for `CREATE USER IF NOT EXISTS` syntax in `05_dcl.sql`)
- A user with privileges to create databases, tables, and grant permissions (e.g. `root`)

## Concept Check Answers

1. **Why can't two rows have the same ID?** The `ID` column is a `PRIMARY KEY`, which enforces uniqueness and NOT NULL automatically.
2. **Which commands auto-commit?** DDL (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`) and DCL (`GRANT`, `REVOKE`) auto-commit and cannot be rolled back. DML and TCL support rollback.
3. **DELETE vs TRUNCATE?** `DELETE` removes rows one at a time, can be filtered with `WHERE`, and is rollback-able (logged). `TRUNCATE` resets the table instantly, cannot be filtered, and is not rollback-able in most engines — it's DDL, not DML.
4. **Can ROLLBACK undo a DROP TABLE?** No. `DROP TABLE` is DDL and auto-commits immediately, so the table is gone permanently — rollback has nothing to restore.

## License
Free to use for learning and practice.
