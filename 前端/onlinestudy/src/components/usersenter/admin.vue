<template>
  <div class="user">
      <h1>系统管理员ID：{{ user.aid}}</h1>
      <h1>系统管理员名：{{ user.aname}}</h1>
      <h1>密码：{{user.apassword}}</h1>
    <img v-bind:src="'http://127.0.0.1/headimage/'+user.aheadimage " alt="" v-if="user.showheadimage">
    <h1>头像：</h1>
    <img src="../../assets/默认头像.png" alt="" v-if="!user.showheadimage">
    <h1>aaa</h1>
    <h1>{{token}}</h1>
    <button @click="getUserInfo">获取用户数据</button>
  </div>
</template>

<script>
  import axios  from "../../util/axios-auth"
export default {
  name: 'User',
  data(){
    return {
        user:{
          aid:"无",
          aname:"无",
          apassword:"无",
          aheadimage: "无",
          showheadimage:false
        },
        token:""
    }
  },
  methods:{
    // 测试token
    // aa(){
    //   axios.get("http://127.0.0.1/test.html",{
    //     headers:{Authorization:window.localStorage.getItem("token")},
    //     params:{id:2}}
    //   ).then(function (data) {
    //     window.console.log(data);
    //   })
    // }
    getUserInfo(){
      let that = this;
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
              that.user = data.data.info;
              if(data.data.info.uheadimage != null){
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
  },
  created() {
      this.user.aname = window.localStorage.getItem("vname");
      this.user.aid = window.localStorage.getItem("vid");

      // this.token = window.localStorage.getItem("token");
      // axios.get("http://127.0.0.1/").then(function (data) {
      //     window.console.log(data);
      // });
      // let userdata = JSON.parse(this.$route.params.userdata);
      // // window.console.log(userdata);
      // this.user = userdata;

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
