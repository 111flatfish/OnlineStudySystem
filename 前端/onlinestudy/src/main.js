import Vue from 'vue'
import App from './App.vue'
import "../public/css/bootstrap.css"
import "../public/js/jquery-3.4.1"
import "../public/js/bootstrap"
import router from "./route/router"
import Vuex from "vuex"
import store from "./store/index"

// import axios from "axios"
Vue.config.productionTip = false;
Vue.prototype.Show = false;
Vue.use(Vuex);

router.beforeEach((to,form,next)=>{
if(to.meta.requireAuth){
  if(window.localStorage.getItem("token")){
      next();
  }else {
    window.alert("未登录，请登录！");
    next({
      path:"/login",
      query:{redirect:to.fullPath}
    });
  }
}else {
  next();
}
})
export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

