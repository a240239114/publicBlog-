####接口设计

##############                                Get           
###   GetList  数据列表
#   '192.168.31.93/allList'                                                          ------->所有的知识点数据
#   '192.168.31.93/allList?limit'                                                    ------->分页用的 获取某一段
#   '192.168.31.93/texiaoList'                                                       ------->前端特效数据
#   '192.168.31.93/h5c3List'                                                         ------->h5c3数据
#   '192.168.31.93/jsList'                                                           ------->js数据
#   '192.168.31.93/vueCliList'                                                       ------->vueCli数据
#   '192.168.31.93/es6List'                                                          ------->es6数据
#   '192.168.31.93/bugList'                                                          ------->常见BUG数据
#   '192.168.31.93/EconfigList'                                                      ------->环境配置数据
#    数据结构设计  
                  {
                      "id"                             :****,
                      "keywords"                       :[首页,特效] 
                      "showImg"                        :****,
                      "tittle"                         :****,
                      "content"                        :****,
                      "date"                           :****,
                      "temperature"                    :****,
                      "surport"                        :num  
                   }   


#    相关文章 
#   '192.168.31.93/relatedArticleList?keywords'                                             ------->所有的知识点数据
#    根据keywords与数据的tittle比对 ,查看tittle是否包含keywords,如果包含就find出来



                                       
###   GetInfo   数据详情                                    
#   '192.168.31.93/allInfo/id'                                                       ------->所有的知识点数据
#   '192.168.31.93/texiaoInfo/id'                                                    ------->前端特效数据
#   '192.168.31.93/h5c3Info/id'                                                      ------->h5c3数据
#   '192.168.31.93/jsInfo/id'                                                        ------->js数据
#   '192.168.31.93/vueCliInfo/id'                                                    ------->vueCli数据
#   '192.168.31.93/es6Info/id'                                                       ------->es6数据
#   '192.168.31.93/bugInfo/id'                                                       ------>常见BUG数据
#   '192.168.31.93/EconfigInfo/id'                                                   -------->环境配置数据
#    数据结构设计  
                 {
                      "keywords"                       :["js","冒泡"],  
                      "tittle"                         :****,
                      "date"                           :****,
                      "looked"                         :num ,
                      "steps"                          :[
                          {
                              "step"           :"step1:1.为echarts对象加载数据",
                              "tittle"         :"前端代码图片下边距突出解决办法",
                              "descTop"        :"PS:建议3、4、5步用函数封装起来，这样图表多的时候也好找些",
                              "img"            :"",
                              "wordpress"      :"",
                              "descBottom"     :"" 
                          },
                          {
                              "step"           :"step2:1.为echarts对象加载数据",
                              "tittle"         :"前端代码图片下边距突出解决办法",
                              "descTop"        :"PS:建议3、4、5步用函数封装起来，这样图表多的时候也好找些",
                              "img"            :"",
                              "wordpress"      :"",
                              "descBottom"     :"" 
                          }
                      ],
                    "last":{"id":"","tittle":""}, 
                    "next":{"id":"","tittle":""}             
                 } 
                                       
###  最近更新                                       
#   '192.168.31.93/recentlyList'                                                     --------->指的是找出前那几条数据  



                                       
### 随机文章                                       
#   '192.168.31.93/randomList'                                                    -------->随机在allList中找10条数据




###  GetComments  获取评论
#   '192.168.31.93/allComments'                                                          ------->全部评论
#   '192.168.31.93/texiaoComments'                                                       ------->前端特效评论
#   '192.168.31.93/h5c3Comments'                                                         ------->h5c3评论
#   '192.168.31.93/jsComments'                                                           ------->js评论
#   '192.168.31.93/vueCliComments'                                                       ------->vueCli评论
#   '192.168.31.93/es6Comments'                                                          ------->es6评论
#   '192.168.31.93/bugComments'                                                          ------->常见BUG评论
#   '192.168.31.93/EconfigComments'                                                      ------->环境配置评论
#    数据结构设计
          {                 
              "img"                        :"",
              "name"                       :"",
              "Csystem"                    :"",
              "Cbrowser"                   :"",
              "content"                    :"",
              "publishedTime"              :""  
          }



























######################                                POST

##   提交笔记
##   提交的ALL
#   '192.168.31.93/allList'                                                          ------->所有的知识点数据


##   提交到当前分类      
#   '192.168.31.93/texiaoList'                                                       ------->前端特效数据
#   '192.168.31.93/h5c3List'                                                         ------->h5c3数据
#   '192.168.31.93/jsList'                                                           ------->js数据
#   '192.168.31.93/vueCliList'                                                       ------->vueCli数据
#   '192.168.31.93/es6List'                                                          ------->es6数据
#   '192.168.31.93/bugList'                                                          ------->常见BUG数据
#   '192.168.31.93/EconfigList'                                                      ------->环境配置数据

##   修改到当前分类      
#   '192.168.31.93/texiaoList/id'                                                       ------->前端特效数据
#   '192.168.31.93/h5c3List/id'                                                         ------->h5c3数据
#   '192.168.31.93/jsList/id'                                                           ------->js数据
#   '192.168.31.93/vueCliList/id'                                                       ------->vueCli数据
#   '192.168.31.93/es6List/id'                                                          ------->es6数据
#   '192.168.31.93/bugList/id'                                                          ------->常见BUG数据
#   '192.168.31.93/EconfigList/id'                                                      ------->环境配置数据

#    传递的参数
                {
                      "id"                             :****,
                      "keywords"                       :["js","冒泡"],  
                      "tittle"                         :****,
                      "date"                           :****,
                      "looked"                         :num ,
                      "steps"                          :[
                          {
                              "step"           :"step1:1.为echarts对象加载数据",
                              "tittle"         :"前端代码图片下边距突出解决办法",
                              "descTop"        :"PS:建议3、4、5步用函数封装起来，这样图表多的时候也好找些",
                              "img"            :"",
                              "wordpress"      :"",
                              "descBottom"     :"" 
                          },
                          {
                              "step"           :"step2:1.为echarts对象加载数据",
                              "tittle"         :"前端代码图片下边距突出解决办法",
                              "descTop"        :"PS:建议3、4、5步用函数封装起来，这样图表多的时候也好找些",
                              "img"            :"",
                              "wordpress"      :"",
                              "descBottom"     :"" 
                          }
                      ],
                    "last":{"id":"","tittle":""}, 
                    "next":{"id":"","tittle":""}   
                 
                 }


                 



##   提交评论

#   '192.168.31.93/allComements'                                                          ------->全部评论
#   '192.168.31.93/texiaoComements'                                                       ------->前端特效评论
#   '192.168.31.93/h5c3Comements'                                                         ------->h5c3评论
#   '192.168.31.93/jsComements'                                                           ------->js评论
#   '192.168.31.93/vueCliComements'                                                       ------->vueCli评论
#   '192.168.31.93/es6Comements'                                                          ------->es6评论
#   '192.168.31.93/bugComements'                                                          ------->常见BUG评论
#   '192.168.31.93/EconfigComements'                                                      ------->环境配置评论
#    传递的参数
          {                 
              "img"                        :"",
              "name"                       :"",
              "Csystem"                    :"",
              "Cbrowser"                   :"",
              "content"                    :"",
              "publishedTime"              :""  
          }
<<<<<<< HEAD
=======
          
>>>>>>> 7fc119c66a5ccaf6ad96cb60d3576f5a1266c02d





<<<<<<< HEAD
                                                    

 ########                                                  Delete 
 
 ###删除单个
 
=======
          
          
>>>>>>> 7fc119c66a5ccaf6ad96cb60d3576f5a1266c02d
