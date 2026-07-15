// Entry point, sets up the express app and mounts all the routers
const express = require("express");
const companyRouter = require("./routers/companyRouter");
const employeeRouter = require("./routers/employeeRouter");
const employeeAccountRouter = require("./routers/employeeAccountRouter");
const swaggerSpec = require("../swagger");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/companies", companyRouter);
app.use("/employees", employeeRouter);
app.use("/employee-accounts", employeeAccountRouter);

app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
