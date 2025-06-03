const fs = require("fs");
const createUserRecords = require("./createUserRecords");

async function removeUserById(id, bst, filePath) {
    id = `user_${id}` // Mudanca do id digitado (apenas o numero) para user_id | json é escrito como user_id
    const dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = dados.findIndex(u => u.id === id);

    if (index === -1) {
        console.log("❌ Usuário não encontrado no JSON.");
        return;
    }

    // Remove do array e regrava o arquivo
    dados.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), "utf-8");
    console.log("✅ Usuário removido do arquivo JSON.");

    bst.remove(id);
    console.log("✅ Usuário removido da árvore.");
}

module.exports = removeUserById;
