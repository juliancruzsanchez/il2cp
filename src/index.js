const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const fs = require('fs')
let file = process.env.APPDATA + "\\IL2 Control Panel\\config.json";

// Handlebars setup and configuration
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Checks for config file
function test() {
  try {

    stats = fs.lstatSync(process.env.APPDATA + "\\IL2 Control Panel");
    if (stats.isDirectory()) {
      try {
        if (fs.lstatSync(file).isFile()) {
          run()
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
  const config = require("./il2/configParser");

  // Import IL2 Library
  const il2 = require("./il2/il2");

  //Initalize IL2 Library
  il2.init();

  // Import Mission Cycle Manager
  const cycle = require("./il2/cycleManager");

  // Starts Cycle
  cycle.startCycle();

  // Cycles Missions
  setInterval(function () {
    cycle.nextMission();
  }, config.missionInterval * 1000 * 60);
}

test()
// App Routes
require('./routes').init(app);

// Start listening
app.listen(3000)
