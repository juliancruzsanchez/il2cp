let fs = require("fs");
file =  process.env.APPDATA + "\\IL2 Control Panel\\config.json";

module.exports = JSON.parse(fs.readFileSync(file)
  .toString())
