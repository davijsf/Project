const fs = require("fs");
const User = require("./tdus/User");
const carregarJson = require("./loadJson");

function atualizarUsuario(id, novosDados, bst, filePath) {
    const dados = carregarJson(filePath);
    const index = dados.findIndex(u => u.id === id);

    if(index === -1) {
        console.log("Usuário não encontrado!");
        return;
    }

    dados[index] = { ...dados[index], ...novosDados };

    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), "utf-8");

    bst.remove(id);
    const usuarioAtualizado = new User(dados[index]);
    bst.insert(usuarioAtualizado);

    console.log("Usuário atualizado com sucesso!");
}

module.exports = atualizarUsuario;