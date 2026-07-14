const prisma = require("../lib/prisma");
/**
 * @typedef {Object} EmployeeAccount
 * @property {number} id - The unique identifier
 * @property {string} username - Unique username used to log in
 * @property {string} password - Hashed password, never stored in plain text
 * @property {number} employeeId - ID of the employee this account belongs to
 */
/**
 * Create an employee account using employeeId, username, and password
 * @param {number} employeeId - ID of the employee this account belongs to
 * @param {string} username - Username for the account
 * @param {string} password - Password should already be hashed before this is called
 * @param {string} permission - Permission should be from these only, and its case sensitive { "ADMIN", "READ", "WRITE" } 
 * @returns {Promise<EmployeeAccount>} - Returns the newly created account record
 */

async function createEmployeeAccount(employeeId, username, password, permission) {
  const employee = await prisma.employeeAccount.create({
    data: { employeeId, username, password, permission },
  });
  return employee;
}

/**
 * Used to get an employee account using the employee's ID
 * @param {number} employeeId - ID of the employee linked to the account
 * @returns {Promise<EmployeeAccount>} - The matching account record
 */

async function getEmployeeAccountByEmployeeId(employeeId) {
  const employee = await prisma.employeeAccount.findUnique({
    where: { employeeId },
  });
  return employee;
}

/**
 * Used to get an employee account using the username, mainly used for login
 * @param {string} username - Username to search for
 * @returns {Promise<EmployeeAccount>} - The matching account record
 */

async function getEmployeeAccountByUsername(username) {
  const employee = await prisma.employeeAccount.findUnique({
    where: { username }
  });
  return employee;
}

/**
 * Return all employee accounts, password is excluded from the result
 * @returns {Promise<Omit<EmployeeAccount, "password">[]>} - Array of employee account records without their password
 */

async function getAllEmployeeAccounts() {
  const employeeAccounts = await prisma.employeeAccount.findMany({
    select: { id: true, employeeId: true, username: true, permission: true },
  });
  return employeeAccounts;
}

/**
 * Used to get a single employee account using it's own ID, password is excluded from the result
 * @param {number} id - Employee account ID
 * @returns {Promise<Omit<EmployeeAccount, "password">>} - The matching account record without it's password
 */

async function getEmployeeAccountById(id) {
  const employeeAccount = await prisma.employeeAccount.findUnique({
    where: { id },
    select: { id: true, employeeId: true, username: true },
  });
  return employeeAccount;
}

/**
 * Use to update an employee account record, at least one of username/password should be provided
 * @param {number} id - Employee account ID
 * @param {string} [username] - New username for the account
 * @param {string} [password] - New password, should already be hashed before this is called. Leave undefined to keep the current password
 * @returns {Promise<EmployeeAccount>} - The updated account record
 */

async function updateEmployeeAccount(id, username, password) {
  const employee = await prisma.employeeAccount.update({
    where: { id },
    data: { username, password },
  });
  return employee;
}

/**
 * Delete an employee account record by ID
 * @param {number} id - Employee account ID
 * @returns {Promise<EmployeeAccount>} - The deleted account record
 */

async function deleteEmployeeAccount(id) {
  const employee = await prisma.employeeAccount.delete({ where: { id } });
  return employee;
}

module.exports = {
  createEmployeeAccount,
  getAllEmployeeAccounts,
  getEmployeeAccountById,
  getEmployeeAccountByEmployeeId,
  getEmployeeAccountByUsername,
  updateEmployeeAccount,
  deleteEmployeeAccount,
};
