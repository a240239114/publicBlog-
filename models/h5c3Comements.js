var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('h5c3Comments',new Schema({
    "name":String,
    "comment":String
}))