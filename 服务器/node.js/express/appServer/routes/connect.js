var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

let connect = mongoose.connect("mongodb://127.0.0.1:27017/studydb",function (err) {
    if(err){
      throw err;
    }else {
      console.log("链接数据库成功！");
    }

});

/* GET home page. */

module.exports = connect;
