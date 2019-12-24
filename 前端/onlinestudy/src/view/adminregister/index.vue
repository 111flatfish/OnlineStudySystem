<template>
  <div class="adminRegister">

    <form action="http://127.0.0.1:80/adminregister.html" method="post" enctype="multipart/form-data">
      <input type="text" name="aname" placeholder="管理员名称">
      <input type="password" name="apassword" placeholder="密码">
      <input type="text" name="atelephone" placeholder="电话">
      <input type="text" name="abirthday" placeholder="生日">
      <input type="text" name="aemail" placeholder="邮件">
      <input type="text" name="aidcardnum" placeholder="身份证号">
      <label>男</label>
      <input type="radio" name="asex" value="男">
      <label for="">女</label>
      <input type="radio" name="asex" value="女">
      <input type="file" name="aheadimage">
      <input type="submit" value="提交" class="btn btn-primary">
    </form>

  </div>
</template>


<script>
export default {
  name: 'adminRegister',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
