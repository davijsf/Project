const User = require("./tdus/User");

function criarUserRecords(jsonLikeUserList) {
    return jsonLikeUserList.map(obj => new User(obj));
}

module.exports = criarUserRecords;