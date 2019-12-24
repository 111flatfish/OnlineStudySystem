<template>
  <div class="message container">
    <h1 class="page-header">留言:</h1>
    <div class="message_content">
      <!--展示留言-->
      <div class="message_show row clearfix">
        <ul class="media-list">
          <li class="media" v-for="item in messagelist">
            <div class="media-left">
              <a href="#">
                <img class="media-object" src="../../../public/image/3.jpg" alt="..." width="100px" height="100px">
              </a>
            </div>
            <div class="media-body">
              <div class="media-heading">
                <h4>
                  {{item.id}}
                </h4>
                <span>
                  {{item.mpubdate}}
                </span>
              </div>
              <p>
                {{item.mcontent}}
              </p>
              <div class="message_icon">
                <h5>点赞</h5><span class="glyphicon glyphicon-thumbs-up"></span>
                <h5>回复</h5><span class="glyphicon glyphicon-edit" @click="singlereply(item.mid)"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="pagecontrol">
        <ul id="pagelist">
          <li v-for="item in pagelist" v-bind:key="item" @click="page" data-set="item">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="message_form">
        <div class="row clearfix">
          <div class="col-md-2 studentheadimg">
            <!--头像-->
            <img src="../../../public/image/4.jpeg" alt="student">
          </div>
          <div class="col-md-9">
            <form class="form-horizontal" id="form">
              <div class="form-group">
                <!--留言内容-->
                <label for="inputtext" class="col-sm-3 control-label">留言内容 <span class="isneed">*</span></label>
                <div class="col-sm-9">
                  <textarea class="form-control" rows="3" id="inputtext" name="content" v-model="message.msg" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论"></textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-9">
                  <button type="button" class="btn btn-primary" id="buttonsubmit" @click="messagesubmit">提交</button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
        messagelist:[],
        message:{
          msg:null,
          type:null,
          cid:null
        },
        pagelist:[],
        pagelist2:[1,2,3,4],
        pagenum:0
      }
    },
    props:["id"],
    methods:{
      // 展示回复
      singlereply(mid){
        this.$router.push({
          path:`/singlereply/${mid}`
        });
      },
      messagesubmit(){
        if(this.message.msg != null){
          axios.post("http://127.0.0.1/message/addmessage",this.message).then(data=>{
            window.alert(data.data.message);
            this.$router.go(0);
          });
        }else{
          window.alert("留言不能为空！");
        }
      },
      page(ev){
        axios.get(`http://127.0.0.1/message/showmessage?page=${ev.target.innerText}&cid=${this.id}`).then(data=>{
          this.messagelist = data.data.message;
        });
      }
    },
    created() {
      axios.get(`http://127.0.0.1:80/message/showmessage?page=0&cid=${this.id}`).then((data)=> {
        this.pagenum = data.data.num;
        for(let i = 0 ; i < this.pagenum;i++){
          this.pagelist[i] = i+1;
        }
      });
      axios.get(`http://127.0.0.1:80/message/showmessage?page=1&cid=${this.id}`).then(data=>{
        window.console.log(data);
        this.messagelist = data.data.message;
      })
    },
    mounted() {
      this.message.type = this.$store.getters.getlogintype;
      this.message.cid = this.id;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .message{
    margin-bottom: 100px;
  }
  #pagecontrol{
    position: relative;
    max-width: 1200px;
  }
  .message_show ul{
    padding-left: 0;
  }
  .message_show ul li{
    margin: 15px;
  }
  .message_show ul li .media-body{
    padding-left: 15px;
  }
  .message_show ul li .media-body .media-heading h4,span{
    display: inline-block;
    line-height: 36px;
  }
  .message_show ul li .media-body .media-heading span{
    font-size: 12px;
    position: absolute;
    right: 0;
  }
  .message_show ul li .media-body .media-heading h4{
    margin-bottom: 0;
  }
  .message_show ul li .media-body p{
    font-size: 14px;
    height: 63px;
    margin-bottom: 0;
  }
  .message_show .message_icon{
    text-align: right;
  }
  .message_show .message_icon h5{
    display: inline-block;
    margin-left: 20px;
  }
  .message_show .message_icon span{
    margin-left: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .message_show .message_icon span:hover{
    color: #00B7FF;
  }
  #pagecontrol ul{
    position: absolute;
    left: 0;
    top: 0;
    margin: 0 250px;
    padding: 0;
    text-align: center;
    list-style: none;
  }
  #pagecontrol ul li{
    width: 30px;
    margin-left: 20px;
    border: 2px solid green;
    float: left;
    cursor: pointer;
  }
  .message_form {
    padding: 15px;
    margin-top: 20px;
  }
  .message_form label{
    font-size: 18px;
  }
  .message_form .studentheadimg img{
    width: 100%;
    border-radius: 50%;
  }

  .message_form .submit button{
    height: 40px;
    width: 100px;
  }
  .message_form .isneed{
    color: red;
  }

  .message_form .form-group{
    text-align: left;
    font-size: 16px;
  }
  .message_form .form-group #inputtext{
    width: 90%;
    height: 150px;
    font-size: 18px;
  }
  .message_form .form-group #buttonsubmit{
    height: 50px;
    width: 100px;
    background: #fff;
    color: #FFA500;
    border: 2px solid #FFA500;
    border-radius: 12px;
    font-size: 25px;
    margin-left: 80px;
  }
</style>
