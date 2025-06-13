const fs = require("fs");
const path = require("path");
const criarUserRecords = require("./createUserRecords");

function importarRegistros() {
    const recordsPath = path.join(__dirname, "records");

    if (!fs.existsSync(recordsPath)) {
        console.log("Pasta de registros não encontrada.");
        return [];
    }

    // Filtrar apenas arquivos .json válidos
    const arquivos = fs.readdirSync(recordsPath).filter(nome => {
        const fullPath = path.join(recordsPath, nome);
        return fs.statSync(fullPath).isFile() && nome.endsWith(".json");
    });

    if (arquivos.length === 0) {
        console.log("Nenhum arquivo de registro encontrado para importação.");
        return [];
    }

    const maisRecente = arquivos.map(nome => ({
        nome,
        data: fs.statSync(path.join(recordsPath, nome)).mtime
    }))
    .sort((a, b) => b.data - a.data)[0];

    const caminhoCompleto = path.join(recordsPath, maisRecente.nome);
    const conteudo = fs.readFileSync(caminhoCompleto, "utf-8");
    const dados = JSON.parse(conteudo);

    console.log(`Importando do arquivo: ${maisRecente.nome}`);
    return criarUserRecords(dados);
}

module.exports = importarRegistros;
