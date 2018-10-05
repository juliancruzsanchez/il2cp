const il2 = require("../il2/il2.js")
let config = require("../il2/configParser")
let p = (l) => {
  return l.replace(/\s+/g, '')
}
module.exports = {
  init(app) {

    const prefix = "/" + app.get("urlPrefix");
    app.locals.data = {
      prefix: prefix,
      page: ""
    }

    console.log(prefix)
    app.get(prefix + '/players', (request, response) => {
      app.locals.data.page = "Players";
      response.render('players', {
        player: require("../il2/commands/newUsers.js").users
      })
    })
    app.get(prefix, (request, response) => {
      app.locals.data.page = "Admin";
      response.render('home', {
        il2: {
          ip: config.ip,
          port: config.port
        }
      })
    })
    app.get( '/help', (req, res) => {
      app.locals.data.page = "Help";

      res.render('help')
    })
    app.get(prefix + '/missions', (request, response) => {
      app.locals.data.page = "Missions";

      require("fs").readdir(config.path + "Missions/", function (
        err,
        files
      ) {
        response.render("missions", {
          missions: files.filter(str => {
            if (config.missionsInCycle.includes(str)) return false
            else return str.includes(".mis")
          }),
          inCycle: config.missionsInCycle
        })
      })
    })
    app.get(prefix + '/difficulty', (request, response) => {
      app.locals.data.page = "Difficulty";

      let d_post = {}
      il2.server.send("difficulty\r", {}, (err, data) => {
        let d_pre = data.split("\\n\r\n")
        d_pre.pop()
        for (let i in d_pre) {
          let name = p(d_pre[i].trim()
            .replace("\\t", "")
            .replace('\\u0020', '')
            .replace('\\t\\t', '')
            .replace('\\t', '')
            .replace('\\t', ''))
          d_post[name.replace(/[0-1]/g, '')] = Number(name[name.length - 1])
        }
        response.render('difficulty', {
          diff: d_post,
          diffType: Object.keys(d_post)
        })
      })
    })
    app.get(prefix + '/commands', (request, response) => {
      app.locals.data.page = "Commadnds";

      response.render('commands')
    })

    require("./backend")(app)
  }
}