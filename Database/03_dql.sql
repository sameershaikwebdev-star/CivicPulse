-- ============================================
-- 03_DQL.sql — Data Query Language Exercise
-- Run with: mysql -u root -p < 03_dql.sql
-- Requires: CompanyDB.Employees populated (see 02_dml.sql)
-- ============================================

USE CompanyDB;

-- 1. Fetch all employees
SELECT * FROM Employees;

-- 2. Fetch only Name and Department
SELECT Name, Department FROM Employees;

-- 3. Employees with salary greater than 30,000
SELECT * FROM Employees WHERE Salary > 30000;

-- 4. IT department employees, sorted by salary descending
SELECT * FROM Employees WHERE Department = 'IT' ORDER BY Salary DESC;

-- 5. Count employees per department
SELECT Department, COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY Department;
