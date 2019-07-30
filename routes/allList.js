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
var getToZeroSequenceValue = require('../public/javascripts/getToZeroSequenceValue')
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    //获取到所有文章列表
    router.get('/', async (req, res) => {
        //数据库中查找所有数据allList集合查找
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find({}).toArray(function (err, data) { // 返回集合中所有数据
            if (err) {
                res.json({
                    status: 301,
                    msg: "不好意思"
                })
            } else {
                res.json({
                    data
                })
            }

            // db.close();
        });
    })

    //获取单个文章 ID
    router.get('/id/:id', async (req, res) => {
        //数据库中查找所有数据,allInfo集合查找
        let id = parseInt(req.params.id);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find({
            _id: id
        }).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(data);
            res.json({
                data: data[0]
            })
            // db.close();
        });
    })

    //获取到文章列表分页,一次获得8条数据
    router.get('/index/:index', async (req, res) => {
        //数据库中查找所有数据allList集合查找
        let index = req.params.index;
        console.log(index);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("allList").find().skip(8 * (index - 1)).limit(8).toArray(function (err, data) { // 返回集合中所有数据
            if (err) throw err;
            res.json({
                data
            })
            // db.close();
        });
    })

    //添加到所有文章
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

    //修改文章
    router.post('/:id', async (req, res) => {
        let id = parseInt(req.params.id);
        console.log(id);
        console.log(req.body);
        if (err) throw err;
        var dbo = db.db("publicBlog");
        dbo.collection("allList").updateOne({
            _id: id
        }, {
            $set: req.body
        }, function (err, obj) {
            if (err) throw err;
            console.log("文档更新成功");
            // res.json({
            //     status:202,
            //     msg:"修改成功"
            // })
            res.json({
                "status": 202,
                "msg": "恭喜你,成功了!"
            })
            // db.close();
        });
    })

    //删除单个   ID
    router.delete('/id/:id', async (req, res) => {
        //数据库中查找所有数据,vueCliInfo集合查找
        let id = parseInt(req.params.id);
        // console.log(id, tittle);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");


        //删除当前的数据 ID
        dbo.collection("allList").deleteOne({
            _id: id
        }, function (err, obj) {
            if (err) throw err;
            res.json({
                data: {
                    status: 202,
                    msg: "成功删除!"
                }
            })
        })
    })

    //删除文章 Tittle 
    router.delete('/tittle/:tittle', async (req, res) => {
        //数据库中查找所有数据,vueCliInfo集合查找
        let tittle = req.params.tittle;
        console.log(tittle);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");


        //删除当前的数据 
        dbo.collection("allList").deleteMany({
            tittle: tittle
        }, function (err, obj) {
            if (err) throw err;
            res.json({
                data: {
                    status: 202,
                    msg: "成功删除!"
                }
            })
        })
    })

    //删除全部
    router.delete('/', async (req, res) => {
        //数据库中查找所有数据,vueCliInfo集合查找
        // let id = parseInt(req.params.id);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");

        //删除所有数据
        dbo.collection("allList").deleteMany({
            _id: {
                $gte: 0
            }
        }, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " 条文档被删除");
            //SequenceValue归零
            getToZeroSequenceValue("allListid", db.db("publicBlog"))
            // db.close();
            res.json({
                status: 202,
                msg: '全部删除成功'
            })
        });
    })


});


module.exports = router;