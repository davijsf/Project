const BinarySearchTree = require("./BinarySearchTree");
const carregarJson = require("./loadJson");
const user = require("./tdus/User");
const criarUserRecords = require("./createUserRecords");
const bst = new BinarySearchTree();
const filePath = "./file.json";
const dados = carregarJson(filePath);
const userRecords = criarUserRecords(dados);
userRecords.forEach(user => bst.insert(user))


function buscarUsuariosPorNome(userRecords, termo){
   return userRecords.filter(
    user => user.name && user.name.toLowerCase().includes(termo.toLowerCase())
)};

function buscarPorId(userRecords, id){
    return userRecords.find(user => user.id === id);
}
module.exports = buscarPorId;
module.exports= buscarUsuariosPorNome;