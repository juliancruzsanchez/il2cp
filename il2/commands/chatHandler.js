let commands = require("./commandHandler")
let newUser = require("./newUsers")



module.exports = function (data, server, il2) {
  let input = String(data)
  let isValidCommand = input.includes(": <") || input.includes("&");
  if (input.includes("is complete created")) {
    let un = input.split(",")[2].replace(/\s+/g, '')
 newUser.add(input, il2);
    il2.chat(`Welcome ${un} to JagerOne`, un)
  } else if (input.includes("Chat:") && !input.includes("Chat: ---") && !input.includes("Chat: Server") && isValidCommand) {
    commands(input, il2)
  } else if (input.includes("Chat: ---")) {
    if (input.includes("has left the game")) {
      let un = input.split(" ")[2].replace(/\s+/g, '')
      newUser.users.pop(newUser.users.some(function (user) {
        return user.username = un
      }))
      console.log(newUser.users)

    } else 
      if (input.includes("")) {input.split('')
    }
  } else{

  }
}