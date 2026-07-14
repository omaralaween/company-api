const companyModel = require("../models/company");

/**
 * Handles POST request to create a new company
 * @param {Object} req - Express request object, expects name, industry and location in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the created company as JSON, or an error message
 */

async function createCompany(req, res) {
  const { name, industry, location } = req.body;
  if (!name || !industry)
    return res.status(400).json({ message: "name and industry are required" });
  try {
    const company = await companyModel.createCompany(name, industry, location);
    return res
      .status(201)
      .json({ message: "Company created successfully", company });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
}

/**
 * Handles GET request to retrieve all companies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends an array of companies as JSON
 */

async function getAllCompanies(req, res) {
  try {
    const companies = await companyModel.getAllCompanies();
    return res
      .status(200)
      .json({ message: "Companies Retrieved successfully!", companies });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
}

/**
 * Handles GET request to retrieve a single company by it's ID
 * @param {Object} req - Express request object, expects id in the params
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the company as JSON
 */

async function getCompanyById(req, res) {
  const { id } = req.params; //we used params because the id comes in the request URL body parameters
  try {
    const company = await companyModel.getCompanyById(parseInt(id)); //the body and the params lways come as strings, so we should parse the id because it is initalized as an int in the db
    return res
      .status(200)
      .json({ message: "Companies retrieved successfully!", company });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
}

/**
 * Handles PATCH request to update a company, at least one field is required
 * @param {Object} req - Express request object, expects id in params and name/industry/location in the body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends the updated company as JSON
 */

async function updateCompany(req, res) {
  const { id } = req.params;
  const { name, industry, location } = req.body;
    if (!name && !industry && !location) {
        return res.status(400).json({ message: "Atleast one field should be privided!" });
  }
  try {
    const company = await companyModel.updateCompany(
      parseInt(id),
      name,
      industry,
      location,
    );
    return res
      .status(200)
      .json({ message: "Company updated successfully!", company });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
}

/**
 * Handles DELETE request to remove a company by it's ID
 * @param {Object} req - Express request object, expects id in the params
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a success message once the company is deleted
 */

async function deleteCompany(req, res) {
    const { id } = req.params;
    try {
        const company = await companyModel.deleteCompany(parseInt(id));
        return res.status(200).json({ message: "Company deleted successfully from records!" });
    } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Internal server error, please try again later" });
    }
}

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
};