<template>
  <div class="examcontent container">
      <div class="exam_content" v-if="!showresult">
        <h1>考试内容 <span>{{min}}:{{sec}}</span></h1>
        <div class="examcontent_question">
          <h2>{{currentindex+1}}:{{currentquestion}}</h2>
        </div>
        <div class="examcontent_item">
              <ul>
                <li v-for="(item3,index2) in currentchoice">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" v-bind:value="itemNum[index2]" v-model="selectitem">
                    <label class="form-check-label" for="exampleRadios1">
                      {{itemNum[index2]}}:{{item3}}
                    </label>
                  </div>
                </li>
              </ul>
        </div>
        <div class="examcontent_nav row clearfix">
          <input type="button" class="btn btn-lg btn-primary col-md-3" value="上一题" v-if="!flag2" @click="prequestion">
          <input type="button" class="btn btn-lg btn-primary col-md-3" value="提交考卷" data-toggle="modal" data-target="#exampleModalCenter">
          <input type="button" class="btn btn-lg btn-primary col-md-3" value="下一题" v-if="!flag" @click="nextquestion">

          <!-- Modal -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">提交警告</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  考卷一旦提交将不可更改，是否确认选择提交？
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                  <button type="button" class="btn btn-primary" @click="submitexam" data-dismiss="modal">提交</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="exam_result" v-if="showresult">
      <div class="exam_grade">
        <h1>你的分数是：{{result.grade}}</h1>
      </div>
      <div class="exam_certificate">
        <div v-if="result.hascertificate">
          <h2>恭喜获得了证书！</h2>
        </div>
        <div v-if="!result.hascertificate">
          <p>你的分数还不够获得证书，继续努力吧！</p>
          <img src="../../../public/image/exam/low.jpg" alt="">
        </div>
        <router-link to="/index" tag="button" class="btn btn-primary btn-lg" style="margin: 15px 0">返回首页</router-link>
        <router-link to="/exam" tag="button" class="btn btn-primary btn-lg" style="margin-left: 15px">返回考试页</router-link>
      </div>
    </div>
    <div class="exam_certificate">
      <article  ref="showresult"></article>
    </div>
  </div>
</template>

<script>
  import axios from "../../util/axios-auth"
  export default {
    name: 'examcontent',
    data(){
      return {
        exam:{},
        itemNum:{
          0:"A",
          1:"B",
          2:"C",
          3:"D"
        },
        // 分钟
        min:0,
        // 秒钟
        sec:0,
        timer:null,
        currentquestion:null,
        currentchoice:[],
        currentindex:0,
        selectitem:null,
        answerlist:[],
        flag:false,
        flag2:false,
        showresult:false,
        result:null
      }
    },
    props:["id"],
    methods:{
      ToArticle(data){
          this.$store.commit("setarticle",data);
          this.$router.push({
            path:`/article`
          })
      },
      // 初始化获取数据
      getinitdata(){
        // 获取考试信息
        axios.get("http://127.0.0.1/exam/singleexam?id="+this.id).then(data=>{
          this.exam = data.data.exam[0];
          if(typeof this.exam.econtent == "string"){
             this.exam.econtent = JSON.parse(this.exam.econtent);
          }
          this.min = this.exam.etime;
          this.currentindex = 0;
          if(this.exam.econtent.length == 1){
            this.flag = true;
          }
          this.flag2 = true;
          this.showresult = false;
          this.currentquestion = this.exam.econtent[this.currentindex].question;
          this.currentchoice = this.exam.econtent[this.currentindex].choice;
        });
      },
      // 计数器
      counttime(){
        if(this.sec == 0&&this.min>0){
          this.sec = 59;
          this.min--;
        }else if(this.sec>0&&this.sec<=59){
          this.sec--;
        }else if(this.sec == 0&&this.min==0){
          clearInterval(this.timer);
          window.alert("时间已到！系统自动交卷！");
          this.answerlist[this.currentindex] = this.selectitem;
          axios.post("http://127.0.0.1/exam/handleexam",{answerlist:this.answerlist,eid:this.id}).then(data=>{
            this.result = data.data.result;
            window.console.log(this.result);
            if(this.result.hascertificate){
              this.$refs.showresult.innerHTML = data.data.certificate;
            }
            window.alert(data.data.message);
            this.showresult = true;
          });
        }
      },
      prequestion(){
        this.answerlist[this.currentindex] = this.selectitem;
        this.currentindex--;
        this.selectitem = this.answerlist[this.currentindex];
        if(this.currentindex <= 0){
          this.flag2 = true;
          this.flag = false;
        }else {
          this.flag2 = false;
          this.flag = false;
        }
        this.currentquestion = this.exam.econtent[this.currentindex].question;
        this.currentchoice = this.exam.econtent[this.currentindex].choice;
      },
      nextquestion(){
        this.answerlist[this.currentindex] = this.selectitem;
        this.currentindex++;
        this.selectitem = this.answerlist[this.currentindex];
        if(this.currentindex+1 >= (this.exam.econtent.length)){
          this.flag = true;
          this.flag2 = false;
        }else{
          this.flag = false;
          this.flag2 = false;
        }
        this.currentquestion = this.exam.econtent[this.currentindex].question;
        this.currentchoice = this.exam.econtent[this.currentindex].choice;
      },
      submitexam(){
        this.answerlist[this.currentindex] = this.selectitem;
        clearInterval(this.timer);
        axios.post("http://127.0.0.1/exam/handleexam",{answerlist:this.answerlist,eid:this.id}).then(data=>{
          this.result = data.data.result[0];
          window.console.log(this.result);
          if(this.result.hascertificate){
              this.$refs.showresult.innerHTML = data.data.certificate;
          }
          window.alert(data.data.message);
          this.showresult = true;
        });
      }
    },
    created() {
        this.getinitdata();

    },
    mounted(){
        let that = this;
        that.timer = setInterval(function () {
            that.counttime();
        },1000);
    },
    watch:{
      "$route":"getinitdata"
    },
    destroyed() {
      clearInterval(this.timer);
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
  .examcontent_nav{
    width: 100%;
  }
  .examcontent_nav input{
    margin: 0 auto;
    justify-content: center;
    display: inline-block;
  }
  .exam_content h1{
    position: relative;
  }

  .exam_content h1 span{
    position: absolute;
    right: 0;
  }

</style>
