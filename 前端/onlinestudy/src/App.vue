<template>
  <div id="app" class="container">
    <!--<Register></Register>-->
    <!--<Login></Login>-->
    <!--<Index></Index>-->
    <!--<a href="http://127.0.0.1:80/check.html">点击</a>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Register from "./components/register/userRegister"
// import Index from "./components/index"
// import Login from "./components/login"

import axios from "axios"

export default {
  name: 'app',
  components: {
    // HelloWorld
    // Register,
    // Index
    // Login
  },

  // axios.get('/user?ID=12345')
  //         .then(function (response) {
  //           // handle success
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           // handle error
  //           console.log(error);
  //         })
  //
  // axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  //         .then(function (response) {
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  created() {
      // let that = this;
      axios.get("http://127.0.0.1:80/infogetter/check.html").then(function(data){
          window.console.log("请求成功！");
          let info = data.data;
          window.console.log(info.name);
          if(info.status != "数据库出错"){
              // 游客数据
              window.localStorage.setItem("beforehit","无id");
              window.localStorage.setItem("afterhit",info.id);
              window.localStorage.setItem("vid",info.id);
              window.localStorage.setItem("vname",info.name);
          }else {
            // that.$router.push({path:'/error'});
            window.alert("数据库出错了");
          }


          // console.log(data);
         //  let req = /^(.*):(\d*)\.(\d*)\.(\d*)\.(\d*)$/i;
         // let result =  str.match(req);
         //  window.console.log(result);
      });
  }
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
