<template>
    <div class="showusermanage container">
        <h1 class="page-header">用户管理:</h1>
        <div class="showusermanage_content">
            <table class="table table-bordered">
                <tr>
                    <th colspan="2">系统管理员</th>
                    <th>会员</th>
                    <th>职员</th>
                    <th>会员记录</th>
                    <th>职员记录</th>
                    <th>管理</th>

                </tr>

                <tr v-for="item in usermanage" v-bind:key="item.cid" >
                    <td colspan="2">{{item.aid}}</td>
                    <td>{{item.uid}}</td>
                    <td>{{item.wid}}</td>
                    <td>{{item.userrecord}}</td>
                    <td>{{item.workerrecord}}</td>
                    <td><button @click="deletebtn({aid:item.aid,uid:item.uid,wid:item.wid})">封禁</button></td>
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
    import axios from "../../util/axios-auth"
    export default {
        name: 'showusermanage',
        data(){
            return {
                usermanage:[],
                pagelist:[],
                pagenum:0
            }
        },
        methods:{
            page(ev){
                // window.console.log(ev.target.innerText);
                axios.get("http://127.0.0.1/exam/showusermanage?page="+ev.target.innerText).then(data=>{
                    window.console.log(data);
                    this.usermanage = data.data.usermanage;
                });
            },
            deletebtn(){

            }

        },
        created() {
            axios.get("http://127.0.0.1:80/exam/showusermanage?page="+0).then((data)=> {
                // window.console.log(data);
                window.console.log(data.data.num);
                this.pagenum = data.data.num;
                for(let i = 0 ; i < this.pagenum;i++){
                    this.pagelist.push(i+1);
                }
            });
            axios.get("http://127.0.0.1:80/exam/showusermanage?page="+1).then(data=>{
                this.usermanage = data.data.usermanage;
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
