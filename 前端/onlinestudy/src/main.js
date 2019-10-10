import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "jquery/dist/jquery"
import VueRouter from "vue-router"
import User from "./components/usersenter/user"
import Worker from "./components/usersenter/worker"
import Admin from "./components/usersenter/admin"
import Index from "./view"
import Login from "./view/login"
import Test from "./components/test"
import Register from "./view/Register"
import Singlenews from "./components/news/singlenewslist"
import NewsManage from "./components/usersenter/newsmanage/news"
import Newslist from "./components/news/newslist"
import Vuex from "vuex"
import store from "./store/index"

// import axios from "axios"
Vue.config.productionTip = false;
Vue.prototype.Show = false;
Vue.use(VueRouter);
Vue.use(Vuex);
const router = new VueRouter({
      routes:[
        {path:"/user",component:User},
        {path:"/worker",component:Worker},
        {path:"/admin",component:Admin},
        {path:"/index",component:Index},
        {path:"/login",component:Login},
        {path:"/register",component:Register},
        {path:"/test",component:Test},
        {path:"/newsmanage",component:NewsManage},
        {path:"/singlenews/:id",component:Singlenews},
        {path:"/newslist",component:Newslist},
      ],
      mode:"history"
});
new Vue({
  router,
    store,
  render: h => h(App),
}).$mount('#app')
