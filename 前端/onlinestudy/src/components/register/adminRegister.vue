<template>
  <div class="container">
    <!--uid:String,         //系统生成-->
    <!--uname:String,       //昵称-->
    <!--usex:String,        //性别-->
    <!--utelephone:String,    //电话-->
    <!--ucoin : Number,       //金币-->
    <!--ubirthday : String,    //生日-->
    <!--uemail : String,        //邮件-->
    <!--uheadimage : Binary,    //头像-->
    <!--uscore : Number,        //积分-->
    <!--umonetary : Number,     //消费金额-->
    <!--upassword : String,     //密码-->
    <!--urank : Number,         //会员等级-->
    <!--udiscount : Number,     //会员折扣-->
    <!--uacitve : Number,       //激活状态-->
    <form action="http://127.0.0.1:80/adminregister.html" method="post" enctype="multipart/form-data">
      <input type="text" name="aname" placeholder="管理员名称">
      <input type="password" name="apassword" placeholder="密码">
      <input type="text" name="atelephone" placeholder="电话">
      <input type="text" name="abirthday" placeholder="生日">
      <input type="text" name="aemail" placeholder="邮件">
      <input type="text" name="aidcardnum" placeholder="身份证号">
      <input type="radio" name="asex" value="男">
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
