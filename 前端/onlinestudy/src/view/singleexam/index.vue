<template>
  <div class="singleexamlist container">
    <div class="row clearfix">
      <div class="exam_content col-md-8">
        <h1>考试详情</h1>
        <article>
          <h1>标题</h1>
          <p>{{exam.etitle}}</p>
          <h2>简介</h2>
          <p>{{exam.esynopsis}}</p>
          <h2>教师</h2>
          <p>{{exam.wid}}</p>
          <h2>类型</h2>
          <p>{{exam.esubject}}</p>
          说明：
          <div id="text1" style="width: 100%;height:auto">
           考试内容均由各老师提供，考生请自行查看考试时间，点击开始考试后将开始进入时间计数，若在考试时间结束后考试仍然没有提交考卷，则系统自动提交考卷，分数在提交考卷后会自动统计，如有证书，在考生通过教师的要求会自动发放！
          </div>
        </article>
        <div class="exam_start">
          <input type="button" class="btn btn-lg btn-primary" value="开始考试" data-toggle="modal" data-target="#exampleModalCenter">

          <!-- Modal -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  考试开始后将不能重新开始，也不能考第二次，确定要开始吗？
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-primary" @click="ToExamContent" data-dismiss="modal">开始考试</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from "../../util/axios-auth"
  export default {
    name: 'Singleexamlist',
    data(){
      return {
        exam:{}
      }
    },
    props:["id"],
    methods:{
      ToExamContent(){
          axios.post("http://127.0.0.1/exam/addattendexam",{eid:this.id}).then(data=>{
            if(data.data.status == 400){
                window.alert("参加考试失败！");
            }else if(data.data.status == 201){
              window.alert(data.data.message);
              this.$router.go(0);
            }else{
              this.$router.push({
                path:`/examcontent/${this.id}`
              })
            }
          });
      },
      // 初始化获取数据
      getinitdata(){
        // 获取考试信息
        axios.get("http://127.0.0.1/exam/singleexam?id="+this.id).then(data=>{
          this.exam = data.data.exam[0];
        });
      }
    },
    created() {
        this.getinitdata();
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

</style>
