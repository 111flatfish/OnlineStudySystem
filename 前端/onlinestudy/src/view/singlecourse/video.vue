<template>
    <div class="video" style="margin: 0 auto;text-align: center">
        <h1>{{video.scname}}</h1>
        <video v-bind:src="'http://127.0.0.1/video/10172330/'+video.content" controls="controls" width="720" height="560">
        </video>
    </div>
</template>

<script>
    import axios from "../../util/axios-auth"
    export default {
        name: "video",
        data(){
            return{
                video:null
            }
        },
        methods:{
            videoinit(){
                this.video = this.$store.getters.getarticle;
                window.console.log(this.video);
            }
        },
        created() {
            this.videoinit();
        },
        watch:{
          "$route":"videoinit"
        }
    }
</script>

<style scoped>

</style>
