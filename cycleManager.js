const il2 = require("./il2.js")
const fs = require("fs")
let config = require("./configParser")

let currentMission = 0;



module.exports = {
    startCycle() {
        fs.readdir(config.path + "Missions/", function (err, file) {
            let a = file.filter(str => {
                if (str.includes(".mis") && config.missionsInCycle.includes(str)) {

                    return true
                } else return false
            });
            il2.loadMission(a[currentMission])

        })


    },
    nextMission() {
        cs = this.startCycle
        fs.readdir(config.path + "Missions/", function (err, file) {
            let a = file.filter(str => {
                if (str.includes(".mis") && config.missionsInCycle.includes(str)) {

                    return true
                } else return false
            });

            if (currentMission == a.length - 1) {
                currentMission = 0;

                cs()
            } else {
                currentMission = currentMission + 1;

                cs()
            }
        })
    }
}