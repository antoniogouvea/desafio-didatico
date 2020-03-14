const mongoose = require('mongoose')
const { color } = require('../constants')

class Mongo {
  
  constructor() {}

  connect() {
    mongoose.connection.on('error', error => {
      console.error(color.RED, `MongoDB connection error: ${error}`)
      process.exit(-1)
    })

    return mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  }

}

module.exports = Mongo