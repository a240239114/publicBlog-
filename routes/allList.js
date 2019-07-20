//node框架
var express = require('express')
var router = express.Router()
//数据库
var mongoose = require('mongoose')
//comment集合
var allList = require('../models/allList')
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
        //数据库中查找所有数据allList集合查找
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find({}).toArray(function (err, data) { // 返回集合中所有数据
            if (err){
             res.json({
                 status:301,
                 msg:"不好意思"
             })
            }else{
                res.json({
                   data
                })
            }
            
            // db.close();
        });
    })

    //获取到文章评论列表分页,一次获得8条数据
    router.get('/:id', async (req, res) => {
        //数据库中查找所有数据allList集合查找
        let id = req.params.id;
        console.log(id);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find().skip(8 * (id - 1)).limit(8).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            res.json({
                data
            })
            // db.close();
        });
    })


    //添加到所有文章评论
    router.post('/', async (req, res) => {
        //数据库中查找所有数据"allList集合查找
        if (err) throw err;
        var dbo = db.db("publicBlog");
        //查询自增前的allListid的counters
        var data = await dbo.collection("counters").find({
            _id: "allListid"
        }).toArray();
        var sequence_value = data[0].sequence_value;
        //自增函数
        req.body["_id"] = await getNextSequenceValue("allListid", db.db("publicBlog"));


        if (req.body["_id"] != sequence_value) {
            //自动添加next信息
            // req.body["nextId"] = parseInt(req.body["_id"] + 1);
            // const data = await dbo.collection("allList").find({
            //     _id: req.body["nextId"]
            // }).toArray();
            // req.body.lastTittle = data[0].tittle;

            console.log(req.body);

            dbo.collection("allList").insertOne(req.body, function (err, data) {
                if (err) throw err;
                console.log("文档插入成功");
                // db.close();
            });

            //给出响应
            res.json({
                "status": 202,
                "msg": "成功啦"
            })
        } else {
            console.log("不好意思")
            req.body["_id"] = parseInt(req.body["_id"] + 1);
            dbo.collection("allList").insertOne(req.body, function (err, data) {
                if (err) throw err;
                console.log("文档插入成功");
                console.log(req.body);
                // db.close();
            });

            //给出响应
            res.json({
                "status": 202,
                "msg": "成功啦"
            })
        }

    })


});


module.exports = router;
