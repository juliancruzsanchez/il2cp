var HashMap = require("hashmap")

class DifficultySettings {
  constructor(name) {
    this.serialVersionUID = 1
    this.difficultyName = name
    this.settings = new HashMap(String, Boolean)
    this.settings.set("SeparateEStart", true)
    this.settings.set("ComplexEManagement", true)
    this.settings.set("TorqueGyroEffects", true)
    this.settings.set("FlutterEffect", true)
    this.settings.set("WindTurbulence", true)
    this.settings.set("StallsSpins", true)
    this.settings.set("Vulnerability", true)
    this.settings.set("BlackoutsRedouts", true)
    this.settings.set("RealisticGunnery", true)
    this.settings.set("LimitedAmmo", true)
    this.settings.set("LimitedFuel", true)
    this.settings.set("CockpitAlwaysOn", true)
    this.settings.set("NoOutsideViews", true)
    this.settings.set("HeadShake", true)
    this.settings.set("NoIcons", true)
    this.settings.set("NoPadlock", true)
    this.settings.set("Clouds", true)
    this.settings.set("NoInstantSuccess", true)
    this.settings.set("TakeoffLanding", true)
    this.settings.set("RealisticLandings", true)
    this.settings.set("NoMapIcons", true)
    this.settings.set("NoMinimapPath", true)
    this.settings.set("NoSpeedBar", true)
    this.settings.set("EngineOverheat", true)
    this.settings.set("GLimits", true)
    this.settings.set("Reliability", true)
    this.settings.set("RealisticPilotVulnerability", true)
    this.settings.set("NoPlayerIcon", true)
    this.settings.set("NoFogOfWarIcons", true)
    this.settings.set("RealisticNavigationInstruments", true)
    this.settings.set("BombFuzes", true)
    this.settings.set("FragileTorps", true)
    this.settings.set("NoEnemyViews", true)
    this.settings.set("NoFriendlyViews", true)
    this.settings.set("NoSeaUnitViews", true)
    this.settings.set("NoAircraftViews", true)
    this.settings.set("NoOwnPlayerViews", true)
    this.settings.set("RealisticRocketSpread", true)
    this.settings.set("SharedKills", true)
    this.settings.set("SharedKillsHistorical", true)
    this.settings.set("No_GroundPadlock", true)
  }

  getDifficultyName() {
    return this.difficultyName
  }

  setDifficultyName(difficultyName) {
    this.difficultyName = difficultyName
  }

  getSettings() {
    return this.settings
  }

  setSettings(settings) {
    this.settings = settings
  }

  setSetting(setting, value) {
    if (this.settings.containsKey(setting)) {
      this.settings.set(setting, value)
    }
  }
}

let a = new DifficultySettings("a")
console.log(a)
