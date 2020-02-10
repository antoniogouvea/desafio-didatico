const ContaController = require('../controllers/conta.controller');
const contaController = new ContaController()
const sandbox = require('sinon').createSandbox()
const expect = require('chai').expect

afterEach(() => {
    sandbox.restore()
})

describe('Consulta de saldo', () => {
    it('consulta de saldo com conta valida', async () => {

        sandbox.stub(contaController, 'recuperaSaldo').returns({
            _id: '5e3fed47e481474fb8e8342e',
            conta: '12345',
            saldo: 50
        })
        let resposta = await contaController.getSaldo('12345')
        expect(resposta).to.be.equal(50)

    })
    it('consulta de saldo com conta invalida', async () => {
        try {
            sandbox.stub(contaController, 'recuperaSaldo').returns(null)
            let resposta = await contaController.getSaldo('54321')
        } catch (error) {
            expect(error.message).to.equal('Conta não encontrada');
        }
    })
    it('consulta de saldo com conta vazio', async () => {
        try {
            sandbox.stub(contaController, 'recuperaSaldo').returns(null)
            let resposta = await contaController.getSaldo()
        } catch (error) {
            expect(error.message).to.equal('Conta não encontrada');
        }
    })
})
describe('Depositar valores', () => {
    let conta = '12345'
    let valor = 200
    it('deposito de valores com conta valida', async () => {
        try {
            sandbox.stub(contaController, 'recuperaSaldo').returns({
                _id: '5e3fed47e481474fb8e8342e',
                conta: '12345',
                saldo: 50
            })
            sandbox.stub(contaController, 'atualizarSaldo').returns({ conta: 12345 }, { saldo: 1050 })
            let resposta = await contaController.insertSaldo(conta, valor)
            console.log(resposta)
            expect(resposta.saldo).to.be.equal(250)
            expect(resposta.conta).to.be.equal(conta)

        } catch (error) {}
    })
    it('deposito de valores com conta invalida', async () => {
        let conta = '1233'
        try {
            sandbox.stub(contaController, 'recuperaSaldo').returns(null)
            await contaController.insertSaldo(conta, valor)
        } catch (error) {
            expect(error.message).to.equal('Conta não encontrada');

        }
    })
    it('deposito com valor negativo com conta valida', async () => {
        let conta = 12345
        let valor = -1234
        try {
            sandbox.stub(contaController, 'recuperaSaldo').returns({
                _id: '5e3fed47e481474fb8e8342e',
                conta: '12345',
                saldo: 50
            })
            await contaController.insertSaldo(conta, valor)
        } catch (error) {
            expect(error.message).to.equal('Valor negativo');

        }
    })

})