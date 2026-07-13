// Routes for /employee-accounts, just maps HTTP methods to the employeeAccountController functions
const express = require("express");
const router = express.Router();
const employeeAccountController = require("../controllers/employeeAccountController");
const authenticate = require("../middlewares/auth");

// signup and login stay public, everything else needs a token
router.post("/", employeeAccountController.createEmployeeAccount);
router.post("/login", employeeAccountController.userLogin);
router.get("/", authenticate, employeeAccountController.getAllEmployeeAccounts);
router.get("/:id", authenticate, employeeAccountController.getEmployeeAccountById);
router.put("/:id", authenticate, employeeAccountController.updateEmployeeAccount);
router.delete("/:id", authenticate, employeeAccountController.deleteEmployeeAccount);

module.exports = router;
