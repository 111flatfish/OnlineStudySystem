<template>
    <div class="coursemanage">
        <h1>课程管理</h1>
        <div class="coursemanage_nav">
            <ul>
                <router-link tag="li" to="/usercenter/coursemanage/addcourse"><button class="btn-primary btn-lg">添加课程</button></router-link>
                <router-link tag="li" to="/usercenter/coursemanage/showcourse"><button class="btn-primary btn-lg">显示课程</button></router-link>
                <router-link tag="li" to="/usercenter/coursemanage/showcourse"><button class="btn-primary btn-lg">刷新</button></router-link>
            </ul>
        </div>
        <div class="coursemanage_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'coursemanage'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .coursemanage{
        width: 100%;
        border:1px solid #1b1e21;
    }
    .coursemanage_nav {
        margin-bottom: 80px;
    }
    .coursemanage_nav ul{
        list-style: none;
    }
    .coursemanage_nav ul li{
        float: left;
        margin-left: 20px;
    }
</style>