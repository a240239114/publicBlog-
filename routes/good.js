var express = require ('express')
var router = express.Router()
var mongoose = require ('mongoose')
var good = require ('../models/good')

//连接数据库
mongoose.connect('mongodb://localhost/local')

//连接成功
mongoose.connection.on('connected',()=>console.log('success'))

//连接错误
mongoose.connection.on('error',()=>console.log('err'))

//连接失败
mongoose.connection.on('disconnected',()=>console.log('disconnected'))

//获取商品列表
router.get('/',async (req,res)=>{
    let data = await good.find();
    res.json({
        data
    })
})

//根据id获取商品详情
router.get('/:id',async (req,res)=>{
    //id作为查询条件
    let data = await good.findById(req.params.id)
    res.json({data})
})

module.exports = router;