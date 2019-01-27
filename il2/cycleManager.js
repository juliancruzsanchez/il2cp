  let il2 = require("./il2.js")
  let fs = require("fs")
  const config = require("./configParser")
  let currentMission = 0
  let time
  module.exports = {

    startCycle(tim4e) {
      fs.readdir(config.path + "Missions/", (err, file) => {
        let a = file.filter(str => {
          if (str.includes(".mis") && config.missionsInCycle.includes(str)) {
            return true
          } else return false
        })
        if (config.missionsInCycle[currentMission] !== undefined) {
          il2.loadMission(a[currentMission])
          time = tim4e
        } else {
          console.warn("No Missions Found In Cycle!")
        }
      })
    },
    nextMission() {
      let cs = this.startCycle
      fs.readdir(config.path + "Missions/", (err, file) => {
        let a = file.filter(str => {
          if (str.includes(".mis") && config.missionsInCycle.includes(str)) {
            return true
          } else return false
        })
        if (currentMission === a.length - 1) {
          currentMission = 0
          cs(new Date())
        } else {
          currentMission = currentMission + 1
          cs(new Date())
        }
      })
    },
    getTime() {
      return time
    },
    setTime(newTime) {
      time = newTime;
    }
  }
