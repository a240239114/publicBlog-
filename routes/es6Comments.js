//node框架
var express = require ('express')
var router = express.Router()
//数据库
var mongoose = require ('mongoose')
//comment集合
var es6Comments = require ('../models/es6Comments')
//引入mongodb
var MongoClient = require('mongodb').MongoClient;


//引入自动增长函数
var getNextSequenceValue = require('../public/javascripts/getNextSequenceValue')
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    //获取到所有文章评论列表
    router.get('/', async (req, res) => {
        //数据库中查找所有数据,es6Comments集合查找
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("es6Comments").find({}).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            res.json({data})
            // db.close();
        });
    })

    //获取到文章评论列表分页,一次获得8条数据
    router.get('/:id', async (req, res) => {
        //数据库中查找所有数据,es6Comments集合查找
        let id = req.params.id;
        console.log(id);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("es6Comments").find().skip(8*(id-1)).limit(8).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            res.json({data})
            // db.close();
        });
    })

    //添加到所有文章评论
    router.post('/', async (req, res) => {
        //数据库中查找所有数据,es6Comments集合查找
        if (err) throw err;
        var dbo = db.db("publicBlog");
        //查询自增前的es6Commentsid的counters
        var data = await dbo.collection("counters").find({
            _id: "es6Commentsid"
        }).toArray();
        var sequence_value = data[0].sequence_value;


        //自增函数
        req.body["_id"] = await getNextSequenceValue("es6Commentsid",db.db("publicBlog"));

        console.log(req.body);


        if (req.body["_id"] != sequence_value) {
            dbo.collection("es6Comments").insertOne(req.body, function (err, data) {
                if (err) throw err;
                console.log("文档插入成功");
                // db.close();
            });
            res.json({
                "status": 202,
                "msg": "恭喜你,成功了!"
            })
        } else {
            req.body["_id"] = parseInt(req.body["_id"] + 1);
            dbo.collection("es6Comments").insertOne(req.body, function (err, data) {
                if (err) throw err;
                console.log("文档插入成功");
                console.log(req.body);
                // db.close();
            });
            res.json({
                "status": 202,
                "msg": "恭喜你,成功了!"
            })
        }

    })

});

module.exports = router;