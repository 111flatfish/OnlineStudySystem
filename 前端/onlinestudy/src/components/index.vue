<template>
  <div class="container">
    <h1 class="page-header">主页</h1>
    <div class="nav navbar nav-tabs">
      <router-link to="/newslist"><button class="btn btn-primary" @click="news">新闻</button ></router-link>
      <button class="btn btn-primary" @click="usercenter">个人中心</button>
      <button class="btn btn-primary" @click="login">登录</button>
      <button class="btn btn-primary" @click="register">注册</button>
    </div>
    <button @click="add" class="btn btn-primary">增加缓存</button>
    <button v-on:click="clearbuffer"  class="btn btn-primary">清除缓存</button>
    <button @click="checkbuffer"  class="btn btn-primary">查看缓存</button>
    <hr>
    <news></news>

  </div>


</template>


<script>
  import News from "./news/indexnews"
export default {
  name: 'Index',
  data(){
      return {
          status:""
      }
  },
  methods:{
    news(){
    },
    usercenter(){
        this.status = window.localStorage.getItem("usertype");
        switch (this.status) {
          case "会员":
            this.$router.push({path:"/user"});
            break;
          case "职员":
            this.$router.push({path:"/worker"});
            break;
          case "系统管理员":
            this.$router.push({path:"/admin"});
            break;

        }
    },
    login(){
      window.alert("新闻");
    },
    register(){
      window.alert("新闻");
    },



    clearbuffer(){
      window.console.log("清除成功！");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("test");

    },
    checkbuffer(){
      window.console.log("缓存长度："+window.localStorage.length);
      window.console.log("token:"+window.localStorage.getItem("token"));
      window.console.log("test:"+window.localStorage.getItem("test"));
    },
    add(){
      window.console.log("添加成功!");
      window.localStorage.setItem("test",new Date().toLocaleString());
    }
},
  created() {

  },
  components:{
    news:News
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button{
      margin: 20px;

    }
</style>
