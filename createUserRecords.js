const User = require("./tdus/User");

function criarUserRecords(jsonLikeUserList) {
    return jsonLikeUserList.map(obj => new User(obj));
}

module.exports = criarUserRecords; // ✅ aqui você deve exportar a função, não um objeto ou um array direto
