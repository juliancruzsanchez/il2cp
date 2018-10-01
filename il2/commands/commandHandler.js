let ac = require("./models/AdminCommands")
let uc = require("./models/UserCommands")
module.exports = function commands(input, il2) {

  function timeLeftAction() {
    let cm = require("../cycleManager")
    const config = require("../configParser")
    let timeSince = new Date() - cm.getTime()
    let tt = config.missionInterval * 60 * 1000
    let ts = tt - timeSince
    let tl = ts / 60000
    il2.chat(Math.ceil(tl) + " Minutes Remaining Until Next Mission", user)
  }
  let user = input.match("Chat: (.*):")[1]

  new ac.AdminCommand("nextmap", () => { require("../cycleManager").nextMission() }).exec(user, input)
  let userCommands = [{
      cmd: "help",
      cc: function () {
        il2.chat("Commands:", user)
        il2.chat("<timeleft", user)
      }
    },
    {
      cmd: "obj<blue",
      cc: function () {}
    }, {
      cmd: "obj<red",
      cc: function () {}
    }, {
      cmd: "timeleft",
      cc: function () {
        timeLeftAction()
      }
    },
    {
      cmd: "tl",
      cc: function () {
        timeLeftAction()
      }
    }
  ]
  for (let i in userCommands) {
    new uc.UserCommand(i.cmd, i.cc)
  }
}
