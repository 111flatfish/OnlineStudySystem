<template>
    <div class="course">
        <div class="addexam">
            <h1 class="page-head">添加考试：</h1>
            <div>
                <form action="" method="post" class="form-group">
                    <!--let examSchema = mongoose.Schema({-->
                    <!--eid:String,-->
                    <!--econtent:String,-->
                    <!--epubdate:String,-->
                    <!--ecertificate:String,    //证书-->
                    <!--esubject:String,-->
                    <!--wid:String-->
                    <!--});-->
                    <label>标题：</label>
                    <input type="text" name="title" class="form-control" placeholder="标题" v-model="formdata.title">
                    <label>科目：</label>
                    <input type="text" name="price" class="form-control" placeholder="科目" v-model="formdata.type">
                    <label>考试时间：</label>
                    <div class="form-check" style="display: inline-block;margin: 0 15px">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" v-bind:value="false" v-model="selecttime" checked>
                        <label class="form-check-label" for="exampleRadios1">
                            不限时间
                        </label>
                    </div>
                    <div class="form-check" style="display: inline-block">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" v-model="selecttime" v-bind:value="true">
                        <label class="form-check-label" for="exampleRadios2">
                            指定时间
                        </label>
                    </div>
                    <div class="examtime">
                        <div class="col-md-5" v-if="selecttime">
                            <label>开始时间</label>
                            <date-picker v-model="formdata.starttime" :config="options"></date-picker>
                        </div>
                        <div class="col-md-5" v-if="selecttime">
                            <label>结束时间</label>
                            <date-picker v-model="formdata.endtime" :config="options"></date-picker>
                        </div>
                        <div class="col-md-12" v-if="!selecttime">
                            <label style="border: 1px solid #ccc;color: green">不限时进入考试的时间</label>
                        </div>
                    </div>
                    <label>考试时长：</label>
                    <input type="number" name="time" class="form-control" id="time" placeholder="/分" v-model="formdata.time">
                    <label>说明：</label>
                    <br>
                    <textarea name="synopsis" id="" cols="50" rows="10" placeholder="简介" v-model="formdata.synopsis"></textarea>
                    <br>
                    <label>是否有证书？</label>
                    <div class="form-check" style="display: inline-block;margin: 0 15px">
                        <input class="form-check-input" type="radio" name="certificateRadios" id="exampleRadios3" v-bind:value="false" v-model="hascerfiticate" checked>
                        <label class="form-check-label" for="exampleRadios3">
                            没有证书
                        </label>
                    </div>
                    <div class="form-check" style="display: inline-block">
                        <input class="form-check-input" type="radio" name="certificateRadios" id="exampleRadios4" v-model="hascerfiticate" v-bind:value="true">
                        <label class="form-check-label" for="exampleRadios4">
                            输入证书
                        </label>
                    </div>
                    <div class="examcertificate">
                        <div class="col-md-12" v-if="hascerfiticate">
                            <button type="button" class="btn btn-lg btn-primary"  data-toggle="modal" data-target="#certificateModalCenter">编写证书</button>
                            <label style="display: inline-block;margin-left: 15px;color: red" v-if="!editcerfiticate">尚未编写证书</label>
                            <label style="display: inline-block;margin-left: 15px;color: green" v-if="editcerfiticate">已编写证书</label>
                            <!-- Modal -->
                            <div class="modal fade" id="certificateModalCenter" tabindex="-1" role="dialog" aria-labelledby="certificateModalCenter" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="certificateModalCenterTitle">Modal title</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="editor">
                                                <Editor :catch-data="catchData" ref="edit" v-bind:course="true"></Editor>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="uploadcertificate">保存证书</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" v-if="!hascerfiticate">
                            <label style="border: 1px solid #ccc;color: green">证书：没有证书</label>
                        </div>
                    </div>
                    <label>每题分数：</label>
                    <input type="text" name="score" class="form-control" placeholder="分数" v-model="formdata.score">
                    <label>允许获得证书的分数：</label>
                    <input type="text" name="passgrade" style="margin: 15px 0" class="form-control" placeholder="获得证书的分数" v-model="formdata.passgrade">
                    <label>内容：</label>
                    <!--<input type="text" name="content" class="form-control" placeholder="键入内容" v-model="formdata.content">-->
                    <button class="btn-primary" @click="addChoice" type="button">增加选择题</button>
                    <button class="btn-primary" @click="addBlank" type="button">增加填空题</button>
                    <div id="course_content">
                        <!--<div id="chapter" chapterNum=1>-->
                        <!--<span style="border: 1px solid #000">章节1：</span><span @click="addSubChapter" style="border: 1px solid #000;border-radius: 50%">┿</span>-->
                        <!--</div>-->
                    </div>

                    <!--<Editor :catch-data="catchData" v-bind:content="txtcontent"></Editor>-->
                    <input type="button" value="上传" @click="upload" class="btn btn-primary">
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
                formdata:{
                    title:"",
                    type:"",
                    content:null,
                    starttime:null,
                    synopsis:"",
                    endtime:null,
                    time:0,
                    certificate:null,
                    score:null,
                    passgrade:null
                },
                // 课程类型
                type:0,
                selecttime:false,
                hascerfiticate:false,
                editcerfiticate:false,
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
            upload(){
                if(this.selecttime == false){
                    this.formdata.starttime = null;
                    this.formdata.endtime = null;
                }
                if(this.editcerfiticate == false){
                    this.formdata.certificate = null;
                }
                window.console.log(this.formdata);
                this.formdata.content = this.chapterData;
                axios.post("http://127.0.0.1:80/exam/addexam",this.formdata).then(data=>{
                    window.console.log(data.data);
                    window.alert("添加成功")
                    this.$router.push("/usercenter/exammanage/showexam")
                });
            },
            uploadcertificate(){
                this.editcerfiticate = true;
            },
            catchData(value){
                this.formdata.certificate = value;
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
            })
        },
        mounted() {
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
    .examcertificate{
        margin: 15px 0;
    }
    .examcertificate .modal-content{
              width: 160%;
    }


</style>
