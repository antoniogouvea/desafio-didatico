const app = require('./app')
const Mongo = require('./db/mongo')
const mongo = new Mongo()
const { color } = require('./constants')

mongo.connect()
  .then(() => app.listen(process.env.PORT, () => console.log(color.GREEN, `\nAPP RUNNING ON PORT ${process.env.PORT}` )))