//node框架
var express = require ('express')
var router = express.Router()
//数据库
var mongoose = require ('mongoose')
//comment集合
var comment = require ('../models/comment')

//连接数据库
mongoose.connect('mongodb://localhost/local')

//连接成功
mongoose.connection.on('connected',()=>console.log('success'))

//连接错误
mongoose.connection.on('error',()=>console.log('err'))

//连接失败
mongoose.connection.on('disconnected',()=>console.log('disconnected'))

//获取评论列表
router.get('/',async (req,res)=>{
    //数据库中查找所有数据,comemnt集合查找
    const data = await comment.find()
    res.json({data})
})

//获取评论分页
router.get('/:id',async (req,res)=>{
    //直接在url中传递参数
    let id = req.params.id
    //分页查询
    const data = await comment.find().limit(5).skip(5*(id-1))
    // const data = await comment.find()
    res.json({data})
})

//添加评论
router.post('/',async (req,res)=>{
    //将数据保存起来,通过data传递参数,res.body是个对象
    // await comment.create(req.body)
    new comment(req.body).save()
    // db.COLLECTION_NAME.insert(document)
})


module.exports = router;
