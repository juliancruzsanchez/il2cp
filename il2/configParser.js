const autoSave = require("save-on-change")
file =  process.env.APPDATA + "\\IL2 Control Panel\\config.json"

module.exports.difficulty = {}
module.exports.admins = []
module.exports = autoSave(file)