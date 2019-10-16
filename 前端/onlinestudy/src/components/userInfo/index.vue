<template>
  <div class="userInfo">
    <h1>用户ID：{{ user.uid}}</h1>
    <h1>用户名：{{ user.uname}}</h1>
    <h1>密码：{{user.upassword}}</h1>
    <h1>头像：</h1>
      <img v-bind:src="'http://127.0.0.1/headimage/'+user.uheadimage " alt="" v-if="user.showheadimage" class="headimg">
      <img src="../../assets/默认头像.png" alt="" v-if="!user.showheadimage">
    <hr>
    <p>用户类型：{{status}}</p>
  </div>
</template>

<script>
  import axios  from "../../util/axios-auth"
  export default {
    name: 'userInfo',
    data(){
      return {
        user:{
          uid:"",
          uname:"",
          upassword:"",
          uheadimage: "",
          showheadimage:false
        },
        token:"",
        status:window.localStorage.getItem("usertype")
      }
    },
    methods:{

    },
    created() {
      // this.user.uname = window.localStorage.getItem("vname");
      // this.user.uid = window.localStorage.getItem("vid");
        let that = this;
        if(this.status == "会员"){
          axios.get("http://127.0.0.1/user.html",{
            // headers:{Authorization:window.localStorage.getItem("token")},
            params:{type:1}}
          ).then(function (data) {
            if(data.data){
              if(data.data.status == "unsign"){
                window.alert("你未登录，请登录！")
                that.$router.push({path:'/login'});
              }else if(data.data.status == "success"){
                window.console.log("获取数据成功");
                that.user = data.data.info;
                window.console.log("aa");
                if(data.data.info.uheadimage != ""){
                  that.user.showheadimage = true;
                }
              }else if(data.data.status == "expire"){
                window.alert("用户登录已过期，请重新登录！");
                that.$router.push({path:'/login'});
              }else {
                window.alert("用户登录信息出错，请重新登录！");
                that.$router.push({path:'/login'});
              }
            }

          })
        }else if(this.status == "职员"){
          axios.get("http://127.0.0.1/user.html",{
            // headers:{Authorization:window.localStorage.getItem("token")},
            params:{type:2}}
          ).then(function (data) {
            if(data.data){
              if(data.data.status == "unsign"){
                window.alert("你未登录，请登录！")
                that.$router.push({path:'/login'});
              }else if(data.data.status == "success"){
                window.console.log("获取数据成功");
                that.user.uid = data.data.info.wid;
                that.user.uname = data.data.info.wname;
                that.user.upassword = data.data.info.wpassword;
                that.user.uheadimage = data.data.info.wheadimage;
                if(data.data.info.wheadimage != ""){
                  that.user.showheadimage = true;
                }
              }else if(data.data.status == "expire"){
                window.alert("用户登录已过期，请重新登录！");
                that.$router.push({path:'/login'});
              }else {
                window.alert("用户登录信息出错，请重新登录！");
                that.$router.push({path:'/login'});
              }
            }
          })
        }else {
          axios.get("http://127.0.0.1/user.html",{
            // headers:{Authorization:window.localStorage.getItem("token")},
            params:{type:3}}
          ).then(function (data) {
            if(data.data){
              if(data.data.status == "unsign"){
                window.alert("你未登录，请登录！")
                that.$router.push({path:'/login'});
              }else if(data.data.status == "success"){
                window.console.log("获取数据成功");
                that.user.uid = data.data.info.aid;
                that.user.uname = data.data.info.aname;
                that.user.upassword = data.data.info.apassword;
                that.user.uheadimage = data.data.info.aheadimage;
                if(data.data.info.aheadimage != ""){
                  that.user.showheadimage = true;
                }
              }else if(data.data.status == "expire"){
                window.alert("用户登录已过期，请重新登录！");
                that.$router.push({path:'/login'});
              }else {
                window.alert("用户登录信息出错，请重新登录！");
                that.$router.push({path:'/login'});
              }
            }
            // window.console.log(data.data.status);
          })
        }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headimg{
  border: 1px solid #1b1e21;
  border-radius:50%;
}
</style>
