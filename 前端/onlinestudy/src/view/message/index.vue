<template>
  <div class="message">
    <h1 class="page-header">留言:</h1>
    <div class="message_content">
      <table class="table table-bordered">
        <tr>
          <th colspan="2">留言者</th>
          <th>登录类型</th>
          <th colspan="2">内容</th>
          <th>上传时间</th>
          <th>回复</th>
          <th>删除</th>

        </tr>

        <tr v-for="item in message" v-bind:key="item.mid">
          <td colspan="2">{{item.id}}</td>
          <td>{{item.type}}</td>
          <td colspan="2">{{item.mcontent}}</td>
          <td>{{item.mpubdate}}</td>
          <td><button @click="replybtn({mid:item.mid})">查看回复</button></td>
          <td><button @click="deletebtn({mid:item.mid})">删除留言</button></td>
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
    name: 'message',
    data(){
      return {
        message:[],
        pagelist:[],
        pagelist2:[1,2,3,4],
        pagenum:0
      }
    },
    props:["cid"],
    methods:{
      deletebtn(data){
        axios.get("http://127.0.0.1:80/message/deletemessage?mid="+data.mid).then(data=>{
          window.alert(data.data.status);
          this.$router.go(0);
        });
      },
      replybtn(data){
        this.$router.push({
          path:`/usercenter/reply/${data.mid}`
        })
      },
      page(ev){
        axios.get(`http://127.0.0.1/message/showmessage?page=${ev.target.innerText}&cid=${this.cid}`).then(data=>{
          this.message = data.data.message;
        });
      }
    },
    created() {
      axios.get(`http://127.0.0.1:80/message/showmessage?page=0&cid=${this.cid}`).then((data)=> {
        this.pagenum = data.data.num;
        for(let i = 0 ; i < this.pagenum;i++){
          this.pagelist[i] = i+1;
        }
      });
      axios.get(`http://127.0.0.1:80/message/showmessage?page=1&cid=${this.cid}`).then(data=>{
        window.console.log(data);
        this.message = data.data.message;
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
