const {analisarColuna} = require("./analisarColunas");

async function analisarColunaMenu(userRecords, perguntar) {
    const opcoes = [
        "Idade (age)",
        "Status de Relacionamento (relationshipStatus)",
        "Nível de Estudo (studyLevel)",
        "Status do Trabalho (job.jobStatus)",
        "Nome do Trabalho (job.jobName)",
        "Categoria de Peso (healthIndicators.weigthCategory)",
        "Qualidade do Sono (healthIndicators.sleepQuality)"
    ];

    console.log("\n---- COLUNAS DISPONÍVEIS PARA ANÁLISE ----");
    opcoes.forEach((opcao, index) => {
        console.log(`${index + 1}. ${opcao}`);
    });

    const escolha = await perguntar("\nDigite o número da coluna: ");
    const indice = parseInt(escolha) - 1;

    if (indice < 0 || indice >= opcoes.length) {
        console.log("Opção inválida!");
        return;
    }

    const caminhoColuna = [
        "age",
        "relationshipStatus",
        "studyLevel",
        "job.jobStatus",
        "job.jobName",
        "healthIndicators.weigthCategory",
        "healthIndicators.sleepQuality"
    ][indice];

    analisarColuna(userRecords, caminhoColuna);
}
module.exports = analisarColunaMenu;