const fs = require("fs");
const path = require("path");
const criarUserRecords = require("./createUserRecords");

function importarRegistros() {
    const recordsPath = path.join(__dirname, "records", "Records.json");

    if (!fs.existsSync(recordsPath)) {
        console.log("Pasta de registros não encontrada.");
        return [];
    }

    const conteudo = fs.readFileSync(recordsPath, "utf-8");
    const dados = JSON.parse(conteudo);

    console.log(`Importando do arquivo: Records.json`);
    return criarUserRecords(dados);
}

module.exports = importarRegistros;
