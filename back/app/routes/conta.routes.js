const PlanetController = require('../controllers/planet.controller');
const planetController = new PlanetController()

 

module.exports = app => {

    app.get('/api/planet',planetController.findPlanet)
    app.get('/api/planet/:id', planetController.findPlanetById)
    app.post('/api/planet/add',planetController.addPlanet)
    app.delete('/api/planet/delete/:id',planetController.delete)

  }