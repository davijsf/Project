const fs = require("fs");
const readline = require("readline");

const carregarJson = require("./loadJson");
const criarUserRecords = require("./createUserRecords");
const BinarySearchTree = require("./BinarySearchTree");
const adicionarUsuario = require("./addUser");
const removeUserById = require("./removeUser");
const atualizarUsuario = require("./updateUser");
const exportarRegistros = require("./exportarRegistros");
const importarRegistros = require("./importarRegistros");
const importarRegistrosSelecionados = require("./importarRegistrosSelecionados");
const { buscarPorId, buscarUsuariosPorNome } = require("./buscaUser");
const analisarColunaMenu = require("./analisarColunaMenu");
const {analisarColuna, analisarCorrelacao} = require("./analisarColunas");

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
        console.log("------- MENU DE OPÇÕES -------");
        console.log("1. Adicionar usuário");
        console.log("2. Remover usuário pelo ID");
        console.log("3. Buscar usuário pelo nome");
        console.log("4. Atualizar usuário");
        console.log("5. Buscar usuário pelo ID");
        console.log("6. Importar registros (arquivo mais recente)");
        console.log("7. Exportar registros");
        console.log("8. Importar registros (escolher arquivo)");
        console.log("9. Analisar coluna dos dados.");
        console.log("10. Calcular correlação de coluna");
        console.log("0. Sair");
        
        opcao = await perguntar("Escolha uma opção: ");
        
        let novosDadosJson;
        
        switch (opcao) {
            
            case "1":
                await adicionarUsuario(bst, perguntar);
                novosDadosJson = carregarJson(filePath);
                userRecords.length = 0;
                userRecords.push(...criarUserRecords(novosDadosJson));
                break;

                case "2":
                    const idRemover = await perguntar("Digite o ID do usuário: ");
                    await removeUserById(idRemover, bst, filePath);

                    // Recarrega JSON e reconstrói tudo
                novosDadosJson = carregarJson(filePath);
                userRecords.length = 0;
                userRecords.push(...criarUserRecords(novosDadosJson));

                bst.root = null;
                userRecords.forEach(user => bst.insert(user));
                break;

            case "3":
                const termoBusca = await perguntar("Digite o nome do usuário: ");
                const resultados = buscarUsuariosPorNome(userRecords, termoBusca);

                if (resultados.length === 0) {
                    console.log("Nenhum usuário encontrado.");
                    break;
                } else {
                    console.log("Resultados encontrados:");
                    resultados.slice(0, 3).forEach((user, idx) => {
                        console.log(`${idx + 1}. Nome: ${user.name}, ID: ${user.id}`);
                    });

                    const desejaAcao = await perguntar("Deseja remover ou atualizar algum desses usuários? (s/n): ");
                    if (desejaAcao.trim().toLowerCase() === "s") {
                        const idSelecionado = await perguntar("Digite o ID do usuário: ");
                        const acao = await perguntar("Digite 'remover' ou 'atualizar': ");

                        if (acao.trim().toLowerCase() === "remover") {
                            await removeUserById(idSelecionado, bst, filePath);
                            novosDadosJson = carregarJson(filePath);
                            userRecords.length = 0;
                            userRecords.push(...criarUserRecords(novosDadosJson));
                            break;

                        } else if (acao.trim().toLowerCase() === "atualizar") {
                            global.idParaAtualizar = idSelecionado;
                        } else {
                            console.log("Ação inválida.");
                            break;
                        }
                    } else {
                        break;
                    }
                }
                break;

            case "4":
                let idAtualizar;
                if (global.idParaAtualizar) {
                    idAtualizar = global.idParaAtualizar;
                    delete global.idParaAtualizar;
                } else {
                    idAtualizar = await perguntar("Digite o ID do usuário a atualizar: ");
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
                    novosDados.studyLevel = await perguntar("Digite seu nível de estudo: ");
                    novosDados.studyLevelParents = await perguntar("Digite o nível de estudo dos pais: ");
                    novosDados.extracurricularTasks = await perguntar("Digite suas tarefas extracurriculares: ");

                } else if (op === "3") {
                    novosDados.tracking = {
                        dailyHoursScreen: parseFloat(await perguntar("Horas de tela por dia: ")),
                        dailyHoursStudy: parseFloat(await perguntar("Horas de estudo por dia: ")),
                        dailyHoursPhone: parseFloat(await perguntar("Horas no celular: ")),
                        dailyHoursLaptop: parseFloat(await perguntar("Horas no notebook: ")),
                        dailyHoursTabletdailyHoursTV: parseFloat(await perguntar("Horas no tablet/TV: ")),
                        dailyHoursSocialMedia: parseFloat(await perguntar("Horas em redes sociais: ")),
                        dailyHoursWork: parseFloat(await perguntar("Horas de trabalho: ")),
                        dailyHoursEntertainment: parseFloat(await perguntar("Horas de entretenimento: ")),
                        dailyHoursGaming: parseFloat(await perguntar("Horas jogando videogame: ")),
                        dailyHoursPhysicalActivity: parseFloat(await perguntar("Horas de atividade física: ")),
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
                        healthyDiet: parseInt(await perguntar("Segue uma alimentação saudável? (1-Sim, 0-Não): ")),
                        bloodPressure: await perguntar("Pressão arterial: "),
                        heartRate: parseInt(await perguntar("Frequência cardíaca: ")),
                        weigthCategory: await perguntar("Categoria de peso: "),
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
                novosDadosJson = carregarJson(filePath);
                userRecords.length = 0;
                userRecords.push(...criarUserRecords(novosDadosJson));
                break;

            case "5":
                const term = await perguntar("Digite o ID: ");
                const result = buscarPorId(userRecords, term.trim());
                if (!result) {
                    console.log("Nenhum usuário encontrado.");
                } else {
                    console.log(result);
                }
                break;

            case "6":
                userRecords.length = 0;
                const novos = importarRegistros();
                userRecords.push(...novos);
                break;

            case "7":
                exportarRegistros(userRecords);
                break;

            case "8":
                userRecords.length = 0;
                const selecionados = await importarRegistrosSelecionados(perguntar);
                userRecords.push(...selecionados);
                break;

            case "9":
                await analisarColunaMenu(userRecords, perguntar);
                break;

            
                case "10":
                    const coluna = await perguntar("digite o nome da coluna numérica para correlaciona: ");
                    analisarCorrelacao(userRecords, coluna);

                break;
            case "0":
                console.log("Saindo...");
                break;

            default:
                console.log("Opção inválida!");
        }

        if (opcao !== "0") {
            await perguntar("Pressione ENTER para continuar...");
            console.clear();
        }

    } while (opcao !== "0");

    rl.close();
}

main();
