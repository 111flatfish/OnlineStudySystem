<template>
  <div class="login">
    <form action="" method="post">
      会员：<input type="radio" name="logintype" value="会员" v-model="formdata.logintype">
      职员：<input type="radio" name="logintype" value="职员" v-model="formdata.logintype">
      系统管理员：<input type="radio" name="logintype" value="系统管理员" v-model="formdata.logintype">
      <br>
      <input type="text" name="username" v-model="formdata.username" placeholder="用户">
      <input type="password" name="password" v-model="formdata.password" placeholder="密码">
      <input type="button" value="登录" @click="loginsubmit" class="btn btn-primary">
    </form>
  </div>
</template>

<script>
  import axios from "../util/axios-auth"
  import Qs from "qs"
export default {
  name: 'Login',
  data(){
    return {
        formdata:{
          username:"",
          password:"",
          logintype:""
        },
        token:""

    }
  },
  methods:{
    loginsubmit(){
       let that = this;
        let data = Qs.stringify(this.formdata);
        window.console.log(data);
        axios.post("http://127.0.0.1/login.html",data
        ).then(function (data) {
            // window.console.log(data.data.token);
            // this.token = window.localStorage.getItem("token") || "";
            // if(this.token != data.data.token){
            //     window.localStorage.setItem("token",data.data.token);
            // }
            window.console.log("logintype"+data.data.status);
            window.console.log("logintoken"+data.data.token);
            window.localStorage.setItem("token",data.data.token);
            window.console.log("aa");

            // 登录状态
          switch (data.data.meg) {
            case "查找数据出错":
                window.alert(`${data.data.meg}，服务器正维护中`);
              break;
            case "账号或密码错误":
              window.alert(`${data.data.meg}，请重新输入`);
              break;
            case "没有该账号":
              window.alert(`${data.data.meg}，请注册`);
              break;
            case "登录成功":
              window.alert("登录成功！");
              window.localStorage.setItem("usertype",data.data.status);
              window.localStorage.setItem("afterhit",data.data.hit);
              that.$router.push({path:'/index'});
              break;
          }

          // 跳转
          // let userdata = JSON.stringify(data.data)


        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
