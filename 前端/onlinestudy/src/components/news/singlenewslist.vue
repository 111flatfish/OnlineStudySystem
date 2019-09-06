<template>
  <div class="singlenewslist">
   <h1>新闻详情</h1>
    <article>
        标题：{{news.nname}}<br>
      <hr>
        内容：{{news.ncontent}}
    </article>
  </div>
</template>

<script>
    import axios from "../../util/axios-auth"
export default {
  name: 'Singlenewslist',
  data(){
    return {
      news:{},
      id:""
    }
  },
  methods:{

  },
  created() {
      this.id = this.$route.params.id;
      let beforehit = window.localStorage.getItem("beforehit");
      let afterhit = window.localStorage.getItem("afterhit");
      let hitflag = false;
      if(beforehit != afterhit){
          hitflag = true;
          window.localStorage.setItem("beforehit",afterhit);
      }else {
          hitflag = false;
      }
      axios.get("http://127.0.0.1/news/singlenews?id="+this.id+"&hitflag="+hitflag).then(data=>{
          // window.console.log(data.data.news[0]);
          this.news = data.data.news[0];
      });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
article{
  border: 1px solid #ccc;
}

</style>
