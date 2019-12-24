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
// 插入考试
router.post('/addexam', function(req, res) {
    // console.log(req.body.title);
    let token = req.headers.token;
    // 前端获取的数据
    let content = req.body.content;
    let title = req.body.title;
    let type = req.body.type;
    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    let examtime = req.body.time;
    let synopsis = req.body.synopsis;
    let score = req.body.score;
    let certificate = req.body.certificate;
    let passgrade = req.body.passgrade;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    // console.log(result);
    let len ;
    // 上传时间
    let date = new Date();
    let time = dateformat.format(date);
    // 插入数据库
    dbmodel.userconfigmodel.find({}).exec(function (err,data) {
        if(err){
            console.log("数据库出错");
        }else{
            len = data[0].eidincrement + 1;
            // console.log("前"+len);
            // console.log("后"+len);
            data[0].eidincrement = len;
            data[0].save(function (err) {
                if(err){
                    console.log("数据增加失败");
                }else {
                    console.log("考试号+1");
                    let exam = new dbmodel.exammodel();
                    exam.eid = result +"-"+ len;
                    exam.econtent = JSON.stringify(content);
                    exam.epubdate = time;
                    exam.esubject = type;
                    exam.wid = result;
                    exam.starttime = starttime;
                    exam.endtime = endtime;
                    exam.etime = examtime;
                    exam.esynopsis = synopsis;
                    exam.etitle = title;
                    exam.escore = score;
                    exam.ecertificate = certificate;
                    exam.passgrade = passgrade;
                    exam.save(function (err) {
                        if(err){
                            console.log("插入失败");
                            console.log(err);
                        }else {
                            console.log("职员"+result+"上传一个考试");
                        }
                    });
                }
            });

        }
    });

    res.send({status:"添加考试"});
});

//查找考试
router.get("/showexam",function (req,res) {
    let token = req.headers.token;
    let page = req.query.page;
    console.log(page);
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();         //workerid
    if(page == 0){
        dbmodel.exammodel.find({"wid":result}).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                let totallen = data.length;     //总数
                let pagenum = Math.max(totallen/10,(Math.floor(totallen/10+1)));      //页数
                res.send({status:"查找考试总数",num:pagenum});
            }
        });
    }else {
        dbmodel.exammodel.find({"wid":result}).limit(10).skip((page-1)*10).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send({status:`查找第${page}页考试成功`,exam:data});
            }
        });
    }
});

// 修改考试
router.post("/modifyexam",function (req,res) {
    let eid = req.body.eid;
    let content = req.body.econtent;
    let title = req.body.etitle;
    let type = req.body.esubject;
    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    let etime = req.body.etime;
    let synopsis = req.body.esynopsis;

    dbmodel.exammodel.find({eid:eid}).exec(function (err,data) {
        if(err){
            console.log("数据库出错");
        }else if(data.length > 0){
            data[0].econtent = JSON.stringify(content);
            data[0].esubject = type;
            data[0].starttime = starttime;
            data[0].endtime = endtime;
            data[0].etime = etime;
            data[0].esynopsis = synopsis;
            data[0].etitle = title;
            data[0].save(function (err) {
                if(err){
                    console.log("修改失败");
                    console.log(err);
                }else {
                    res.send({status:"修改考试成功！"});
                }
            });
        }
    });
});

// 删除考试
router.get("/deleteexam",function (req,res) {
    let eid = req.query.eid;
    dbmodel.exammodel.find({eid:eid}).exec(function (err,data) {
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

// 查看考试结果
router.get("/checkgrade",function (req,res) {
    let eid = req.query.eid;
    let page = req.query.page;
    if(page == 0){
        dbmodel.attendexammodel.find({"eid":eid}).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                let totallen = data.length;     //总数
                let pagenum = Math.max(totallen/10,(Math.floor(totallen/10+1)));      //页数
                res.send({status:"查找考试总数",num:pagenum});
            }
        });
    }else {
        dbmodel.attendexammodel.find({"eid":eid}).limit(10).skip((page-1)*10).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send({status:`查找第${page}页考试成功`,grade:data});
            }
        });
    }
});

// 考试处理
router.post("/handleexam",function (req,res) {
    let token = req.headers.token;
    let answerlist = req.body.answerlist;
    let eid = req.body.eid;
    let certificate = null;
    let jwt = new jwtutil(token);
    let uid = jwt.verifyToken();         //workerid
    dbmodel.exammodel.find({"eid":eid}).exec(function (err,data) {
        if(err){
            console.log(err);
            res.send({status:400,message:"出错！"});
        }else {
            if(data.length>0){
                let score = data[0].escore;
                let rightnum = 0;
                let passgrade = data[0].epassgrade;
                certificate = data[0].ecertificate;
                let question = JSON.parse(data[0].econtent);
                question.forEach((value,index)=>{
                    if(index <= answerlist.length-1){
                        if(answerlist[index] == value.answer){
                            rightnum++;
                        }
                    }
                });
                dbmodel.attendexammodel.find({"uid":uid,"eid":eid}).exec(function (err,data) {
                    if(err){
                        console.log(err);
                        res.send({status:400,message:"出错！"});
                    }else {
                        data[0].grade = score*rightnum;
                        if((score*rightnum)>=passgrade){
                            data[0].hascertificate = true;
                        }else {
                            data[0].hascertificate = false;
                        }
                        if(data.length>0){
                            data[0].save(function (err) {
                                if(err){
                                    console.log(err);
                                    res.send({status:401,message:"提交考卷失败！"});
                                }else {
                                    res.send({status:200,message:"提交考卷成功！",result:data,certificate:certificate});
                                }
                            });
                        }
                    }
                });
            }else {
                res.send({status:200,message:"没有找到该考试！"});
            }
        }
    });


});

// 参加考试
router.post('/addattendexam', function(req, res) {
    let token = req.headers.token;
    // 前端获取的数据
    let eid = req.body.eid;
    // 会员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    // 插入数据库
    dbmodel.attendexammodel.find({"uid":result,"eid":eid}).exec(function (err,data) {
        if(err){
            console.log(err);
            res.send({status:400,message:"出错！"});
        }else {
            if(data.length>0){
                res.send({status:201,message:"你已经参加过该考试，不可再参加！"});
            }else {
                let attendexam = new dbmodel.attendexammodel();
                attendexam.uid = result;
                attendexam.eid = eid;
                attendexam.grade = 0;
                attendexam.hascertificate = false;
                attendexam.save(function (err) {
                    if(err){
                        console.log(err);
                        res.send({status:400,message:"插入失败！"});
                    }else {
                        console.log("用户"+result+"参加了考试");
                        res.send({status:200,message:"参加考试成功！"});
                    }
                });
            }
        }
    });

});

// 首页新闻+新闻页
router.get("/getexam",function (req,res) {
    let type = req.query.type;
    // console.log(type);
    switch (type) {
        case "examlist":
            dbmodel.exammodel.find({}).limit(30).exec(function (err,data) {
                if(err){
                    throw  err
                }else {
                    res.send({status:"获得新闻页新闻",exam:data});
                }
            });
            break;
        case "indexexam":
            dbmodel.exammodel.find({nhits:{$gte:10}}).limit(6).exec(function (err,data) {       //点击量10以上的新闻
                if(err){
                    throw err;
                }else {
                    res.send({status:"获得热点新闻",exam:data});
                }
            })
            break;
    }

});

router.get("/getindexexam",function (req,res) {
    let type = req.query.type;
    console.log(type);
    dbmodel.exammodel.find({esubject:type}).limit(8).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            res.send({status:"获得首页考试",exam:data});
        }
    })
});

// 新闻详情
router.get("/singleexam",function (req,res) {
    let id = req.query.id;
    dbmodel.exammodel.find({eid:id}).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            if(data.length>0){
                res.send({status:"获得考试详情",exam:data});
            }
        }
    });
});

router.get("/getmyexam",function (req,res) {
    let token = req.headers.token;
    // 会员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    dbmodel.attendexammodel.find({uid:result}).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            if(data.length>0){
                res.send({status:"获得考试详情",exam:data});
            }
        }
    });
});

// 用户管理
router.get("/showusermanage",function (req,res) {
    let token = req.headers.token;
    // 前端获取的数据
    let page = req.query.page;
    // 会员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    if(page == 0){
        dbmodel.usermanagemodel.find({"aid":result}).exec(function (err,data) {
            if(err){
                res.send({status:400,message:"出错"});
            }else{
                let totallen = data.length;     //总数
                let pagenum = Math.max(totallen/10,(Math.floor(totallen/10+1)));      //页数
                res.send({status:"查找考试总数",num:pagenum});
            }
        });
    }else {
        dbmodel.usermanagemodel.find({"aid":result}).limit(10).skip((page-1)*10).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send({status:`查找第${page}页考试成功`,usermanage:data});
            }
        });
    }
});


module.exports = router;
