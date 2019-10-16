import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "jquery/dist/jquery"
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

