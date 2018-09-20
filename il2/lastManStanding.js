const il2 = require("./il2");
module.exports = {
  leaderBoard(player) {
    console.log(`+---+------+----------------+-------+`)
    console.log(`| # | Team | Player         | Kills |`)
    console.log(`+---+------+----------------+-------+`)
    console.log(`| 1 |${player[0].team}|${player[0].name}|${player[0].kills}|`)
    console.log(`+---+------+----------------+-------+`)
    console.log(`| 2 |${player[1].team}|${player[1].name}|${player[1].kills}|`)
    console.log(`+---+------+----------------+-------+`)
    console.log(`| 3 |${player[2].team}|${player[2].name}|${player[2].kills}|`)
    console.log(`+---+------+----------------+-------+`)
    console.log(`| 4 |${player[3].team}|${player[3].name}|${player[3].kills}|`)
    console.log(`+---+------+----------------+-------+`)
    console.log(`| 5 |${player[4].team}|${player[4].name}|${player[4].kills}|`)
    console.log(`+---+------+----------------+-------+`)
  },
  planesLeftAlert(x) {
    console.log(`You have ${x} planes left!`)
  }
}
