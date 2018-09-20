const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const fs = require('fs')
const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');
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
        test()
      }
    }
  } catch (e) {
    console.log(e)
    fs.mkdirSync(process.env.APPDATA + "\\IL2 Control Panel")
    test()
  }
}

function run() {
  handlebarsInit()
  const config = require("./il2/configParser");
  const il2 = require("./il2/il2");
  il2.init();
  const cycle = require("./il2/cycleManager");
  cycle.startCycle();
  setInterval(() => {
    cycle.nextMission();
  }, config.missionInterval * 1000 * 60);
  require('./routes')
    .init(app);
  app.listen(3000)
}
var program = require('commander');
program.version('0.1.0')
program.command('setup')
.alias("config")
  .description(chalk.green('Configure IL2 Control Panel'))
  .action(() => {
    test(() => {
      co(function* () {
        console.clear()
        var ip = yield prompt(chalk.bold.green('IP Address of IL2 Server: '));
        console.log(chalk.yellow("Awesome! IP Saved!\n"));
        var port = yield prompt(chalk.bold.green('Port of IL2 Console: '));
        console.log(chalk.yellow("Awesome! Port Saved!\n"));
        var missionInterval = yield prompt(chalk.bold.green('Interval between missions: '));
        console.log(chalk.yellow("Awesome! Interval Saved!\n"));
        let cf = process.env.APPDATA + "\\IL2 Control Panel\\config.json";
        const config = require("./il2/configParser");
        config.ip = ip
        config.port = port
        config.missionInterval =missionInterval
        fs.unlinkSync(cf)
        fs.writeFile(cf, JSON.stringify(config), () => {        return process.exit(22);
        })
      })
    })
  });
program.command('start')
  .alias('launch')
  .description(chalk.yellow('Starts the program'))
  .action((cmd, options) => {
    test(run())
  })

program.parse(process.argv);
