var express = require('express');
var router = express.Router();
let connect = require("./connect");
let mongoose = require("mongoose");
let jwtutil = require("../util/jwt");
let formatutil = require("../util/util");
let dbmodel = require("../util/dbmodel");
let multer = require("multer");
let formidable = require("formidable");
let util = require("util");
let fs = require("fs");
let path = require("path");
// 上传文件路径
let upload = multer({dest:"../public/newsimage/"});


router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with,content-type,token,Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "text/html;charset=utf-8");
    next();
});



/* GET users listing. */
// 插入新闻
router.post('/addnews', function(req, res) {
    // console.log(req.body.title);
    let token = req.headers.token;
    let title = req.body.title;
    let content = req.body.content;
    let type = req.body.type;
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    // console.log(result);
    let len ;
    let date = new Date();
    let time = formatutil.format(date);
    // console.log(time);
        dbmodel.userconfigmodel.find({}).exec(function (err,data) {
            if(err){
                console.log("数据库出错");
            }else{
                len = data[0].nidincrement + 1;
                // console.log("前"+len);
                // console.log("后"+len);
                data[0].nidincrement = len;
                data[0].save(function (err) {
                    if(err){
                        console.log("数据增加失败");
                    }else {
                        console.log("新闻号+1");
                        let news = new dbmodel.newsmodel();
                        news.nid = result +"-"+ len;
                        news.nname = title;
                        news.ncontent = content;
                        news.nhits = 0;
                        news.npubdate = time;
                        news.ntype = type;
                        news.wid = result;
                        news.save(function (err) {
                            if(err){
                                console.log("插入失败");
                            }else {
                                console.log("职员"+result+"上传一条新闻");
                            }
                        });
                    }
                });

            }
        });
        res.send({status:"添加新闻"});

});

//查找新闻
router.get("/shownews",function (req,res) {
    let token = req.headers.token;
    let page = req.query.page;
    console.log(page);
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();         //workerid
    if(result == "err"){
        console.log("err");
        res.send({status:"expire"})
    }else {
        if (page == 0) {
            dbmodel.newsmodel.find({"wid": result}).exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    let totallen = data.length;     //总数
                    let pagenum = Math.max(totallen / 10, (Math.floor(totallen / 10 + 1)));      //页数
                    res.send({status: "查找新闻总数", num: pagenum});
                }
            });
        } else {
            dbmodel.newsmodel.find({"wid": result}).limit(10).skip((page - 1) * 10).exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.send({status: `查找第${page}页新闻成功`, news: data});
                }
            });
        }
    }
});

// 修改新闻
router.post("/modify",function (req,res) {
    let nid = req.body.nid;
    let nname = req.body.nname;
    let ntype = req.body.ntype;
    let ncontent =req.body.ncontent;

    dbmodel.newsmodel.find({nid:nid}).exec(function (err,data) {
        if(err){
            console.log("数据库出错");
        }else if(data.length > 0){
            data[0].nname = nname;
            data[0].ntype = ntype;
            data[0].ncontent = ncontent;
            data[0].save(function (err) {
                if(err){
                    console.log("修改失败");
                }else{
                    res.send({status:"修改成功"});
                }
            });
        }
    });
});

// 删除新闻
router.get("/deletenews",function (req,res) {
    let nid = req.query.nid;
    // console.log(nid);
    dbmodel.newsmodel.find({nid:nid}).exec(function (err,data) {
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
router.get("/getnews",function (req,res) {
    let type = req.query.type;
    // console.log(type);
    switch (type) {
        case "newslist":
            dbmodel.newsmodel.find({}).limit(30).exec(function (err,data) {
                if(err){
                    throw  err
                }else {
                    res.send({status:"获得新闻页新闻",news:data});
                }
            });
            break;
        case "indexnews":
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

// 新闻详情
router.get("/singlenews",function (req,res) {
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

router.post("/loadimg",function (req,res) {
    let form = new formidable.IncomingForm({
        uploadDir : "./public/newsimage",
        encoding:"utf-8",
        keepExtensions :true,
    });
    let fileExt = "",fileType = "",filename = "",filePath = "",targetPath = "";
    form.parse(req,function (err,fields,files) {
        // console.log(`fields:${fields}`);
        if(err){
            console.log(err);
        }else{
            for(let item in files){
                if(files[item].type) {
                    fileType = files[item].type;
                    filePath = files[item].path;
                    break;
                }
            }
            for(let i in formatutil.imgFormat){
                if(fileType== i){
                    fileExt = formatutil.imgFormat[i];
                }
            }
            filename = new Date().getTime() + fileExt;
            targetPath = path.join(__dirname,"/../public/newsimage/") + filename;
            console.log(targetPath);
            fs.rename(filePath,targetPath,function (err) {
                if(err){
                    console.log(`err:${err.message}`);
                }else{
                    console.log("上传图片成功："+filename);
                    res.send({
                        echo:0,
                        data:[
                            "newsimage/"+filename
                        ]
                    });
                }
            });
        }
    })

});



module.exports = router;
