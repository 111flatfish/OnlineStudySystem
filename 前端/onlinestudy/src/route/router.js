import Vue from "vue"
import Router from "vue-router"
import loginRouter from "./login"
import indexRouter from "./index"
import registerRouter from "./register"



Vue.use(Router);

export default new Router({
    mode:"history",
    routes:[
        loginRouter,
        indexRouter,
        registerRouter,
        {
            path:"/",
            redirect:"/index"
        }
    ]
});



