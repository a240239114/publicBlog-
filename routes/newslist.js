var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose');
var newslist = require ('../models/newslist')


//连接mongodb数据库
mongoose.connect('mongodb://localhost/local')

//连接成功
mongoose.connection.on('connected',()=>console.log('success'))

//连接错误
mongoose.connection.on('error',()=>console.log('err'))

//连接失败
mongoose.connection.on('disconnected',()=>console.log('disconnected'))

//获取新闻列表
router.get('/',async (req,res)=>{
   const data = await newslist.find()
   res.json({data})
})

//获取新闻详情,根据ID
router.get('/:id',async (req,res)=>{
   const data = await newslist.findById(req.params.id)
   res.json({data})
})

//添加评论,根据ID,存在疑问
router.post('/:id',async (req,res)=>{
   // //根据 id 找到newslist
   // let news = await newslist.findById(req.params.id)
   // //修改newslist
   // news.tittle=req.body.id
   // // //保存
   // // await news.save()
   // res.send({
   //    news:news,
   //    type:typeof(news.comment),
   //    REQ:req.body
   // })
})

module.exports = router;
