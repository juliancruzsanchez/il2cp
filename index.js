const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.use(express.static('public'))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
require('./routes').init(app);
require("./il2").init()
require("./il2").getUsers();
;

app.listen(3000)