const ContaController = require('../controllers/conta.controller');
const contaController = new ContaController()

 

module.exports = app => {

    app.get('/api/contas/:conta', contaController.getSaldo)
    app.post('/api/contas/sacar',contaController.removeSaldo)
    app.post('/api/contas/depositar',contaController.insertSaldo)

  }