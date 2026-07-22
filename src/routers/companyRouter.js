// Routes for /companies, just maps HTTP methods to the companyController functions
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { authenticate, authorize } = require("../middlewares/auth");

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, industry]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Acme Inc.
 *               industry:
 *                 type: string
 *                 example: Technology
 *               location:
 *                 type: string
 *                 example: New York
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: name and industry are required
 *       401:
 *         description: not logged in / invalid or expired token
 *       403:
 *         description: Unauthorized user!
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("ADMIN"), companyController.createCompany);

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Companies retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, authorize("ADMIN", "READ"), companyController.getAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get one or more companies by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A single company ID, or a comma-separated list of IDs
 *         schema:
 *           type: string
 *         example: "3,4,5"
 *     responses:
 *       200:
 *         description: Companies retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticate, authorize("ADMIN", "READ"), companyController.getCompaniesById);

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     summary: Update a company, at least one field is required
 *     tags: [Companies]
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
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Atleast one field should be privided!
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticate, authorize("ADMIN", "WRITE"), companyController.updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company by its ID
 *     tags: [Companies]
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
 *         description: Company deleted successfully from records!
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, authorize("ADMIN", "WRITE"), companyController.deleteCompany);

module.exports = router;