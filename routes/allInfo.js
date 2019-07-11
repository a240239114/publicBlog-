//node框架
var express = require('express')
var router = express.Router()
//数据库
var mongoose = require('mongoose')
//comment集合
var allInfo = require('../models/allInfo')
//引入mongodb
var MongoClient = require('mongodb').MongoClient;





//引入自动增长函数
var getNextSequenceValue = require('../public/javascripts/getNextSequenceValue')
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    //获取到单个文章详情
    router.get('/:id', async (req, res) => {
        //数据库中查找所有数据,allInfo集合查找
        let id = parseInt(req.params.id);
        console.log(id);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("local");
        //操作数据库中的集合
        dbo.collection("allInfo").find({"_id":id}).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            console.log(data);
            res.json({data})
            // db.close();
        });
    })


    //添加到所有文章详情
    router.post('/', async (req, res) => {
        //数据库中查找所有数据,allInfo集合查找
        if (err) throw err;
        var dbo = db.db("local");
        //自增函数
        req.body["_id"] = await getNextSequenceValue("allInfoid",db.db("local"));

        console.log(req.body);

        dbo.collection("allInfo").insertOne(req.body, function(err, data) {
            if (err) throw err;
            console.log("文档插入成功");
            // db.close();
        });
    })


});

module.exports = router;