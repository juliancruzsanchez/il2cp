let config = require("../configParser");
const fs = require("fs");
if (config.difficulty == undefined) {
  fs.readFile;
}

module.exports.setDifficulty = (diff, val) => {
  if (config.difficulty[diff] == undefined) throw Error("Not valid difficulty");
  config.difficulty[diff] = val;
};
