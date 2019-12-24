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

// 用户骨架
let userschema = mongoose.Schema({
    uid:String,         //系统生成
    uname:String,       //昵称
    usex:String,        //性别
    utelephone:String,    //电话
    ucoin : Number,       //金币
    ubirthday : String,    //生日
    uemail : String,        //邮件
    uheadimage : String,    //头像
    uscore : Number,        //积分
    umonetary : Number,     //消费金额
    upassword : String,     //密码
    urank : Number,         //会员等级
    udiscount : Number,     //会员折扣
    uacitve : Number,       //激活状态
});



// 职员骨架
let workerschema = mongoose.Schema({
    wid:String,         //系统生成-->
    wname:String,       //昵称-->
    wsex:String,        //性别-->
    wtelephone:String,    //电话-->
    wbirthday : String,    //生日-->
    wemail : String,        //邮件-->
    wheadimage : String,    //头像-->
    wpassword : String,     //密码-->
});


// 系统管理员骨架
let adminschema = mongoose.Schema({
    aid:String,         //系统生成-->
    aname:String,       //昵称-->
    asex:String,        //性别-->
    atelephone:String,    //电话-->
    abirthday : String,    //生日-->
    aemail : String,        //邮件-->
    aheadimage : String,    //头像-->
    apassword : String,     //密码-->
    aidcardnum:String       //身份证号
});



// 用户模型
let usermodel = new mongoose.model("user",userschema,"user");



// 职员模型
let workermodel = new mongoose.model("worker",workerschema,"worker");


// 系统管理员模型
let adminmodel = new mongoose.model("admin",adminschema,"admin");

//配置骨架
// 用户配置骨架
let userconfigschema = mongoose.Schema({
    idincrement:Number,
    nidincrement:Number,
    cidincrement:Number,
    eidincrement:Number,
    midincrement:Number,
    ridincrement:Number
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
    ccontent:Object,
    chits:Number,
    cstudycount:Number,
    cchapters:Number,
    cevaluate:Number,
    ctype:String,
    coursetype:Number,
    wid:String,
    showtype:String
});
// 考试骨架
let examSchema = mongoose.Schema({
    eid:String,
    etitle:String,
    econtent:String,
    epubdate:String,
    ecertificate:String,    //证书
    esubject:String,
    etime:Number,           //考试时间/分
    starttime:String,       //开始时间
    endtime:String,         //结束时间
    esynopsis:String,       //简介,
    escore:Number,
    epassgrade:Number,
    wid:String
});
// 学习骨架
let studySchema = mongoose.Schema({
    uid:String,
    cid:String,
    studytime:Number,
    studyprogress:Number,
    studyedchapter:Array
});
// 留言骨架
let messageSchema = mongoose.Schema({
    mid:String,
    mpubdate:String,
    mcontent:String,
    id:String,
    type:String,
    cid:String
});
// 回复信息骨架
let replySchema = mongoose.Schema({
    rid:String,
    rpubdate:String,
    rcontent:String,
    rtype:String,
    id:String,
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
    grade:Number,
    hascertificate:Boolean
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

let studymodel = new mongoose.model("study",studySchema,"study");

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
    attendexammodel,
    usermanagemodel,
    studymodel,
    usermodel,
    workermodel,
    adminmodel
}
