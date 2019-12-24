<template>
    <div class="course">
        <div class="addcourse">
            <h1 class="page-head">添加课程：</h1>
            <router-link to="/usercenter/coursemanage/addcourse/addarticle" tag="button" class="btn btn-primary">添加文章</router-link>
            <router-link to="/usercenter/coursemanage/addcourse/addvideo" tag="button" class="btn btn-primary">添加视频</router-link>

            <keep-alive>
                <router-view></router-view>
            </keep-alive>


        </div>
    </div>
</template>


<script>
    export default {
        name: 'course',
        data(){
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .addcourse{
        width: 1200px;
        position: relative;
    }

    #contentedit{
        width: 400px;
        height: 350px;
        border:1px solid #369;
    }
    #control{
        width: 400px;
        height: 50px;
    }
    #control ul{
        margin: 0 ;
        padding: 0;

        width: 400px;
        height: 50px;
        border-bottom:2px solid #000;
        list-style: none;
    }
    #control ul li{
        text-align: center;
        width: 48px;
        height: 50px;
        line-height: 50px;
        background-color: #5a6268;
        float: left;
        border:1px solid #0c5460;
        cursor:pointer;
    }
    #control ul li:hover{
        opacity: 0.7;
    }

    #edit{
        height: 300px;
        width: 400px;
    }
    #edit:empty::before{
        content: "请输入不少于150字正文，支持图文商品混排哦！";
        font-size: 14px;
        color: #CCC;
        line-height: 21px;
        padding-top: 10px;
    }
    #course_content{
        border: 1px solid #1b1e21;
        width: 100%;
        overflow: hidden;


    }
    #course_content #chapter{
        border: 1px solid #1b1e21;
    }
    .addcourseeditor{
        border: 20px solid #00B7FF;
        border-radius: 5px;
        margin-left: 60px;
    }
</style>
