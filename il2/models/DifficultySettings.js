let config = require('../configParser')

if (config.difficulty !== typeof Object) {
  config.difficulty = {
    
  }
}

module.exports.setDifficulty = (diff,val) => {
  if (config.difficulty[diff] == undefined) throw Error('Not valid difficulty')
  config.difficulty[diff]= val
}