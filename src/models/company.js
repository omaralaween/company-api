const { isDbNull } = require("@prisma/client/runtime/client");
const prisma = require("../lib/prisma");
/**
 * @typedef {Object} Company
 * @property {number} id - The unique identifier
 * @property {string} name - The name of the company
 * @property {string} industry - Industry in which the company operates
 * @property {string} [location] - Optional location of the company
 * @property {Date} createdAt - Automatic time stamp generated when record is created
 */
/**
 * Create a company using name, industry, and location.
 * @param {string} name - Name of the company
 * @param {string} industry - Name of the industry
 * @param {string} [location] - Optional location of the company
 * @returns {Promise<Company>} - Returns an object of type Company, which includes a newly created company record in the database
 */

async function createCompany(name, industry, location) {
  const company = await prisma.company.create({
    data: { name, industry, location },
  });
  return company;
}

/**
 * Return array of objects of type Company
 * @returns {Promise<Company[]>} - Array of all company records
 */

async function getAllCompanies() {
  const companies = await prisma.company.findMany();
  return companies;
}

/**
 * Used when one or more specific company records are wanted, using their IDs
 * @param {number[]} ids Array of company IDs, can contain a single ID
 * @returns {Promise<Company[]>} Returns an array of matching Company records
 */

async function getCompaniesById(ids) {
  const company = await prisma.company.findMany({
    where: { id: { in: ids } },
  });
  return company;
}

/**
 * Use to update a company record
 * @param {number} id - Company ID
 * @param {string} name - New name for the company
 * @param {string} industry - New industry for the company
 * @param {string} location - New location for the company
 * @returns {Promise<Company>} - The updated company record
 */

async function updateCompany(id, name, industry, location) {
  const company = await prisma.company.update({
    where: { id },
    data: { name, industry, location },
  });
  return company;
}

/**
 * Delete a company record by ID
 * @param {number} id - Company ID
 * @returns {Promise<Company>} - The deleted company record
 */

async function deleteCompany(id) {
  const company = await prisma.company.delete({ where: { id } });
  return company;
}

module.exports = {
  createCompany,
  getAllCompanies,
  getCompaniesById,
  updateCompany,
  deleteCompany,
};
