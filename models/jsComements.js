var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('jsComments',new Schema({
    "name":String,
    "comment":String
}))