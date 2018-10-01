const telnet = require('telnet-client')
const command = require("./commands/chatHandler")
const config = require("./configParser")
module.exports = {
  server: new telnet(),
  init() {
    this.server.on("data", (data) => {
      command(data, this.server, this)
    })
    this.server.connect({
      host: config.ip,
      port: config.port,
      timeout: 20000,
      stripShellPrompt: true,
      irs: "\r\n"
    })

  },
  setDifficulty(diff) {
    this.server.send(`difficulty ${diff}\r`)
  },

  loadMission(mis) {
    this.send("ban LOAD ")
    this.chat("Loading " + mis)
    this.send("mission END")
    this.send("mission LOAD " + mis)
    this.send("mission BEGIN")
  },
  send(msg) {
    this.server.send(msg + "\r")
    console.log(msg)
  },
  chat(msg, player) {
    if (player == undefined) player = "ALL"
    this.send(`chat ${msg} TO ${player}`)
  },
  dotRange(opt = {foe: {color, dot, range, type, id, name}, friendly:  {color, dot, range, type, id, name}}) {
    this.send(`mp_dotrange FOE ${opt.foe.color} ${opt.foe.dot} ${opt.foe.range} ${opt.foe.type} ${opt.foe.id} ${opt.foe.name}`)
    this.send(`mp_dotrange FRIENDLY ${opt.friendly.color} ${opt.friendly.dot} ${opt.friendly.range} ${opt.friendly.type} ${opt.friendly.id} ${opt.friendly.name}`)
  },
  
ban(u) {
  this.send("ban LOAD")
this.send("ban ADD NAME " + u.replace('\\n', '').replace('\\', ''))
this.send("ban SAVE")

}}
