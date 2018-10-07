#!/usr/bin/env node

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const fs = require("fs");
const chalk = require("chalk");
const co = require("co");

const prompt = require("co-prompt");
const { Menu, Tray, BrowserWindow } = require("electron");
const eapp = require("electron").app;
let file = process.env.APPDATA + "\\IL2 Control Panel\\config.json";
process.env.APP_PATH = eapp.getAppPath();

function handlebarsInit() {
  app.engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      extname: ".hbs",
      layoutsDir: path.join(__dirname, "views/layouts")
    })
  );
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", ".hbs");
  app.set("views", path.join(__dirname, "views"));
}

function test(cb) {
  if (fs.existsSync(process.env.APPDATA + "\\IL2 Control Panel")) {
    if (fs.existsSync(file)) {
      cb();
    } else {
      fs.writeFileSync(
        file,
        `{
          "ip": "192.168.1.3",
          "path": "C:/il2/",
          "port": "2003",
          "missionInterval": 60,
          "missionsInCycle": [],
          "admin": [
            "veltro"
          ]
        }`
      );
      test(cb);
    }
  } else {
    fs.mkdirSync(process.env.APPDATA + "\\IL2 Control Panel");
    test(cb);
  }
}

function run() {
  handlebarsInit();
  const config = require("./il2/configParser");
  const il2 = require("./il2/il2");
  il2.init();
  const cycle = require("./il2/cycleManager");
  cycle.startCycle();
  setInterval(() => {
    cycle.nextMission();
  }, config.missionInterval * 60000);
  app.set("urlPrefix", "admin");

  require("./routes").init(app);

  app.listen(21122);

  eapp.on("ready", () => {
    const tray = new Tray("download.png");
    let win = new BrowserWindow({
      minHeight: 400,
      minWidth: 600,
      height: 800,
      frame: false,
      icon: path.join(eapp.getAppPath(), "download.png"),
      autoHideMenuBar: true
    });

    module.exports = {
      win,
      tray
    };
    win.loadURL("http://localhost:21122/admin");
    
  });
}

var program = require("commander");
program.version("0.1.0");
program
  .command("setup")
  .alias("config")
  .description(chalk.green("Configure IL2 Control Panel"))
  .action((cmd, opts) => {
    test(() => {
      co(function*() {
        const config = require("./il2/configParser");
        console.clear();
        if (cmd == "interval") {
          config.missionInterval = yield prompt(
            chalk.bold.green("Interval between missions: ")
          );
        } else if (cmd == "ip") {
          config.ip = yield prompt(
            chalk.bold.green("IP Address of IL2 Server: ")
          );
        } else if (cmd == "port") {
          config.port = yield prompt(chalk.bold.green("Port of IL2 Console: "));
        } else if (cmd == "admins") {
          config.admin = yield prompt(
            chalk.bold.green("Admins of IL2 Server: ")
          );
        } else if (cmd == "path") {
          config.path = yield prompt(chalk.bold.green("Path to IL2 Folder: "));
        } else {
          config.ip = yield prompt(
            chalk.bold.green("IP Address of IL2 Server: ")
          );
          config.port = yield prompt(chalk.bold.green("Port of IL2 Console: "));
          config.admin = yield prompt(
            chalk.bold.green("Admins of IL2 Server: ")
          );
          config.path = yield prompt(chalk.bold.green("Path to IL2 Folder: "));
          config.missionInterval = yield prompt(
            chalk.bold.green("Interval between missions: ")
          );
        }

        config.dotRange = {
          friendly: {
            color: 4.0,
            dot: 10.0,
            range: 4.0,
            type: 2.0,
            id: 4.0,
            name: 3.0
          },
          foe: {
            color: 4.0,
            dot: 10.0,
            range: 4.0,
            type: 2.0,
            id: 3.0,
            name: 2.0
          }
        };
        let cf = process.env.APPDATA + "\\IL2 Control Panel\\config.json";
        return process.exit(22);
      });
    });
  });

test(run);
