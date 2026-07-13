// Routes for /employee-accounts, just maps HTTP methods to the employeeAccountController functions
const express = require("express");
const router = express.Router();
const employeeAccountController = require("../controllers/employeeAccountController");
const { authenticate, authorize } = require("../middlewares/auth");

// signup and login stay public, everything else needs a token
router.post("/", employeeAccountController.createEmployeeAccount);
router.post("/login", employeeAccountController.userLogin);
router.get("/", authenticate, authorize("ADMIN", "READ"), employeeAccountController.getAllEmployeeAccounts);
router.get("/:id", authenticate, authorize("ADMIN", "READ"), employeeAccountController.getEmployeeAccountById);
router.put("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeAccountController.updateEmployeeAccount);
router.delete("/:id", authenticate, authorize("ADMIN", "WRITE"), employeeAccountController.deleteEmployeeAccount);

module.exports = router;
