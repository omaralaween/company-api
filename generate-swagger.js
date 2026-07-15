// One-off script: writes the swagger spec to swagger.json so it can be imported into Postman
const fs = require("fs");
const swaggerSpec = require("./swagger");

fs.writeFileSync("./swagger.json", JSON.stringify(swaggerSpec, null, 2));
console.log("swagger.json generated");
