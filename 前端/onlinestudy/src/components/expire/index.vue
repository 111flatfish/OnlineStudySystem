<template>
    <div class="expire">
        <p>登录信息过期，请重新登录！</p>
        <router-link to="/login"><button class="btn-success">登录</button></router-link>
    </div>
</template>

<script>
    export default {
        name: "expire"
    }
</script>

<style scoped>
.expire{
    width: 400px;
    height: 300px;
    padding-top: 100px;
    background-color: #00B7FF;
    margin: 100px auto;
    text-align: center;
    border: 1px solid #1b1e21;
    border-radius: 4px;
}
</style>
