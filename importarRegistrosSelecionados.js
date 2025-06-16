const fs = require("fs");
const path = require("path");
const criarUserRecords = require("./createUserRecords");

async function importarRegistrosSelecionados(perguntar) {
    const pasta = path.join(__dirname, "records");

    if (!fs.existsSync(pasta)) {
        console.log("A pasta 'records' não existe.");
        return [];
    }

    const arquivos = fs.readdirSync(pasta).filter(arquivo => arquivo.startsWith("Records") && arquivo.endsWith(".json"));

    if (arquivos.length === 0) {
        console.log("Nenhum arquivo de registros encontrado.");
        return [];
    }

    console.log("Arquivos disponíveis:");
    arquivos.forEach((arq, i) => console.log(`${i + 1}. ${arq}`));

    const opcao = await perguntar("Escolha o número do arquivo: ");
    const index = parseInt(opcao) - 1;

    if (index < 0 || index >= arquivos.length) {
        console.log("Opção inválida.");
        return [];
    }

    const caminho = path.join(pasta, arquivos[index]);
    const conteudo = fs.readFileSync(caminho, "utf-8");
    const dados = JSON.parse(conteudo);

    console.log(`Arquivo importado: ${arquivos[index]}`);
    return criarUserRecords(dados);
}

module.exports = importarRegistrosSelecionados;
