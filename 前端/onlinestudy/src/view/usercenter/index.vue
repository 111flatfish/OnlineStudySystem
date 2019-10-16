<template>
  <div class="usercenter">
      <div class="usercenter_nav">
          <usercenter-nav></usercenter-nav>
      </div>
      <div class="usercenter_content">
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
.usercenter{
    position: relative;
}
.usercenter .usercenter_nav{

}
.usercenter .usercenter_content{
    position: absolute;
    left: 210px;
    top: 0;
    border: 1px solid #1b1e21;
    width:100%;
    border-radius: 3px;
}    
    
</style>
