const fs = require("fs");

function carregarJson(path) {
    const raw = fs.readFileSync(path);
    return JSON.parse(raw);
}

module.exports = carregarJson;