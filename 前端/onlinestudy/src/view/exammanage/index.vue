<template>
  <div class="examemanage">
    <h1>课程管理</h1>
    <div class="exammanage_nav">
      <ul>
        <router-link tag="li" to="/usercenter/exammanage/addexam"><button class="btn-primary btn-lg">添加考试</button></router-link>
        <router-link tag="li" to="/usercenter/exammanage/showexam"><button class="btn-primary btn-lg">显示考试</button></router-link>
        <router-link tag="li" to="/usercenter/exammanage/showexam"><button class="btn-primary btn-lg">刷新</button></router-link>
      </ul>
    </div>
    <div class="exammanage_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'exammanage'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .exammanage{
    width: 100%;
    border:1px solid #1b1e21;
  }
  .exammanage_nav {
    margin-bottom: 80px;
  }
  .exammanage_nav ul{
    list-style: none;
  }
  .exammanage_nav ul li{
    float: left;
    margin-left: 20px;
  }
</style>
