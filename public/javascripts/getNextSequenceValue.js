//定义自动增长函数
module.exports =async function getNextSequenceValue(sequenceName, local) {
   //修改counters
   local.collection("counters").updateOne({ //查询
      _id: sequenceName
   }, { //替换 自增
      $inc: {
         "sequence_value": 1
      }
   }, function (err, res) {
      if (err) throw err;
      // console.log(res);
   });

   //读取counters
   const sequenceDocument = await local.collection("counters").find({
      _id: sequenceName
   }).toArray();
   // console.log(sequenceDocument);
   // console.log(sequenceDocument[0].sequence_value);


   return sequenceDocument[0].sequence_value;
}