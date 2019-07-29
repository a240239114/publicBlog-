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
        //随机产生10个数字并且范围是在allList范围以内,并且数据格式如下[{_id:"xxx"},{_id:"yyy"}]
        // [{_id:parseInt(01)},{_id:parseInt(02)}]
        function sjsz(num) {
            var ary = []; //创建一个空数组用来保存随机数组

            for (var i = 0; i < num; i++) { //按照正常排序填充数组
                var count = Math.ceil(Math.random() * 30);
                //循环判断是否数组含有count的重复值
                if (ary.indexOf(count) == -1) { //不包含count
                    ary[i] = count;
                } else {
                    i--;
                }
            }

            // console.log(ary)
            return ary; //返回数组
        }
        var arr = sjsz(10).map(function (item) {
            return item = {
                _id: parseInt(item)
            }
        })
        console.log(arr);  
        
        dbo.collection("allList").find({
            $or:arr
        }).toArray(function(err,result){
            if (err) throw err;
            console.log(result);
            res.json({
                "status":202,
                 "data":result
            })
        })



    })





}); //endfor MongoClient

module.exports = router;