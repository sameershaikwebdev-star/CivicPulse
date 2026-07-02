-- ============================================
-- 05_DCL.sql — Data Control Language Exercise
-- Run with: mysql -u root -p < 05_dcl.sql
-- Note: Requires a user account with GRANT privileges (e.g. root)
-- ============================================

USE CompanyDB;

-- Create sample users (MySQL 8+ syntax)
CREATE USER IF NOT EXISTS 'user1'@'localhost' IDENTIFIED BY 'Password123!';
CREATE USER IF NOT EXISTS 'admin_user'@'localhost' IDENTIFIED BY 'Password123!';

-- 1. Grant SELECT and INSERT on Employees to user1
GRANT SELECT, INSERT ON CompanyDB.Employees TO 'user1'@'localhost';

-- 2. Revoke INSERT from user1, keep SELECT
REVOKE INSERT ON CompanyDB.Employees FROM 'user1'@'localhost';

-- 3. Grant all privileges on the whole database to admin_user
GRANT ALL PRIVILEGES ON CompanyDB.* TO 'admin_user'@'localhost';

FLUSH PRIVILEGES;

-- Verify grants
SHOW GRANTS FOR 'user1'@'localhost';
SHOW GRANTS FOR 'admin_user'@'localhost';
