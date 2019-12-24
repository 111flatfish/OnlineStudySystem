<template>
  <div class="container">
    <div class="mianindex_content">
      <news></news>
      <Course></Course>
      <Exam></Exam>
    </div>
  </div>
</template>
<script>
  import News from "./indexnews"
  import Course from "./indexcourse"
  import Exam from "./indexexam"
export default {
  name: 'Index',
  data(){
      return {
          status:window.localStorage.getItem("usertype")
      }
  },
  methods:{
    usercenter(){
        this.$router.push("/usercenter/userInfo");
    },
    add(){
      window.console.log("添加成功!");
      window.localStorage.setItem("test",new Date().toLocaleString());
    }
},
  created() {

  },
  components:{
    news:News,
    Course,
    Exam
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button{
      margin: 20px;

    }
</style>
