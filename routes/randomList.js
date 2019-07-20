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
        dbo.collection("allList").find().toArray(function (err, res) { // 返回集合中所有数据
            if (err) throw err;
            //限定最大值
            let max = res.length - 1;
            //限定最小值
            let min = 0;
            //随机产生10个0到max之间的数字

            //产生1个随机数
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }

            let arr = [];
            let i = 0;
            //需要返回的数据
            let data = [];
            if (arr.length < 10) {//产生是个随机数
                //先判断数组中是否存在该数字
                arr.some(function (item) {
                    if (item = getRandomArbitrary()) return
                    arr[i] = getRandomArbitrary();
                    i++;
                })
            }

            //循环遍历数组
            arr.forEach(function(item){
                  data.push(res[item])
            })

            res.json({
                data
            })
            // db.close();
        });
    })
});

module.exports = router;