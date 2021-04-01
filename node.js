const testFolder = "./src/img/";
const fs = require("fs");

fs.readdirSync(testFolder).forEach((file) => {
  console.log(file);
});
