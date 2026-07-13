require("dotenv").config();
const { PrismaMariaDb } = require("@prisma/adapter-mariadb"); //creates the TCP connection between the DB and the backend
const { PrismaClient } = require("../../generated/prisma"); //this has the methods i will use like findmany and create
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

// Shared prisma client instance, imported by all the models
module.exports = prisma;