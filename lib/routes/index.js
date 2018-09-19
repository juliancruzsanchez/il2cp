const express = require('express');
const il2 = require("../il2");
const fs = require('fs');
let config = require("../il2/configParser");
let p = l => {
  return l.replace(/\s+/g, '');
};
module.exports = {
  init(app) {

    app.get('/', (request, response) => {
      response.render('home');
    });
    console.log();
    app.get('/missions', (request, response) => {
      fs.readdir(config.path + "Missions/", function (err, files) {
        response.render('missions', {
          missions: files.filter(str => {
            return str.includes(".mis");
          }),
          inCycle: config.missionsInCycle
        });
      });
    });

    app.get('/difficulty', (request, response) => {
      let d_post = {};

      il2.server.send("difficulty\r", {}, (err, data) => {
        let d_pre = data.split("\\n\r\n");
        d_pre.pop();
        for (let i in d_pre) {
          let name = p(d_pre[i].trim().replace("\\t", "").replace('\\u0020', '').replace('\\t\\t', '').replace('\\t', '').replace('\\t', ''));
          d_post[name.replace(/[0-1]/g, '')] = Number(name[name.length - 1]);
        }
        response.render('difficulty', {
          diff: d_post,
          diffType: Object.keys(d_post)
        });
      });
    });

    function arrayRemove(arr, value) {

      return arr.filter(function (ele) {
        return ele != value;
      });
    }

    app.get('/commands', (request, response) => {
      response.render('commands');
    });

    app.get('/players', (request, response) => {
      response.render('players', {
        player: [{
          status: "No",
          username: "veltro",
          ip: "75.71.64.136"
        }]
      });
    });
    app.get("/test1:a", function (req, res) {
      config.missionsInCycle = arrayRemove(config.missionsInCycle, req.params.a);
      fs.unlinkSync("config.json");
      fs.writeFile("config.json", JSON.stringify(config), () => {});
      req.send(config.missionsInCycle);
    });
  }

};