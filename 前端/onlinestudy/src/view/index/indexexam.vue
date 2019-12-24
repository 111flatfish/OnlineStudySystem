<template>
  <div class="examlist">
    <div class="index_article_header">
      <img src="../../../public/image/article/图标-文章.png" alt="label">
      <span>热门考试</span>
    </div>
    <ul class="nav nav-pills mb-3" id="pills-exam" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-game-tab" data-toggle="pill" href="#pills-game" role="tab" aria-controls="pills-game" aria-selected="true" @click="JumbToExam(`游戏`)">游戏</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-vue-tab" data-toggle="pill" href="#pills-vue" role="tab" aria-controls="pills-vue" aria-selected="false"  @click="JumbToExam(`vue`)">vue</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-node-tab" data-toggle="pill" href="#pills-node" role="tab" aria-controls="pills-node" aria-selected="false"  @click="JumbToExam(`node`)">node</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-examContent">
      <div class="tab-pane fade show active row clearfix " id="pills-game" role="tabpanel" aria-labelledby="pills-game-tab">
        <div class="card col-md-3" style="display: inline-block" v-for="item in exam">
          <div>
            <div class="card_img">
              <img class="card-img-top" src="../../../public/image/index/2.jpeg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item.etitle}}</h5>
              <p class="card-text">{{item.esynopsis}}</p>
              <a class="btn btn-primary" @click="ToSingleExam(item.eid)">前往学习</a>
            </div>
          </div>
        </div >
      </div>
      <div class="tab-pane fade show  row clearfix " id="pills-vue" role="tabpanel" aria-labelledby="pills-game-tab">
        <div class="card col-md-3" style="display: inline-block" v-for="item in exam">
          <div>
            <div class="card_img">
              <img class="card-img-top" src="../../../public/image/index/2.jpeg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item.etitle}}</h5>
              <p class="card-text">{{item.esynopsis}}</p>
              <a class="btn btn-primary" @click="ToSingleExam(item.eid)">前往学习</a>
            </div>
          </div>
        </div >
      </div>
      <div class="tab-pane fade show row clearfix " id="pills-node" role="tabpanel" aria-labelledby="pills-game-tab">
        <div class="card col-md-3" style="display: inline-block" v-for="item in exam">
          <div>
            <div class="card_img">
              <img class="card-img-top" src="../../../public/image/index/2.jpeg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item.etitle}}</h5>
              <p class="card-text">{{item.esynopsis}}</p>
              <a class="btn btn-primary" @click="ToSingleExam(item.cid)">前往学习</a>
            </div>
          </div>
        </div >
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "../../util/axios-auth"
  export default {
    name: 'examlist',
    data(){
      return {
        exam:[]

      }
    },
    methods:{
      singleexam(eid){
        this.$router.push({path:'/singleexam/'+eid});
      },
      JumbToExam(type){
        axios.get(`http://127.0.0.1/exam/getindexexam?type=${type}`).then(data=>{
          this.exam = data.data.exam;
        });
      },
      ToSingleExam(eid){
        this.$router.push({
          path:`/singleexam/${eid}`
        })
      }
    },
    created() {
      axios.get("http://127.0.0.1/exam/getindexexam?type=游戏").then(data=>{
        this.exam = data.data.exam;
        window.console.log(data);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .examlist .index_article_header{
    margin: 0 auto;
    text-align: center;
  }
  .examlist .index_article_header img{
    width: 128px;
    height: 128px;
    display: inline-block;
  }
  .examlist .index_article_header span{
    font-size: 75px;
    position: relative;
    top:20px;
    display: inline-block;
  }
  .examlist .tab-content .card{
    margin: 15px auto;
    border: none;
  }
  .examlist .tab-content .card>div:nth-of-type(1){
    border: 1px solid #ccc;
  }
  .examlist .tab-content .card .card_img{
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }
  .examlist .tab-content .card img{
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .examlist .tab-content .card .card-body p{
    height: 50px;
    overflow: hidden;
  }
  .examlist .tab-content .card .card-body h5{
    height: 50px;
    overflow: hidden;
  }
</style>
