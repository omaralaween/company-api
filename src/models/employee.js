const prisma = require("../lib/prisma");
/**
 * @typedef {Object} Employee
 * @property {number} id - The unique identifier
 * @property {string} firstName - First name of the employee
 * @property {string} lastName - Last name of the employee
 * @property {string} department - Department the employee works in
 * @property {string} role - Job role/title of the employee
 * @property {number} companyId - ID of the company this employee belongs to
 */
/**
 * Create an employee using firstName, lastName, department, role and companyId
 * @param {string} firstName - First name of the employee
 * @param {string} lastName - Last name of the employee
 * @param {string} department - Department the employee works in
 * @param {string} role - Job role/title of the employee
 * @param {number} companyId - ID of the company this employee belongs to
 * @returns {Promise<Employee>} - Returns the newly created employee record
 */

async function createEmployee(firstName, lastName, department, role, companyId) {
    const employee = await prisma.employee.create({
      data: { firstName, lastName, department, role, companyId },
    });
    return employee;
}

/**
 * Return all employees that belong to a company
 * @param {number} companyId - ID of the company to filter by
 * @returns {Promise<Employee[]>} - Array of employee records belonging to the company
 */

async function getAllEmployees(companyId) {
    const employees = await prisma.employee.findMany({ where: { companyId } });
    return employees;
}

/**
 * Used when a specific employee record is wanted, using it's ID
 * @param {number} id - Employee ID was created automatically when record was created
 * @returns {Promise<Employee>} Returns an object of type Employee
 */

async function getEmployeeById(id) {
    const employee = await prisma.employee.findUnique({ where: { id } });
    return employee;
}

/**
 * Use to update an employee record
 * @param {number} id - Employee ID
 * @param {string} firstName - New first name for the employee
 * @param {string} lastName - New last name for the employee
 * @param {string} department - New department for the employee
 * @param {string} role - New role for the employee
 * @returns {Promise<Employee>} - The updated employee record
 */

async function updateEmployee(id, firstName, lastName, department, role) {
    const employee = await prisma.employee.update({ where: { id }, data:{ firstName, lastName, department, role }});
    return employee;
}

/**
 * Delete an employee record by ID
 * @param {number} id - Employee ID
 * @returns {Promise<Employee>} - The deleted employee record
 */

async function deleteEmployee(id) {
    const employee = await prisma.employee.delete({ where: { id } });
    return employee;
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};