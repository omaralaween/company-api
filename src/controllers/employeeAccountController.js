const employeeAccountModel = require("../models/employeeAccount");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Handles POST request to create a new employee account, hashes the password before saving it. Requires a valid admin auth token (see middlewares/auth.js)
 * @param {Object} req - Express request object, expects employeeId, username and password in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the created account as JSON, or an error message
 */

async function createEmployeeAccount(req, res) {
  const { employeeId, username, password, permission } = req.body;
  if (!employeeId || !username || !password)
    return res
      .status(400)
      .json({ message: "employeeId, username or password is not provided!" });
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const employeeAccount = await employeeAccountModel.createEmployeeAccount(
      parseInt(employeeId),
      username,
      hashedPassword,
      permission
    );
    return res
      .status(201)
      .json({ message: "User created successfully!", employeeAccount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles GET request to retrieve all employee accounts. Requires a valid auth token (see middlewares/auth.js)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends an array of employee accounts as JSON, password is excluded
 */

async function getAllEmployeeAccounts(req, res) {
  try {
    const employeeAccounts = await employeeAccountModel.getAllEmployeeAccounts();
    return res
      .status(200)
      .json({ message: "Employee accounts retrieved successfully!", employeeAccounts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles GET request to retrieve a single employee account by it's ID. Requires a valid auth token (see middlewares/auth.js)
 * @param {Object} req - Express request object, expects id in the params
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the employee account as JSON, password is excluded
 */

async function getEmployeeAccountById(req, res) {
  const { id } = req.params;
  try {
    const employeeAccount = await employeeAccountModel.getEmployeeAccountById(parseInt(id));
    return res
      .status(200)
      .json({ message: "Employee account retrieved successfully!", employeeAccount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles POST request to log a user in, compares the given password against the hashed one in the DB
 * @param {Object} req - Express request object, expects username and password in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a signed JWT if credentials are valid, error message otherwise
 */

async function userLogin(req, res) {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Username or password is not provided" });
  }
  try {
    const user = await employeeAccountModel.getEmployeeAccountByUsername(
      req.body.username,
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "user is not found, please sign up" });
    }
    const { username, password, employeeId, permission } = user;
    if (
      req.body.username === username &&
      (await bcrypt.compare(req.body.password, password))
    ) {
      const token = jwt.sign(
        { employeeId, username, permission },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );
      return res
        .status(200)
        .json({ message: "Logged in successfully", token });
    } else {
      return res.status(400).json({ message: "login credintials are invaild" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "username or password are incorrect, please try again!",
    });
  }
}

/**
 * Handles PATCH request to update an employee account, at least one of username/password is required. Requires a valid auth token (see middlewares/auth.js)
 * @param {Object} req - Express request object, expects id in params and username and/or password in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the updated account as JSON
 */

async function updateEmployeeAccount(req, res) {
  const { id } = req.params;
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).json({ message: "Atleast one field should be privided!" });
  }
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  try {
    const employeeAccount = await employeeAccountModel.updateEmployeeAccount(
      parseInt(id),
      username,
      hashedPassword,
    );
    return res
      .status(200)
      .json({ message: "Updated successfully!", employeeAccount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

/**
 * Handles DELETE request to remove an employee account by it's ID. Requires a valid auth token (see middlewares/auth.js)
 * @param {Object} req - Express request object, expects id in the params
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a success message once the account is deleted
 */

async function deleteEmployeeAccount(req, res) {
  const { id } = req.params;
  try {
    const employeeAccount = await employeeAccountModel.deleteEmployeeAccount(
      parseInt(id),
    );
    return res
      .status(200)
      .json({ message: "Deleted successfully", employeeAccount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
}

module.exports = {
  createEmployeeAccount,
  getAllEmployeeAccounts,
  getEmployeeAccountById,
  userLogin,
  updateEmployeeAccount,
  deleteEmployeeAccount,
};
