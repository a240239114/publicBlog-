//node框架
var express = require('express')
var router = express.Router()
//数据库
var mongoose = require('mongoose')
//引入mongodb
var MongoClient = require('mongodb').MongoClient;
//comment集合
var allList = require('../models/allList')





//引入自动增长函数
var getNextSequenceValue = require('../public/javascripts/getNextSequenceValue')
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    //获取到最近更新的十篇文章评论
    router.get('/', async (req, res) => {
        //数据库中查找所有数据,allList集合查找
        if (err) throw err;
        let keywords = req.params.keywords;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find().sort({ _id: -1 }).limit(10).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.json({
                data:result
            })
        });
    })
});

module.exports = router;