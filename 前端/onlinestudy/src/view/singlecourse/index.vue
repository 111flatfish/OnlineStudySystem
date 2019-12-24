<template>
  <div class="singlecourselist container">
    <div class="row clearfix">
      <div class="course_content col-md-8">
        <h1>课程详情</h1>
        <article>
          <h1>标题</h1>
          <p>{{course.cname}}</p>
          <h2>简介</h2>
          <p>{{course.csynopsis}}</p>
          <h2>教师</h2>
          <p>{{course.wid}}</p>
          <h2>类型</h2>
          <p>{{course.ctype}}</p>
          <h2>学习人数</h2>
          <p>{{course.cstudycount}}</p>
          <div v-show="showcontent">
            内容：
            <div id="text1" style="width: 100%;height:auto">
              <ul>
                <li v-for="item in ccontent" :key="item.chapter">
                  章节{{item.chapter}}:{{item.cname}}
                  <ul style="margin-left: 30px">
                    <li v-for="item2 in item.subchapter" @click="ToArticle({content:item2.content,scname:item2.scname,cid:course.cid,chapter:item.chapter,subchapter:item2.suborder,courselength:item.subchapter.length})" :key="item2.suborder">
                      子章节:{{item2.scname}}
                      <span></span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <button v-show="!showcontent" class="btn btn-primary btn-lg" @click="startstudy">开始学习</button>
        </article>
      </div>
      <div class="course_message col-md-4">
        <!--留言表单-->
        <div class="row clearfix message_form">
          <div class="message_input">
            <form class="form-horizontal" id="form">
              <div class="form-group">
                <!--留言内容-->
                <label for="inputtext" class="control-label">留言内容 <span class="isneed">*</span></label>
                <div>
                  <textarea class="form-control" rows="3" cols="40" id="inputtext" name="content" v-model="message.msg" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论"></textarea>
                  <button type="button" class="btn btn-primary" id="buttonsubmit" @click="messagesubmit">提交</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!--展示留言-->
        <div class="message_show row clearfix">
          <div class="message_reply">
            <input type="button" class="btn btn-primary" value="查看所有留言" @click="showmessage">
          </div>
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
                  <h5>回复</h5><span @click="singlereply(item.mid)" style="cursor: pointer">点我</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "../../util/axios-auth"
  export default {
    name: 'Singlecrouselist',
    data(){
      return {
        course:{},
        ccontent:[],
        message:{
          msg:null,
          type:null,
          cid:null
        },
        showcontent:false,
        messagelist:[]
      }
    },
    props:["id"],
    methods:{
      ToArticle(data){
        if(this.course.showtype == "article"){
          this.$store.commit("setarticle",data);
          this.$router.push({
            path:`/article`
          })
        }else{
          this.$store.commit("setarticle",data);
          this.$router.push({
            path:`/video`
          })
        }
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
      startstudy(){
        window.console.log(this.course.cprice);
        axios.post("http://127.0.0.1/course/studycourse",{cid:this.course.cid,price:this.course.cprice}).then(data=>{
            if(data.data.status == 400){
               window.alert(data.data.message);
            }else if(data.data.status == 201){
              window.alert(data.data.message);
            }else {
              window.alert(data.data.message);
              this.showcontent = true;
            }
        });
      },
      // 展示回复
      singlereply(mid){
          this.$router.push({
            path:`/singlereply/${mid}`
          });
      },
      // 展示留言
      showmessage(){
          this.$router.push({
            path:`/showmessage/${this.id}`
          });
      },
      // 初始化获取数据
      getinitdata(){
        this.message.cid = this.id;
        let beforehit = window.localStorage.getItem("beforehit");
        let afterhit = window.localStorage.getItem("afterhit");
        let hitflag = false;
        if(beforehit != afterhit){
          hitflag = true;
          window.localStorage.setItem("beforehit",afterhit);
        }else {
          hitflag = false;
        }
        // 获取课程信息
        axios.get("http://127.0.0.1/course/singlecourse?id="+this.id+"&hitflag="+hitflag).then(data=>{
          this.course = data.data.course[0];
          if(typeof this.course.ccontent == "string"){
             this.course.ccontent = JSON.parse(this.course.ccontent);
          }
          this.ccontent = data.data.course[0].ccontent;
        });
        // 获取留言信息
        axios.post("http://127.0.0.1/message/getsomemessage",{cid:this.id}).then(data=>{
          window.console.log(data);
          this.messagelist = data.data.messagelist;
        });
      }
    },
    created() {
        this.getinitdata();

    },
    mounted() {
      this.message.type = this.$store.getters.getlogintype;
    },
    watch:{
      "$route":"getinitdata"
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
      list-style: none;
    padding-left: 0;
  }
  article{
    border: 1px solid #ccc;
  }
  /*留言表单*/
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
    width: 40%;
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
    width: 100%;
    height: 150px;
    font-size: 18px;
  }
  .message_form .form-group #inputphone{
    width: 50%;
    height: 50px;
    font-size: 18px;
  }
  .message_form .form-group #buttonsubmit{
    height: 50px;
    width: 100%;
    background: #fff;
    color: #FFA500;
    border: 2px solid #FFA500;
    border-radius: 12px;
    font-size: 25px;
    margin-top: 15px;
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


</style>
