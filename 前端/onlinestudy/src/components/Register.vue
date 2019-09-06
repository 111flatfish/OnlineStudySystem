<template>
  <div class="container">
    <user></user>
    <hr>
    <worker></worker>
    <hr>
    <admin></admin>
  </div>
</template>


<script>
  import userregister from "./register/userRegister"
  import workerregister from "./register/workerRegister"
  import adminregister from "./register/adminRegister"
export default {
  name: 'Register',
  components:{
    user:userregister,
    worker:workerregister,
    admin:adminregister
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
