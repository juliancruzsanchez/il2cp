let fs = require("fs");
let uf = process.env.APPDATA + "\\IL2 Control Panel\\config.json" || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences/IL2 Control Panel/config.json' : '/var/local/IL2 Control Panel/config.json');
module.exports = JSON.parse(fs.readFileSync(uf + "config.json")
  .toString())
