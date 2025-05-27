function parseLinhaParaUser(cabecalhos, valores) {
    // Extrai os índices com base nos nomes dos cabeçalhos
    const idIndex = cabecalhos.indexOf('id');
    const nameIndex = cabecalhos.indexOf('name');
    const genderIndex = cabecalhos.indexOf('gender');
    const ageIndex = cabecalhos.indexOf('age');
    const relationshipStatusIndex = cabecalhos.indexOf('relationshipStatus');
    const addressTypeIndex = cabecalhos.indexOf('addressType');
    const MostUsedSocialPlatformIndex = cabecalhos.indexOf('MostUsedSocialPlatform');
    const PerformanceWrittenTestIndex = cabecalhos.indexOf('PerformanceWrittenTest');

    // Job
    const jobNameIndex = cabecalhos.indexOf('jobName');
    const jobStatusIndex = cabecalhos.indexOf('jobStatus');
    const jobEnvironmentIndex = cabecalhos.indexOf('jobEnvironment');
    const jobProductivityIndex = cabecalhos.indexOf('jobProductivity');

    // Vocational Training
    const studyLevelIndex = cabecalhos.indexOf('studyLevel');
    const studyLevelParentsIndex = cabecalhos.indexOf('studyParents');
    const extracurricularTasksIndex = cabecalhos.indexOf('extracurricularTasks');

    // Daily Hours
    const dailyHoursStudyIndex = cabecalhos.indexOf('dailyHoursStudy');
    const dailyHoursScreenIndex = cabecalhos.indexOf('dailyHoursScreen');
    const dailyHoursPhoneIndex = cabecalhos.indexOf('dailyHoursPhone');
    const dailyHoursLaptopIndex = cabecalhos.indexOf('dailyHoursLaptop');
    const dailyHoursTabletdailyHoursTVIndex = cabecalhos.indexOf('dailyHoursTabletdailyHoursTV');
    const dailyHoursSocialMediaIndex = cabecalhos.indexOf('dailyHoursSocialMedia');
    const dailyHoursWorkIndex = cabecalhos.indexOf('dailyHoursWork');
    const dailyHoursEntertainmentIndex = cabecalhos.indexOf('dailyHoursEntertainment');
    const dailyHoursGamingIndex = cabecalhos.indexOf('dailyHoursGaming');
    const dailyHoursPhysicalActivityIndex = cabecalhos.indexOf('dailyHoursPhysicalActivity');
    const DaysPhysicalActivityIndex = cabecalhos.indexOf('DaysPhysicalActivity');
    const DailyMinutesMindfulnessIndex = cabecalhos.indexOf('DailyMinutesMindfulness');
    const DailyHoursNetflixIndex = cabecalhos.indexOf('DailyHoursNetflix');

    // Health
    const healthyDietIndex = cabecalhos.indexOf('healthyDiet');
    const bloodPressureIndex = cabecalhos.indexOf('bloodPressure');
    const heartRateIndex = cabecalhos.indexOf('heartRate');
    const weigthCategoryIndex = cabecalhos.indexOf('weigthCategory');
    const sleepQualityIndex = cabecalhos.indexOf('sleepQuality');
    const dailyCaffeineIntakeMgIndex = cabecalhos.indexOf('dailyCaffeineIntakeMg');

    // Mental Health
    const MentalHealthLevelIndex = cabecalhos.indexOf('MentalHealthLevel');
    const MentalHealthLevelMoodIndex = cabecalhos.indexOf('MentalHealthLevelMood');
    const MentalHealthLevelStressIndex = cabecalhos.indexOf('MentalHealthLevelStress');
    const MentalHealthLevelAnxietyIndex = cabecalhos.indexOf('MentalHealthLevelAnxiety');
    const MentalHealthLevelDepressionIndex = cabecalhos.indexOf('MentalHealthLevelDepression');
    const IndicationOfTherapyIndex = cabecalhos.indexOf('IndicationOfTherapy');
    const MentalHealthyPossibleRiskIndex = cabecalhos.indexOf('MentalHealthyPossibleRisk');
    const LevelOfAddictionInSocialNetworksIndex = cabecalhos.indexOf('LevelOfAddictionInSocialNetworks');

    // Função que realiza o tratamento dos valores
    function tratar(valor) {
        valor = valor?.trim() ?? "";
        if (!isNaN(valor) && valor !== "") return Number(valor);
        if (valor.toLowerCase() === "true" || valor.toLowerCase() === "yes") return true;
        if (valor.toLowerCase() === "false" || valor.toLowerCase() === "no") return false;
        if (/\d{4}-\d{2}-\d{2}/.test(valor)) return new Date(valor);
        if (valor === "") return null;
        return valor.replace(/^"|"$/g, '');
    }

    const obj = {
        id: tratar(valores[idIndex]),
        name: tratar(valores[nameIndex]),
        gender: tratar(valores[genderIndex]),
        age: tratar(valores[ageIndex]),
        relationshipStatus: tratar(valores[relationshipStatusIndex]),
        addressType: tratar(valores[addressTypeIndex]),
        MostUsedSocialPlatform: tratar(valores[MostUsedSocialPlatformIndex]),
        PerformanceWrittenTest: tratar(valores[PerformanceWrittenTestIndex]),
        job: {
            jobName: tratar(valores[jobNameIndex]),
            jobStatus: tratar(valores[jobStatusIndex]),
            jobEnvironment: tratar(valores[jobEnvironmentIndex]),
            jobProductivity: tratar(valores[jobProductivityIndex])
        },
        vocationalTraining: {
            studyLevel: tratar(valores[studyLevelIndex]),
            studyLevelParents: tratar(valores[studyLevelParentsIndex]),
            extracurricularTasks: tratar(valores[extracurricularTasksIndex])
        },
        dailyHours: {
            dailyHoursStudy: tratar(valores[dailyHoursStudyIndex]),
            dailyHoursScreen: tratar(valores[dailyHoursScreenIndex]),
            dailyHoursPhone: tratar(valores[dailyHoursPhoneIndex]),
            dailyHoursLaptop: tratar(valores[dailyHoursLaptopIndex]),
            dailyHoursTabletdailyHoursTV: tratar(valores[dailyHoursTabletdailyHoursTVIndex]),
            dailyHoursSocialMedia: tratar(valores[dailyHoursSocialMediaIndex]),
            dailyHoursWork: tratar(valores[dailyHoursWorkIndex]),
            dailyHoursEntertainment: tratar(valores[dailyHoursEntertainmentIndex]),
            dailyHoursGaming: tratar(valores[dailyHoursGamingIndex]),
            dailyHoursPhysicalActivity: tratar(valores[dailyHoursPhysicalActivityIndex]),
            DaysPhysicalActivity: tratar(valores[DaysPhysicalActivityIndex]),
            DailyMinutesMindfulness: tratar(valores[DailyMinutesMindfulnessIndex]),
            DailyHoursNetflix: tratar(valores[DailyHoursNetflixIndex]),
        },
        healthIndicators: {
            healthyDiet: tratar(valores[healthyDietIndex]),
            bloodPressure: tratar(valores[bloodPressureIndex]),
            heartRate: tratar(valores[heartRateIndex]),
            weigthCategory: tratar(valores[weigthCategoryIndex]),
            sleepQuality: tratar(valores[sleepQualityIndex]),
            dailyCaffeineIntakeMg: tratar(valores[dailyCaffeineIntakeMgIndex]),
            MentalHealthIndicators: {
                MentalHealthLevel: tratar(valores[MentalHealthLevelIndex]),
                MentalHealthLevelMood: tratar(valores[MentalHealthLevelMoodIndex]),
                MentalHealthLevelStress: tratar(valores[MentalHealthLevelStressIndex]),
                MentalHealthLevelAnxiety: tratar(valores[MentalHealthLevelAnxietyIndex]),
                MentalHealthLevelDepression: tratar(valores[MentalHealthLevelDepressionIndex]),
                IndicationOfTherapy: tratar(valores[IndicationOfTherapyIndex]),
                MentalHealthyPossibleRisk: tratar(valores[MentalHealthyPossibleRiskIndex]),
                LevelOfAddictionInSocialNetworks: tratar(valores[LevelOfAddictionInSocialNetworksIndex])
            }
        }
    };

    return obj;
}
module.exports = parseLinhaParaUser;
