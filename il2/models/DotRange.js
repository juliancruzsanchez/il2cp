var HashMap = require('hashmap')

class DifficultySettings {
   constructor(name){
      this.name = name
   this.serialVersionUID = 1
   this.difficultyName = "Default"
   this.settings = new HashMap(String, Boolean)
   }   
    DifficultySettings(name) {
      this.difficultyName = name
       this.settings = new HashMap(String, Boolean)
      this.settings.put("SeparateEStart", true)
      this.settings.put("ComplexEManagement", true)
      this.settings.put("TorqueGyroEffects", true)
      this.settings.put("FlutterEffect", true)
      this.settings.put("WindTurbulence", true)
      this.settings.put("StallsSpins", true)
      this.settings.put("Vulnerability", true)
      this.settings.put("BlackoutsRedouts", true)
      this.settings.put("RealisticGunnery", true)
      this.settings.put("LimitedAmmo", true)
      this.settings.put("LimitedFuel", true)
      this.settings.put("CockpitAlwaysOn", true)
      this.settings.put("NoOutsideViews", true)
      this.settings.put("HeadShake", true)
      this.settings.put("NoIcons", true)
      this.settings.put("NoPadlock", true)
      this.settings.put("Clouds", true)
      this.settings.put("NoInstantSuccess", true)
      this.settings.put("TakeoffLanding", true)
      this.settings.put("RealisticLandings", true)
      this.settings.put("NoMapIcons", true)
      this.settings.put("NoMinimapPath", true)
      this.settings.put("NoSpeedBar", true)
      this.settings.put("EngineOverheat", true)
      this.settings.put("GLimits", true)
      this.settings.put("Reliability", true)
      this.settings.put("RealisticPilotVulnerability", true)
      this.settings.put("NoPlayerIcon", true)
      this.settings.put("NoFogOfWarIcons", true)
      this.settings.put("RealisticNavigationInstruments", true)
      this.settings.put("BombFuzes", true)
      this.settings.put("FragileTorps", true)
      this.settings.put("NoEnemyViews", true)
      this.settings.put("NoFriendlyViews", true)
      this.settings.put("NoSeaUnitViews", true)
      this.settings.put("NoAircraftViews", true)
      this.settings.put("NoOwnPlayerViews", true)
      this.settings.put("RealisticRocketSpread", true)
      this.settings.put("SharedKills", true)
      this.settings.put("SharedKillsHistorical", true)
      this.settings.put("No_GroundPadlock", true)
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
      this.settings.put(setting, value)
   }
}
}

