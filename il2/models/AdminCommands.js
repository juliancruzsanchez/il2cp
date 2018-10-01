class AdminCommand {
  constructor(command, action) {
    this.command = command
    this.action = action
    this.exec = (user, i) => {
      if (i.includes("." + this.command))
        if (require("../../configParser").admin !== undefined) {
          if (require("../../configParser").admin.indexOf(user) > -1)
            this.action()
        } else {
          return
        }
    }
  }
}
module.exports = {
  AdminCommand
}
