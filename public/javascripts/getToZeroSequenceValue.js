//定义自动减少函数
module.exports =async function getToZeroSequenceValue(sequenceName, local) {
    //修改counters
    local.collection("counters").updateOne({ //查询
       _id: sequenceName
    }, {$set:{sequence_value: 0}}, function (err, res) {
       if (err) throw err;
       // console.log(res);
    });
 }