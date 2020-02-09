const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContaSchema = new Schema({
  id:{type: String, required: false},
  numeroConta:{type: String, required:true},
  saldo: { type: Number}
})

module.exports = mongoose.model('conta', ContaSchema)