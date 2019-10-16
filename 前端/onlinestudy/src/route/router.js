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
        expireRouter,
        {
            path:"/",
            redirect:"/index"
        }
    ]
});



