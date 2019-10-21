var express = require('express');
var router = express.Router();
let path = require("path");
const connect = require("./connect");
const mongoose = require("mongoose");
const jwtutil = require("../util/jwt");
let dbmodel = require("../util/dbmodel");
let multer = require("multer");

// 上传文件路径
let storage = multer.diskStorage({
    destination:function (req,res,cb) {
        cb(null,"public/headimage/")
    },
    filename:function (req,file,cb) {
        let date = new Date();
        let time = date.getFullYear().toString()+date.getMonth().toString()+date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString();
        cb(null,time+"-"+file.originalname);
    }
});
let upload = multer({storage:storage});

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

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-requested-with,content-type,token,Authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "text/html;charset=utf-8");
    next();
});
/* 获取用户中心信息 */
router.get('/user.html', function(req, res) {

    let type = req.query.type;
    console.log("类型:"+typeof type);
    let userdata = {};
    console.log("req.token;"+req.headers.token);
    let token = req.headers.token || "";
    if(token != ""){
        let jwt = new jwtutil(token);
        let result = jwt.verifyToken();
        if(result == "err"){
            // console.log("出错");
            res.send({status:"expire"});
        }else {
            switch (type) {
                case "1":
                    console.log("用户");
                    usermodel.findOne({"uid":result}).exec(function (err,data) {
                        if(err){
                            throw err;
                        }else {
                            userdata = data;
                            // console.log(typeof data);
                            res.send({status:"success",info:userdata});
                        }
                    })
                    break;
                case "2":
                    workermodel.findOne({"wid":result}).exec(function (err,data) {
                        if(err){
                            throw err;
                        }else {
                            userdata = data;
                            // console.log(typeof data);
                            res.send({status:"success",info:userdata});
                        }
                    })
                    break;
                case "3":
                    adminmodel.findOne({"aid":result}).exec(function (err,data) {
                        if(err){
                            throw err;
                        }else {
                            userdata = data;
                            // console.log(typeof data);
                            res.send({status:"success",info:userdata});
                        }
                    })
                    break;
            }

            }
    }else {
        res.send({status:"unsign"});
    }
});

router.get("/favicon.ico",function (req,res) {
    res.send("favicon success");
});

//用户注册
router.post("/userregister.html",upload.single("uheadimage"),function (req,res) {
    // res.send("bb");
  let uname = req.body.uname;
  let upassword = req.body.upassword;
  let usex = req.body.usex;
  let utelephone = req.body.utelephone;
  let ubirthday = req.body.ubirthday;
  let uemail = req.body.uemail;
    let file = req.file || {};
    let uheadimage = file.filename || "";

  let model = new usermodel();
  dbmodel.userconfigmodel.find({}).exec(function (err,data) {
      if(err){
          console.log(err);
      }else {
          let date = new Date();
          let hour = date.getHours().toString();
          let minute = date.getMinutes().toString();
          let temp = data[0].idincrement + 1;
          console.log(temp);
          data[0].idincrement = temp;
          data[0].save(function (err) {
              if(err){
                  console.log(err);
              }else {
                  console.log(`用户增加一名:${temp}`);
              }
          })
          model.uid = temp + hour + minute;
          model.uname = uname;
          model.upassword = upassword;
          model.usex = usex;
          model.utelephone = utelephone;
          model.ubirthday = ubirthday;
          model.uemail = uemail;
          model.uheadimage = uheadimage;
          model.uscore = 0;
          model.umonetary = 0;
          model.ucoin = 0;
          model.urank = 1;
          model.udiscount = 0;
          model.uacitve = 1;

          model.save(function (err) {
            if(err){
              console.log(err);
            }else {
                res.send(`<script>alert("用户添加成功！");location.href="http://127.0.0.1:8080/index"</script>`);
            }
          });
      }
});



});

//职员注册
router.post("/workerregister.html",upload.single("wheadimage"),function (req,res) {
    // res.send("bb");
    let wname = req.body.wname;
    let wpassword = req.body.wpassword;
    let wsex = req.body.wsex;
    let wtelephone = req.body.wtelephone;
    let wbirthday = req.body.wbirthday;
    let wemail = req.body.wemail;
    let file = req.file || {};
    let wheadimage = file.filename || "";

    let model = new workermodel();

    userconfigmodel.find({}).exec(function (err,data) {
        if(err){
            console.log(err);
        }else {
            let date = new Date();
            let hour = date.getHours().toString();
            let minute = date.getMinutes().toString();
            let temp = data[0].idincrement + 1;
            // console.log(temp);
            data[0].idincrement = temp;
            data[0].save(function (err) {
                if(err){
                    console.log(err);
                }else {
                    console.log(`职员增加一名:${temp}`);
                }
            })

            model.wid = temp + hour + minute;
            model.wname = wname;
            model.wpassword = wpassword;
            model.wsex = wsex;
            model.wtelephone = wtelephone;
            model.wbirthday = wbirthday;
            model.wemail = wemail;
            model.wheadimage = wheadimage;
            
            model.save(function (err) {
                if(err){
                    console.log(err);
                }else {
                    res.send(`<script>alert("职员添加成功！");location.href="http://127.0.0.1:8080/index"</script>`);
                }
            });
        }
    });



});

//系统管理员注册
router.post("/adminregister.html",upload.single("aheadimage"),function (req,res) {
    // res.send("bb");
    let aname = req.body.aname;
    let apassword = req.body.apassword;
    let asex = req.body.asex;
    let atelephone = req.body.atelephone;
    let abirthday = req.body.abirthday;
    let aemail = req.body.aemail;
    let file = req.file || {};
    let aheadimage = file.filename || "";

    let model = new adminmodel();
    userconfigmodel.find({}).exec(function (err,data) {
        if(err){
            console.log(err);
        }else {
            let date = new Date();
            let hour = date.getHours().toString();
            let minute = date.getMinutes().toString();
            let temp = data[0].idincrement + 1;
            console.log(temp);
            data[0].idincrement = temp;
            data[0].save(function (err) {
                if(err){
                    console.log(err);
                }else {
                    console.log(`系统管理员增加一名:${temp}`);
                }
            })
            model.aid = temp + hour + minute;
            model.aname = aname;
            model.apassword = apassword;
            model.asex = asex;
            model.atelephone = atelephone;
            model.abirthday = abirthday;
            model.aemail = aemail;
            model.aheadimage = aheadimage;
         

            model.save(function (err) {
                if(err){
                    console.log(err);
                }else {
                    res.send(`<script>alert("系统管理员添加成功！");location.href="http://127.0.0.1:8080/index"</script>`);
                }
            });
        }
    });



});

// 登录验证
router.post("/login.html",function (req,res) {
  let username = req.body.username;
  let password = req.body.password;
  let logintype = req.body.logintype;
  switch (logintype) {
      case "会员":
          usermodel.find({"uname":username}).exec(function (err,data) {
            if(err){
              res.send({meg:"查找数据出错"});
            }else if(data.length > 0){
                // console.log(data[0].uid);
                if(data[0].upassword == password){
                    let jwt = new jwtutil(data[0].uid);
                    let token = jwt.generateToken();
                    res.send({status:"会员",meg:"登录成功",token:token,hit:data[0].uid});
                }else {
                    res.send({status:"会员",meg:"账号或密码错误"});
                }

            }else{
                res.send({status:"会员",meg:"没有该账号"});
            }
          });
          break;
      case "职员":
          workermodel.find({"wname":username}).exec(function (err,data) {
              if(err){
                  res.send({meg:"查找数据出错"});
              }else if(data.length > 0){
                  // console.log(data[0].uid);
                  if(data[0].wpassword == password){
                      let jwt = new jwtutil(data[0].wid);
                      let token = jwt.generateToken();
                      res.send({status:"职员",meg:"登录成功",token:token,hit:data[0].wid});
                  }else {
                      res.send({status:"职员",meg:"账号或密码错误"});
                  }

              }else{
                  res.send({status:"职员",meg:"没有该账号"});
              }
          });
          break;
      case "系统管理员":
          adminmodel.find({"aname":username}).exec(function (err,data) {
              if(err){
                  res.send({meg:"查找数据出错"});
              }else if(data.length > 0){
                  // console.log(data[0].uid);
                  if(data[0].apassword == password){
                      let jwt = new jwtutil(data[0].aid);
                      let token = jwt.generateToken();
                      res.send({status:"系统管理员",meg:"登录成功",token:token,hit:data[0].aid});
                  }else {
                      res.send({status:"系统管理员",meg:"账号或密码错误"});
                  }

              }else{
                  res.send({status:"系统管理员",meg:"没有该账号"});
              }
          });
          break;
  }

});



// router.get("/headimage",function (req,res) {
//     res.send("aaa");
// });




module.exports = router;
