let fs = require("fs");

module.exports = JSON.parse(fs.readFileSync("../config.json").toString());
