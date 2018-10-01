let ac = require("./AdminCommands")
let uc = require("./UserCommands")
let newUser = require("./newUsers")

function commands(input, il2) {
  let nextmap = new ac.AdminCommand("nextmap", () => {
    let cm = require("../cycleManager")
    cm.nextMission()
  })
  let obj = {}
  obj.blue = new uc.UserCommand("obj<blue", () => {})
  obj.red = new uc.UserCommand("obj<red", () => {})
  let help = new uc.UserCommand("help", () => {
    il2.chat("Commands:", user)
  })
  let timeleft = new uc.UserCommand("tl", timeLeftAction)
  let tl = new uc.UserCommand("timeleft", timeLeftAction)
  let user = input.match("Chat: (.*):")[1]
function getTimeLeft(timeout) {
  return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000)
}
  function timeLeftAction() {
    il2.chat(getTimeLeft(require('../../il2cp').interval))
  }

  tl.exec(user, input)
  nextmap.exec(user, input)
  timeleft.exec(user, input)
  help.exec(user, input)
  obj.red.exec(user, input)
  obj.blue.exec(user, input)

}

module.exports = function (data, server, il2) {
  let input = String(data)
  if (input.includes("is complete created")) {
    newUser(input, il2)
  } else if (input.includes("Chat:") && !input.includes("Chat: ---") && !input.includes("Chat: Server")) {
    commands(input, il2)
  } else if (input.includes("Chat: ---")) {

  } else {

  }
}
