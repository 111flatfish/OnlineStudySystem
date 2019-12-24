<template>
  <div class="singlereplylist container">
      <div class="singlereplylist_message row clearfix">
          <div class="media">
              <div class="media-left">
                  <a href="#">
                      <img class="media-object" src="../../../public/image/3.jpg" alt="...">
                  </a>
              </div>
              <div class="media-body">
                  <h4 class="media-heading">{{message.id}}</h4>
                  <span>{{message.mpubdate}}</span>
                  <p>{{message.mcontent}}</p>
              </div>
          </div>
      </div>
      <div class="singlereplylist_replylist">
          <ul class="media-list">
              <li class="media" v-for="item in replylist" :key="item.rid">
                  <div class="media-left">
                      <a href="#">
                          <img class="media-object" src="../../../public/image/5.jpeg" alt="...">
                      </a>
                  </div>
                  <div class="media-body">
                      <h4 class="media-heading">{{item.id}}</h4>
                      <span>{{item.rpubdate}}</span>
                      <p>{{item.rcontent}}</p>
                  </div>
              </li>
          </ul>
      </div>
      <div class="singlereplylist_reply_form row clearfix">
          <div class="row clearfix message_form">
              <div class="col-md-2 studentheadimg">
                  <!--头像-->
                  <img src="../../../public/image/4.jpeg" alt="student">
              </div>
              <div class="col-md-9">
                  <form class="form-horizontal" id="form">
                      <div class="form-group">
                          <!--留言内容-->
                          <label for="inputtext" class="col-sm-3 control-label">回复内容 <span class="isneed">*</span></label>
                          <div class="col-sm-9">
                              <textarea class="form-control" rows="3" id="inputtext" name="content" v-model="reply.content" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论"></textarea>
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-sm-9">
                              <button type="button" class="btn btn-primary" id="buttonsubmit" @click="replysubmit">提交</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    import axios from "../../util/axios-auth"
export default {
  name: 'Singlereplylist',
  data(){
    return {
      message:{},
      replylist:[],
        reply:{
            content:"",
            type:null,
            mid:null
        }
    }
  },
  props:["mid"],
  methods:{
      replysubmit(){
          window.console.log(this.reply);
          axios.post("http://127.0.0.1/reply/addreply",this.reply).then(data=>{
              window.alert(data.data.message);
              this.$router.go(0);
          });
      }
  },
  created() {
      axios.get("http://127.0.0.1/reply/singlereply?mid="+this.mid).then(data=>{
          window.console.log(data);
          this.message = data.data.message;
          this.replylist = data.data.reply;
      });
  },
    mounted() {
        this.reply.type = this.$store.getters.getlogintype;
        this.reply.mid = this.mid;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
article{
  border: 1px solid #ccc;
}
.singlereplylist_message .media-left img,.singlereplylist_replylist .media-left img{
    width: 200px;
    height: 200px;
}
.singlereplylist_replylist ul li{
    margin: 15px;
}
.message_content .media-left img{
    border-radius: 50%;
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
