<template>
  <div class="container">
    <div class="addnew">
      <h1 class="page-head">添加新闻：</h1>
      <form action="" method="post" class="form-group">
        <label>标题：</label>
        <input type="text" name="title" class="form-control" placeholder="标题" v-model="formdata.title">
        <label>分类：</label>
        <input type="text" name="type" class="form-control" placeholder="前端" v-model="formdata.type">
        <label>内容：</label>
        <!--<input type="text" name="content" class="form-control" placeholder="键入内容" v-model="formdata.content">-->
        <Editor :catch-data="catchData" v-bind:content="txtcontent"></Editor>
        <input type="button" value="上传" @click="upload" class="btn btn-primary">
      </form>
      <div>{{formdata.content}}</div>
      <!--<div id="contentedit">-->
        <!--<div id="control">-->
          <!--<ul>-->
            <!--<li>H</li>-->
            <!--<li>I</li>-->
            <!--<li>E</li>-->
            <!--<li>M</li>-->
            <!--<li>=</li>-->
            <!--<li>=</li>-->
            <!--<li>=</li>-->
            <!--<li>img</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div id="edit" contenteditable="true">-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>


<script>
  import axios from "../../../util/axios-auth"
  import editor from "../../../components/Editor"
export default {
  name: 'news',
  data(){
      return {
          formdata:{
            title:"",
            type:"",
            content:""
          },
          txtcontent:""
      }
  },
  methods:{
      upload(){
          axios.post("http://127.0.0.1:80/news/addnews",this.formdata).then(data=>{
              window.console.log(data.data);
              window.alert("添加成功")
              this.$router.push("/usercenter/newsmanage/shownews")
          })
      },
    catchData(value){
        this.formdata.content = value;
    }
},
  created() {

  },
  components:{
    Editor:editor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addnew{
    width: 1000px;
  }

#contentedit{
  width: 400px;
  height: 350px;
  border:1px solid #369;
}
  #control{
    width: 400px;
    height: 50px;
  }
#control ul{
  margin: 0 ;
  padding: 0;

  width: 400px;
  height: 50px;
  border-bottom:2px solid #000;
  list-style: none;
}
#control ul li{
  text-align: center;
  width: 48px;
  height: 50px;
  line-height: 50px;
  background-color: #5a6268;
  float: left;
  border:1px solid #0c5460;
  cursor:pointer;
}
#control ul li:hover{
  opacity: 0.7;
}

#edit{
  height: 300px;
  width: 400px;
}
#edit:empty::before{
  content: "请输入不少于150字正文，支持图文商品混排哦！";
  font-size: 14px;
  color: #CCC;
  line-height: 21px;
  padding-top: 10px;
}
</style>
