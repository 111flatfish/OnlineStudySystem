var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let infoRouter = require("./routes/infogetter");
let newsRouter = require("./routes/news");
let courseRouter = require("./routes/course");
let messageRouter = require("./routes/message");
let replyRouter = require("./routes/reply");
let examRouter = require("./routes/exam");
const JwtUtil = require("./util/jwt");
// let headimageRouter = require("./headimage");
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 验证token
// app.use(function (req, res, next) {
//   //
//   if (req.url != '/login.html' && req.url != '/register.html' && req.url != '/check.html') {
//
//     // 验证
//     console.log(req.headers);
//     let token = req.headers.token;
//     console.log("token:"+token);
//     let jwt = new JwtUtil(token);
//     let result = jwt.verifyToken();
//     console.log(result);
//     // window.localStorage.setItem("uid",result);
//     // let uid = window.localStorage.getItem("uid");
//     // console.log("suid:"+uid);
//
//     if(result == "err"){
//       // res.send("<script>alert('登录已过期！请重新登录！');window.location.href = 'http://127.0.0.1:8080/login'</script>");
//       // res.render("error");
//       console.log("出错");
//     } else {
//       console.log("验证成功！");
//
//       next();
//     }
//   //
//   }
//   next();
// });

// 测试token
// app.use(function (req, res, next) {
//
//   if (req.url != '/login.html' && req.url != '/register.html' && req.url != '/check.html') {
//     // console.log("req:"+[...req]);
//     // console.log(req);
//     console.log(req.headers);
//     let token = req.headers.token;
//     console.log("token:"+token);
//     // let jwt = new JwtUtil(token);
//     // let result = jwt.verifyToken();
//     // console.log(result);
//     // if(result == "err"){
//     //   res.send("<script>alert('登录已过期！请重新登录！');window.location.href = 'http://127.0.0.1:8080/login'</script>");
//     // } else {
//     //   console.log("验证成功！");
//     //   next();
//     // }
//     next();
//   }
//   else {
//     next()
//   };
//   // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
//   // if (req.url != '/login.html' && req.url != '/register.html' && req.url != '/check.html') {
//   //   let token = req.header.token;
//   //   console.log(req.get("token"));
//   //   console.log(token);
//   //   let jwt = new JwtUtil(token);
//   //   let result = jwt.verifyToken();
//   //   // 如果考验通过就next，否则就返回登陆信息不正确
//   //   if (result == 'err') {
//   //     console.log(result);
//   //     res.send("<script>alert('请重新登录！');window.location.href = 'http://127.0.0.1:8080/login'</script>");
//   //     // res.render('login.html');
//   //   } else {
//   //     next();
//   //   }
//   // } else {
//   //   next();
//   // }
// });
// 游客注册


// 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/infogetter',infoRouter);
app.use('/news',newsRouter);
app.use("/course",courseRouter);
app.use("/exam",examRouter);
app.use("/message",messageRouter);
app.use("/reply",replyRouter);
// app.use("/headimage",headimageRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err.message);
  res.status(err.status || 500);
  res.render('error');
});


app.listen(80,function () {
    console.log("服务器已开启！");
});


module.exports = app;
