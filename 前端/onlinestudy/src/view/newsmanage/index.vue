<template>
  <div class="newsmanage">
    <h1>新闻管理</h1>
    <div class="newsmanage_nav">
      <ul>
        <router-link tag="li" to="/usercenter/newsmanage/addnews"><button class="btn-primary btn-lg">添加新闻</button></router-link>
        <router-link tag="li" to="/usercenter/newsmanage/shownews"><button class="btn-primary btn-lg">显示新闻</button></router-link>
        <router-link tag="li" to="/usercenter/newsmanage/shownews"><button class="btn-primary btn-lg">刷新</button></router-link>
      </ul>
    </div>
    <div class="newsmanage_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newsmanage'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newsmanage{
  width: 100%;
  border:1px solid #1b1e21;
}
.newsmanage_nav {
  margin-bottom: 80px;
}
.newsmanage_nav ul{
  list-style: none;
}
.newsmanage_nav ul li{
  float: left;
  margin-left: 20px;
}
</style>