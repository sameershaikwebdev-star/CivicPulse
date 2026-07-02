-- ============================================
-- 01_DDL.sql — Data Definition Language Exercise
-- Run with: mysql -u root -p < 01_ddl.sql
-- ============================================

-- 1. Create database
CREATE DATABASE IF NOT EXISTS CompanyDB;
USE CompanyDB;

-- 2. Create Employees table
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    Salary DECIMAL(10,2)
);

-- 3. Add a new column
ALTER TABLE Employees ADD Email VARCHAR(100);

-- 4. Rename table
ALTER TABLE Employees RENAME TO Staff;

-- 5. Drop the Email column
ALTER TABLE Staff DROP COLUMN Email;

-- 6. Truncate table (remove all rows, keep structure)
TRUNCATE TABLE Staff;

-- 7. Drop table completely
DROP TABLE Staff;

-- Recreate Employees table for use in later scripts
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    Salary DECIMAL(10,2)
);

SELECT 'DDL script completed successfully' AS Status;
