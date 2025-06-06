const fs = require("fs");
const readline = require("readline");

const carregarJson = require("./loadJson");
const criarUserRecords = require("./createUserRecords");
const BinarySearchTree = require("./BinarySearchTree");
const adicionarUsuario = require("./addUser");
const removeUserById = require("./removeUser");
const atualizarUsuario = require("./updateUser");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = "./file.json";
const bst = new BinarySearchTree();
const dados = carregarJson(filePath);
const userRecords = criarUserRecords(dados);
userRecords.forEach(user => bst.insert(user));

function perguntar(msg) {
    return new Promise(resolve => rl.question(msg, resolve));
}

async function main() {
    let opcao;

    do {
        console.clear();
        console.log("------- MENU DE OPÇÕES -------");
        console.log("1. Adicionar usuário");
        console.log("2. Remover usuário pelo ID");
        console.log("3. Atualizar usuário");
        console.log("4. buscar usuário pelo nome");
        console.log("0. Sair");

        opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await adicionarUsuario(bst, perguntar);
                break;

            case "2":
                const id = await perguntar("Digite o ID do usuário: ");
                await removeUserById(id, bst, filePath); 
                break;

                
                case "4":
                const termoBusca = await perguntar("Digite o nome do usuário:")
                const resultados = buscarUsuariosPorNome(userRecords, termoBusca);
                
                if(resultados.length === 0){
                    console.log("Nenhum usuário encontrado.");
                    break;
                }else{
                    console.log("Resultados encontrados:");
                    resultados.slice(0, 3).forEach((user, idx) => {
                        console.log(`${idx + 1}. Nome: ${user.name}, ID: ${user.id}`);
                    })
                }
                const desejaAcao = await perguntar("Deseja remover ou atualizar algum desses usuários? (s/n):");
                if(desejaAcao.trim().toLowerCase() === "s"){
                    const idSelecionado = await perguntar("Digite o ID do usuário:");
                    const acao = await perguntar("digite 'remover' ou 'atualizar':");

                    if(acao.trim().toLowerCase() === "remover"){
                        await removeUserById(idSelecionado, bst, filePath);
                        break;

                    }else if(acao.trim().toLowerCase() === "atualizar"){
                        global.idParaAtualizar = idSelecionado;

                    }else{
                        console.log("Ação inválida");
                        break;
                    }
                    console.clear();
                }

                
                case "3":
                    let idAtualizar;
                    if(global.idParaAtualizar){
                        idAtualizar = global.idParaAtualizar;
                        delete global.idParaAtualizar;
                    }else{
                        idAtualizar = await perguntar("Digite o ID do usuário a atualizar:");
                    }
                    console.clear();
                    console.log("\n---- O que deseja atualizar? ---- ");
                    console.log("1. Dados pessoais (IDADE, STATUS DE RELACIONAMENTO)");
                    console.log("2. Dados vocacionais");
                    console.log("3. Registros de Tracking");
                    console.log("4. Dados de trabalho");
                    console.log("5. Dados de saúde");
                    console.log("6. Dados de saúde mental");
                    
                const op = await perguntar("Escolha uma opção: ");
                let novosDados = {};
                
                if (op === "1") {
                    const newAge = await perguntar("Digite a nova idade: ");
                    const newStatusRelationship = await perguntar("Digite seu novo status de relacionamento: ");
                    novosDados.age = parseInt(newAge);
                    novosDados.relationshipStatus = newStatusRelationship;
                    
                } else if (op === "2") {
                    const newStudyLevel = await perguntar("Digite seu nível de estudo: ");
                    const newStudyLevelParents = await perguntar("Digite o nível de estudo dos pais: ");
                    const newExtracurricularTasks = await perguntar("Digite suas tarefas extracurriculares: ");
                    novosDados.studyLevel = newStudyLevel;
                    novosDados.studyLevelParents = newStudyLevelParents;
                    novosDados.extracurricularTasks = newExtracurricularTasks;
                    
                } else if (op === "3") {
                    novosDados.tracking = {
                        dailyHoursScreen: parseFloat(await perguntar("Horas de tela por dia: ")),
                        dailyHoursStudy: parseFloat(await perguntar("Horas de estudo por dia: ")),
                        dailyHoursPhone: parseFloat(await perguntar("Horas no celular: ")),
                        dailyHoursLaptop: parseFloat(await perguntar("Horas no notebook: ")),
                        dailyHoursTabletdailyHoursTV: parseFloat(await perguntar("Horas no tablet/TV: ")),
                        dailyHoursSocialMedia: parseFloat(await perguntar("Horas em redes sociais: ")),
                        dailyHoursWork: parseFloat(await perguntar("Horas de trabalho: ")),
                        dailyHoursEntertainment: parseFloat(await perguntar("Horas de entretenimento (ex: YouTube, filmes): ")),
                        dailyHoursGaming: parseFloat(await perguntar("Horas jogando videogame: ")),
                        dailyHoursPhysicalActivity: parseFloat(await perguntar("Horas de atividade física por dia: ")),
                        daysPhysicalActivity: parseInt(await perguntar("Dias por semana de atividade física: ")),
                        dailyMinutesMindfulness: parseFloat(await perguntar("Minutos de meditação por dia: ")),
                        dailyHoursNetflix: parseFloat(await perguntar("Horas de Netflix por dia: "))
                    };
                    
                } else if (op === "4") {
                    novosDados.job = {
                        jobName: await perguntar("Digite o nome do trabalho: "),
                        jobStatus: await perguntar("Digite o status do trabalho: "),
                        jobEnvironment: await perguntar("Ambiente de trabalho: "),
                        jobProductivity: await perguntar("Produtividade no trabalho: ")
                    };
                    
                } else if (op === "5") {
                    novosDados.healthIndicators = {
                        healthyDiet: parseInt(await perguntar("Segue uma alimentação saudável? (1 - Sim, 0 - Não): ")),
                        bloodPressure: await perguntar("Pressão arterial (ex: 120/80): "),
                        heartRate: parseInt(await perguntar("Frequência cardíaca em repouso (bpm): ")),
                        weigthCategory: await perguntar("Categoria de peso (ex: normal, sobrepeso): "),
                        sleepQuality: parseInt(await perguntar("Qualidade do sono (1 a 10): ")),
                        dailyCaffeineIntakeMg: parseFloat(await perguntar("Mg de cafeína por dia: "))
                    };
                    
                } else if (op === "6") {
                    novosDados.mentalHealth = {
                        stressLevel: parseInt(await perguntar("Nível de estresse (1 a 10): ")),
                        anxietyLevel: parseInt(await perguntar("Nível de ansiedade (1 a 10): ")),
                        depressionLevel: parseInt(await perguntar("Nível de depressão (1 a 10): ")),
                        hasTherapy: await perguntar("Está fazendo terapia? (Sim/Não): "),
                        sleepDisorder: await perguntar("Possui distúrbio de sono? (Sim/Não): ")
                    };
                }
                
                await atualizarUsuario(idAtualizar, novosDados, bst, filePath);
                break;

                case "0":
                    console.log("Saindo...");
                    break;

                default:
                    console.log("Opção inválida!");
                }
                
    } while (opcao !== "0");
    
    rl.close();
}

main();
function buscarUsuariosPorNome(userRecords, termo){
   return userRecords.filter(
    user => user.name && user.name.toLowerCase().includes(termo.toLowerCase())
);
}