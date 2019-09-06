<template>
  <div class="user1">
     <div class="info1">
         <h1>职员ID：{{ user.wid}}</h1>
         <h1>职员名：{{ user.wname}}</h1>
         <h1>密码：{{user.wpassword}}</h1>
         <img v-bind:src="'http://127.0.0.1/headimage/'+user.wheadimage " alt="" v-if="user.showheadimage">
         <h1>头像：</h1>
         <img src="../../../assets/默认头像.png" alt="" v-if="!user.showheadimage">
         <h1>aaa</h1>

         <button @click="getUserInfo">获取用户数据</button>
     </div>
      <hr>
      <div class="box2">
          <h3>首页 <span></span></h3>
          <ul>
              <li><a href="#">课程</a></li>
              <li><a href="#">个人中心</a></li>
              <li><a href="#">新闻</a></li>
              <li><a href="#">关于</a></li>

          </ul>
          <h3>课程<span></span></h3>
          <ul>
              <li><a href="#">分类</a></li>
              <li><a href="#">收费</a></li>
              <li><a href="#">免费</a></li>
              <li><a href="#">考试</a></li>
          </ul>
          <h3>新闻<span></span></h3>
          <ul>
              <li @click="uploaded"><a href="#">已上传</a></li>
              <li @click="published"><a href="#">已发布</a></li>
              <li @click="mynews"><a href="#">我的新闻</a></li>
              <li><a href="#">关于</a></li>
          </ul>
          <h3>个人中心<span></span></h3>
          <ul>
              <li><a href="#">个人资料</a></li>
              <li><a href="#">我的课程</a></li>
              <li><a href="#">我的历史</a></li>
              <li><a href="#">会员信息</a></li>
          </ul>
      </div>
      <hr>
      <div class="mynew" v-if="showmynew">
          <shownew></shownew>
      </div>
  </div>
</template>

<script>
  import axios  from "../../../util/axios-auth"
  import jquery from "jquery/dist/jquery"
  import Shownew from "./../newsmanage/shownews"


  export default {
  name: 'News',
  data(){
    return {
        user:{
          wid:"无",
          wname:"无",
          wpassword:"无",
          wheadimage: "无",
          showheadimage:false
        },
        token:"",
        showmynew:true,
        showadd:false
    }
  },
  methods:{
    getUserInfo(){
      let that = this;
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
      })
    },
      uploaded(){

      },
      published(){

      },
      mynews(){
          this.$router.go(0);



      }
  },
  created() {
      this.user.wname = window.localStorage.getItem("vname");
      this.user.wid = window.localStorage.getItem("vid");
      setTimeout(function(){
          // jquery(".info").css("backgroundcolor","red");
          jquery(".box2 h3").eq(2).addClass("open2").next("ul").show();
          jquery(".box2 h3").click(function () {
              // 下拉式菜单
              // $(this).toggleClass("open1").next("ul").slideToggle();
              jquery(this).toggleClass("open2")
                  .siblings("h3").removeClass("open2");
              jquery(this).next("ul")
                  .slideToggle()
                  .siblings("ul").slideUp();
          });
      },0)
  },
      components:{
          shownew:Shownew
      },
      mounted() {

      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .user1{
        position: relative;
    }
    .box2{
        position: absolute;
        left: 0;
        top:0;
    }
    .info1{
        position:absolute;
        left: 220px;
        top:0;
    }
    .box2 *{
        font-family:"Microsoft YaHei";
    }
    .box2 ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: none;

    }
    .box2 h3{

        width: 200px;
        height: 50px;
        margin:0px;
        background-color:mediumseagreen;
        line-height: 35px;
        padding: 5px 10px;
        border: 1px solid #000011;
        border-bottom: 0px;
        position: relative;
    }
    .box2 h3:hover{
        background-color:#990099;
    }
    .box2 a{
        text-decoration: none;
    }
    .box2 ul li{
        text-align: center;
        background-color: #ccc;
        width: 200px;
        height: 30px;
        padding: 5px 10px;
        margin: 0;
        border:1px solid #001;
        border-bottom: 0px;
        cursor: pointer;
    }
    .box2 ul li:hover{
        background-color: aquamarine;
    }
    .box2 h3 span {
        background: url("../../../assets/right.png") no-repeat;
        position: absolute;
        height: 32px;
        width: 32px;
        right: 10px;
        top:13px;
    }
    .box2 h3.open2 span{
        background: url("../../../assets/down.png") no-repeat;
    }
    .mynew{
        position: absolute;
        left: 200px;
        top:400px;
    }
</style>
