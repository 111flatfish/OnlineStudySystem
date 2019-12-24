<template>
    <div class="course">
        <div class="addexam">
            <h1 class="page-head">修改考试：</h1>
            <div>
                <form action="" method="post" class="form-group">
                    <label>标题：</label>
                    <input type="text" name="title" class="form-control" placeholder="标题" v-model="currentdata.etitle">
                    <label>科目：</label>
                    <input type="text" name="price" class="form-control" placeholder="科目" v-model="currentdata.esubject">
                    <label>考试时间：</label>
                    <div class="col-md-5">
                        <label>开始时间</label>
                        <date-picker v-model="currentdata.starttime" :config="options"></date-picker>
                    </div>
                    <div class="col-md-5">
                        <label>结束时间</label>
                        <date-picker v-model="currentdata.endtime" :config="options"></date-picker>
                    </div>
                    <label>考试时长：</label>
                    <input type="number" name="time" class="form-control" id="time" placeholder="/分" v-model="currentdata.etime">
                    <label>说明：</label>
                    <br>
                    <textarea name="synopsis" id="" cols="50" rows="10" placeholder="简介" v-model="currentdata.esynopsis"></textarea>
                    <br>
                    <label>内容：</label>
                    <!--<input type="text" name="content" class="form-control" placeholder="键入内容" v-model="formdata.content">-->
                    <button class="btn-primary" @click="addChoice" type="button">增加选择题</button>
                    <button class="btn-primary" @click="addBlank" type="button">增加填空题</button>
                    <div id="course_content">
                    </div>
                    <!--<Editor :catch-data="catchData" v-bind:content="txtcontent"></Editor>-->
                    <input type="button" value="上传修改" @click="uploadmodify" class="btn btn-primary">
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "../../../util/axios-auth"
    import editor from "../../../components/Editor"
    import fnc from "../../../util/fnc";
    import "@fortawesome/fontawesome-free/css/all.css"
    import datePicker from "vue-bootstrap-datetimepicker"
    import "bootstrap/dist/css/bootstrap.css"
    import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css"
    import $ from "jquery"
    export default {
        name: 'addexam',
        data(){
            return {
                currentdata:this.$store.getters.getexamdata,
                formdata:{
                    title:"",
                    type:"",
                    content:null,
                    starttime:null,
                    synopsis:"",
                    endtime:null,
                    time:0
                },
                // 课程类型
                type:0,
                currentEdit:{
                    currenContent:"",
                    currenChapter:0,
                    currenSubChapter:0
                },
                chapterData:[
                    {
                        chapter:1,
                        cname:"",
                        question:"",
                        choice:["","","",""],
                        answer:"",
                        type:"blank"
                    }
                ],
                starttime:new Date(),
                endtime:new Date(),
                options:{
                    format:"YYYY-MM-DD HH:mm:ss",
                    useCurrent:false,
                    locale:"zh-cn",
                    tooltips:{
                        selectTime: ""
                    }
                }
            }
        },
        methods:{
            uploadmodify(){
                this.currentdata.econtent = this.chapterData;
                axios.post("http://127.0.0.1:80/exam/modifyexam",this.currentdata).then(data=>{
                    window.alert("修改成功")
                    this.$router.push("/usercenter/exammanage/showexam")
                })
            },
            catchData(value){
                this.formdata.content = value;
                this.currentEdit.currenContent = value;
            },
            addChoice(){
                let chapter = this.chapterData;
                let temp = {
                    chapter:chapter.length +1,
                    cname:"",
                    question:"",
                    choice:["","","",""],
                    answer:"",
                    type:"choice"
                };
                chapter.push(temp);
                fnc.showAddChoice(temp,this.reduceChapter,this.modifyquestion,this.modifyanswer);
            },
            addBlank(){
                let chapter = this.chapterData;
                let temp = {
                    chapter:chapter.length +1,
                    cname:"",
                    question:"",
                    choice:["","","",""],
                    answer:"",
                    type:"blank"
                };
                chapter.push(temp);
                fnc.showAddBlank(temp,this.reduceChapter,this.modifyquestion,this.modifyanswer);
            },
            modifyquestion(ev){
                let numTemp = ev.target.getAttribute("chapterNum");
                let chapternum = Number.parseInt(numTemp);
                // 修改问题
                let oquestoin = document.getElementById(`exam${chapternum}question`);
                this.chapterData[chapternum-1].question = oquestoin.value;
                // 修改选项
                let oitem = document.querySelectorAll(`#exam${chapternum}choice`);
                if(oitem.length >0)
                oitem.forEach((value,index)=> {
                    this.chapterData[chapternum-1].choice[index] = value.value;
                });
            },
            modifyanswer(ev){
                let numTemp = ev.target.getAttribute("chapterNum");
                let chapternum = Number.parseInt(numTemp);
                let oanswer = document.getElementById(`exam${chapternum}answer`);
                this.chapterData[chapternum-1].answer = oanswer.value;
            },
            reduceChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.chapterData;
                for(let i = (chapterNum-1) ; i < chapter.length-1;i++){
                    chapter[i].cname = chapter[i+1].cname;
                    chapter[i].question = chapter[i+1].question;
                    chapter[i].answer = chapter[i+1].answer;
                    chapter[i].type = chapter[i+1].type;
                    chapter[i].choice = chapter[i+1].choice;
                }
                chapter.pop();
                fnc.showReduceExam(this.chapterData,this.reduceChapter,this.modifyquestion,this.modifyanswer);
            },
        },
        created(){
            $.extend(true, $.fn.datetimepicker.defaults, {
                icons: {
                    time: 'far fa-clock',
                    date: 'far fa-calendar',
                    up: 'fas fa-arrow-up',
                    down: 'fas fa-arrow-down',
                    previous: 'fas fa-chevron-left',
                    next: 'fas fa-chevron-right',
                    today: 'fas fa-calendar-check',
                    clear: 'far fa-trash-alt',
                    close: 'far fa-times-circle'
                }
            });
        },
        mounted() {
            this.chapterData = (typeof this.currentdata.econtent) == "string"?JSON.parse(this.currentdata.econtent):this.currentdata.econtent;
            fnc.showExam(this.chapterData,this.reduceChapter,this.modifyquestion,this.modifyanswer);
        },
        components:{
            Editor:editor,
            datePicker
        }
    }
</script>

<style scoped>
    .addexam{
        width: 1200px;
        position: relative;
    }

    #contentedit{
        width: 400px;
        height: 350px;
        border:1px solid #369;
    }
    #control{
        width: 400px;
        height: 50px;
    }
    #control ul{
        margin: 0 ;
        padding: 0;

        width: 400px;
        height: 50px;
        border-bottom:2px solid #000;
        list-style: none;
    }
    #control ul li{
        text-align: center;
        width: 48px;
        height: 50px;
        line-height: 50px;
        background-color: #5a6268;
        float: left;
        border:1px solid #0c5460;
        cursor:pointer;
    }
    #control ul li:hover{
        opacity: 0.7;
    }

    #edit{
        height: 300px;
        width: 400px;
    }
    #edit:empty::before{
        content: "请输入不少于150字正文，支持图文商品混排哦！";
        font-size: 14px;
        color: #CCC;
        line-height: 21px;
        padding-top: 10px;
    }
    #course_content{
        border: 1px solid #1b1e21;
        width: 100%;
        overflow: hidden;


    }
    #course_content #chapter{
        border: 1px solid #1b1e21;
    }
    .addexameditor{
        border: 20px solid #00B7FF;
        border-radius: 5px;
        margin-left: 60px;
    }
</style>
