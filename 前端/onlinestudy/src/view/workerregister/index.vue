<template>
  <div class="workerRegister">
    <!--wid:String,         //系统生成-->
    <!--wname:String,       //昵称-->
    <!--wsex:String,        //性别-->
    <!--wtelephone:String,    //电话-->
    <!--wbirthday : String,    //生日-->
    <!--wemail : String,        //邮件-->
    <!--wheadimage : Binary,    //头像-->
    <!--wpassword : String,     //密码-->

    <form action="http://127.0.0.1:80/workerregister.html" method="post" enctype="multipart/form-data">
      <input type="text" name="wname" placeholder="职员名称">
      <input type="password" name="wpassword" placeholder="密码">
      <input type="text" name="wtelephone" placeholder="电话">
      <input type="text" name="wbirthday" placeholder="生日">
      <input type="text" name="wemail" placeholder="邮件">
      <label for="">男</label>
      <input type="radio" name="wsex" value="男">
      <label for="">女</label>
      <input type="radio" name="wsex" value="女">
      <label for="">头像</label>
      <input type="file" name="wheadimage">
      <input type="submit" value="提交" class="btn btn-primary">
    </form>

  </div>
</template>


<script>
export default {
  name: 'workerRegister',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
