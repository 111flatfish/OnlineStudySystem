<template>
  <div class="courselist">
    <div class="index_article_header">
      <img src="../../../public/image/article/图标-文章.png" alt="label">
      <span>课程</span>
    </div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" @click="JumbTo(`游戏`)">游戏</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"  @click="JumbTo(`vue`)">vue</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"  @click="JumbTo(`node`)">node</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active row clearfix " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <div class="card col-md-3" style="display: inline-block" v-for="item in course">
          <div>
            <div class="card_img">
              <img class="card-img-top" src="../../../public/image/index/2.jpeg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item.cname}}</h5>
              <p class="card-text">{{item.csynopsis}}</p>
              <a class="btn btn-primary" @click="ToSingleCourse(item.cid)">前往学习</a>
            </div>
          </div>
        </div >
      </div>
      <div class="tab-pane fade show  row clearfix " id="pills-profile" role="tabpanel" aria-labelledby="pills-home-tab">
        <div class="card col-md-3" style="display: inline-block" v-for="item in course">
          <div>
            <div class="card_img">
              <img class="card-img-top" src="../../../public/image/index/2.jpeg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item.cname}}</h5>
              <p class="card-text">{{item.csynopsis}}</p>
              <a class="btn btn-primary" @click="ToSingleCourse(item.cid)">前往学习</a>
            </div>
          </div>
        </div >
      </div>
      <div class="tab-pane fade show row clearfix " id="pills-contact" role="tabpanel" aria-labelledby="pills-home-tab">
        <div class="card col-md-3" style="display: inline-block" v-for="item in course">
          <div>
            <div class="card_img">
              <img class="card-img-top" src="../../../public/image/index/2.jpeg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item.cname}}</h5>
              <p class="card-text">{{item.csynopsis}}</p>
              <a class="btn btn-primary" @click="ToSingleCourse(item.cid)">前往学习</a>
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
  name: 'Courselist',
  data(){
    return {
      course:[]
    }
  },
  methods:{
    singlenews(id){
      this.$router.push({path:'/singlenews/'+id});
    },
    JumbTo(type){
      axios.get(`http://127.0.0.1/course/getindexcourse?type=${type}`).then(data=>{
          this.course = data.data.course;
      });
    },
    ToSingleCourse(cid){
      this.$router.push({
        path:`/singlecourse/${cid}`
      })
    }
  },
  created() {
    axios.get("http://127.0.0.1/course/getindexcourse?type=游戏").then(data=>{
        this.course = data.data.course;
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .courselist .index_article_header{
    margin: 0 auto;
    text-align: center;
  }
  .courselist .index_article_header img{
    width: 128px;
    height: 128px;
    display: inline-block;
  }
  .courselist .index_article_header span{
    font-size: 75px;
    position: relative;
    top:20px;
    display: inline-block;
  }
  .courselist .tab-content .card{
    margin: 15px auto;
    border: none;
  }
  .courselist .tab-content .card>div:nth-of-type(1){
    border: 1px solid #ccc;
  }
  .courselist .tab-content .card .card_img{
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }
  .courselist .tab-content .card img{
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .courselist .tab-content .card .card-body p{
    height: 50px;
    overflow: hidden;
  }

</style>
