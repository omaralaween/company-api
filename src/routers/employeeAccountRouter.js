// Routes for /employee-accounts, just maps HTTP methods to the employeeAccountController functions
const express = require("express");
const router = express.Router();
const employeeAccountController = require("../controllers/employeeAccountController");
const { authenticate, authorize } = require("../middlewares/auth");

/**
 * @swagger
 * /employee-accounts:
 *   post:
 *     summary: Create a new employee account
 *     tags: [Employee Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [employeeId, username, password]
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 3
 *               username:
 *                 type: string
 *                 example: jdoe
 *               password:
 *                 type: string
 *                 example: secretPassword123
 *               permission:
 *                 type: string
 *                 example: READ
 *     responses:
 *       201:
 *         description: User created successfully!
 *       400:
 *         description: employeeId, username or password is not provided!
 *       500:
 *         description: Internal server error
 */
// signup and login stay public, everything else needs a token
router.post("/", employeeAccountController.createEmployeeAccount);

/**
 * @swagger
 * /employee-accounts/login:
 *   post:
 *     summary: Log an employee in and receive a JWT
 *     tags: [Employee Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: jdoe
 *               password:
 *                 type: string
 *                 example: secretPassword123
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: user is not found, please sign up / login credintials are invaild
 *       500:
 *         description: username or password are incorrect, please try again!
 */
router.post("/login", employeeAccountController.userLogin);

/**
 * @swagger
 * /employee-accounts:
 *   get:
 *     summary: Get all employee accounts
 *     tags: [Employee Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee accounts retrieved successfully!
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, authorize("ADMIN", "READ"), employeeAccountController.getAllEmployeeAccounts);

/**
 * @swagger
 * /employee-accounts/{id}:
 *   get:
 *     summary: Get a single employee account by its ID
 *     tags: [Employee Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee account retrieved successfully!
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticate, authorize("ADMIN", "READ"), employeeAccountController.getEmployeeAccountById);

/**
 * @swagger
 * /employee-accounts/{id}:
 *   patch:
 *     summary: Update an employee account, at least one field is required
 *     tags: [Employee Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully!
 *       400:
 *         description: Atleast one field should be privided!
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeAccountController.updateEmployeeAccount);

/**
 * @swagger
 * /employee-accounts/{id}:
 *   delete:
 *     summary: Delete an employee account by its ID
 *     tags: [Employee Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeAccountController.deleteEmployeeAccount);

module.exports = router;