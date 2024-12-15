const { readFileSync } = require('fs');
const { ServicoCalculoFatura, formatarMoeda, getPeca } = require('./calculoFatura');

// Função para gerar a fatura em formato de texto
function gerarFaturaStr(fatura, pecas, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;
    return faturaStr;
}

// Leitura dos arquivos JSON
const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));

// Criar instância da classe de cálculos
const calc = new ServicoCalculoFatura();

// Gerar e exibir a fatura
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
console.log(faturaStr);
