const fs = require("fs");
const path = require("path");
const criarUserRecords = require("./createUserRecords");

function importarRegistros() {
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

    // Pegar o mais recente com base no nome
    arquivos.sort((a, b) => {
        const timestampA = a.slice(8, -5).replace(/-/g, "");
        const timestampB = b.slice(8, -5).replace(/-/g, "");
        return timestampB.localeCompare(timestampA);
    });

    const arquivoMaisRecente = arquivos[0];
    const caminho = path.join(pasta, arquivoMaisRecente);
    const conteudo = fs.readFileSync(caminho, "utf-8");
    const dados = JSON.parse(conteudo);

    console.log(`Arquivo importado: ${arquivoMaisRecente}`);
    return criarUserRecords(dados);
}

module.exports = importarRegistros;
