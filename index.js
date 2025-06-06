const fs = require('fs');
const parseLinhaParaUser = require('./parser');
const carregarJson = require('./loadJson');
const criarUserRecords = require('./createUserRecords');
const BinarySearchTree = require('./BinarySearchTree');

const caminhoCSV = './TASK-BCC-LP1-2025.1-N2.csv';
const caminhoJSON = './file.json';

const bst = new BinarySearchTree();

fs.readFile(caminhoCSV, 'utf8', (err, dados) => {
    if (err) {
        console.error("Erro ao ler o CSV:", err);
        return;
    }

    const linhas = dados.trim().split('\n');
    const cabecalhos = linhas[0].split(',');

    const jsonLikeUserList = linhas.slice(1).map(linha => {
        const valores = linha.split(',');
        return parseLinhaParaUser(cabecalhos, valores);
    });

    fs.writeFile(caminhoJSON, JSON.stringify(jsonLikeUserList, null, 2), 'utf8', (err) => {
        if (err) {
            console.error("Erro ao salvar JSON:", err);
            return;
        }

        console.log("Arquivo JSON salvo com sucesso!");

        const dadosAtualizados = carregarJson(caminhoJSON);
        const userRecords = criarUserRecords(dadosAtualizados);

        userRecords.forEach(user => bst.insert(user));
    });
});
