var express = require('express');
var router = express.Router();
let connect = require("./connect");
let mongoose = require("mongoose");
let jwtutil = require("../util/jwt");
let dateformat = require("../util/util");
let dbmodel = require("../util/dbmodel");
let formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const qs = require("qs");




router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with,content-type,token,Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "text/html;charset=utf-8");
    next();
});



/* GET users listing. */
// 添加文章课程
router.post('/addcourse', function(req, res) {
    let token = req.headers.token;
    // 前端获取的数据
    let title = req.body.title;
    let synopsis = req.body.synopsis;
    let price = req.body.price;
    let content = req.body.content;
    let type = req.body.type;
    let chapters = req.body.chapters;
    let coursetype = req.body.coursetype;
    // console.log(typeof content);
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
        }else{
            len = data[0].cidincrement + 1;
            // console.log("前"+len);
            // console.log("后"+len);
            data[0].cidincrement = len;
            data[0].save(function (err) {
                if(err){
                    console.log("数据增加失败");
                }else {
                    console.log("课程号+1");
                    let course = new dbmodel.coursemodel();
                    course.cid = result +"-"+ len;
                    course.cname = title;
                    course.ccontent = content;
                    course.chits = 0;
                    course.cpubdate = time;
                    course.ctype = type;
                    course.wid = result;
                    course.csynopsis = synopsis;
                    course.cstudycount = 0;
                    course.cchapters = chapters;
                    course.cprice = price;
                    course.cevaluate = 0;       //评价
                    course.coursetype = 0;
                    course.showtype = "article";
                    course.save(function (err) {
                        if(err){
                            console.log("插入失败");
                        }else {
                            console.log("职员"+result+"上传一个课程");
                        }
                    });
                }
            });

        }
    });
    res.send({status:"添加课程"});
});
// 插入视频课程
router.post('/addvideo', function(req, res) {

    let token = req.headers.token;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    let tempPath = "./public/video/temp"+result;
    if(!fs.existsSync(tempPath)){
        fs.mkdirSync(tempPath);
    }
    let form = formidable.IncomingForm({
        uploadDir:tempPath,
        encoding:"utf-8",
        keepExtensions:true
    });
    form.parse(req,function (err,fields,files) {
        let filePath = files.file.path;
        console.log(filePath);
        let chapter = fields.chapter;
        let subchapter = fields.subchapter;
        let ext = path.extname(filePath);
        let filename = `chapter-${chapter}-subchapter-${subchapter}-${new Date().getTime()}${ext}`;
        let targetPath = path.join(__dirname,`/../public/video/temp${result}/${filename}`);
        if(err){
            res.send({status:0,message:"上传出错"});
        }else {
            fs.rename(filePath,targetPath,function (err) {
                if(err){
                    console.log(err);
                    res.send({status:-1,message:"操作失败"});
                }else {
                    res.send({status:200,message:"上传成功",filename:filename});
                }
            });
        }
    });

});
// 添加视频课程
router.post("/uploadVideoCourse",function (req,res) {
    // 获取token
    let token = req.headers.token;
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();         //workerid
    // 存储视频的临时真实路径
    let realPath = "./public/video/"+result;
    let tempPath = "./public/video/temp"+result;
    // 上传时间
    let date = new Date();
    let time = dateformat.format(date);
    if(!fs.existsSync(realPath)){
        fs.mkdirSync(realPath);
    }
    let form = formidable.IncomingForm({
        uploadDir:realPath,
        encoding:"utf-8",
        keepExtensions:true
    });
    form.parse(req,function (err,fields,files) {
        // 获取课程数据
        let content = JSON.parse(fields.content);
        let title = fields.title;
        let type = fields.type;
        let price = fields.price;
        let synopsis = fields.synopsis;
        let coursetype = fields.coursetype;
        if(err){
            res.send({status:0,message:"解析出错"});
        }else {
            if(!fs.existsSync(tempPath)){
                // 存入数据库
                dbmodel.userconfigmodel.find({}).exec(function (err,data) {
                        if(err){
                            console.log("数据库出错");
                        }else{
                            len = data[0].cidincrement + 1;
                            // console.log("前"+len);
                            // console.log("后"+len);
                            data[0].cidincrement = len;
                            data[0].save(function (err) {
                                if(err){
                                    console.log("数据增加失败");
                                }else {
                                    console.log("课程号+1");
                                    let course = new dbmodel.coursemodel();
                                    course.cid = result +"-"+ len;
                                    course.cname = title;
                                    course.ccontent = JSON.stringify(content);
                                    course.chits = 0;
                                    course.cpubdate = time;
                                    course.ctype = type;
                                    course.wid = result;
                                    course.csynopsis = synopsis;
                                    course.cstudycount = 0;
                                    course.cchapters = content.length;
                                    course.cprice = price;
                                    course.cevaluate = 0;
                                    course.coursetype = coursetype;
                                    course.showtype = "video";
                                    course.save(function (err) {
                                        if(err){
                                            console.log("插入失败");
                                        }else {
                                            console.log("职员"+result+"上传一个课程");
                                            res.send({status:1,message:"上传课程成功，目前没有上传视频"});
                                        }
                                    });
                                }
                            });
                        }
                    });
            }else {
                // 移动文件
                content.forEach((value, index) => {
                    value.subchapter.forEach((value2, index2) => {
                        let filename = value2.content;
                        let filePath = path.join(__dirname, `/../public/video/temp${result}/${filename}`);
                        let targetPath = path.join(__dirname, `/../public/video/${result}/${filename}`);
                        if(fs.existsSync(filePath)){
                            fs.renameSync(filePath, targetPath);
                        }
                    });
                });
                // 删除临时文件
                dateformat.deleteFolder(tempPath);
                dbmodel.userconfigmodel.find({}).exec(function (err,data) {
                    if(err){
                        console.log("数据库出错");
                    }else{
                        len = data[0].cidincrement + 1;
                        // console.log("前"+len);
                        // console.log("后"+len);
                        data[0].cidincrement = len;
                        data[0].save(function (err) {
                            if(err){
                                console.log("数据增加失败");
                            }else {
                                console.log("课程号+1");
                                let course = new dbmodel.coursemodel();
                                course.cid = result +"-"+ len;
                                course.cname = title;
                                course.ccontent = JSON.stringify(content);
                                course.chits = 0;
                                course.cpubdate = time;
                                course.ctype = type;
                                course.wid = result;
                                course.csynopsis = synopsis;
                                course.cstudycount = 0;
                                course.cchapters = content.length;
                                course.cprice = price;
                                course.cevaluate = 0;
                                course.coursetype = coursetype;
                                course.save(function (err) {
                                    if(err){
                                        console.log("插入失败");
                                    }else {
                                        console.log("职员"+result+"上传一个课程");
                                        res.send({status:1,message:"上传课程成功"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });

});

//查找课程
router.get("/showcourse",function (req,res) {
    let token = req.headers.token;
    let page = req.query.page;
    console.log(page);
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();         //workerid
    if(page == 0){
        dbmodel.coursemodel.find({"wid":result}).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                let totallen = data.length;     //总数
                let pagenum = Math.max(totallen/10,(Math.floor(totallen/10+1)));      //页数
                res.send({status:"查找课程总数",num:pagenum});
            }
        });
    }else {
        dbmodel.coursemodel.find({"wid":result}).limit(10).skip((page-1)*10).exec(function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send({status:`查找第${page}页课程成功`,course:data});
            }
        });
    }
});

// 修改文章课程
router.post("/modify",function (req,res) {
    let cid = req.body.cid;
    let cname = req.body.cname;
    let ctype = req.body.ctype;
    let ccontent =req.body.ccontent;
    let cprice = req.body.cprice;
    let csynopsis = req.body.csynopsis;
    let cchapter = ccontent.length;
    dbmodel.coursemodel.find({cid:cid}).exec(function (err,data) {
        if(err){
            console.log("数据库出错");
        }else if(data.length > 0){
            data[0].cname = cname;
            data[0].ctype = ctype;
            data[0].ccontent = ccontent;
            data[0].csynopsis = csynopsis;
            data[0].cchapters = cchapter;
            data[0].cprice = cprice;
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
// 修改视频课程
router.post('/modifyvideo', function(req, res) {

    let token = req.headers.token;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    let tempPath = "./public/video/temp"+result;
    let realPath = "./public/video/"+result;
    if(!fs.existsSync(tempPath)){
        fs.mkdirSync(tempPath);
    }
    if(!fs.existsSync(realPath)){
        fs.mkdirSync(realPath);
    }
    let form = formidable.IncomingForm({
        uploadDir:tempPath,
        encoding:"utf-8",
        keepExtensions:true
    });
    form.parse(req,function (err,fields,files) {
        let filePath = files.file.path;
        let chapter = fields.chapter;
        let subchapter = fields.subchapter;
        let filesourse = fields.filename;
        let ext = path.extname(filePath);
        let filename = `chapter-${chapter}-subchapter-${subchapter}-${new Date().getTime()}${ext}`;
        let tempTargetPath = path.join(__dirname,`/../public/video/temp${result}/${filename}`);
        let targetPath = path.join(__dirname,`/../public/video/${result}/${filename}`);
        let oldPath = path.join(__dirname,`/../public/video/${result}/${filesourse}`);
        if(err){
            res.send({status:0,message:"上传出错"});
        }else {
            fs.renameSync(filePath,tempTargetPath);
            fs.renameSync(tempTargetPath,targetPath);
            res.send({status:200,message:"视频上传成功",filename:filename});
        }
    });

});

// 删除视频
router.post('/deletevideo', function(req, res) {

    let token = req.headers.token;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    // 删除的文件名
    let filename = req.body.filename;
    console.log(filename);
    let filePath = path.join(__dirname,`/../public/video/${result}/${filename}`);
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
        res.send({status:200,message:"删除视频成功"});
    }else {
        res.send({status:204,message:"没有该视频"});
    }
});
// 删除章节
router.post('/deletechapter', function(req, res) {

    let token = req.headers.token;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    // 删除的文件名
    let filenames = req.body.filenames;
    filenames.forEach((value,index)=>{
        let filePath = path.join(__dirname,`/../public/video/${result}/${value}`);
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
    });
    res.send({status:200,message:"删除章节成功！"});

});
// 删除课程
router.get("/deletecourse",function (req,res) {
    let cid = req.query.cid;
    dbmodel.coursemodel.find({cid:cid}).exec(function (err,data) {
        if(err){
            console.log("数据库出差错");
            res.send({status:405,message:"查询出错"})
        }else {
            data[0].remove(function (err) {
                if(err){
                    console.log("删除出错");
                    res.send({status:406,message:"删除出错"})
                }else {
                    res.send({status:200,message:"删除成功"});
                }
            })
        }
    });
});

// 首页课程+课程页
router.get("/getcourse",function (req,res) {
    let type = req.query.type;
    // console.log(type);
    switch (type) {
        case "courselist":
            dbmodel.coursemodel.find({}).limit(30).exec(function (err,data) {
                if(err){
                    throw  err
                }else {
                    res.send({status:"获得课程页课程",course:data});
                }
            });
            break;
        case "indexcourse":
            dbmodel.coursemodel.find({chits:{$gte:10}}).limit(6).exec(function (err,data) {       //点击量10以上的课程
                if(err){
                    throw err;
                }else {
                    res.send({status:"获得热点课程",course:data});
                }
            })
            break;
    }

});

router.get("/getindexcourse",function (req,res) {
    let type = req.query.type;
    dbmodel.coursemodel.find({ctype:type}).limit(8).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            res.send({status:"获得首页课程",course:data});
        }
    })
});


router.get("/singlecourse",function (req,res) {
    let id = req.query.id;
    let hitflag = null;
    let token = req.headers.token;
    // 职员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    let coursedata = null;
    if(req.query.hitflag) {
        hitflag = req.query.hitflag;
    }
    dbmodel.coursemodel.find({cid:id}).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            if(hitflag == "true"){
                console.log("hitflag=true");
                data[0].chits ++;
                data[0].save(function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        res.send({status:"获得课程详情",course:data});
                    }
                });
            }else {
                coursedata = data;
                dbmodel.studymodel.find({cid:id,uid:result}).exec(function (err,data) {
                    if(err){
                        throw err;
                    }else{
                        if(data.length >0){
                            res.send({status:"获得课程详情",course:coursedata,study:data});
                        }
                    }
                });

            }
        }
    });
});

// 学习课程
router.post("/studycourse",function (req,res) {
    let token = req.headers.token;
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    let cid = req.body.cid;
    let price = req.body.price;
    dbmodel.studymodel.find({"uid":result,"cid":cid}).exec(function (err,data) {
        if(err){
            res.send({status:400,message:"出错"});
        }else {
            if(data.length>0){
                res.send({status:204,message:"你已经购买过该课程！"});
            }else {
                dbmodel.usermodel.find({"uid":result}).exec(function (err,data) {
                    if(err){
                        res.send({status:400,message:"出错"});
                    }else{
                        if(data.length>0){
                            let discount = data[0].udiscount;
                            let realprice = (discount/10)*price;
                            if((data[0].ucoin-realprice)>0){
                                data[0].ucoin = data[0].ucoin - realprice;
                                data[0].umonetary += realprice;
                                if(data[0].umonetary > 100&&data[0].umonetary<300){
                                    data[0].udiscount = 9;
                                    data[0].urank = 2;
                                }else if(data[0].umonetary >= 300&&data[0].umonetary<600){
                                    data[0].udiscount = 8;
                                    data[0].urank = 3;
                                }else if(data[0].umonetary >= 600&&data[0].umonetary<900){
                                    data[0].udiscount = 7;
                                    data[0].urank = 4;
                                }else if(data[0].umonetary >=900&&data[0].umonetary<1500){
                                    data[0].udiscount = 6;
                                    data[0].urank = 5;
                                }else if(data[0].umonetary >= 1500&&data[0].umonetary<2000){
                                    data[0].udiscount = 5;
                                    data[0].urank = 6;
                                }else if(data[0].umonetary >= 2000){
                                    data[0].udiscount = 4;
                                    data[0].urank = 7;
                                }
                                data[0].save(function (err) {
                                    if(err){
                                        res.send({status:400,message:"出错"});
                                    }else{
                                        dbmodel.coursemodel.find({"cid":cid}).exec(function (err,data) {
                                            if(err){
                                                res.send({status:400,message:"出错"});
                                            }else{
                                                if(data.length>0){
                                                    data[0].cstudycount ++;
                                                    data[0].save(function (err) {
                                                        if(err){
                                                            res.send({status:400,message:"出错"});
                                                        }else{
                                                            let study = new dbmodel.studymodel();
                                                            study.uid = result;
                                                            study.cid = cid;
                                                            study.studytime = 0;
                                                            study.studyprogress = 0;
                                                            study.studyedchapter = [];
                                                            study.save(function (err) {
                                                                if(err){
                                                                    res.send({status:400,message:"出错"});
                                                                }else{
                                                                    res.send({status:200,message:"成功购买课程！"});
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }else {
                                res.send({status:201,message:"余额不足，请及时充值！"});
                            }
                        }
                    }
                });
            }
        }
    });
});
router.post("/studycoursetime",function (req,res) {
    let time = req.body.time;
    let cid = req.body.cid;
    let chapter = req.body.studyedchapter;
    let courselength = 0;
    console.log(courselength);
    let token = req.headers.token;
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    dbmodel.studymodel.find({"cid":cid,"uid":result}).exec(function (err,data) {
        if(err){
            res.send({status:400,message:"出错"});
        }else{
            if(data.length>0){
                let oldstudytime = data[0].studytime;
                data[0].studytime += time/60000;
                dbmodel.coursemodel.find({"cid":cid}).exec(function (err,data2) {
                    if(err){
                        res.send({status:400,message:"出错"});
                    }else{
                        if(data2.length>0){
                            data2[0].ccontent.forEach(value=>{
                                courselength +=value.subchapter.length;
                            });
                            let progress = 100/courselength;
                            if(data[0].studyedchapter.includes(chapter)){
                                data[0].save(function (err) {
                                    if(err){
                                        res.send({status:400,message:"出错"});
                                    }else {
                                        if((data[0].studytime - oldstudytime) >= 30){
                                            dbmodel.usermodel.find({"uid":result}).exec(function (err,data3) {
                                                if(err) {
                                                    res.send({status: 400, message: "出错"});
                                                }else{
                                                    if(data3.length>0){
                                                        data3[0].uscore += 30;
                                                        data3[0].save(function (err) {
                                                            if(err){
                                                                res.send({status:400,message:"出错"});
                                                            }else {
                                                                res.send({status:200,message:"增加学习时间"});
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }else {
                                            res.send({status:202,message:"学习课程"});
                                        }
                                    }
                                });
                            }else {
                                data[0].studyedchapter.push(chapter);
                                data[0].studyprogress += progress;
                                if(data[0].studyprogress > 100){
                                    data[0].studyprogress = 100;
                                }
                                data[0].save(function (err) {
                                    if(err){
                                        res.send({status:400,message:"出错"});
                                    }else {
                                        if((data[0].studytime - oldstudytime) >= 30){
                                            dbmodel.usermodel.find({"uid":result}).exec(function (err,data3) {
                                                if(err) {
                                                    res.send({status: 400, message: "出错"});
                                                }else{
                                                    if(data3.length>0){
                                                        data3[0].uscore += 30;
                                                        data3[0].save(function (err) {
                                                            if(err){
                                                                res.send({status:400,message:"出错"});
                                                            }else {
                                                                res.send({status:200,message:"增加学习时间"});
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }else {
                                            res.send({status:203,message:"增加学习进度"});
                                        }
                                    }
                                });
                            }

                        }
                    }
                });

            }
        }
    });
});

router.get("/getmycourse",function (req,res) {
    let token = req.headers.token;
    // 会员信息
    let jwt = new jwtutil(token);
    let result = jwt.verifyToken();
    dbmodel.studymodel.find({uid:result}).exec(function (err,data) {
        if(err){
            throw err;
        }else {
            if(data.length>0){
                res.send({status:"获得考试详情",course:data});
            }
        }
    });
});

module.exports = router;
