const fs = require("fs");
const path = require("path");

function exportarRegistros(userRecords) {
   const pasta = path.join(__dirname, "records");

   if(!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta);
   }

   const caminhoCompleto = path.join(pasta, "Records.json");

   const dadosExportar = userRecords.map(user => ({... user }));

   fs.writeFileSync(caminhoCompleto, JSON.stringify(dadosExportar, null, 2));
   console.log(`Registros exportados com sucesso para: ${caminhoCompleto}`);
}

module.exports = exportarRegistros;
