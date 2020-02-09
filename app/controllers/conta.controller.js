const ContaService = require('../services/conta.service');
const contaService = new ContaService()
class PlanetController {
    constructor() {}

    async getSaldo(req, res) {
        try {
            let conta = req.params.conta
            let retorno = await recuperaSaldo(conta)
            if (retorno != null)
                res.status(200).json(retorno)

            res.status(404).send('Conta Não encontrada')

        } catch (error) {
            res.status(400).send(error)

        }
    }
    async removeSaldo(req, res) {
        try {
            let data = req.body
            let conta = await recuperaSaldo(data.conta)
            if(conta.saldo < data.valor){
                return res.status(200).json('Saldo insuficiente')
            }
            let novoSaldo = conta.saldo - data.valor
            let { where = `{"numeroConta":${conta.numeroConta}}`, fields = `{"saldo":${novoSaldo}}`} = req.query
            where = JSON.parse(where)
            fields = JSON.parse(fields)
            let retorno = await contaService.atualizarSaldo(where, fields)
            res.status(200).json(`O saldo foi atualizado para : R$ ${retorno.saldo},00`)
        } catch (error) {
            res.status(400).send(error)

        }
    }
    async insertSaldo(req, res) {
        try {
            let data = req.body
            let conta = await recuperaSaldo(data.conta)
            let novoSaldo = conta.saldo + data.valor
            let {
                where = `{"numeroConta":${conta.numeroConta}}`, fields = `{"saldo":${novoSaldo}}`
            } = req.query
            where = JSON.parse(where)
            fields = JSON.parse(fields)
            let retorno = await contaService.atualizarSaldo(where, fields)
            res.status(200).json(`O saldo foi atualizado para : R$ ${retorno.saldo},00`)
        } catch (error) {
            res.status(400).send(error)

        }

    }
}
const recuperaSaldo = async (numeroConta) => {
    let query = {
        numeroConta: numeroConta
    }
    return await contaService.getSaldo(query)
}
module.exports = PlanetController