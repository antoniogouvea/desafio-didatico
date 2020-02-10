const ContaService = require('../services/conta.service');
const contaService = new ContaService()

class ContaController {
    constructor() {

    }
    async recuperaSaldo(numeroConta) {
        let query = {
            conta: numeroConta
        }
        return await contaService.getSaldo(query)
    }
    async getSaldo(conta) {
        try {

            let retorno = await this.recuperaSaldo(conta)
            if (retorno != null)
                return retorno.saldo

            let error = {
                message: "Conta não encontrada"
            }
            throw new Error(error.message)

        } catch (error) {
            throw new Error(error.message)
        }
    }
    async removeSaldo(conta, valor) {
        try {
            let saldo = await this.recuperaSaldo(conta)
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
            let error
            let saldo = await this.recuperaSaldo(conta)
            if (saldo != null) {
                if (valor > 0) {
                    let novoSaldo = saldo.saldo + valor
                    let where = `{"conta":${conta}}`
                    let fields = `{"saldo":${novoSaldo}}`
                    where = JSON.parse(where)
                    fields = JSON.parse(fields)
                    console.log(where, fields)
                    let retorno = await contaService.atualizarSaldo(where, fields)
                    return retorno
                } else {
                    error = {
                        message: "Valor negativo"
                    }
                }
            } else {
                error = {
                    message: "Conta não encontrada"
                }

            }

            throw new Error(error.message)


        } catch (error) {
            throw new Error(error.message)

        }

    }
}
module.exports = ContaController