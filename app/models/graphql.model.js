let { buildSchema } = require('graphql');
const ContaController = require('../controllers/conta.controller');
const contaController = new ContaController

var schema = buildSchema(`
    type Query {
        consultaSaldo(conta:String): String
    }
    type Message {
        conta: String
        saldo: String
      }
    type Mutation{
        depositar(conta: String, valor: Int) : Message
        sacar(conta: String, valor: Int) : Message

    }
    
`);
var root = {
    consultaSaldo: async (conta) => {
        let saldo = await contaController.getSaldo(conta.conta)
        return saldo
    },
    depositar: async ({ conta, valor }) => {
        let saldo = await contaController.insertSaldo(conta, valor)
        console.log(saldo)
        return conta, saldo
    },
    sacar: async ({ conta, valor }) => {
        let saldo = await contaController.removeSaldo(conta, valor)
        return conta, saldo
    }
};
module.exports = {
    schema,
    root
};