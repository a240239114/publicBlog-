var mongoose = require ('mongoose')

var Schema = mongoose.Schema

module.exports = mongoose.model('texiaoComments',new Schema({
    "name":String,
    "comment":String
}))