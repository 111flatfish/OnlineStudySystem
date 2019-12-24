<template>
  <div class="reply">
    <h1 class="page-header">留言:</h1>
    <div class="reply_content">
      <table class="table table-bordered">
        <tr>
          <th colspan="2">回复者</th>
          <th>登录类型</th>
          <th colspan="2">回复内容</th>
          <th>回复时间</th>
          <th>删除</th>

        </tr>

        <tr v-for="item in reply" v-bind:key="item.rid">
          <td colspan="2">{{item.id}}</td>
          <td>{{item.rtype}}</td>
          <td colspan="2">{{item.rcontent}}</td>
          <td>{{item.rpubdate}}</td>
          <td><button @click="deletebtn({rid:item.rid})">删除回复</button></td>
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
  </div>
</template>


<script>
  import axios from "../../util/axios-auth"
  export default {
    name: 'reply',
    data(){
      return {
        reply:[],
        pagelist:[],
        pagelist2:[1,2,3,4],
        pagenum:0
      }
    },
    props:["mid"],
    methods:{
      deletebtn(data){
        axios.get("http://127.0.0.1:80/reply/deletereply?rid="+data.rid).then(data=>{
          window.alert(data.data.status);
          this.$router.go(0);
        });
      },
      page(ev){
        axios.get(`http://127.0.0.1/reply/showreply?page=${ev.target.innerText}&mid=${this.mid}`).then(data=>{
          this.reply = data.data.reply;
        });
      }
    },
    created() {
      axios.get(`http://127.0.0.1:80/reply/showreply?page=0&mid=${this.mid}`).then((data)=> {
        this.pagenum = data.data.num;
        for(let i = 0 ; i < this.pagenum;i++){
          this.pagelist[i] = i+1;
        }
      });
      axios.get(`http://127.0.0.1:80/reply/showreply?page=1&mid=${this.mid}`).then(data=>{
        if(data.data.reply.length == 0){
          window.alert("该留言还没有回复！");
          this.$router.back();
        }else {
          this.reply = data.data.reply;
        }
      })
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
    border: 2px solid green;
    float: left;
    cursor: pointer;

  }
  table{
    width: 100%;
    table-layout: fixed;
  }
  table tr td{
    /* for IE */
    text-overflow: ellipsis;
    /* for Firefox,mozilla */
    -moz-text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left

  }
</style>
