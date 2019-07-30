//node框架
var express = require('express')
var router = express.Router()
//数据库
var mongoose = require('mongoose')
//引入mongodb
var MongoClient = require('mongodb').MongoClient;
//comment集合
var allComments = require('../models/allComments')





//引入自动增长函数
var getNextSequenceValue = require('../public/javascripts/getNextSequenceValue')
var getToZeroSequenceValue = require('../public/javascripts/getToZeroSequenceValue')
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {

    //获取到所有文章评论列表
    router.get('/', async (req, res) => {
        //数据库中查找所有数据,allComments集合查找
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allComments").find({
            comments:/彩|厉害|卢本伟牛逼|美国牛逼|群主大大/
        }).sort({_id:-1}).limit(10).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            res.json({
                data
            })
            // db.close();
        });
    })

});

module.exports = router;