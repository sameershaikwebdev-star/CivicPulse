-- ============================================
-- 02_DML.sql — Data Manipulation Language Exercise
-- Run with: mysql -u root -p < 02_dml.sql
-- Requires: CompanyDB.Employees (see 01_ddl.sql)
-- ============================================

USE CompanyDB;

-- 1. Insert 5 employees across different departments
INSERT INTO Employees (ID, Name, Department, Salary) VALUES
(1, 'Ravi', 'Sales', 28000.00),
(2, 'Anita', 'Marketing', 32000.00),
(3, 'Suresh', 'HR', 27000.00),
(4, 'Priya', 'Finance', 35000.00),
(5, 'Kiran', 'Sales', 26000.00);

-- 2. Update department of employee ID 3
UPDATE Employees SET Department = 'IT' WHERE ID = 3;

-- 3. Increase salary of all Sales employees by 10%
UPDATE Employees SET Salary = Salary * 1.10 WHERE Department = 'Sales';

-- 4. Delete employee with ID 5
DELETE FROM Employees WHERE ID = 5;

-- 5. Insert a new employee, then delete by Name instead of ID
INSERT INTO Employees (ID, Name, Department, Salary) VALUES
(6, 'Meena', 'Operations', 30000.00);

DELETE FROM Employees WHERE Name = 'Meena';

-- Check final state
SELECT * FROM Employees;
