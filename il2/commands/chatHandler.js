let commands = require("./commandHandler")
let newUser = require("./newUsers")



module.exports = function (data, server, il2) {
  let input = String(data)
  let isValidCommand = input.includes(": <") || input.includes(".");
  if (input.includes("is complete created")) {
    newUser(input, il2)
  } else if (input.includes("Chat:") && !input.includes("Chat: ---") && !input.includes("Chat: Server") && isValidCommand) {
    commands(input, il2)
  } else if (input.includes("Chat: ---")) {

  } else {

  }
}
