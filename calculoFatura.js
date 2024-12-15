const { formatarMoeda } = require('./utils'); 
const Repositorio = require('./repositorio');

class ServicoCalculoFatura {
  constructor(repo) {
    this.repo = repo; 
  }

  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia") 
        creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(apresentacoes) {
    let creditosTotais = 0;
    for (let apre of apresentacoes) {
        creditosTotais += this.calcularCredito(apre);
    }
    return creditosTotais;
  }

  calcularTotalApresentacao(apre) {
    const peca = this.repo.getPeca(apre); 
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

  calcularTotalFatura(apresentacoes) {
    let totalFatura = 0;
    for (let apre of apresentacoes) {
        totalFatura += this.calcularTotalApresentacao(apre);
    }
    return totalFatura;
  }
}

module.exports = ServicoCalculoFatura;
