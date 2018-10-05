const il2 = require("../il2/il2.js")
let config = require("../il2/configParser")

let p = (l) => {
    return l.replace(/\s+/g, '')
}
let cf = process.env.APPDATA + "\\IL2 Control Panel\\config.json"

module.exports = (app, win) => {

    function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value
        })
    }

    app.get("/addMission/:a", function (req, res) {
        if (config.missionsInCycle.indexOf(req.params.a) <= -1) {
            config.missionsInCycle.push(req.params.a)
        }
        res.send(config.missionsInCycle)
    })
    app.get("/removeMission/:a", function (req, res) {
        config.missionsInCycle = arrayRemove(config.missionsInCycle, req.params.a)

        res.send(config.missionsInCycle)
    })
    app.get("/setup", (req, res) => {
        res.render("setup")
    })
    app.get('/missionLoader/:a', (req, res) => {
        il2.loadMission(req.params.a)
        res.send(req.params.a)
    });
    app.get('/exit', () => {
        const win = require("../il2cp")
        win.win.hide()
        
    })
    app.get('/ban/:a')
}