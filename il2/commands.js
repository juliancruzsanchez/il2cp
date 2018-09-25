module.exports = function (data, server) {
  let input = String(data);
  console.log(input)
  // Welcomes users
  if (input.includes("is complete created")) {
    try {
      var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
      let ip = input.match(r)[0];
      let un = input.split(",")[2].replace(/\s+/g, '');
      console.log(ip, un)
      server.chat(`Welcome ${un} to JagerOne TO ${un}`)
    } catch (error) {
      console.error(error)
    }
   
  }
  // Timeleft
  else if (input.includes("<tl")) {
    console.log("a")
    server.send(`chat Not Yet Implemented`)
  }
  // Help
  else if (input.includes("<?")) {
    server.send(`chat Not Yet Implemented`)
  }
  // Returns next map
  else if (input.includes("<nextmap")) {
    server.send(`chat Not Yet Implemented`)
    let cm = require("./cycleManager");
    cm.nextMission()
  }
  // Returns version
  else if (input.includes("<version")) {
    server.send(`chat Not Yet Implemented`)
  }
  // Returns stats
  else if (input.includes("<stat")) {
    server.send(`chat Not Yet Implemented`)
  }
  else if (input.includes("<scoreboard")) {
    server.send(`chat Not Yet Implemented`)
    
  }
  else if (input.includes("<lives")) {
    server.send(`chat Not Yet Implemented`)
  }
}
