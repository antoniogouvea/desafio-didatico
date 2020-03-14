//const contaModel = require('./models/conta.model')
const axios = require('axios');

class WikiService {
    constructor() {
        const wikiUrl = 'https://www.wikidata.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch='
        this.find = axios.create({
            baseURL: wikiUrl
        })
    }
     busca(data) {
        return this.find.get(data)
    }

     atualizarSaldo(query, fields) {
        return contaModel.findOneAndUpdate(query, fields,{
            new:true
        })
    }
}

module.exports = WikiService