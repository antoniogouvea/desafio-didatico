const contaModel = require('../models/conta.model')
class ContaService {
    constructor() {

    }
     getSaldo(data) {
        return contaModel.findOne(data)
    }

     atualizarSaldo(query, fields) {
        return contaModel.findOneAndUpdate(query, fields,{
            new:true
        })
    }
}

module.exports = ContaService