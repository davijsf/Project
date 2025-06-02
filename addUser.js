const fs = require("fs");
const readline = require("readline");

const filePath = "./file.json";
const dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => resolve(resposta));
    });
}

async function adicionarUsuario() {
    try {
        const id = `user_${dados.length + 1}`;
        const name = await perguntar("Nome: ");
        const gender = await perguntar("Gênero: ");
        const age = parseInt(await perguntar("Idade: "));
        const relationshipStatus = await perguntar("Status de relacionamento: ");
        const addressType = await perguntar("Tipo de endereço (Urban/Rural): ");
        const MostUsedSocialPlatform = await perguntar("Plataforma mais usada: ");
        const PerformanceWrittenTest = parseFloat(await perguntar("Nota da prova escrita (ou deixe vazio para null): ")) || null;

        const job = {
            jobName: await perguntar("Nome do trabalho: "),
            jobStatus: await perguntar("Status do trabalho: "),
            jobEnvironment: await perguntar("Ambiente de trabalho: "),
            jobProductivity: parseFloat(await perguntar("Produtividade: "))
        };

        const vocationalTraining = {
            studyLevel: await perguntar("Nível de estudo: "),
            studyLevelParents: await perguntar("Nível de estudo dos pais (ou deixe vazio): ") || null,
            extracurricularTasks: (await perguntar("Faz atividades extracurriculares? (s/n): ")).toLowerCase() === 's'
        };

        const dailyHours = {
            dailyHoursStudy: parseFloat(await perguntar("Horas de estudo por dia: ")),
            dailyHoursScreen: parseFloat(await perguntar("Horas de tela por dia: ")),
            dailyHoursPhone: parseFloat(await perguntar("Horas no celular por dia: ")),
            dailyHoursLaptop: parseFloat(await perguntar("Horas no laptop por dia: ")),
            dailyHoursTabletdailyHoursTV: parseFloat(await perguntar("Horas em tablet/TV por dia: ")) || null,
            dailyHoursSocialMedia: parseFloat(await perguntar("Horas em redes sociais por dia: ")),
            dailyHoursWork: parseFloat(await perguntar("Horas de trabalho por dia: ")),
            dailyHoursEntertainment: parseFloat(await perguntar("Horas de entretenimento por dia: ")),
            dailyHoursGaming: parseFloat(await perguntar("Horas de jogos por dia: ")),
            dailyHoursPhysicalActivity: parseFloat(await perguntar("Horas de atividade física por dia: ")),
            DaysPhysicalActivity: parseInt(await perguntar("Dias de atividade física por semana: ")),
            DailyMinutesMindfulness: parseInt(await perguntar("Minutos diários de mindfulness: ")),
            DailyHoursNetflix: parseFloat(await perguntar("Horas de Netflix por dia: "))
        };

        const healthIndicators = {
            healthyDiet: parseInt(await perguntar("Dieta saudável (1 = sim, 0 = não): ")),
            bloodPressure: await perguntar("Pressão arterial: "),
            heartRate: parseInt(await perguntar("Batimentos por minuto: ")),
            weigthCategory: await perguntar("Categoria de peso (ou deixe vazio): ") || null,
            sleepQuality: parseInt(await perguntar("Qualidade do sono (0-10): ")),
            dailyCaffeineIntakeMg: parseFloat(await perguntar("Cafeína diária (mg): ")),
            MentalHealthIndicators: {
                MentalHealthLevel: parseInt(await perguntar("Nível de saúde mental: ")),
                MentalHealthLevelMood: parseInt(await perguntar("Humor (0-10): ")),
                MentalHealthLevelStress: parseInt(await perguntar("Estresse (0-10): ")),
                MentalHealthLevelAnxiety: parseInt(await perguntar("Ansiedade (0-10): ")),
                MentalHealthLevelDepression: parseInt(await perguntar("Depressão (0-10): ")),
                IndicationOfTherapy: (await perguntar("Indicação de terapia? (s/n): ")).toLowerCase() === 's',
                MentalHealthyPossibleRisk: await perguntar("Risco potencial de saúde mental: "),
                LevelOfAddictionInSocialNetworks: parseInt(await perguntar("Nível de vício em redes sociais (0-10): "))
            }
        };

        const novoUsuario = {
            id,
            name,
            gender,
            age,
            relationshipStatus,
            addressType,
            MostUsedSocialPlatform,
            PerformanceWrittenTest,
            job,
            vocationalTraining,
            dailyHours,
            healthIndicators
        };

        dados.push(novoUsuario);
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), "utf-8");

        console.log("\n✅ Novo usuário adicionado com sucesso!");
    } catch (err) {
        console.error("❌ Erro ao adicionar usuário:", err);
    } finally {
        rl.close();
    }
}

adicionarUsuario();
