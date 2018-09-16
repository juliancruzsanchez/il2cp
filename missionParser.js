var fs = require('fs');
let log = console.log;
let config = require("./configParser")
let f1 = fs.readFileSync(config.path+'/missions/Convoy.mis', 'utf8').toString();
let desc = fs.readFileSync(config.path+'missions/Convoy.properties', 'utf8').toString();
console.log(desc)
let f2 = " \r\n" + f1
let file = f2.split("\r\n");
let mis = {};

let p = (l) => {
    if (file[l].match(/[0-9]+/g) == Array) return file[l].match(/[0-9]+/g)[0]
    else return file[l].match(/[0-9]+/g)
}

let b = (l) => {
    if (file[l].match(/[0-9]+/g)[0] == 0) return false;
    else return true
}

let trim = (str) => {
    return str.replace(/\s+/g, '');
}

mis.season = {}
mis.season.day = p(11)
mis.season.month = p(10);
mis.season.year = p(9);


mis.weather = {}
mis.weather.windSpeed = p(14)
mis.weather.windDirection = p(13)
mis.weather.gust = p(15)
mis.weather.turbulance = p(16)


mis.mds = {}
mis.mds.radar = {}
mis.mds.radar.setRadarToAdvanceMode = b(18)
mis.mds.radar.refreshInterval = b(19)
mis.mds.radar.disableVectoring = b(20)
mis.mds.radar.enableTowerCommunications = b(21)
mis.mds.radar.shipsAsRadar = b(22)
mis.mds.radar.shipRadar = {}
mis.mds.radar.shipRadar.maxRange = p(23)
mis.mds.radar.shipRadar.minHeight = p(24)
mis.mds.radar.shipRadar.maxHeight = p(25)
mis.mds.radar.shipSmallRadar = {}
mis.mds.radar.shipSmallRadar.maxRange = p(26)
mis.mds.radar.shipSmallRadar.minHeight = p(27)
mis.mds.radar.shipSmallRadar.maxHeight = p(28)
mis.mds.radar.scoutsAsRadar = b(29)
mis.mds.radar.scoutsRadar = {}
mis.mds.radar.scoutsRadar.maxRange = p(30)
mis.mds.radar.scoutsRadar.deltaHeight = p(31)
mis.mds.radar.hideUnpopulatedAirstripsFromMinimap = b(32)
mis.mds.radar.scoutGroundObjects_Alpha = p(33)
mis.mds.radar.scoutCompleteRecon = b(34)
mis.mds.misc = {}
mis.mds.misc.disableAIRadioChatter = b(35)
mis.mds.misc.despawnAIPlanesAfterLanding = b(36)
mis.mds.misc.hidePlayersCountOnHomeBase = b(37)
mis.mds.misc.cratersVisibilityMultiplier = {}
mis.mds.misc.cratersVisibilityMultiplier.catagory1 = p(38)
mis.mds.misc.cratersVisibilityMultiplier.catagory2 = p(39)
mis.mds.misc.cratersVisibilityMultiplier.catagory3 = p(40)


/*
[RespawnTime]
  Bigship 1800
  Ship 1800
  Aeroanchored 1800
  Artillery 1800
  Searchlight 1800
  */

mis.respawnTime = []
mis.respawnTime.Bigship = p(42);
mis.respawnTime.Ship = p(43);
mis.respawnTime.Aeroanchored = p(44);
mis.respawnTime.Artillery = p(45);
mis.respawnTime.Searchlight = p(46);

function wing() {
    let cl = 48;
    let a = file.indexOf('[' + trim(file[cl]) + ']');
    let w = {};
    while (cl < a) {
        let a = file.indexOf('[' + trim(file[cl]) + ']');
        w[trim(file[cl])] = {}
        w[trim(file[cl])].planes = p(a+1)[0]
        if (trim(file[a + 2]).startsWith("Skill0")) {
                        w[trim(file[cl])].skill = []
            if (trim(file[a + 2]).startsWith("Skill0")) w[trim(file[cl])].skill.push (file[a + 2][9])
            if (trim(file[a + 3]).startsWith("Skill1")) w[trim(file[cl])].skill.push (file[a + 3][9])
            if (trim(file[a + 4]).startsWith("Skill2")) w[trim(file[cl])].skill.push (file[a + 4][9])
            if (trim(file[a + 5]).startsWith("Skill3")) w[trim(file[cl])].skill.push (file[a + 5][9])
            w[trim(file[cl])].fuel = p(a+7)[0]
            w[trim(file[cl])].weapons = trim(file[a+8].replace("weapons ", ""))
            w[trim(file[cl])].class = trim(file[a+6].replace("Class air.", ""))


        } else {
            if (trim(file[a + 2]).startsWith("Skill")) {
                w[trim(file[cl])].skill = []
                w[trim(file[cl])].skill.push(file[a + 2][8])
                w[trim(file[cl])].fuel = p(a+4)[0]
                w[trim(file[cl])].class = trim(file[a+3].replace("Class air.", ""))
                w[trim(file[cl])].weapons = trim(file[a+5].replace("weapons ", ""))

            }
        }

        cl = cl + 1;
    }
    return w;
}
mis.wing = wing()

// Line 47 (TBC)

console.log(mis)