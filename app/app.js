const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/errorHandler')
const { color } = require('./constants')
class App {

  constructor() {
    this.app = express()
    this.run()
  }

  requireDirectory(path, passApp) {
    const files = fs.readdirSync(`${__dirname}/${path}`)

    files.forEach(file => {
      console.log(color.GREEN, file)
      if (passApp) require(`${__dirname}/${path}/${file}`)(this.app)
      else require(`${__dirname}/${path}/${file}`)
    })
  }

  loadMiddlewares() {
    console.log(color.BLUE, '\nLOADING MIDDLEWARES')
    this.app.use(cors())
    this.app.use(errorHandler)
    this.app.use(bodyParser.json())
  }

  loadModels() {
    console.log(color.BLUE, '\nLOADING MODELS')
    this.requireDirectory('models')
  }

  loadControllers() {
    console.log(color.BLUE, '\nLOADING CONTROLLERS')
    this.requireDirectory('controllers')
  }

  loadRoutes() {
    console.log(color.BLUE, '\nLOADING ROUTES')
    this.requireDirectory('routes', true)
  }

  run() {
    this.loadMiddlewares()
    this.loadModels()
    this.loadControllers()
    this.loadRoutes()
  }

}

module.exports = new App().app