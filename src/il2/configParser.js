let fs = require("fs");
let uf = process.env.APPDATA + "/" || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences/' : '/var/local');
let loc = uf + "IL2 Control Panel/"
module.exports = JSON.parse(fs.readFileSync(loc + "config.json")
  .toString())
