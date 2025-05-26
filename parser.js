function parseLinhaParaUser(cabecalhos, valores) {

    for(let i = 0; i < cabecalhos.length; i++) {
        const chave = cabecalhos[i].trim();
        let valor = valores[i]?.trim() ?? "";

        // Conversões básicas:
        if(!isNaN(valor) && valor !== "") {
            valor = Number(valor);
        } else if(valor.toLowerCase() === "true" || valor.toLowerCase() === "Yes") {
            valor = true;
        } else if(valor.toLowerCase() === "false" || valor.toLowerCase() === "No") {
            valor = false;
        } else if(/\d{4}-\d{2}-\d{2}/.test(valor)) {
            valor = new Date(valor);
        }

        if(valor === "") {
            valor = null;
        }

        if(typeof valor === "string") {
            valor = valor.replace(/^"|"$/g, '');
        }

        let obj = {
            id: valores[idIndex],
            name: valores[nameIndex],
            gender: valores[genderIndex],
            age: Number(valores[ageIndex]),
            relationshipStatus: valores[relatioshipStatusIndex],
            addressType: valores[addressTypeIndex],
            MostUsedSocialPlatform: valores[MostUsedSocialPlatformIndex],
            PerformanceWrittenTest: valores[PerformanceWrittenTestIndex],
            // outros campos simples
            job: {
                jobName: valores[jobNameIndex],
                jobStatus: valores[jobStatusIndex],
                jobEnvironment: valores[jobEnvironmentIndex],
                jobProductivity: Number(valores[jobProductivityIndex])
            },
            healthIndicators: {
                healthyDiet: valores[healthyDietIndex],
                bloodPressure: valores[bloodPressureIndex],
                heartRate: Number(valores[heartRateIndex]),
                weigthCategory: valores[weigthCategoryIndex],
                sleepQuality: valores[sleepQualityIndex],
                dailyCaffeineIntakeMg: Number(valores[dailyCaffeineIntakeMgIndex]),
                MentalHealthIndicators: valores[MentalHealthIndicatorsIndex]
            },
        }
    }

    return obj;
}

module.exports = parseLinhaParaUser;
