<template>
    <div class="article container">
        <h1>{{article.scname}}</h1>
        <p id="article_content" style="font-size: 30px;" ref="showarticle">
        </p>
    </div>
</template>

<script>
    import axios from "../../util/axios-auth"
    export default {
        name: "aritcle",
        data(){
            return {
                article:null,
                starttime:null,
                endtime:null,
                studytime: 0
            }
        },
        methods:{
          articleinit(){
              this.article = this.$store.getters.getarticle;
              window.console.log(this.article);
              this.$nextTick(function () {
                  this.$refs.showarticle.innerHTML = this.article.content;
              });
              this.starttime = new Date().getTime();
          }
        },
        created() {

        },
        mounted() {
            this.articleinit();
        },
        watch:{
            "$route":"articleinit"
        },
        beforeRouteLeave(to,from,next){
            this.endtime = new Date().getTime();
            this.studytime = this.endtime - this.endtime;
            let chapter = this.article.chapter+""+this.article.subchapter;
            window.console.log("chapter"+chapter);
            window.console.log("cid"+this.article.cid);
            axios.post("http://127.0.0.1/course/studycoursetime",{time:this.studytime,cid:this.article.cid,studyedchapter:chapter}).then(data=>{
                if(data.data.status == 202){
                    next();
                }else if(data.data.status == 203){
                    window.alert(data.data.message);
                    next();
                }else if(data.data.status == 200){
                    window.alert(data.data.message);
                    next();
                }
                else{
                    window.alert("学习出错！该课程将不增加积分");
                    next();
                }
            });

        }
    }
</script>

<style scoped>
.article{
    margin-top: 200px;
    text-align: center;
    box-shadow: 2px 2px 3px 3px rgba(0,0,0,.4);
}
</style>
