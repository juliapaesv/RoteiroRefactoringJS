function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor / 100);
}

function getPeca(pecas, apre) {
    return pecas[apre.id];
}

class ServicoCalculoFatura {
    calcularCredito(pecas, apre) {
        let creditos = 0;
        creditos += Math.max(apre.audiencia - 30, 0);
        if (getPeca(pecas, apre).tipo === "comedia") 
            creditos += Math.floor(apre.audiencia / 5);
        return creditos;
    }

    calcularTotalCreditos(pecas, apresentacoes) {
        let creditosTotais = 0;
        for (let apre of apresentacoes) {
            creditosTotais += this.calcularCredito(pecas, apre);
        }
        return creditosTotais;
    }

    calcularTotalApresentacao(pecas, apre) {
        const peca = getPeca(pecas, apre); 
        let total = 0;
        switch (peca.tipo) {
            case "tragedia":
                total = 40000;
                if (apre.audiencia > 30) {
                    total += 1000 * (apre.audiencia - 30);
                }
                break;
            case "comedia":
                total = 30000;
                if (apre.audiencia > 20) {
                    total += 10000 + 500 * (apre.audiencia - 20);
                }
                total += 300 * apre.audiencia;
                break;
            default:
                throw new Error(`Peça desconhecida: ${peca.tipo}`);
        }
        return total;
    }

    calcularTotalFatura(pecas, apresentacoes) {
        let totalFatura = 0;
        for (let apre of apresentacoes) {
            totalFatura += this.calcularTotalApresentacao(pecas, apre);
        }
        return totalFatura;
    }
}

module.exports = { ServicoCalculoFatura, formatarMoeda, getPeca };
