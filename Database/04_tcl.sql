-- ============================================
-- 04_TCL.sql — Transaction Control Language Exercise
-- Run with: mysql -u root -p < 04_tcl.sql
-- Note: Requires a storage engine that supports transactions (InnoDB, MySQL default)
-- ============================================

USE CompanyDB;

CREATE TABLE IF NOT EXISTS Accounts (
    ID INT PRIMARY KEY,
    Balance DECIMAL(10,2)
);

-- Reset sample data
DELETE FROM Accounts WHERE ID IN (1,2);
INSERT INTO Accounts (ID, Balance) VALUES (1, 5000.00), (2, 3000.00);

-- Transaction 1: Transfer with a savepoint rollback
START TRANSACTION;

UPDATE Accounts SET Balance = Balance - 500 WHERE ID = 1;

SAVEPOINT before_credit;

UPDATE Accounts SET Balance = Balance + 500 WHERE ID = 2;

-- Undo only the credit, keep the debit
ROLLBACK TO before_credit;

COMMIT;

-- Expect: Account 1 = 4500, Account 2 = 3000 (credit was undone)
SELECT * FROM Accounts;

-- Transaction 2: Full rollback demo
START TRANSACTION;

UPDATE Accounts SET Balance = Balance - 1000 WHERE ID = 1;

-- Undo everything since START TRANSACTION
ROLLBACK;

-- Expect: Account 1 still = 4500 (fully reverted)
SELECT * FROM Accounts;
