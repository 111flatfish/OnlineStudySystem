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
// 用户配置骨架
let userconfigschema = mongoose.Schema({
    idincrement:Number,
    nidincrement:Number,
    cidincrement:Number,
    eidincrement:Number
});
// 新闻骨架
let newsSchema = mongoose.Schema({
    nid:String,
    nname:String,
    ncontent:String,
    npubdate:String,
    nhits:Number,
    ntype:String,
    wid:String
});
// 课程骨架
let courseSchema = mongoose.Schema({
    cid:String,
    cname:String,
    cpubdate:String,
    csynopsis:String,
    cprice:Number,
    ccontent:String,
    chits:Number,
    cstudycount:Number,
    cchapters:Number,
    cevaluate:Number,
    ctype:String,
    wid:String
});
// 考试骨架
let examSchema = mongoose.Schema({
    eid:String,
    econtent:String,
    epubdate:String,
    ecertificate:String,
    esubject:String,
    erightkey:String,
    wid:String
});
// 学习骨架
let studySchema = mongoose.Schema({
    uid:String,
    cid:String,
    studytime:String,
    studyprogress:Number
});
// 留言骨架
let messageSchema = mongoose.Schema({
    mid:String,
    mpubdate:String,
    mcontent:String,
    uid:String,
    cid:String
});
// 回复信息骨架
let replySchema = mongoose.Schema({
    rid:String,
    rpubdate:String,
    rcontent:String,
    wid:String,
    mid:String,
});
// 用户管理骨架
let usermanageSchema = mongoose.Schema({
    aid:String,
    uid:String,
    wid:String,
    userrecord:String,
    workerrecord:String
});
// 参加考试骨架
let attendSchema = mongoose.Schema({
    uid:String,
    eid:String,
    grade:Number
});


// 模型
// 用户配置模型
let userconfigmodel = new mongoose.model("userconfig",userconfigschema,"userconfig");

// 新闻模型
let newsmodel = new mongoose.model("news",newsSchema,"news");

// 课程模型
let coursemodel = new mongoose.model("course",courseSchema,"course");

// 考试模型
let exammodel = new mongoose.model("exam",examSchema,"exam");

// 留言模型
let messagemodel = new mongoose.model("message",messageSchema,"message");

// 回复留言模型
let replymodel = new mongoose.model("reply",replySchema,"reply");

// 用户管理
let usermanagemodel = new mongoose.model("usermanage",usermanageSchema,"usermanage");

// 参加考试模型
let attendexammodel = new mongoose.model("attendexam",attendSchema,"attendexam");


module.exports = {
    userconfigmodel,
    // workermodel,
    newsmodel,
    coursemodel,
    exammodel,
    messagemodel,
    replymodel,
    userconfigmodel,
    attendexammodel
}