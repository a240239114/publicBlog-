var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('vueCliComments',new Schema({
    "name":String,
    "comment":String
}))