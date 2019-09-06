var express = require('express');
var router = express.Router();
let connect = require("./connect");
let mongoose = require("mongoose");

/* GET users listing. */
// 用户打开首页检查
let visitorSchema = mongoose.Schema({
    vid:String,
    vname:String
});
let visitormodel = new mongoose.model("visitor",visitorSchema,"visitor");
router.get("/check.html",function (req,res) {
    // console.log(req);
    let vid = req.ip;
    visitormodel.findOne({vid:vid}).exec(function (err,data) {
        if(err){
            console.log(("链接数据库出错"));
            res.send({status:"数据库出错"});
        }else if(data == null){
            let date = new Date();
            let vname = "游客"+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
            let vmodel = new visitormodel();
            vmodel.vid = vid;
            vmodel.vname = vname;
            vmodel.save(function (err) {
                if(err){
                    throw err;
                }else {
                    res.send({status:"游客注册并登录",id:vid,name:vname});
                }
            });
        }else if(data != null){
            res.send({status: "游客登录",id:data.vid,name:data.vname});
        }

    });


});
module.exports = router;
