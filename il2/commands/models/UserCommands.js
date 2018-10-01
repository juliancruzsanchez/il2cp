class UserCommand {
  constructor(command, action) {
    this.command = command;
    this.action = action;
    this.exec = (user, i) => {
      if (i.includes("<" + this.command)) {
        this.action()
      }
    }
  }
}
module.exports = {
  UserCommand
}
