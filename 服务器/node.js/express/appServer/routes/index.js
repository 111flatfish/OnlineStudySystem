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
            res.send({status:"expire",info:null});
        }else {
            switch (type) {
                case "1":
                    console.log("用户");
                    dbmodel.usermodel.findOne({"uid":result}).exec(function (err,data) {
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
                    dbmodel.workermodel.findOne({"wid":result}).exec(function (err,data) {
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
                    dbmodel.adminmodel.findOne({"aid":result}).exec(function (err,data) {
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

  let model = new dbmodel.usermodel();
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
          });
          model.uid = temp + hour + minute;
          model.uname = uname;
          model.upassword = upassword;
          model.usex = usex;
          model.utelephone = utelephone;
          model.ubirthday = ubirthday;
          model.uemail = uemail;
          model.uheadimage = uheadimage;
          model.uscore = 0;     //积分
          model.umonetary = 0;  //消费金额
          model.ucoin = 0;      //金币
          model.urank = 1;       //等级
          model.udiscount = 0;  //折扣
          model.uacitve = 1;      //状态

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

    let model = new dbmodel.workermodel();

    dbmodel.userconfigmodel.find({}).exec(function (err,data) {
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

    let model = new dbmodel.adminmodel();
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
          dbmodel.usermodel.find({"uname":username}).exec(function (err,data) {
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
          dbmodel.workermodel.find({"wname":username}).exec(function (err,data) {
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
          dbmodel.adminmodel.find({"aname":username}).exec(function (err,data) {
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
