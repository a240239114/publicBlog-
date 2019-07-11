var express = require("express");
var app = express();
var fs = require('fs');

//处理提交的json数据
app.use(express.json())

//引入路由
//all
var allComments = require("./routes/allComments");
var allInfo = require("./routes/allInfo");
var allList = require("./routes/allList");
//bug
var bugComments = require("./routes/bugComments");
var bugInfo = require("./routes/bugInfo");
var bugList = require("./routes/bugList");
//Econfig
var EconfigComments = require("./routes/EconfigComments");
var EconfigInfo = require("./routes/EconfigInfo");
var EconfigList = require("./routes/EconfigList");
//es6
var es6Comments = require("./routes/es6Comments");
var es6Info = require("./routes/es6Info");
var es6List = require("./routes/es6List");
//h5c3
var h5c3Comments = require("./routes/h5c3Comments");
var h5c3Info = require("./routes/h5c3Info");
var h5c3List = require("./routes/h5c3List");
//js
var jsComments = require("./routes/jsComments");
var jsInfo = require("./routes/jsInfo");
var jsList = require("./routes/jsList");
//texiao
var texiaoComments = require("./routes/texiaoComments");
var texiaoInfo = require("./routes/texiaoInfo");
var texiaoList = require("./routes/texiaoList");
//vueCli
var vueCliComments = require("./routes/vueCliComments");
var vueCliInfo = require("./routes/vueCliInfo");
var vueCliList = require("./routes/vueCliList");
//random
var randomList = require("./routes/randomList");
//recently
var recentlyList = require("./routes/recentlyList");
//relatedArticle
var relatedArticleList = require("./routes/relatedArticleList");


//公开资源
app.use('/public/',express.static('./public/'))

//body-parser的配置,处理传递过来urlencoded编码
//为什么要使用urlencode编码?是为了符合url的规范(例如:1.一些汉字不能通过url传递 2.隐私 3.大小)
var bodyParser = require('body-parser')
//对post请求体的处理
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//解决跨域
var cors = require ('cors')
app.use(cors())

//设置一级路由
//all
app.use("/allComments", allComments);
app.use("/allInfo", allInfo);
app.use("/allList", allList);
//bug
app.use("/bugComments", bugComments);
app.use("/bugInfo", bugInfo);
app.use("/bugList", bugList);
//Econfig
app.use("/EconfigComments", EconfigComments);
app.use("/EconfigInfo", EconfigInfo);
app.use("/EconfigList", EconfigList);
//es6
app.use("/es6Comments", es6Comments);
app.use("/es6Info", es6Info);
app.use("/es6List", es6List);
//h5c3
app.use("/h5c3Comments", h5c3Comments);
app.use("/h5c3Info", h5c3Info);
app.use("/h5c3List", h5c3List);
//js
app.use("/jsComments", jsComments);
app.use("/jsInfo", jsInfo);
app.use("/jsList", jsList);
//texiao
app.use("/texiaoComments", texiaoComments);
app.use("/texiaoInfo", texiaoInfo);
app.use("/texiaoList", texiaoList);
//vueCli
app.use("/vueCliComments", vueCliComments);
app.use("/vueCliInfo", vueCliInfo);
app.use("/vueCliList", vueCliList);
//random
app.use("/randomList", randomList);
//recently
app.use("/recentlyList", recentlyList);
//relatedArticle
app.use("/relatedArticleList", relatedArticleList);









//设置页面路径
// app.get('/',(req,res)=>{
//    fs.readFile('./views/index.html',(err,data)=>{
//        //读取文件并渲染
//        res.send(data.toString());
//    });
// })

module.exports = app;
``