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
  import userregister from "../components/register/userRegister"
  import workerregister from "../components/register/workerRegister"
  import adminregister from "../components/register/adminRegister"
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
