const contaModel = require('../models/conta.model')
class ContaService {
    constructor() {

    }
     getSaldo(data) {
        return contaModel.findOne(data)
    }

     atualizarSaldo(query, fields) {

        let teste = contaModel.findOneAndUpdate(query, fields,{
            new:true
        })
        // console.log(teste)
        return teste

    }
}

module.exports = ContaService