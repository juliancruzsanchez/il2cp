#!/usr/bin/env node

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const fs = require('fs')
const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');
const playerStats = require('./il2/playerStats')
let file = process.env.APPDATA + "\\IL2 Control Panel\\config.json";

function handlebarsInit() {
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'views'));
}

function test(cb) {
  try {
    stats = fs.lstatSync(process.env.APPDATA + "\\IL2 Control Panel");
    if (stats.isDirectory()) {
      try {
        if (fs.lstatSync(file)
          .isFile()) {
          cb()
        }
      } catch (e) {
        console.log(e)
        fs.copyFileSync('./config.json', file)
        test(() => {})
      }
    }
  } catch (e) {
    console.log(e)
    fs.mkdirSync(process.env.APPDATA + "\\IL2 Control Panel")
    test(() => {})
  }
}

function run() {
  handlebarsInit()
  const config = require("./il2/configParser");
  const il2 = require("./il2/il2");
  require('child_process')
    .execFile(config.path + "/il2server.exe")
  il2.init();
  const cycle = require("./il2/cycleManager");
  cycle.startCycle();
  setInterval(() => {
    cycle.nextMission();
  }, config.missionInterval * 60000);
  require('./routes')
    .init(app);
  app.listen(3000)

}
var program = require('commander');
program.version('0.1.0')
program.command('setup')
  .alias("config")
  .description(chalk.green('Configure IL2 Control Panel'))
  .action((cmd, opts) => {
    test(() => {
      co(function* () {
        const config = require("./il2/configParser");
        console.clear()
        if (cmd == "interval") {
          var missionInterval = yield prompt(chalk.bold.green('Interval between missions: '));
          console.log(chalk.yellow("Awesome! Interval Saved!\n"));
          config.missionInterval = missionInterval;
        } else if (cmd == "ip") {
          var ip = yield prompt(chalk.bold.green('IP Address of IL2 Server: '));
          console.log(chalk.yellow("Awesome! IP Saved!\n"));
          config.ip = ip;
        } else if (cmd == "port") {
          var port = yield prompt(chalk.bold.green('Port of IL2 Console: '));
          console.log(chalk.yellow("Awesome! Port Saved!\n"));
          config.port = port;
        } else {
          var ip = yield prompt(chalk.bold.green('IP Address of IL2 Server: '));
          console.log(chalk.yellow("Awesome! IP Saved!\n"));
          config.ip = ip;
          var port = yield prompt(chalk.bold.green('Port of IL2 Console: '));
          console.log(chalk.yellow("Awesome! Port Saved!\n"));
          config.port = port;
          var missionInterval = yield prompt(chalk.bold.green('Interval between missions: '));
          console.log(chalk.yellow("Awesome! Interval Saved!\n"));
          config.missionInterval = missionInterval;
          console.log(chalk.bold.green("Saved\n Goto http://localhost:3000/setup"))
        }
        let cf = process.env.APPDATA + "\\IL2 Control Panel\\config.json";
        fs.unlinkSync(cf)
        fs.writeFile(cf, JSON.stringify(config), () => {
          return process.exit(22);
        })
      })
    })
  });
program.command('start')
  .alias('launch').alias("")
  .description(chalk.yellow('Starts the program'))
  .action((cmd, options) => {
    try {
      test(run)
    } catch (err) {
      test(run)
    }
  })


program.parse(process.argv);
