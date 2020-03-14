const WikiController = require('../controllers/wiki.controller');
const wikiController = new WikiController()

module.exports = app => {

    app.get('/api/busca',wikiController.findWiki)

  }