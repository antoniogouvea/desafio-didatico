let { buildSchema } = require('graphql');
const ContaController = require('../controllers/conta.controller');
const contaController = new ContaController

var schema = buildSchema(`
    type Query {
        consultaSaldo(conta:Int): String
    }
    type Message {
        conta: Int
        saldo: Int
      }
    type Mutation{
        depositar(conta: Int, valor: Int) : Message
        sacar(conta: Int, valor: Int) : Message

    }
    
`);
var root = {
    consultaSaldo: async (conta) => {
        let saldo = await contaController.getSaldo(conta.conta)
        return saldo
    },
    depositar: async ({ conta, valor }) => {
        let saldo = await contaController.insertSaldo(conta, valor)
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