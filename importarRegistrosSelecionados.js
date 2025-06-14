const fs = require("fs");
const path = require("path");
const criarUserRecords = require("./createUserRecords");

async function importarRegistrosSelecionados(perguntar) {
    const recordsPath = path.join(__dirname, "records");

    if (!fs.existsSync(recordsPath)) {
        console.log("Pasta de registros não encontrada.");
        return [];
    }

    const arquivos = fs.readdirSync(recordsPath).filter(nome => {
        const fullPath = path.join(recordsPath, nome);
        return fs.statSync(fullPath).isFile() && nome.endsWith(".json");
    });

    if (arquivos.length === 0) {
        console.log("Nenhum arquivo de registro encontrado.");
        return [];
    }

    console.log("\nArquivos disponíveis para importação:");
    arquivos.forEach((nome, idx) => console.log(`${idx + 1}. ${nome}`));

    const escolha = await perguntar("Digite o número do arquivo que deseja importar: ");
    const indice = parseInt(escolha) - 1;

    if (indice < 0 || indice >= arquivos.length) {
        console.log("Opção inválida.");
        return [];
    }

    const arquivoEscolhido = path.join(recordsPath, arquivos[indice]);
    const conteudo = fs.readFileSync(arquivoEscolhido, "utf-8");
    const dados = JSON.parse(conteudo);

    console.log(`Importando do arquivo: ${arquivos[indice]}`);
    return criarUserRecords(dados);
}

module.exports = importarRegistrosSelecionados;
