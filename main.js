const fs = require("fs");
const readline = require("readline");

const carregarJson = require("./loadJson");
const criarUserRecords = require("./createUserRecords");
const BinarySearchTree = require("./BinarySearchTree");
const adicionarUsuario = require("./addUser");
const removeUserById = require("./removeUser");

const uptadeUser = require("./updateUser");
const atualizarUsuario = require("./updateUser");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = "./file.json";
const bst = new BinarySearchTree();
const dados = carregarJson(filePath);
const userRecords = criarUserRecords(dados);
userRecords.forEach(user => bst.insert(user));

// Função para perguntar
function perguntar(msg) {
    return new Promise(resolve => rl.question(msg, resolve));
}

// Menu principal
async function main() {
    let opcao;

    do {
        console.log("------- MENU DE OPÇÕES -------");
        console.log("1. Adicionar usuário");
        console.log("2. Remover usuário pelo ID");
        console.log("3. Atualizar usuário");
        console.log("0. Sair");

        opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await adicionarUsuario(bst, perguntar);
                break;

            case "2":
                const id = await perguntar("Digite o ID do usuário: ");
                await removeUserById(id, bst, filePath); 
                break;

            case "3":
                let op;
                const novosDados = {};

                console.log("\n---- O que deseja atualizar? ---- ");
                console.log("1. Dados pessoais (IDADE, STATUS DE RELACIONAMENTO)");
                console.log("2. Registros de Tracking");
                console.log("3. Dados vocacionais");
                console.log("4. Dados de trabalho");
                console.log("5. Dados de saúde");
                console.log("6. Dados de saúde mental");

                const idAtualizar = await perguntar("Digite o ID do usuário a atualizar: ");
                op = await perguntar("Escolha uma opção: ");

                if(op == 1) {
                    const newAge = await perguntar("Digite a nova idade: ");
                    const newStatusRelationship = await perguntar("Digite seu novo status de relacionamento: ");
                    novosDados.age = newAge;
                    novosDados.StatusRelationship = newStatusRelationship;
                    atualizarUsuario(idAtualizar, novosDados, bst, filePath);
                    novosDados = {};
                } else if(op == 2) {
                    
                }


            case "0":
                console.log("Saindo...");
                break;

            default:
                console.log("Opção inválida!");
        }

    } while (opcao !== "0");

    rl.close();
}

main();
