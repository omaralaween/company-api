// Routes for /employees, just maps HTTP methods to the employeeController functions
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticate = require("../middlewares/auth");

// creation stays public (same as employee-account signup), otherwise there'd be no way to
// bootstrap an employee before anyone has a token to log in with
router.post("/", employeeController.createEmployee);
router.get("/", authenticate, employeeController.getAllEmployees);
router.get("/:id", authenticate, employeeController.getEmployeeById);
router.put("/:id", authenticate, employeeController.updateEmployee);
router.delete("/:id", authenticate, employeeController.deleteEmployee);

module.exports = router;
