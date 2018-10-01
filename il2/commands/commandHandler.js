let ac = require("./models/AdminCommands")
let uc = require("./models/UserCommands")
module.exports = function commands(input, il2) {

    function timeLeftAction() {
      let cm = require("../cycleManager")
      const config = require("../configParser")
      let timeSince = new Date() - cm.getTime();
      let tt = config.missionInterval * 60 * 1000
      let ts = tt - timeSince
      let tl = ts / 60000
      il2.chat(Math.ceil(tl) + " Minutes Remaining Until Next Mission", user)
    }
    let user = input.match("Chat: (.*):")[1]
  
    new ac.AdminCommand("nextmap", () => { require("../cycleManager").nextMission() }).exec(user,input)
    new uc.UserCommand("obj<blue", () => {}).exec(user,input)
    new uc.UserCommand("obj<red", () => {}).exec(user,input)
    new uc.UserCommand("help", () => { il2.chat("Commands:", user) }).exec(user,input)
    new uc.UserCommand("timeleft", timeLeftAction).exec(user,input)
    new uc.UserCommand("tl", timeLeftAction).exec(user,input)
    new uc.UserCommand("timeleft", timeLeftAction).exec(user,input)
  }