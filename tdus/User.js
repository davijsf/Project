const DailyHours = require("./DailyHours");
const Job = require("./Job");
const VocationalTraining = require("./VocationalTraining");
const HealthIndicators = require("./HealthIndicators");

class User {
    constructor({
        id, name, gender, age, relationshipStatus, addressType,
        MostUsedSocialPlatform, PerformanceWrittenTest, job,
        vocationalTraining, dailyHours, healthIndicators
    }) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.relationshipStatus = relationshipStatus;
        this.addressType = addressType;
        this.MostUsedSocialPlatform = MostUsedSocialPlatform;
        this.PerformanceWrittenTest = PerformanceWrittenTest;
        this.job = new Job(job);
        this.vocationalTraining = new VocationalTraining(vocationalTraining);
        this.dailyHours = new DailyHours(dailyHours);
        this.healthIndicators = new HealthIndicators(healthIndicators);
    } 
}

module.exports = User;
