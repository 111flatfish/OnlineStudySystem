<template>
        <div class="row clearfix banner container">
            <div class="col-md-12 column">
                <div class="carousel slide" v-bind:id="'carousel-'+locationData">
                    <!--指示灯-->
                    <ol class="carousel-indicators">
                        <!--三个圆点-->
                        <li v-bind:data-slide-to="index" v-bind:data-target="'#carousel-'+locationData" v-for="(item,index) in imgs">
                        </li>
                    </ol>
                    <!--中间图片-->
                    <div class="carousel-inner" id="a">
                        <div class="item"  v-for="data in imgs">
                            <!--图片-->
                            <img alt="轮播图" v-bind:src='data.image_url'/>
                            <!--文字描述-->
                            <div class="carousel-caption">
                                <h3>
                                    First Thumbnail label
                                </h3>
                                <p style="margin-bottom: 30px;font-size: 16px;">
                                    {{data.content}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--左右箭头-->
                    <a class="left carousel-control" v-bind:href="'#carousel-'+locationData" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                    <a class="right carousel-control" v-bind:href="'#carousel-'+locationData" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                </div>
            </div>
        </div>
</template>

<script>
    // 引入axios
    import axiosReq from "../../util/axiosConfig"

    export default {
        name: "Banner",
        props:["bannerData","locationData"],
        data(){
            return{
                imgs:[]
            }
        },
        created() {
            axiosReq.get(`getBanner/page/${this.bannerData}/location/${this.locationData}`).then(data=>{
                this.imgs = data.data;
                this.$nextTick(()=> {
                    $(function () {
                        $(".item").first().addClass("active");
                        $(".carousel-indicators li").first().addClass("active");
                    })
                })
            });
            $(function () {
                // 轮播图轮播时间
                $('.carousel').carousel({
                    interval: 3000
                });
            });
        },
        mounted() {



        }
    }
</script>

<style scoped>
.banner{
    padding: 0 ;
    margin: 0 auto;
}
.banner .item img{
    margin: 0 auto;

}
.banner img{
    width: 100%;
    height: 48%;
}
.banner .column{
    padding: 0;
}
.banner .carousel-control{
    opacity: 0;
}
.banner .carousel-indicators li{
    width: 15px;
    height: 15px;
    margin: 10px;
}
@media (max-width:768px ){
    .banner img{
        width: 100%;
        height: 400px;
    }
}
@media (max-width:400px ){
    .banner img{
        width: 100%;
        height: 200px;
    }
    .banner .carousel-caption h3{
        font-size: 16px;
    }
    .banner .carousel-caption p{
        font-size: 12px;
    }
    .banner .carousel-indicators li{
        width: 10px;
        height: 10px;
        margin: 5px;
    }
}



</style>
