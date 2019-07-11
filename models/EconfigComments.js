var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('EconfigComments',new Schema({
    "name":String,
    "comment":String
}))