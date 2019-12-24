<template>
  <div class="usercenterNav">
    <div class="box1">
      <h3>个人中心<span></span></h3>
      <ul>
        <router-link tag="li" to="/usercenter/userInfo">个人资料</router-link>
        <li><a href="#">我的课程</a></li>
        <li><a href="#">我的历史</a></li>
        <li><a href="#">会员信息</a></li>
      </ul>
      <h3  v-show="islogin">用户管理<span></span></h3>
      <ul>
        <router-link tag="li" to="/usercenter/usermanage" v-show="islogin">管理用户</router-link>
      </ul>
      <h3>课程<span></span></h3>
      <ul>
        <router-link tag="li" to="/usercenter/mycourse" v-show="!islogin">我的课程</router-link>
        <router-link tag="li" to="/usercenter/coursemanage/showcourse" v-show="islogin">课程管理</router-link>
      </ul>
      <h3>考试<span></span></h3>
      <ul>
        <router-link tag="li" to="/usercenter/myexam" v-show="!islogin">我的考试</router-link>
        <router-link tag="li" to="/usercenter/exammanage/showexam" v-show="islogin">考试管理</router-link>
      </ul>
      <h3>新闻<span></span></h3>
      <ul>
        <router-link tag="li" to="/usercenter/newsmanage/shownews" v-show="islogin">新闻管理</router-link>
        <li><a href="#">关于</a></li>
      </ul>

    </div>
  </div>
</template>


<script>
  import jquery from "jquery/dist/jquery"
export default {
  name: 'usercenterNav',
  data(){
    return{
      islogin:false
    }
  },
  created() {
    let logintype = window.localStorage.getItem("usertype");
    if(logintype == "职员"||logintype == "系统管理员"){
      this.islogin = true;
    }else if(logintype == "会员"){
      this.islogin = false;
    }
    setTimeout(function(){
      // jquery(".info").css("backgroundcolor","red");
      jquery(".box1 h3").eq(0).addClass("open1").next("ul").show();
      jquery(".box1 h3").click(function () {
        // 下拉式菜单
        // $(this).toggleClass("open1").next("ul").slideToggle();
        jquery(this).toggleClass("open1")
                .siblings("h3").removeClass("open1");
        jquery(this).next("ul")
                .slideToggle()
                .siblings("ul").slideUp();
      });
    },0)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box1{

  }

  .box1 *{
    font-family:"Microsoft YaHei";
  }
  .box1 ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: none;

  }
  .box1 h3{

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
  .box1 h3:hover{
    background-color:#990099;
  }
  .box1 a{
    text-decoration: none;
  }
  .box1 ul li{
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
  .box1 ul li:hover{
    background-color: aquamarine;
  }
  .box1 h3 span {
    background: url("../../assets/right.png") no-repeat;
    position: absolute;
    height: 32px;
    width: 32px;
    right: 10px;
    top:13px;
  }
  .box1 h3.open1 span{
    background: url("../../assets/down.png") no-repeat;
  }
</style>
