const MentalHealthIndicators = require("./MentalHealthIndicators");

class HealthIndicators {
    constructor ({
        healthyDiet, bloodPressure, heartRate,
        weigthCategory, sleepQuality, dailyCaffeineIntakeMg,
        MentalHealthIndicators: mentalHealthData // <- renomeando aqui
    }) {
        this.healthyDiet = healthyDiet;
        this.bloodPressure = bloodPressure;
        this.weigthCategory = weigthCategory;
        this.heartRate = heartRate;
        this.sleepQuality = sleepQuality;
        this.dailyCaffeineIntakeMg = dailyCaffeineIntakeMg;

        this.mentalHealthIndicators = new MentalHealthIndicators(mentalHealthData || {});
    }
}

module.exports = HealthIndicators;
