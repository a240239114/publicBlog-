var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('comment',new Schema({
    "name":String,
    "comment":String
}))