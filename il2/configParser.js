const autoSave = require("save-on-change")
file =  process.env.APPDATA + "\\IL2 Control Panel\\config.json"

module.exports =  autoSave(file)
