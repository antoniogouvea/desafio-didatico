const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContaSchema = new Schema({
  id:{type: String, required: false},
  conta:{type: Number, required:true},
  saldo: { type: Number, required:false}
})

module.exports = mongoose.model('conta', ContaSchema)