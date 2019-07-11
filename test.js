var mongoose = require ('mongoose')

var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost/shopDemo')

//设计文档结构,并发布为模型
module.exports = mongoose.model('Student',new Schema({}))