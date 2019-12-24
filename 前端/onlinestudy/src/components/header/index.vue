<template>
    <div class="">
        <div class="header">
            <!--导航条-->
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <router-link tag="a" class="navbar-brand" to="/index">
                    <img src="../../assets/logo.png" width="30px" height="30px" class="d-inline-block align-content-center" alt="">
                    803在线学习
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link tag="a" class="nav-link" to="/newslist"><span></span>新闻</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link tag="a" class="nav-link" to="/course"><span></span>课程</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link tag="a" class="nav-link" to="/exam"><span></span>考试</router-link>
                        </li>
                        <li class="nav-item usercenter">
                            <router-link tag="a" class="nav-link" to="/usercenter/userInfo">
                                <span>
                                    <img v-bind:src="userInfo.headimg" alt="">{{userInfo.name}}
                                </span>个人中心</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link tag="a" class="nav-link" to="/login"><span></span>登录</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link tag="a" class="nav-link" to="/register/userregister" ><span></span>注册</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import axios from "../../util/axios-auth"
    export default {
        name: "Header",
        data(){
            return{
                status:window.localStorage.getItem("usertype"),
                isLogin:false,
                userInfo:{
                    name:"",
                    headimg:"http://127.0.0.1:8080/image/header/AI.jpg"
                }
            }
        },
        created() {

        },
        mounted() {
            window.console.log(`status${this.status}`);
            switch (this.status) {
                case "会员":
                    axios.get("http://127.0.0.1/user.html",{params:{type:1}}).then(data=>{
                        if(data.data != null){
                            this.isLogin = true;
                            this.userInfo.name = data.data.info.uname;
                            if(data.data.info.uheadimage != "")
                                this.userInfo.headimg = data.data.info.uheadimage;
                        }
                    });
                    break;
                case "职员":
                    axios.get("http://127.0.0.1/user.html",{params:{type:2}}).then(data=>{
                        if(data.data != null){
                            this.isLogin = true;
                            window.console.log(`login:${this.isLogin}`);
                            this.userInfo.name = data.data.info.wname;
                            if(data.data.info.wheadimage != "")
                                this.userInfo.headimg = data.data.info.wheadimage;
                        }
                    });
                    break;
                case "系统管理员":
                    axios.get("http://127.0.0.1/user.html",{params:{type:3}}).then(data=>{
                        if(data.data != null){
                            this.isLogin = true;
                            this.userInfo.name = data.data.info.aname;
                            if(data.data.info.aheadimage != "")
                                this.userInfo.headimg = data.data.info.aheadimage;
                        }
                    });
                    break;
            }
            window.console.log(`login2:${this.isLogin}`);
        }
    };
</script>

<style scoped>
    nav{
        padding: 0 16px;
        line-height: 50px;
    }
    nav ul{
        position: absolute;
        right: 30px;
    }
    nav ul li{
        margin: 0 30px;
    }
    .usercenter span img{
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 10px;
        border-radius: 50%;
    }

</style>
