<template>
    <div class="side">
        <!--悬浮侧边栏-->
        <div class="index_side">
            <ul>
                <li>
                    <span>156-2658-0565</span>
                    <img src="../../../public/image/side/phone.png" alt="phone">
                </li>
                <li>
                    <span>
                        <img src="../../../public/image/side/二维码-官方微信号.png" alt="微信二维码">
                        <p>戏传艺考官方微信</p>
                        <img src="../../../public/image/side/二维码-微信公众号.png" alt="微博二维码">
                        <p>戏传艺考官方公众号</p>
                    </span>
                    <img src="../../../public/image/side/weixin.png" alt="weixin">
                </li>
                <li>
                    <span>
                        <img src="../../../public/image/side/二维码-QQ客服.png" alt="qq">
                    </span>
                    <img src="../../../public/image/side/qq.png" alt="qq">
                </li>
                <li>
                    <span>
                        <img src="../../../public/image/side/二维码-官方微博.png" alt="微博二维码">
                    </span>
                    <img src="../../../public/image/side/weibo.png" alt="weibo">
                </li>
                <li>
                    <span>zhongxingyijiao@yeah.net</span>
                    <img src="../../../public/image/side/email.png" alt="email">
                </li>
                <li>
                    <span>如有疑问请点击此处</span>
                    <img src="../../../public/image/side/question.png" alt="question">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "side",
        mounted() {
            // 侧边栏鼠标悬停
            $(function () {
                $(".index_side ul li").mouseenter(function () {
                    $(this).children("span").stop().show(100);
                }).mouseleave(function () {
                    $(this).children("span").stop().hide(100);
                });
            });
        }
    }
</script>

<style scoped>
    /*侧边栏浮窗*/
    .index_side{
        position: fixed;
        right: -25px;
        bottom: 80px;
        z-index: 2003;
    }
    .index_side ul{
        width: 200px;
        text-align: center;
    }
    .index_side ul li{
        margin: 20px 0;
        background-color: #eaeaea;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        line-height: 50px;
        position: relative;
        box-shadow: 2px 2px 2px 2px rgba(0,0,0,.3);
    }
    /*侧边栏图标*/
    .index_side ul li img{
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    .index_side ul li:nth-of-type(5) img{
        width: 40px;
        height: 30px;
    }
    .index_side ul li span{
        padding: 10px;
        position: absolute;
        right: 100px;
        border: 1px solid #000;
        background-color: #f4f5f7;
        border-radius: 10px;
        box-shadow: -2px 2px 2px 2px rgba(0,0,0,.3);
        font-size: 24px;
        color: #222;
        display: none;
    }
    .index_side ul li span:before,.index_side ul li span:after{
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        border:solid transparent;
        transform: scaleY(0.4);
        z-index: 8000;
    }
    .index_side ul li span:before{
        border-width: 28px;
        border-left-color: #000;
        right:-56px;
        top: 2px;
    }
    .index_side ul li span:after{
        border-width: 28px;
        border-left-color: #f4f5f7;
        top: 2px;
        right:-54px;
    }
    /*第一个图标*/
    .index_side ul li:nth-of-type(1) span{
        width: 170px;
        height: 60px;
        line-height: 45px;
    }
    /*第二个*/
    .index_side ul li:nth-of-type(2) span{
        width: 250px;
        height: 130px;
        line-height: 45px;
    }
    .index_side ul li:nth-of-type(2) span img{
        height: 100px;
        width: 100px;
    }
    .index_side ul li:nth-of-type(2) span img:nth-of-type(1){
        margin-right: 25px;
    }
    .index_side ul li:nth-of-type(2) span p{
        position: absolute;
        font-size: 12px;
    }
    .index_side ul li:nth-of-type(2) span p:nth-of-type(1){
        bottom: -23px;
        left: 5px;
    }
    .index_side ul li:nth-of-type(2) span p:nth-of-type(2){
        bottom: -23px;
        right:5px;
    }
    /*第三个*/
    .index_side ul li:nth-of-type(3) span img{
        height: 100px;
        width: 100px;
    }
    /*第四个*/
    .index_side ul li:nth-of-type(4) span img{
        height: 100px;
        width: 100px;
    }
    /*第五个*/
    .index_side ul li:nth-of-type(5) span{
        width: 270px;
        height: 60px;
        line-height: 40px;
    }
    /*第六个*/
    .index_side ul li:nth-of-type(6) span{
        width: 270px;
        height: 60px;
        line-height: 40px;
    }
    @media (max-width: 1600px) {
        /*侧边栏*/
        .index_side ul{
            width: 150px;
        }
    }
    @media (max-width: 768px) {
        /*侧边栏浮窗*/
        .index_side{
            right: -13px;
        }
        .index_side ul{
            width: 76px;
        }
        .index_side ul li{
            width: 40px;
            height: 40px;
            line-height: 40px;
            margin: 5px 0;
        }
        .index_side ul li span{
            right: 72px;
        }
        .index_side ul li img{
            width: 30px;
            height: 30px;
        }
        .index_side ul li:nth-of-type(5) img{
            width: 30px;
            height: 20px;
        }
        .index_side ul li:nth-of-type(1) span{
            line-height: 38px;
        }
        .index_side ul li:nth-of-type(5) span,.index_side ul li:nth-of-type(6) span{
            width: 245px;
            font-size: 21px;
        }
    }

</style>
