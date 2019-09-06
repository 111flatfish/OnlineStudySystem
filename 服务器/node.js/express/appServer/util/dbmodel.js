let mongoose = require("mongoose");

// let workerschema = mongoose.Schema({
//     wid:String,         //系统生成-->
//     wname:String,       //昵称-->
//     wsex:String,        //性别-->
//     wtelephone:String,    //电话-->
//     wbirthday : String,    //生日-->
//     wemail : String,        //邮件-->
//     wheadimage : String,    //头像-->
//     wpassword : String,     //密码-->
// });
//
// // 职员模型
// let workermodel = new mongoose.model("worker",workerschema,"worker");

//配置骨架
let userconfigschema = mongoose.Schema({
    idincrement:Number,
    nidincrement:Number,
    cidincrement:Number,
    eidincrement:Number
});
let userconfigmodel = new mongoose.model("userconfig",userconfigschema,"userconfig");


let newsSchema = mongoose.Schema({
    nid:String,
    nname:String,
    ncontent:String,
    npubdate:String,
    nhits:Number,
    ntype:String,
    wid:String
});


// 新闻模型
let newsmodel = new mongoose.model("news",newsSchema,"news");

module.exports = {
    userconfigmodel,
    // workermodel,
    newsmodel
}