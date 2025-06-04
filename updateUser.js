const fs = require("fs");
const User = require("./tdus/User");
const carregarJson = require("./loadJson");

// Função de merge profundo
function mergeDeep(target, source) {
    for (const key in source) {
        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
        ) {
            if (!target[key]) target[key] = {};
            mergeDeep(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

function atualizarUsuario(id, novosDados, bst, filePath) {
    const dados = carregarJson(filePath);
    id = `user_${id}`;
    const index = dados.findIndex(u => u.id === id); // pode comparar string com int

    if (index === -1) {
        console.log("Usuário não encontrado!");
        return;
    }

    // Merge profundo dos dados
    const usuarioOriginal = dados[index];
    const usuarioAtualizado = mergeDeep({ ...usuarioOriginal }, novosDados);
    dados[index] = usuarioAtualizado;

    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), "utf-8");

    bst.remove(id);
    const usuarioBST = new User(usuarioAtualizado);
    bst.insert(usuarioBST);

    console.log("Usuário atualizado com sucesso!");
}

module.exports = atualizarUsuario;
