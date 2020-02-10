const ContaService = require('../services/conta.service');
const contaService = new ContaService()
class PlanetController {
    constructor() {}

    async getSaldo(conta) {
        try {
            let retorno = await recuperaSaldo(conta)
            if (retorno != null)
                return retorno.saldo
                let error = {
                    message: "Conta não encontrada"
                }

                throw new Error(error.message)

        } catch (error) {
            throw new Error(error)

        }
    }
    async removeSaldo(conta, valor) {
        try {
            let saldo = await recuperaSaldo(conta)
            if (saldo.saldo < valor) {
                let erro = {
                    message: 'Saldo insuficiente'
                }
                throw new Error(erro.message)
            }
            let novoSaldo = saldo.saldo - valor
            let where = `{"conta":${conta}}`
            let fields = `{"saldo":${novoSaldo}}`
            where = JSON.parse(where)
            fields = JSON.parse(fields)
            let retorno = await contaService.atualizarSaldo(where, fields)
            return retorno
        } catch (error) {
            throw new Error(error)

        }
    }
    async insertSaldo(conta, valor) {
        try {
            let saldo = await recuperaSaldo(conta)
            let novoSaldo = saldo.saldo + valor
            let where = `{"conta":${conta}}`
            let fields = `{"saldo":${novoSaldo}}`
            where = JSON.parse(where)
            fields = JSON.parse(fields)
            let retorno = await contaService.atualizarSaldo(where, fields)
            return retorno
        } catch (error) {
            throw new Error(error)

        }

    }
}
const recuperaSaldo = async (numeroConta) => {
    let query = {
        conta: numeroConta
    }
    return await contaService.getSaldo(query)
}
module.exports = PlanetController