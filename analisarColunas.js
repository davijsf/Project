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
    function correlacaoPearson(x,y){
        const n = x.length;
        const mediaX = x.reduce((a,b) => a + b, 0) / n;
        const mediaY = y.reduce((a,b) => a + b, 0) / n;

        let numerador =0;
        let denomX = 0;
        let denomY =0;

        for (let i = 0; i<n; i++){
            const dx = x[i] - mediaX;
            const dy = y[i] - mediaY;
            numerador += dx *dy;
            denomX += dx * dx;
            denomY += dy * dy;
        }
        return numerador / Math.sqrt(denomX * denomY);
    }

    function classificarCorrelacao(r){
        const absR = Math.abs(r);
        if(absR < 0.1) return "nula";
        if(absR < 0.35) return "fraca";
        if(absR < 0.65) return "media";
        if(absR < 0.95) return "forte";
        if(absR < 0.99) return "muito forte";
        if(absR >= 0.99) return "perfeita";
        return "nula";
    }

    function analisarCorrelacao(userRecords, coluna){
        const x = userRecords.map(user => getNestedValue(user, coluna));
        const y = userRecords.map(user => getNestedValue(user, "PerformanceWrittenTest"));   

        const paresValidos = x
            .map((valor, i) => ({x: valor, y: y[i]}))
            .filter(par => typeof par.x === "number" && !isNaN(par.x) && typeof par.y === "number" && !isNaN(par.y));

        if(paresValidos.length === 0){
            console.log("não foi possivel calcular a correlação.");
            return;
        }

        const xValidos = paresValidos.map(par =>par.x);
        const yValidos = paresValidos.map(par => par.y);

        const r = correlacaoPearson(xValidos, yValidos);
        const classificacao = classificarCorrelacao(r);
        console.log(`Coeficiente de correlação de pearson entre "${coluna}" e "performanceWhittenTest": ${r.toFixed(4)}`);
        console.log(`classificação da correlação: ${classificacao}` );
    }
module.exports = {analisarColuna, analisarCorrelacao};