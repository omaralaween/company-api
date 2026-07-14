// Routes for /employees, just maps HTTP methods to the employeeController functions
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { authenticate, authorize } = require("../middlewares/auth");

// creation stays public (same as employee-account signup), otherwise there'd be no way to
// bootstrap an employee before anyone has a token to log in with
router.post("/", employeeController.createEmployee);
router.get("/", authenticate, authorize("ADMIN", "READ"), employeeController.getAllEmployees);
router.get("/:id", authenticate, authorize("ADMIN", "READ"), employeeController.getEmployeeById);
router.patch("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeController.updateEmployee);
router.delete("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeController.deleteEmployee);

module.exports = router;
