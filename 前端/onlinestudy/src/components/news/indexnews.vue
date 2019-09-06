<template>
  <div class="newslist">
    <nav>
      <ul id="newsnav">
        <li>导航</li>
        <li>分类</li>
      </ul>
    </nav>
    <ul id="list">
      <li>
        <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=941121196,3801254755&fm=173&app=25&f=JPEG?w=218&h=146&s=EB8006C25443B94F443AEC2B0300705B" alt="无">
        <p>8月21日消息，据外媒报道，阿里巴巴推迟至多150亿美元的香港IPO，此前预计8月底进行IPO，推迟后最早可能在10月份进行。对此，阿里巴巴方面回应：不予置评。
          此前，有消息称阿里巴巴已向港交所提交上市申请，拟二次赴港上市，并已于今年6月中旬向港交所提交了上市申请。如果顺利上市，此次IPO或成为2010年以来香港最大规模的股票发行。
          阿里巴巴股票一拆八的方案已获得股东大会批准，这一拆股方案被认为是为赴港上市做准备。</p>
      </li>
      <li v-for="item in news" v-bind:key="item.nid" @click="singlenews(item.nid)">
        <p style="font-size: 20px;color: #0c5460">{{item.nname}}</p>
        <p>{{item.ncontent}}</p>
        <span>热度：{{item.nhits}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from "../../util/axios-auth"
export default {
  name: 'Newslist',
  data(){
    return {
      news:[]

    }
  },
  methods:{
    singlenews(id){
      this.$router.push({path:'/singlenews/'+id});

    }
  },
  created() {
    axios.get("http://127.0.0.1/news/getnews?type=indexnews").then(data=>{
        // window.console.log(data);
        this.news = data.data.news;
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
#list{
  border:1px solid #ccc;
  padding: 0 10px;
  margin: 0;

}
#list li{
  /*height: 150px;*/
  border-bottom: 1px dashed #ccc;
  cursor: pointer;
  position: relative;
}
#list li:hover{
  opacity: 0.7;
}
#list img{
  float: left;
}
#list span{
  position: absolute;
  right: 10px;
  bottom: 5px;
  color: #b21f2d;
}

</style>
