<template>
  <div class="courselist container">
    <nav>
      <ul id="newsnav">
        <li>热点</li>
        <li>科技</li>
        <li>政务</li>
        <li>国内</li>
        <li>国际军事</li>
        <li>辟谣</li>
        <li>文化</li>
        <li>司法</li>
        <li>体育</li>
        <li>娱乐</li>
        <li>专题</li>
      </ul>
    </nav>
    <ul class="media-list row clearfix">
      <li class="media col-md-3" v-for="item in course" @click="ToSingleCourse(item.cid)">
        <div class="media-left">
          <a href="#">
            <img class="media-object" src="../../../public/image/1.jpeg" alt="...">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">{{item.cname}}</h4>
          <p>{{item.csynopsis}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from "../../util/axios-auth"
export default {
  name: 'courselist',
  data(){
    return {
      course:[],
      list:[1,2,3,4,5,6]

    }
  },
  methods:{
    ToSingleCourse(id){
      this.$router.push({path:'/singlecourse/'+id});
    }
  },
  created() {
    axios.get("http://127.0.0.1/course/getcourse?type=courselist").then(data=>{
        this.course = data.data.course;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  list-style: none;
}
#newsnav{
  height: 50px;
  background-color: #00B7FF;
  border:1px solid #000;
  padding: 0;
  margin: 0;
}
#newsnav li{
  border-right:1px solid #1b1e21;
  text-align: center;
  /*border: 1px solid #000;*/
  float: left;
  width: 100px;
  background-color: #1c7430;
  cursor: pointer;
  line-height: 50px;
}
#newsnav li:hover{
  background-color: #1d2124;
  color: white;
}

.media-list li{
  display: inline-block;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 3px rgba(0,0,0,.4);
  margin: 15px;
}
.media-list li img{
  width: 150px;
  height: 150px;
}


</style>
