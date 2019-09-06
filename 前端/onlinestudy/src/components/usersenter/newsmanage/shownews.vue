<template>
  <div class="container">
    <hr>
    <h1 class="page-header">新闻:</h1>
    <button class="btn btn-primary" @click="showadd" style="margin-bottom: 20px">添加新闻</button>
    <button class="btn btn-primary" @click="shownew" style="margin-bottom: 20px">新闻列表</button>
    <button @click="reflush" class="btn btn-primary" style="margin-left: 20px;margin-bottom: 20px">刷新</button>
    <div class="shownews" v-if="actionshow">
      <table class="table table-bordered">
        <tr>
          <th>标题</th>
          <th>类型</th>
          <th>内容</th>
          <th>上传时间</th>
          <th>更新</th>
          <th>删除</th>

        </tr>

        <tr v-for="item in news" v-bind:key="item.nid">
            <td>{{item.nname}}</td>
            <td>{{item.ntype}}</td>
            <td>{{item.ncontent}}</td>
            <td>{{item.npubdate}}</td>
            <td><button @click="changebtn({nid:item.nid,nname:item.nname,ntype:item.ntype,ncontent:item.ncontent})">更新</button></td>
            <td><button @click="deletebtn({nid:item.nid})">删除</button></td>
        </tr>
      </table>
        <div id="pagecontrol">
            <ul id="pagelist">
                <li v-for="item in pagelist" v-bind:key="item" @click="page" data-set="item">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
    <div class="addnews" v-if="actionadd">
        <addnew></addnew>
    </div>
    <div class="changenews" v-if="actionchange">
        <changenew></changenew>
    </div>

  </div>
</template>


<script>
  import Addnew from "./addnews"
  import Changenew from "./changenews"
  import axios from "../../../util/axios-auth"
export default {
  name: 'news',
  data(){
      return {
        actionshow:true,
        actionadd:false,
        actionchange:false,
        news:[],
        pagelist:[],
          pagelist2:[1,2,3,4],
        pagenum:0
      }
  },
  methods:{
    showadd(){
        this.actionshow = false;
        this.actionchange = false;
        this.actionadd = true;
    },
    shownew(){
      axios.get("http://127.0.0.1:80/news/shownews").then(data=>{
            this.news = data.data.news;
      })
      this.actionchange = false;
      this.actionadd = false;
      this.actionshow = true;
    },
    changebtn(data){
        window.console.log(data.nname);
        this.$store.commit("setuserdata",data);
        this.actionchange = true;
        this.actionadd = false;
        this.actionshow = false;
    },
    deletebtn(data){
        // window.console.log(data.nid);
        axios.get("http://127.0.0.1:80/news/deletenews?nid="+data.nid).then(data=>{
            window.console.log(data);
            this.$router.go(0);
        });
    },
    reflush(){
        this.$router.go(0);
    },
      page(ev){
        // window.console.log(ev.target.innerText);
          axios.get("http://127.0.0.1/news/shownews?page="+ev.target.innerText).then(data=>{
              window.console.log(data);
              this.news = data.data.news;
          });
      }
},
  created() {
    axios.get("http://127.0.0.1:80/news/shownews?page="+0).then((data)=> {
      // window.console.log(data);
        window.console.log(data.data.num);
      this.pagenum = data.data.num;
      for(let i = 0 ; i < this.pagenum;i++){
          this.pagelist[i] = i+1;
      }
      window.console.log(this.pagelist);
    });
    axios.get("http://127.0.0.1:80/news/shownews?page="+1).then(data=>{
        this.news = data.data.news;
        window.console.log(this.news);
    })
  },

  components:{
    addnew:Addnew,
    changenew:Changenew
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pagecontrol{
    position: relative;
    max-width: 1200px;
}
ul{
    position: absolute;
    left: 0;
    top: 0;
    margin: 0 250px;
    padding: 0;
    text-align: center;
    list-style: none;
}
ul li{
    width: 30px;
    margin-left: 20px;
    background-color: #00B7FF;
    border: 2px solid green;
    float: left;
    cursor: pointer;

}
</style>
