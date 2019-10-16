<template>
  <div class="container">
    <div class="mainindex_header"></div>
    <h1 class="page-header">主页</h1>
    <div class="mianindex_content">
      <div class="nav navbar nav-tabs">
        <router-link to="/newslist"><button class="btn btn-primary" @click="news">新闻</button ></router-link>
        <router-link to="/course"><button class="btn btn-primary" @click="news">课程</button ></router-link>
        <button class="btn btn-primary" @click="usercenter">个人中心</button>
        <router-link to="/login" ><button class="btn btn-primary">登录</button></router-link>
        <router-link to="/register/userregister" ><button class="btn btn-primary">注册</button></router-link>
      </div>
      <button @click="add" class="btn btn-primary">增加缓存</button>
      <button v-on:click="clearbuffer"  class="btn btn-primary">清除缓存</button>
      <button @click="checkbuffer"  class="btn btn-primary">查看缓存</button>
      <hr>
      <news></news>
    </div>
    <hr>
    <h1>底部</h1>
    <div class="mainindex_footer"></div>
  </div>


</template>


<script>
  import News from "./indexnews"
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
        this.$router.push("/usercenter/userInfo");
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
