// Routes for /employees, just maps HTTP methods to the employeeController functions
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { authenticate, authorize } = require("../middlewares/auth");

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, department, role, companyId]
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               department:
 *                 type: string
 *                 example: Engineering
 *               role:
 *                 type: string
 *                 example: Software Developer
 *               companyId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Employee created successfully!
 *       400:
 *         description: one of the fields is not provided!
 *       500:
 *         description: Internal server error
 */
// creation stays public (same as employee-account signup), otherwise there'd be no way to
// bootstrap an employee before anyone has a token to log in with
router.post("/", employeeController.createEmployee);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employees retrieved successfully!
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, authorize("ADMIN", "READ"), employeeController.getAllEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get a single employee by its ID
 *     tags: [Employees]
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
 *         description: Employee retrieved successfully!
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticate, authorize("ADMIN", "READ"), employeeController.getEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   patch:
 *     summary: Update an employee, at least one field is required
 *     tags: [Employees]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               department:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully!
 *       400:
 *         description: Atleast one field should be privided!
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeController.updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by its ID
 *     tags: [Employees]
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
 *         description: Employee deleted successfully!
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeController.deleteEmployee);

module.exports = router;
