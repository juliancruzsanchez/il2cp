let config = require("./configParser");
const fs = require("fs");

var request = require("request");

config.difficulty = Number(
  fs
    .readFileSync(config.path + "/confs.ini")
    .toString()
    .split("\r\n")[5]
    .replace("difficulty=", "")
);
console.log();

module.exports.setDifficulty = (diff, val) => {
  var options = {
    method: "POST",
    url:
      "https://europe-west1-il2-horus-demo-services.cloudfunctions.net/difficulty-toggle-value",
    body: {
      difficulty: config.difficulty,
      parameter: diff,
      value: val
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    config.difficulty = body.difficulty;
    var sss = {
      method: "POST",
      url:
        "https://europe-west1-il2-horus-demo-services.cloudfunctions.net/difficulty-decompose-value",
      body: { difficulty: body.difficulty },
      json: true
    };

    request(sss, function(error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      for (let i in body.parameters) {
        let ov;
        if (body.parameters[i] == false) {
          ov = 0;
        } else ov = 1;
        let a = "difficulty " + i + " " + ov;
        il2.send(a);
      }
    });
  });
};
