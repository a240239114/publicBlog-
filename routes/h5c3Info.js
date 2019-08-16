//node框架
var express = require('express')
var router = express.Router()
//数据库
var mongoose = require('mongoose')
//comment集合
var h5c3Info = require('../models/h5c3Info')
//引入mongodb
var MongoClient = require('mongodb').MongoClient;





//引入自增函数
var getNextSequenceValue = require('../public/javascripts/getNextSequenceValue')
//引入归零函数
var getToZeroSequenceValue = require('../public/javascripts/getToZeroSequenceValue')

//根路径
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
        dbo.collection("h5c3Info").find({}).toArray(function (err, data) { // 返回集合中所有数据
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

    //获取文档的数量
    router.get('/count/count', async (req, res) => {
        //数据库中查找所有数据allList集合查找
        // if (err) throw err;
        //获取数据库
        console.log("被调用啦");
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("h5c3Info").countDocuments({}, function (err, data) { // 返回集合中所有数据
            console.log(data);
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

        });
    })

    //获取到单个文章详情
    router.get('/:id', async (req, res) => {

        //数据库中查找所有数据,h5c3Info集合查找
        let id = parseInt(req.params.id);
        // console.log(id);asdasd 
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");
        //操作数据库中的集合
        dbo.collection("h5c3Info").find({
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


    //添加到所有文章详情
    router.post('/', async (req, res) => {
        //数据库中查找所有数据,h5c3Info集合查找
        if (err) throw err;
        var dbo = db.db("publicBlog");
        //查询自增前的h5c3Infoid的counters
        var data = await dbo.collection("counters").find({
            _id: "h5c3Infoid"
        }).toArray();
        var sequence_value = data[0].sequence_value;

        //自增函数
        req.body["_id"] = await getNextSequenceValue("h5c3Infoid", db.db("publicBlog"));

        if (req.body["_id"] != sequence_value) {
            if (sequence_value != 0) {
                //自动添加last信息
                // req.body["lastId"] = parseInt(req.body["_id"] - 1);
                req.body["lastId"] = parseInt(sequence_value);
                const data = await dbo.collection("h5c3Info").find({
                    _id: req.body["lastId"]
                }).toArray();
                req.body.lastTittle = data[0].tittle;

                console.log(req.body);
            }

            dbo.collection("h5c3Info").insertOne(req.body, function (err, data) {
                if (err) throw err;
                console.log("文档插入成功");
                // db.close();
            });


            res.json({
                "status": 202,
                "msg": "恭喜你,成功了!"
            })
        } else {
            //自动添加last信息
            if (sequence_value != 0) {
                // req.body["lastId"] = parseInt(req.body["_id"] - 1);
                req.body["lastId"] = parseInt(sequence_value);
                const data = await dbo.collection("h5c3Info").find({
                    _id: req.body["lastId"]
                }).toArray();
                req.body.lastTittle = data[0].tittle;
            }


            req.body["_id"] = parseInt(req.body["_id"] + 1);
            dbo.collection("h5c3Info").insertOne(req.body, function (err, data) {
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


    //修改文章
    router.post('/:id', async (req, res) => {
        let id = parseInt(req.params.id);
        console.log(id);
        console.log(req.body);
        if (err) throw err;
        var dbo = db.db("publicBlog");
        dbo.collection("h5c3Info").updateOne({
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
        dbo.collection("h5c3Info").deleteOne({
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
        //查询集合的数量

        console.log(tittle);
        if (err) throw err;
        //获取数据库
        var dbo = db.db("publicBlog");


        //删除当前的数据 
        dbo.collection("h5c3Info").deleteMany({
            tittle: tittle
        }, async function (err, obj) {
            var count = await dbo.collection("h5c3Info").find().count();
            if (count == 0) {
                getToZeroSequenceValue("h5c3Infoid", db.db("publicBlog"))
            }

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
        dbo.collection("h5c3Info").deleteMany({
            _id: {
                $gte: 0
            }
        }, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " 条文档被删除");
            //SequenceValue归零
            getToZeroSequenceValue("h5c3Infoid", db.db("publicBlog"))
            // db.close();
            res.json({
                status: 202,
                msg: '全部删除成功'
            })
        });
    })



});


module.exports = router;