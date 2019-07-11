var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var image = require('../models/image')

//连接数据库
mongoose.connect('mongodb://localhost/local')

//连接成功
mongoose.connection.on("connected", () => console.log('success'))

//连接错误
mongoose.connection.on("error", () => console.log('err'))

//连接失败
mongoose.connection.on("disconnection", () => console.log('false'))

//获取所有数据
router.get('/', async (req, res) => {
    let data = await image.find()
    res.json({
        data
    })
})

//根据ID来获取数据
router.get('/:id', async (req, res) => {
    let data = await image.findById(req.params.id)
    res.json({data})
})

module.exports = router;