function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
}

function analisarColuna(userRecords, coluna) {
    const valores = userRecords.map(user => getNestedValue(user, coluna));

    if (valores.every(v => v === undefined)) {
        console.log(`A coluna "${coluna}" não existe.`);
        return;
    }

    const apenasValidos = valores.filter(v => v !== undefined && v !== null && v !== "");
    const todosSaoNumeros = apenasValidos.length > 0 && apenasValidos.every(v => !isNaN(parseFloat(v)));

    if (todosSaoNumeros) {
        const numeros = apenasValidos.map(Number);
        const soma = numeros.reduce((acc, n) => acc + n, 0);
        const media = soma / numeros.length;
        const comVazios = valores.map(v => (v === "" || v === undefined || v === null) ? media : Number(v));

        console.log(`\n📊 Dados numéricos da coluna "${coluna}":`);
        console.log(`🔹 Mínimo: ${Math.min(...comVazios)}`);
        console.log(`🔹 Máximo: ${Math.max(...comVazios)}`);
        console.log(`🔹 Média: ${media.toFixed(2)}`);
    } else {
        const contagem = {};
        for (const v of valores) {
            const valor = (v === "" || v === undefined || v === null) ? "(vazio)" : String(v);
            contagem[valor] = (contagem[valor] || 0) + 1;
        }

        const maisFrequente = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];

        console.log(`\n📋 Dados categóricos da coluna "${coluna}":`);
        for (const [valor, qtd] of Object.entries(contagem)) {
            console.log(`🔸 ${valor}: ${qtd}`);
        }
        console.log(`🔹 Valor mais frequente: ${maisFrequente[0]}`);
    }
}

module.exports = analisarColuna;