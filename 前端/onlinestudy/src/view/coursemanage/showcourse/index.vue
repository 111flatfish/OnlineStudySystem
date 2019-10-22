<template>
    <div class="showcourse">
        <h1 class="page-header">课程:</h1>
        <div class="showcourse_content">
            <table class="table table-bordered">
                <tr>
                    <th colspan="2">标题</th>
                    <th>类型</th>
                    <th>简介</th>
                    <th>价格</th>
                    <th colspan="2">内容</th>
                    <th>上传时间</th>
                    <th>更新</th>
                    <th>删除</th>

                </tr>

                <tr v-for="item in course" v-bind:key="item.cid" >
                    <td colspan="2">{{item.cname}}</td>
                    <td>{{item.ctype}}</td>
                    <td>{{item.csynopsis}}</td>
                    <td>{{item.cprice}}</td>
                    <td colspan="2">{{item.ccontent}}</td>
                    <td>{{item.cpubdate}}</td>
                    <td><button @click="changebtn({cid:item.cid,cname:item.cname,ctype:item.ctype,csynopsis:item.csynopsis,cprice:item.cprice,ccontent:item.ccontent})">更新</button></td>
                    <td><button @click="deletebtn({cid:item.cid})">删除</button></td>
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
        name: 'showcourse',
        data(){
            return {
                course:[],
                pagelist:[],
                pagelist2:[1,2,3,4],
                pagenum:0
            }
        },
        methods:{
            changebtn(data){
                window.console.log(data.cname);
                this.$store.commit("setcoursedata",data);
                this.$router.push("/usercenter/coursemanage/changecourse");
            },
            deletebtn(data){
                // window.console.log(data.nid);
                axios.get("http://127.0.0.1:80/course/deletecourse?cid="+data.cid).then(data=>{
                    window.console.log(data);
                    window.alert("删除成功");
                    this.$router.push("/usercenter/coursemanage/showcourse");
                });
            },
            page(ev){
                // window.console.log(ev.target.innerText);
                axios.get("http://127.0.0.1/course/showcourse?page="+ev.target.innerText).then(data=>{
                    window.console.log(data);
                    this.course = data.data.course;
                });
            }
        },
        created() {
            axios.get("http://127.0.0.1:80/course/showcourse?page="+0).then((data)=> {
                // window.console.log(data);
                window.console.log(data.data.num);
                this.pagenum = data.data.num;
                for(let i = 0 ; i < this.pagenum;i++){
                    this.pagelist[i] = i+1;
                }
                window.console.log(this.pagelist);
            });
            axios.get("http://127.0.0.1:80/course/showcourse?page="+1).then(data=>{
                this.course = data.data.course;
                window.console.log(this.course);
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
