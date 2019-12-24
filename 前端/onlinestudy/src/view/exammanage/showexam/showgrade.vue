<template>
    <div class="showgrade">
        <h1 class="page-header">考试:</h1>
        <h2>颁发证书</h2>
        <label>条件：</label>
        <input type="number" placeholder="输入大于多少分给与证书" v-model="limit">
        <label style="display: block">证书：</label>
        <textarea id="certificate" cols="80" rows="5" v-model="certificate"></textarea>
        <input style="position: relative;top: -40px;left: 30px;" type="button" value="颁发证书" @click="sendcertificate" class="btn btn-primary btn-lg">
        <div class="showgrade_content">
            <table class="table table-bordered">
                <tr>
                    <th>参加者</th>
                    <th>成绩</th>
                    <th>证书</th>
                </tr>

                <tr v-for="item in grade" :key="item.id">
                    <td>{{item.uid}}</td>
                    <td>{{item.grade}}</td>
                    <td>{{item.certificate}}</td>
                </tr>
            </table>
            <div id="pagecontrol">
                <ul id="pagelist">
                    <li v-for="item in pagelist" v-bind:key="item" @click="page" data-set="item">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "../../../util/axios-auth"
    export default {
        name: 'showgrade',
        data(){
            return {
                grade:[],
                pagelist:[],
                pagelist2:[1,2,3,4],
                pagenum:0,
                limit:null,
                certificate:null
            }
        },
        props:["eid"],
        methods:{
            changebtn(data){
                this.$store.commit("setexamdata",data);
                this.$router.push("/usercenter/exammanage/changeexam");
            },
            deletebtn(data){
                axios.get("http://127.0.0.1:80/exam/deleteexam?eid="+data.eid).then(data=>{
                    window.alert("删除成功");
                    this.$router.go(0);
                });
            },
            sendcertificate(){
                axios.post(`http://127.0.0.1:80/exam/sendcertificate`,{limit:this.limit,certificate:this.certificate,eid:this.eid}).then(data=>{
                    window.alert(data.data.message);
                    this.$router.go(0);
                });
            },
            page(ev){
                // window.console.log(ev.target.innerText);
                axios.get(`http://127.0.0.1/exan/checkgrade?page=${ev.target.innerText}&eid=${this.eid}`).then(data=>{
                    this.grade = data.data.grade;
                });
            }
        },
        created() {
            axios.get(`http://127.0.0.1:80/exam/checkgrade?page=0&eid=${this.eid}`).then((data)=> {
                this.pagenum = data.data.num;
                for(let i = 0 ; i < this.pagenum;i++){
                    this.pagelist[i] = i+1;
                }
            });
            axios.get(`http://127.0.0.1:80/exam/checkgrade?page=1&eid=${this.eid}`).then(data=>{
                this.grade = data.data.grade;
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #pagecontrol{
        position: relative;
        max-width: 1200px;
    }
    ul{
        position: absolute;
        left: 0;
        top: 0;
        margin: 0 250px;
        padding: 0;
        text-align: center;
        list-style: none;
    }
    ul li{
        width: 30px;
        margin-left: 20px;
        border: 2px solid green;
        float: left;
        cursor: pointer;

    }
    table{
        width: 100%;
        table-layout: fixed;
    }
    table tr td{
        /* for IE */
        text-overflow: ellipsis;
        /* for Firefox,mozilla */
        -moz-text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: left

    }
</style>
