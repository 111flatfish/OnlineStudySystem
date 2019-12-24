var express = require('express');
var router = express.Router();
let connect = require("./connect");
let mongoose = require("mongoose");
let jwtutil = require("../util/jwt");
let dateformat = require("../util/util");
let dbmodel = require("../util/dbmodel");

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with,content-type,token,Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "text/html;charset=utf-8");
    next();
});



/* GET users listing. */
// 插入留言
router.post('/addmessage', function(req, res) {
    // console.log(req.body.title);
    let token = req.headers.token;
    // 前端获取的数据
    let content = req.body.msg;
    let type = req.body.type;
    let cid = req.body.cid;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    let len ;
    let date = new Date();
    let time = dateformat.format(date);
    // 插入数据库
    dbmodel.userconfigmodel.find({}).exec(function (err,data) {
        if(err){
            console.log("数据库出错");
            res.send({status:400,message:"留言失败！"});
        }else{
            len = data[0].midincrement + 1;
            console.log(len);
            data[0].midincrement = len;
            data[0].save(function (err) {
                if(err){
                    console.log("数据增加失败");
                    console.log(err);
                    res.send({status:400,message:"留言失败！"});
                }else {
                    console.log("留言号+1");
                    let message = new dbmodel.messagemodel();
                    message.mid = result +"-"+ len;
                    message.mcontent = content;
                    message.mpubdate = time;
                    message.id = result;
                    message.type = type;
                    message.cid = cid;
                    message.save(function (err) {
                        if(err){
                            console.log("插入失败");
                            res.send({status:400,message:"留言失败！"});
                        }else {
                            console.log("用户"+result+"上传一个留言");
                            res.send({status:200,message:"添加留言成功！"});
                        }
                    });
                }
            });
        }
    });
});

//查找留言
router.get("/showmessage",function (req,res) {
    let token = req.headers.token;
    let page = req.query.page;
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();         //workerid
    let cid = req.query.cid;
    if (page == 0) {
        dbmodel.messagemodel.find({"cid": cid}).exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let totallen = data.length;     //总数
                let pagenum = Math.max(totallen / 10, (Math.floor(totallen / 10 + 1)));      //页数
                res.send({status: "查找留言总数", num: pagenum});
            }
        });
    } else {
        dbmodel.messagemodel.find({"cid": cid}).limit(10).skip((page - 1) * 10).exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send({status: `查找第${page}页留言成功`, message: data});
            }
        });
    }
});
router.post("/getsomemessage",function (req,res) {
    let cid = req.body.cid;
    dbmodel.messagemodel.find({"cid":cid}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.send({status:400,message:"出错"});
        }else {
            if(data.length>0){
                res.send({status:200,message:"获取课程留言成功！",messagelist:data.splice(0,6)});
            }else{
                res.send({status:200,message:"课程没有留言！",messagelist:data});
            }
        }
    });
});

// 删除留言
router.get("/deletemessage",function (req,res) {
    let mid = req.query.mid;
    dbmodel.messagemodel.find({mid:mid}).exec(function (err,data) {
        if(err){
            console.log("数据库出差错");
        }else {
            data[0].remove(function (err) {
                if(err){
                    console.log("删除出错");
                }else {
                    res.send({status:"删除成功！"});
                }
            })
        }
    });
});

// 首页新闻+新闻页
router.get("/getmessage",function (req,res) {
    let type = req.query.type;
    // console.log(type);
    switch (type) {
        case "messagelist":
            dbmodel.newsmodel.find({}).limit(30).exec(function (err,data) {
                if(err){
                    throw  err
                }else {
                    res.send({status:"获得新闻页新闻",news:data});
                }
            });
            break;
        case "indexmessage":
            dbmodel.newsmodel.find({nhits:{$gte:10}}).limit(6).exec(function (err,data) {       //点击量10以上的新闻
                if(err){
                    throw err;
                }else {
                    res.send({status:"获得热点新闻",news:data});
                }
            })
            break;
    }

});

// 留言详情
router.get("/singlemessage",function (req,res) {
    let id = req.query.id;
    let hitflag = req.query.hitflag;
    // console.log(typeof hitflag);
    dbmodel.newsmodel.find({nid:id}).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            if(hitflag == "true"){
                console.log("hitflag=true");
                data[0].nhits ++;
                data[0].save(function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        res.send({status:"获得新闻详情",news:data});
                    }
                });
            }else {
            res.send({status:"获得新闻详情",news:data});}
        }
    });


});



module.exports = router;
