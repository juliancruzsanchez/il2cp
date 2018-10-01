const express = require('express')
const il2 = require("../il2/il2.js")
const fs = require('fs');
let config = require("../il2/configParser")
let p = (l) => {
  return l.replace(/\s+/g, '');
}
let cf = process.env.APPDATA + "\\IL2 Control Panel\\config.json";
module.exports = {
  init(app) {
    app.get('/', (request, response) => {
      response.render('home', {
        il2: {
          ip: config.ip,
          port: config.port
        }
      })
    })
    app.get('/help', (req, res) => {
      res.render('help')
    })
    app.get('/missions', (request, response) => {
      fs.readdir(config.path + "Missions/", function (err, files) {
        response.render('missions', {
          missions: files.filter(str => {
            if (config.missionsInCycle.includes(str)) return false;
           else return str.includes(".mis");
          }),
          inCycle: config.missionsInCycle
        })
      });
    })
    app.get('/difficulty', (request, response) => {
      let d_post = {}
      il2.server.send("difficulty\r", {}, (err, data) => {
        let d_pre = data.split("\\n\r\n");
        d_pre.pop()
        for (let i in d_pre) {
          let name = p(d_pre[i].trim()
            .replace("\\t", "")
            .replace('\\u0020', '')
            .replace('\\t\\t', '')
            .replace('\\t', '')
            .replace('\\t', ''));
          d_post[name.replace(/[0-1]/g, '')] = Number(name[name.length - 1]);
        }
        response.render('difficulty', {
          diff: d_post,
          diffType: Object.keys(d_post)
        })
      });
    })

    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele != value;
      });
    }
    app.get('/commands', (request, response) => {
      response.render('commands')
    })
    app.get('/players', (request, response) => {
      response.render('players', {
        player: require("../il2/commands/newUsers.js").users
      })
    });
    app.get("/addMission:a", function (req, res) {
      if (config.missionsInCycle.indexOf(req.params.a) <= -1) {
        config.missionsInCycle.push(req.params.a)
      }
      fs.unlinkSync(cf)
      fs.writeFile(cf, JSON.stringify(config), () => {})
      res.send(config.missionsInCycle)
    });
    app.get("/removeMission:a", function (req, res) {
      config.missionsInCycle = arrayRemove(config.missionsInCycle, req.params.a)
      fs.unlinkSync(cf)
      fs.writeFile(cf, JSON.stringify(config), () => {})
      res.send(config.missionsInCycle)
    });
    app.get("/setup", (req, res) => {
      res.render("setup")
    })
    app.get("/banUser/")
  }
}
