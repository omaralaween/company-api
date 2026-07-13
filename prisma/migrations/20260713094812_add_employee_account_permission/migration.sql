-- RenameColumn
ALTER TABLE `EmployeeAccount` RENAME COLUMN `userName` TO `username`;

-- RenameIndex
ALTER TABLE `EmployeeAccount` RENAME INDEX `EmployeeAccount_userName_key` TO `EmployeeAccount_username_key`;

-- AddColumn
ALTER TABLE `EmployeeAccount` ADD COLUMN `permission` ENUM('ADMIN', 'READ', 'WRITE') NOT NULL DEFAULT 'READ';
