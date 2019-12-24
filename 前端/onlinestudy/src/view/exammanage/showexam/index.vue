<template>
    <div class="showexam">
        <h1 class="page-header">考试:</h1>
        <div class="showexam_content" style="padding: 15px">
            <table class="table table-bordered">
                <tr>
                    <th colspan="2">标题</th>
                    <th>类型</th>
                    <th>简介</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>考试时长</th>
                    <th>上传时间</th>
                    <th>更新</th>
                    <th>删除</th>
                    <th>考试状态</th>
                </tr>

                <tr v-for="item in exam" v-bind:key="item.eid" >
                    <td colspan="2">{{item.etitle}}</td>
                    <td>{{item.esubject}}</td>
                    <td>{{item.esynopsis}}</td>
                    <td>{{item.starttime}}</td>
                    <td>{{item.endtime}}</td>
                    <td>{{item.etime}}</td>
                    <td>{{item.epubdate}}</td>
                    <td><button @click="changebtn({eid:item.eid,etitle:item.etitle,esubject:item.esubject,esynopsis:item.esynopsis,starttime:item.starttime,econtent:item.econtent,etime:item.etime,endtime:item.endtime})">更新</button></td>
                    <td><button @click="deletebtn({eid:item.eid})">删除</button></td>
                    <td><button @click="checkexam({eid:item.eid})">考试结果</button></td>
                </tr>
            </table>
            <div id="pagecontrol" >
                <ul id="pagelist">
                    <li v-for="item in pagelist"  @click="page" :key="item.index">
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
        name: 'showexam',
        data(){
            return {
                exam:[],
                pagelist:[],
                pagenum:0
            }
        },
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
            checkexam(data){
                this.$router.push({
                    path:`/usercenter/exammanage/showgrade/${data.eid}`,
                });
            },
            page(ev){
                // window.console.log(ev.target.innerText);
                axios.get("http://127.0.0.1/exam/showexam?page="+ev.target.innerText).then(data=>{
                    this.exam = data.data.exam;
                });
            }
        },
        created() {

        },
        mounted() {
            axios.get("http://127.0.0.1:80/exam/showexam?page="+0).then((data)=> {
                this.pagenum = data.data.num;
                window.console.log(this.pagenum);
                for(let i = 0 ; i < this.pagenum;i++){
                    this.pagelist.push(i+1);
                }
                window.console.log(this.pagelist);
            });
            axios.get("http://127.0.0.1:80/exam/showexam?page="+1).then(data=>{
                this.exam = data.data.exam;
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #pagecontrol{
        position: relative;
    }
    ul{
        margin: 0 auto;
        padding: 15px;
        text-align: center;
        list-style: none;
    }
    ul li{
        display: inline-block;
        width: 30px;
        margin-left: 20px;
        border: 2px solid green;
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
