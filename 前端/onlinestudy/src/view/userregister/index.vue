<template>
  <div class="userRegister">
    <form action="http://127.0.0.1:80/userregister.html" method="post" enctype="multipart/form-data">
      <input type="text" name="uname" placeholder="用户名">
      <input type="password" name="upassword" placeholder="密码">
      <input type="text" name="utelephone" placeholder="电话">
      <input type="text" name="ubirthday" placeholder="生日">
      <input type="text" name="uemail" placeholder="邮件">
      男
      <input type="radio" name="usex" value="男">
      女
      <input type="radio" name="usex" value="女">
      <input type="file" name="uheadimage">
      <input type="submit" value="提交" class="btn btn-primary">
    </form>

  </div>
</template>


<script>
export default {
  name: 'userRegister',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
