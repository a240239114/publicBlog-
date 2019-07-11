var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('es6Comments',new Schema({
    "name":String,
    "comment":String
}))