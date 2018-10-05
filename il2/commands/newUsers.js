let chalk = require("chalk")
module.exports= {
  users : [],
  add(input, il2){  
    try {
      var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/
      let ip = input.match(r)[0]
      let un = input.split(",")[2].replace(/\s+/g, '')
      this.users.push( {ip: ip, username: un});
      il2.chat(`Welcome ${un} to JagerOne`, un)
      il2.chat(`Missions by veltro. All Rights Reserved.`, un)

    } catch (error) {
      console.error(error)
    }
  }
}