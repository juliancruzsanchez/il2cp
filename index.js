const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const il2 = require("./il2");
const config = require("./configParser")
app.engine('.hbs', exphbs({ 
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  
}))
app.use(express.static('public'))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
require('./routes').init(app);
il2.init();
const cycle = require("./cycleManager")
cycle.startCycle()
setInterval(() => {cycle.nextMission()}, config.missionInterval * 1000 * 60)
console.log(il2.getUsers())

app.listen(3000)