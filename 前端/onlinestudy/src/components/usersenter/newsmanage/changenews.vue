<template>
  <div class="container">
    <div class="changenew">
      <h1 class="page-head">修改新闻：</h1>
      <form action="" method="post" class="form-group">
        <label>标题：</label>
        <input type="text" name="title" class="form-control" placeholder="标题" v-model="newsdata.nname">
        <label>分类：</label>
        <input type="text" name="type" class="form-control" placeholder="网络" v-model="newsdata.ntype">
        <label>内容：</label>
        <input type="text" name="content" class="form-control" placeholder="键入内容" v-model="newsdata.ncontent">
        <input type="hidden" v-model="newsdata.nid" name="id">
        <input type="button"  @click="modifiy_save" value="修改新闻" class="form-control btn btn-primary">
      </form>

    </div>
  </div>
</template>


<script>
  import axios from "../../../util/axios-auth"
export default {
  name: 'news',
  data(){
      return {
        newsdata:this.$store.getters.getnewsdata,


      }
  },
  methods:{
    modifiy_save(){

        axios.post("http://127.0.0.1:80/news/modify",this.newsdata).then(data=>{
            if(data.data.status == "修改成功"){
                window.console.log("修改成功");
                window.alert("修改成功")
                // this.$router.go(0);
            }

        });
    }
},
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
