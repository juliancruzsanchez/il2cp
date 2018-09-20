const telnet = require('telnet-client')
const command = require("./commands")
const config = require("./configParser")
module.exports = {
  server: new telnet(),
  init() {
    // Node.emitter.setMaxListeners(30)
    this.server.on("data", (data) => {
      command(data, this.server)
    });
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
  getUsers() {
    this.server.send("user\r", {}, (a, b) => {
      let fo = String(b).replace(`\\u0020`, "").replace("<consoleN>", "").replace(/<([1-9]*)>/i, "").split("\\n\r\n")
      fo.pop()
      console.log(fo)
      return fo;
    })
  },
  loadMission(mis) {
    this.send("mission LOAD " + mis)
  },
  send(msg) {
    this.server.send(msg + "\r")
  },
  chat(msg, player) {
    if (player == undefined) player = "ALL";
    this.send(`chat ${msg} TO ${player}`)
    console.log(`chat ${msg} TO ${player}`)
  },
  dotRange(opt) {
    this.send(`mp_dotrange FOE ${opt.foe.color} ${opt.foe.dot} ${opt.foe.range} ${opt.foe.type} ${opt.foe.id} ${opt.foe.name}`)
    this.send(`mp_dotrange FRIENDLY ${opt.friendly.color} ${opt.friendly.dot} ${opt.friendly.range} ${opt.friendly.type} ${opt.friendly.id} ${opt.friendly.name}`)
  }
}
