import Vue from "vue"
import Router from "vue-router"
import loginRouter from "./login"
import indexRouter from "./index"
import registerRouter from "./register"
import newsRouter from "./news"
import courseRouter from "./course"
import examRouter from "./exam"
import usercenterRouter from "./usercenter"
import singlenewsRouter from "./singlenews"
import singlereplyRouter from "./singlereply"
import showmessageRouter from "./showmessage"
import articleRouter from "./article"
import videoRouter from "./video"
import singlecourseRouter from "./singlecourse"
import singleexamRouter from "./singleexam"
import examcontentRouter from "./examcontent"
import expireRouter from "./expire"


Vue.use(Router);

export default new Router({
    mode:"history",
    routes:[
        loginRouter,
        indexRouter,
        registerRouter,
        newsRouter,
        courseRouter,
        examRouter,
        usercenterRouter,
        singlenewsRouter,
        singlecourseRouter,
        expireRouter,
        articleRouter,
        videoRouter,
        singlereplyRouter,
        showmessageRouter,
        singleexamRouter,
        examcontentRouter,
        {
            path:"/",
            redirect:"/index"
        }
    ]
});



