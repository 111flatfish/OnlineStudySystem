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
router.post('/addreply', function(req, res) {
    // console.log(req.body.title);
    let token = req.headers.token;
    // 前端获取的数据
    let content = req.body.content;
    let type = req.body.type;
    let mid = req.body.mid;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    // console.log(result);
    let len ;
    let date = new Date();
    let time = dateformat.format(date);
    // 插入数据库
    dbmodel.userconfigmodel.find({}).exec(function (err,data) {
        if(err){
            console.log("数据库出错");
            res.send({status:400,message:"回复失败！"});
        }else{
            len = data[0].ridincrement + 1;
            console.log(len);
            data[0].ridincrement = len;
            data[0].save(function (err) {
                if(err){
                    console.log("数据增加失败");
                    console.log(err);
                    res.send({status:400,message:"回复失败！"});
                }else {
                    console.log("回复号+1");
                    let reply = new dbmodel.replymodel();
                    reply.rid = result +"-"+ len;
                    reply.rcontent = content;
                    reply.rpubdate = time;
                    reply.id = result;
                    reply.rtype = type;
                    reply.mid = mid;
                    reply.save(function (err) {
                        if(err){
                            console.log("插入失败");
                            res.send({status:400,message:"回复失败！"});
                        }else {
                            console.log("用户"+result+"上传一个回复");
                            res.send({status:200,message:"添加回复成功！"});
                        }
                    });
                }
            });
        }
    });
});

//查找留言
router.get("/showreply",function (req,res) {
    let page = req.query.page;
    let mid = req.query.mid;
    if (page == 0) {
        dbmodel.replymodel.find({"mid": mid}).exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let totallen = data.length;     //总数
                let pagenum = Math.max(totallen / 10, (Math.floor(totallen / 10 + 1)));      //页数
                res.send({status: "查找回复总数", num: pagenum});
            }
        });
    } else {
        dbmodel.replymodel.find({"mid": mid}).limit(10).skip((page - 1) * 10).exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send({status: `查找第${page}页回复成功`, reply: data});
            }
        });
    }
});
router.post("/getonereply",function (req,res) {
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

// 删除回复
router.get("/deletereply",function (req,res) {
    let rid = req.query.rid;
    dbmodel.replymodel.find({rid:rid}).exec(function (err,data) {
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
router.get("/getreply",function (req,res) {
    let type = req.query.type;
    // console.log(type);
    switch (type) {
        case "replylist":
            dbmodel.newsmodel.find({}).limit(30).exec(function (err,data) {
                if(err){
                    throw  err
                }else {
                    res.send({status:"获得新闻页新闻",news:data});
                }
            });
            break;
        case "indexreply":
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
router.get("/singlereply",function (req,res) {
    let mid = req.query.mid;
    dbmodel.messagemodel.find({"mid":mid}).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            if (data.length > 0) {
                dbmodel.replymodel.find({"mid":mid}).exec(function (err,val) {
                    if(err){
                        throw err;
                    }else{
                        res.send({status:"获取留言回复",message:data[0],reply:val});
                    }
                });
            }else {
                res.send({status:"没有该留言",message:data});
            }
        }
    });


});



module.exports = router;
