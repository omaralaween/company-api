const employeeModel = require("../models/employee");

/**
 * Handles POST request to create a new employee. Requires a valid admin auth token (see middlewares/auth.js)
 * @param {Object} req - Express request object, expects firstName, lastName, department, role and companyId in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the created employee as JSON, or an error message
 */

async function createEmployee(req, res) {
  const { firstName, lastName, department, role, companyId } = req.body;
  if (!firstName || !lastName || !department || !role || !companyId)
    return res
      .status(400)
      .json({ message: "one of the fields is not provided!" });
  try {
    const employee = await employeeModel.createEmployee(
      firstName,
      lastName,
      department,
      role,
      companyId,
    );
    return res
      .status(201)
      .json({ message: "Employee created successfully!", employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles GET request to retrieve all employees
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends an array of employees as JSON
 */

async function getAllEmployees(req, res) {
  try {
    const employees = await employeeModel.getAllEmployees();
    return res
      .status(200)
      .json({ message: "Employees retrieved successfully!", employees });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles GET request to retrieve a single employee by it's ID
 * @param {Object} req - Express request object, expects id in the params
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the employee as JSON
 */

async function getEmployeeById(req, res) {
  const { id } = req.params;
  try {
    const employee = await employeeModel.getEmployeeById(parseInt(id));
    return res
      .status(200)
      .json({ message: "Employee retrieved successfully!", employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles PATCH request to update an employee, at least one field is required
 * @param {Object} req - Express request object, expects id in params and firstName/lastName/department/role in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the updated employee as JSON
 */

async function updateEmployee(req, res) {
  const { id } = req.params;
  const { firstName, lastName, department, role } = req.body;
  if (!firstName && !lastName && !department && !role) {
    return res
      .status(400)
      .json({ message: "Atleast one field should be privided!" });
  }
  try {
    const employee = await employeeModel.updateEmployee(
      parseInt(id),
      firstName,
      lastName,
      department,
      role,
    );
    return res
      .status(200)
      .json({ message: "Employee updated successfully!", employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles DELETE request to remove an employee by it's ID
 * @param {Object} req - Express request object, expects id in the params
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a success message once the employee is deleted
 */

async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    const employee = await employeeModel.deleteEmployee(parseInt(id));
    return res
      .status(200)
      .json({ message: "Employee deleted successfully!", employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
