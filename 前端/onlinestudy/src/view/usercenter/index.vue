<template>
  <div class="usercenter row clearfix">
      <div class="usercenter_nav col-md-2">
          <usercenter-nav></usercenter-nav>
      </div>
      <div class="usercenter_content col-md-10">
          <router-view></router-view>
      </div>

  </div>
</template>

<script>
  import usercenterNav from "../../components/usercenterNav"
export default {
  name: 'usercenter',
  components:{
      usercenterNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.usercenter .usercenter_nav{
    display: inline-block;
}
.usercenter .usercenter_content{
    display: inline-block;
    border: 1px solid #1b1e21;
    width:100%;
    border-radius: 3px;
    margin-bottom: 50px;
}

</style>
