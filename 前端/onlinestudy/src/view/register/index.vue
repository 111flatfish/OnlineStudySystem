<template>
  <div class="register">
    <h1>请选择要注册的类型:</h1>
    <div class="register_nav">
      <ul>
        <router-link tag="li" to="/register/userregister">会员注册</router-link>
        <router-link tag="li" to="/register/workerregister">职员注册</router-link>
        <router-link tag="li" to="/register/adminregister">系统管理员注册</router-link>
      </ul>
    </div>
   <div class="register_content">
     <router-view></router-view>
   </div>
  </div>
</template>


<script>

export default {
  name: 'Register',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register_nav ul{
  list-style: none;
}
.register_nav li{
  border: 1px solid #1b1e21;
  float: left;
  cursor: pointer;
}
.register_nav li.router-link-active{
  background-color: #ef3842;
}
</style>
