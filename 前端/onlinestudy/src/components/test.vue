<template>
  <div class="login">
    <form action="" method="post">
      <input type="text" name="username" v-model="formdata.username" placeholder="用户">
      <input type="password" name="password" v-model="formdata.password" placeholder="密码">
      <input type="button" value="登录" @click="loginsubmit" class="btn btn-primary">
    </form>
  </div>
</template>

<script>
  import axios from "../util/axios-auth"
  import Qs from "qs"
export default {
  name: 'test',
  data(){
    return {
        formdata:{
          username:"",
          password:""
        },
        token:""

    }
  },
  methods:{
    loginsubmit(){
       // let that = this;
        // let data = Qs.stringify(this.formdata);
        // window.console.log(data);
        axios.get("http://127.0.0.1/test.html"
        ).then(function (data) {

            // window.localStorage.setItem("token",data.data.token)
          console.log(data);
          console.log("bb");

        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
