const UserCommand = require("../models/UserCommands")
const AdminCommand = require("../models/AdminCommands")

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

  function help() {
    il2.chat("Commands:", user)
    il2.chat("<timeleft", user)
    il2.chat("<nextmap", user)
    il2.chat("<obj<blue", user)
    il2.chat("<obj<red", user)
    il2.chat("<help", user)
    il2.chat("<timeleft", user)

  }
  let user = input.match("Chat: (.*):")[1]

  new AdminCommand("nextmap", () => {
    require("../cycleManager").nextMission()
  }).exec(user, input)
  new AdminCommand('ban', () => {
    require("../il2").ban(input.match("&ban (.*)")[1])
  }).exec(user, input)
  new UserCommand("obj<blue", () => {}).exec(user, input)
  new UserCommand("obj<red", () => {}).exec(user, input)
  new UserCommand("help", help).exec(user, input)
  new UserCommand("timeleft", timeLeftAction).exec(user, input)
  new UserCommand("tl", timeLeftAction).exec(user, input)
}