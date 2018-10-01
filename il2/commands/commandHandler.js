const UserCommand = require("./models/UserCommands").UserCommand
const AdminCommand = require("./models/AdminCommands").AdminCommand

module.exports = function commands(input, il2) {
  
    function timeLeftAction() {
      console.log('a')
      let cm = require("../cycleManager")
      const config = require("../configParser")
      let timeSince = new Date() - cm.getTime()
      let tt = config.missionInterval * 60 * 1000
      let ts = tt - timeSince
      let tl = ts / 60000
      il2.chat(Math.ceil(tl) + " Minutes Remaining Until Next Mission", user)
    }
    let user = input.match("Chat: (.*):")[1]
  
    new AdminCommand("nextmap", () => { require("../cycleManager").nextMission() }).exec(user,input)
    new UserCommand("obj<blue", () => {}).exec(user,input)
    new UserCommand("obj<red", () => {}).exec(user,input)
    new UserCommand("help", () => { il2.chat("Commands:", user);il2.chat("<timeleft", user) }).exec(user, input)
    new UserCommand("timeleft", timeLeftAction).exec(user,input)
    new UserCommand("tl", timeLeftAction).exec(user,input)
    new UserCommand("timeleft", timeLeftAction).exec(user,input)
    
  }