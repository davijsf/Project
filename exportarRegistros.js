const fs = require("fs");
const path = require("path");

function exportarRegistros(userRecords) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:T]/g, "-").replace(/\..+/, "");
    const nomeArquivo = `Records-${timestamp}.json`;
    const pasta = path.join(__dirname, "records");

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta);
    }

    const caminhoCompleto = path.join(pasta, nomeArquivo);

    // Exportar só os dados "puros" dos objetos
    const dadosExportar = userRecords.map(user => ({ ...user }));

    fs.writeFileSync(caminhoCompleto, JSON.stringify(dadosExportar, null, 2), "utf-8");
    console.log(`Registros exportados com sucesso para: ${caminhoCompleto}`);
}

module.exports = exportarRegistros;
