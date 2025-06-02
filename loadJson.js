const fs = require("fs");

function carregarJson(caminho) {
    const dados = fs.readFileSync(caminho, "utf-8");
    return JSON.parse(dados);
}

module.exports = carregarJson;
