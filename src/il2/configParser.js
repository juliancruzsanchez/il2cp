let fs = require("fs");
let uf = String;
if (process.env.APPDATA) uf = process.env.APPDATA + "\\IL2 Control Panel\\config.json";
else uf = process.env.HOME + '/Library/Preferences/IL2 Control Panel/config.json';
module.exports = JSON.parse(fs.readFileSync(uf)
  .toString())
