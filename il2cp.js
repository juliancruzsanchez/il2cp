#!/usr/bin/env node

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const fs = require('fs')
const chalk = require('chalk')
const co = require('co')
let file = process.env.APPDATA + "\\IL2 Control Panel\\config.json"
let interval
function handlebarsInit() {
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('view engine', '.hbs')
  app.set('views', path.join(__dirname, 'views'))
}

let test = (cb) => {
  try {
    stats = fs.lstatSync(process.env.APPDATA + "\\IL2 Control Panel")
    if (stats.isDirectory()) {
      try {
        if (fs.lstatSync(file)
          .isFile()) {
          cb()
        }
      } catch (e) {
        console.log(e)
        fs.writeFile(file, "", () => {
          test(() => {})
        })
      }
    }
  } catch (e) {
    console.log(e)
    fs.mkdirSync(process.env.APPDATA + "\\IL2 Control Panel")
    test(() => {})
  }
}

let run = () => {
  handlebarsInit()
  const config = require("./il2/configParser")
  const il2 = require("./il2/il2")
  il2.init()
  const cycle = require("./il2/cycleManager")
  cycle.startCycle()
   interval = setInterval(() => {
    cycle.nextMission()
  }, config.missionInterval * 60 * 1000)
  require('./routes')
    .init(app)
  app.listen(3000)
}
let setup = (cmd, opts) => {
  test(() => {
    co(function* () {
      const config = require("./il2/configParser")
      console.clear()
      let prompt = require('co-prompt')

      function setConfig(name, dn) {
        var x = prompt(chalk.bold.green(dn +": "))
        console.log(chalk.yellow(`Awesome! ${dn} Saved!\n`))
        config[name] = x
      }

      if (cmd == "interval") {
        setConfig("missionInterval", 'Interval between missions')
      } else if (cmd == "ip") {
        setConfig("ip", 'IP Address of IL2 Server')
      } else if (cmd == "port") {
        setConfig("port", 'Port of IL2 Server')
      } else if (cmd == "admin") {
        setConfig("admin", 'Admins of IL2 Server')
      } else if (cmd == "path") {
        setConfig("path", 'Path to IL2 Folder')
      } else {
        setConfig("missionInterval", 'Interval between missions')
        setConfig("ip", 'IP Address of IL2 Server')
        setConfig("port", 'Port of IL2 Server')
        setConfig("admin", 'Admins of IL2 Server')
        setConfig("path", 'Path to IL2 Folder')
      }
      let cf = process.env.APPDATA + "\\IL2 Control Panel\\config.json"
      fs.unlinkSync(cf)
      fs.writeFile(cf, JSON.stringify(config), () => {
        return process.exit(22)
      })
    })
  })

}

let start = (cmd, options) => {
  try {
    test(run)
  } catch (err) {
    test(run)
  }
}

var program = require('commander')
program.version('0.1.0')

program.command('start')
  .alias('launch')
  .alias("")
  .description(chalk.yellow('Starts the program'))
  .action(start)

program.command('setup')
  .alias("config")
  .description(chalk.green('Configure IL2 Control Panel'))
  .action(setup)

program.parse(process.argv)

module.exports = {interval}