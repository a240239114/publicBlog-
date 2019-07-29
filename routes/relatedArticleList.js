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
    //获取到相关联文章评论列表
    router.get('/:keywords/index/:index', async (req, res) => {
        //数据库中查找所有数据,allList集合查找
        if (err) throw err;
        let keywords = req.params.keywords;
        let index = req.params.index;
        // console.log("keywords=======>"+keywords)
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find().toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            //创建新数组
            let data = [];
            result.forEach(function(item){
                 if(item.keywords.search(keywords) != -1){//存在
                    data.push(item)
                 }
            })
            data = data.slice((index-1)*8,index*8);
            console.log(data);
            res.json({
                data:data
            })
        });
    })

    router.get('/:keywords', async (req, res) => {
        //数据库中查找所有数据,allList集合查找
        if (err) throw err;
        let keywords = req.params.keywords;
        let index = req.params.index;
        // console.log("keywords=======>"+keywords)
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find().toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            //创建新数组
            let data = [];
            result.forEach(function(item,index){
                 if(item.keywords.search(keywords) != -1){//存在
                    data.push(item);
                 }
            })
            console.log(data);
            res.json({
                data:data
            })
        });
    })
});

module.exports = router;