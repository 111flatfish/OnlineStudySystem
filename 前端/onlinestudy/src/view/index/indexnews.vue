<template>
  <div class="newslist">
    <!--文章动态-->
    <div class="row clearfix index_article">
      <div class="col-md-12">
        <div class="index_article_header">
          <img src="../../../public/image/article/图标-文章.png" alt="label">
          <span>新闻动态</span>
        </div>
        <div class="index_article_content row clearfix">
          <div class="col-md-6">
            <div class="index_article_content-subheader">
              <h1>最热</h1>
              <p>Media Info<router-link tag="span" to="/guide">更多>>></router-link></p>
            </div>
            <div class="index_article_content_subcontent">
              <ul class="row clearfix">
                <li class="media" v-for="item in news.slice(0,4)" @click="singlenews(item.nid)">
                  <div class="media-left">
                    <!--图片-->
                    <a href="#">
                      <img class="media-object" src="../../../public/image/article/article.jpg" alt="图片">
                    </a>
                  </div>
                  <!--内容-->
                  <div class="media-body">
                    <!--标题-->
                    <h3 class="media-heading">{{item.nname}}</h3>
                    <!--内容-->
                    <p>{{item.ncontent}}</p>
                    <!--简介-->
                    <div class="dec">
                      <!--发布时间-->
                      <span>
                                                        <img src="../../../public/image/article/图标-时钟.png" alt="time">{{item.npubdate}}
                                                    </span>
                      <!--浏览量-->
                      <span>
                                                        <img src="../../../public/image/article/图标-眼睛.png" alt="hit">{{item.nhits}}
                                                    </span>
                      <!--标签-->
                      <span>
                                                        <ul style="display: inline-block">
                                                            <li style="margin: 5px 5px;border-radius: 4px;background-color: white;padding: 2px;box-shadow: 0 0 2px 2px rgba(0,0,0,.1)">
                                                                {{item.ntype}}
                                                            </li>
                                                        </ul>
                                                    </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <div class="index_article_content-subheader">
              <h1>最新</h1>
              <p>Our News<router-link tag="span" to="/news">更多>>></router-link></p>
            </div>
            <div class="index_article_content_subcontent">
              <ul class="row clearfix">
                <li class="media" v-for="item in nearnews">
                  <div class="media-left">
                    <!--图片-->
                    <a href="#">
                      <img class="media-object" src="../../../public/image/article/article.jpg" alt="图片">
                    </a>
                  </div>
                  <!--内容-->
                  <div class="media-body">
                    <!--标题-->
                    <h3 class="media-heading">{{item.nname}}</h3>
                    <!--内容-->
                    <p>{{item.ncontent}}</p>
                    <!--简介-->
                    <div class="dec">
                        <span>
                            <img src="../../../public/image/article/图标-时钟.png" alt="time">{{item.npubdate}}
                        </span>
                      <span>
                                                        <img src="../../../public/image/article/图标-眼睛.png" alt="hit">{{item.nhits}}
                                                    </span>
                      <span>
                                                        <ul style="display: inline-block">
                                                            <li style="margin: 5px 5px;border-radius: 4px;background-color: white;padding: 2px;box-shadow: 0 0 2px 2px rgba(0,0,0,.1)">{{item.ntype}}</li>
                                                        </ul>
                                                    </span>
                    </div>
                  </div>
                </li>
              </ul>
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
  name: 'Newslist',
  data(){
    return {
      news:[],
      nearnews:[]
    }
  },
  methods:{
    singlenews(id){
      this.$router.push({path:'/singlenews/'+id});
    }
  },
  created() {
    axios.get("http://127.0.0.1/news/getnews?type=indexnews").then(data=>{
        this.news = data.data.news;
        this.news.forEach(value => {
          value.npubdate = value.npubdate.match(/\d{4}-\d*-\d{2}/)[0];
        })
    });
    axios.get("http://127.0.0.1/news/getnews?type=nearnews").then(data=>{
      this.nearnews = data.data.nearnews;
      this.nearnews.forEach(value => {
        value.npubdate = value.npubdate.match(/\d{4}-\d*-\d{2}/)[0];
      })
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*文章动态*/
.newslist .index_article{
  padding:30px 0 60px 0;
    margin: 0 auto;
    text-align: center;
}
.newslist .index_article_header img{
  width: 128px;
  height: 128px;
    display: inline-block;
}
.newslist .index_article_header span{
  font-size: 75px;
  position: relative;
  top:20px;
    display: inline-block;
}
.index_article_content{
  text-align: center;
  margin: 80px auto;
}
.index_article_banner .index_article_student img{
  margin-top: 20px;
  width: 180px;
  height: 180px;
}
.index_article_content-subheader {
  width: 100%;
  position: relative;
  text-align: left;
  border-bottom: 2px solid #ffA500;
}
.index_article_content-subheader h1,p{
  display: inline-block;
  font-weight: bold;

}
.index_article_content-subheader h1{
  font-size: 50px;
  margin-right: 25px;
}
.index_article_content-subheader p{
  font-size: 24px;
}
.index_article_content-subheader p span{
  color:#ffA500;
  position: absolute;
  right: 0;
  cursor: pointer;
}
.index_article_content-subheader p span:hover{
  color: #00a1b6;
}

.index_article_content_subcontent ul .media{
  padding: 30px 10px;
  margin: 15px;
  overflow: hidden;
  cursor: pointer;
}
.index_article_content_subcontent ul .media:hover{
  box-shadow: 0 0 4px 3px rgba(0,0,0,.1);
}
.index_article_content_subcontent ul .media:hover .media-heading{
  color: #00a1d6;
}
.index_article_content_subcontent ul .media .media-body{
  position: relative;
  text-align: left;
  width: 68%;
}
.index_article_content_subcontent ul .media .media-body p{
  font-size: 16px;
  color: #99a2aa;
  line-height: 22px;
  overflow: hidden;
  text-align: left;
  margin-left: 10px;
  display: inline-block;
  width: 90%;
  height: 65px;
}

.index_article_content_subcontent ul .media .media-left{
    width: 150px;
    height: 137px;
}
.index_article_content_subcontent ul .media .media-left img{
    width: 100%;
    height: 100%;
  margin: 2px;
  border-radius: 4px;
}

.index_article_content_subcontent .article_content>h3{
  margin-bottom: 30px;
}
.index_article_content_subcontent ul .media h3{
  color: #000;
  text-align: left;
  font-size: 22px;
  font-weight: bolder;
  margin-left: 10px;
  transition: .3s;
  vertical-align: top;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 90%;
}
.index_article_content_subcontent ul .media .dec{
  text-align: left;
  position: relative;
  left: 0;
  bottom: 0;
  font-size: 18px;
}
.index_article_content_subcontent ul .media .dec span{
  margin: 0 10px;
  color: #99a2aa;
  display: inline-block;
}
.index_article_content_subcontent ul .media .dec span:nth-child(1) img{
  width: 22px;
  height: 22px;
  margin-bottom: 3px;
  margin-right: 5px;
  display: inline-block;
}

.index_article_content_subcontent ul .media .dec span:nth-child(2) img{
  width: 32px;
  height: 32px;
  margin-bottom: 3px;
  margin-right: 3px;
  margin-left: 5px;
  display: inline-block;
}
.index_article_content_subcontent ul .media .dec span:nth-of-type(3){
  position: absolute;
  right: 0;
  top:-3px;
}
@media (max-width:1600px) {

  /*文章动态*/
  .index_article_content-subheader h1{
    font-size: 40px;
  }
  .index_article_content_subcontent ul .media .media-body h3{
    width: 85%;
  }
  /*文章标签*/
  .index_article_content_subcontent ul .media .dec span{
    margin: 0 8px;
    font-size: 14px;
  }

}

</style>
