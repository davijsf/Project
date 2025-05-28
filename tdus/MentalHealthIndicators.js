class MentalHealthIndicators {
    constructor ({MentalHealthLevel, MentalHealthLevelMood, MentalHealthLevelStress, 
        MentalHealthLevelAnxiety, MentalHealthLevelDepression, IndicationOfTherapy,
        MentalHealthyPossibleRisk, LevelOfAddictionInSocialNetworks
    }) {
        this.mentalHealthLevel = MentalHealthLevel;
        this.mentalHealthLevelMood = MentalHealthLevelMood;
        this.mentalHealthLevelStress = MentalHealthLevelStress;
        this.mentalHealthLevelAnxiety = MentalHealthLevelAnxiety;
        this.mentalHealthLevelDepression = MentalHealthLevelDepression;
        this.indicationOfTherapy = IndicationOfTherapy;
        this.mentalHealthyPossibleRisk = MentalHealthyPossibleRisk;
        this.levelOfAddictionInSocialNetworks = LevelOfAddictionInSocialNetworks;
    }
}

module.exports = MentalHealthIndicators;