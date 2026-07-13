// Routes for /companies, just maps HTTP methods to the companyController functions
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authenticate = require("../middlewares/auth");

// creation stays public (same as employee-account signup), otherwise there'd be no way to
// bootstrap a company/employee before anyone has a token to log in with
router.post("/", companyController.createCompany);
router.get("/", authenticate, companyController.getAllCompanies);
router.get("/:id", authenticate, companyController.getCompanyById);
router.put("/:id", authenticate, companyController.updateCompany);
router.delete("/:id", authenticate, companyController.deleteCompany);

module.exports = router;