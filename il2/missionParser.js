var request = require("request");
var fs = require('fs')
var config = require("./configParser")
module.exports = function (fn) {
let file = fs.createReadStream(`${config.path}/Missions/${fn}`)
let a;
var options = {
  method: 'POST',
  url: 'https://europe-west1-il2-horus-demo-services.cloudfunctions.net/missions-parse',
  formData: {
    file: file
  }
};

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
a =  JSON.parse(body);
})
return a;
}