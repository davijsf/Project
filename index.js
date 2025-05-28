const fs = require('node:fs');
const parseLinhaParaUser = require('./parser'); // importa a função do parser
const carregarJson = require("./loadJson");
const criarUserRecords = require("./createUserRecords");



fs.readFile('./TASK-BCC-LP1-2025.1-N2.csv', 'utf8', (err, dados) => {
    if(err) {
        console.log(err);
        return;
    }

    const linhas = dados.trim().split('\n');
    const cabecalhos = linhas[0].split(',');
    
    const jsonLikeUserList = linhas.slice(1).map(linha => {
        const valores = linha.split(',');
        return parseLinhaParaUser(cabecalhos, valores);
    });
    
    fs.writeFile('file.json', JSON.stringify(jsonLikeUserList, null, 2), 'utf8', (err) => {
        if(err) {
            console.error("Erro ao salvar JSON:", err);
        } else {
            console.log("Arquivo JSON salvo com sucesso!");

            const jsonLikeUserList = carregarJson("file.json");
            const userRecords = criarUserRecords(jsonLikeUserList);
            console.log(userRecords[0]);
        }
    });
});


