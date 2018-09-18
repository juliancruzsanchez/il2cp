const telnet = require('telnet-client');
const command = require("./commands");
const config = require("./configParser");

module.exports = {

  server: new telnet(),
  init() {
    // Node.emitter.setMaxListeners(30)
    this.server.on("data", data => {
      command(data, this.server);
    });
    this.server.connect({
      host: config.ip,
      port: config.port,
      timeout: 20000,
      stripShellPrompt: true,
      irs: "\r\n"
    });
  },
  setDifficulty(diff) {
    this.server.exec(`difficulty ${diff}`);
  },

  getUsers() {
    this.server.send("user\r", {}, (a, b) => {
      let fo = String(b).replace(`\\u0020`, "").replace("<consoleN>", "").replace(/<([1-9]*)>/i, "").split("\\n\r\n");
      fo.pop();
      console.log(fo);
      return fo;
    });
  },
  loadMission(mis) {
    this.server.exec("mission LOAD " + mis);
  }
};
