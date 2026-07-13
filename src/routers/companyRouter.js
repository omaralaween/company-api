// Routes for /companies, just maps HTTP methods to the companyController functions
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { authenticate, authorize } = require("../middlewares/auth");

// creation stays public (same as employee-account signup), otherwise there'd be no way to
// bootstrap a company/employee before anyone has a token to log in with
router.post("/", companyController.createCompany);
router.get("/", authenticate, authorize("ADMIN", "READ"), companyController.getAllCompanies);
router.get("/:id", authenticate, authorize("ADMIN", "READ"), companyController.getCompanyById);
router.put("/:id", authenticate, authorize("ADMIN", "WRITE"), companyController.updateCompany);
router.delete("/:id", authenticate, authorize("ADMIN", "WRITE"), companyController.deleteCompany);

module.exports = router;