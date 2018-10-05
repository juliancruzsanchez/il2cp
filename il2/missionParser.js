let fs = require('fs')
let config = require("./configParser")

function parseMission(name) {
  let f1 = fs.readFileSync(config.path + '/missions/' + name + '.mis', 'utf8')
    .toString()
  let desc = fs.readFileSync(config.path + 'missions/' + name + '.properties', 'utf8')
    .toString()
  let f2 = " \r\n" + f1
  let file = f2.split("\r\n")
  let p = (l) => {
    if (file[l].match(/[0-9]+/g) == Array) return file[l].match(/[0-9]+/g)[0]
    else return file[l].match(/[0-9]+/g)
  }
  let b = (l) => {
    if (file[l].match(/[0-9]+/g)[0] === 0) return false
    else return true
  }
  let trim = (str) => {
    return str.replace(/\s+/g, '')
  }

  function wing() {
    let cl = 48
    let currentLineInFile = trim(file[cl])
    let a = file.indexOf('[' + currentLineInFile + ']')
    let output = {}
    while (cl < a) {
      let a = file.indexOf('[' + currentLineInFile + ']')
      output[currentLineInFile] = {}
      output[currentLineInFile].planes = p(a + 1)[0]
      if (trim(file[a + 2])
        .startsWith('Skill0')) {
        output[currentLineInFile].skill = []
        if (trim(file[a + 2])
          .startsWith('Skill0')) output[currentLineInFile].skill.push(file[a + 2][9])
        if (trim(file[a + 3])
          .startsWith('Skill1')) output[currentLineInFile].skill.push(file[a + 3][9])
        if (trim(file[a + 4])
          .startsWith('Skill2')) output[currentLineInFile].skill.push(file[a + 4][9])
        if (trim(file[a + 5])
          .startsWith('Skill3')) output[currentLineInFile].skill.push(file[a + 5][9])
        output[currentLineInFile].fuel = p(a + 7)[0]
        output[currentLineInFile].weapons = trim(file[a + 8].replace('weapons ', ' '))
        output[currentLineInFile].class = trim(file[a + 6].replace('Class air.', ' '))
      } else {
        if (trim(file[a + 2])
          .startsWith('Skill')) {
          output[currentLineInFile].class = trim(file[a + 3].replace('Class air.', ' '))
          output[currentLineInFile].fuel = p(a + 4)[0]
          output[currentLineInFile].skill = []
          output[currentLineInFile].skill.push(file[a + 2][8])
          output[currentLineInFile].weapons = trim(file[a + 5].replace('weapons ', ' '))
        }
      }
      cl = cl + 1
    }
    return out
  }
  let mis = {
    desc: '',
    season: {
      day: p(11),
      month: p(10),
      year: p(9)
    },
    mds: {
      radar: {
        disableVectoring: b(20),
        enableTowerCommunications: b(21),
        refreshInterval: b(19),
        setRadarToAdvanceMode: b(18),
        shipsAsRadar: b(22),
        shipRadar: {
          maxHeight: p(25),
          maxRange: p(23),
          minHeight: p(24),
        },
        shipSmallRad: r = {},
        shipSmallRadar: {
          maxHeight: p(28),
          maxRange: p(26),
          minHeight: p(27),
        },
        scoutsAsRadar: b(29),
        scoutsRadar: {
          deltaHeight: p(31),
          maxRange: p(30),
        },
        hideUnpopulatedAirstripsFromMinimap: b(32),
        scoutCompleteRecon: b(34),
        scoutGroundObjectsAlpha: p(33),
      },
      misc: {
        despawnAIPlanesAfterLanding: b(36),
        disableAIRadioChatter: b(35),
        hidePlayersCountOnHomeBase: b(37),
        cratersVisibilityMultiplier: {
          catagory1: p(38),
          catagory2: p(39),
          catagory3: p(40),
        }
      }
    },
    wing: wing(),
    weather: {
      gust: p(15),
      turbulance: p(16),
      windDirection: p(13),
      windSpeed: p(14),
    },
    respawnTime: {
      Aeroanchored: p(44),
      Artillery: p(45),
      Bigship: p(42),
      Searchlight: p(46),
      Ship: p(43),
    },
    description: desc
  }
  return mis;
}