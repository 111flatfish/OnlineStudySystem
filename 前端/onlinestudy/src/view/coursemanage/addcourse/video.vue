<template>
    <div class="video">
        <form action="" method="post" class="form-group" id="course_form" enctype="multipart/form-data">
            <label>标题：</label>
            <input type="text" name="title" class="form-control" placeholder="标题" v-model="formdata.title">
            <label>分类：</label>
            <input type="text" name="type" class="form-control" placeholder="前端" v-model="formdata.type">
            <label>价格：</label>
            <input type="text" name="price" class="form-control" placeholder="价格" v-model="formdata.price">
            <label>简介：</label>
            <br>
            <textarea name="synopsis" id="" cols="50" rows="10" placeholder="简介" v-model="formdata.synopsis"></textarea>
            <br>
            <label>章节：</label>
            <input type="text" name="chapter" class="form-control" placeholder="章节" v-model="formdata.chapter">
            <label>内容：</label>
            <!--<input type="text" name="content" class="form-control" placeholder="键入内容" v-model="formdata.content">-->
            <button class="btn-primary" @click="addChapter" type="button">增加章节</button>
            <div id="course_content">
                <!--<div id="chapter" chapterNum=1>-->
                <!--<span style="border: 1px solid #000">章节1：</span><span @click="addSubChapter" style="border: 1px solid #000;border-radius: 50%">┿</span>-->
                <!--</div>-->
            </div>





            <!--<Editor :catch-data="catchData" v-bind:content="txtcontent"></Editor>-->
            <input type="button" value="上传" @click="upload" class="btn btn-primary">
        </form>
    </div>
</template>

<script>
    import axios from "../../../util/axios-auth"
    import fnc from "../../../util/fnc";
    export default {
        name: 'video',
        data(){
            return {
                formdata:{
                    title:"",
                    type:"",
                    content:null,
                    price:0,
                    synopsis:"",
                    chapter:1
                },
                form:new FormData(),
                form2:new FormData(),
                // 课程类型
                type:1,
                currentEdit:{
                    currenContent:"",
                    currenChapter:0,
                    currenSubChapter:0
                },
                chapterData:[
                    {
                        chapter:1,
                        cname:"",
                        subchapter:[
                            {
                                suborder:1,
                                scname:"",
                                content:""
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            upload(){
                this.formdata.content = this.chapterData;
                window.console.log(JSON.stringify(this.chapterData));
                this.form2.append("title",this.formdata.title);
                this.form2.append("type",this.formdata.type);
                this.form2.append("price",this.formdata.price);
                this.form2.append("synopsis",this.formdata.synopsis);
                this.form2.append("chapter",this.formdata.chapter);
                this.form2.append("content",JSON.stringify(this.formdata.content));
                this.form2.append("coursetype",this.type);
                const config = {
                    headers: { "Content-Type": "multipart/form-data" }
                };
                axios.post("http://127.0.0.1:80/course/uploadVideoCourse",this.form2,config).then(data=>{
                    window.alert(data.data.message);
                    this.$router.push("/usercenter/coursemanage/showcourse");
                });
            },
            addChapter(){
                let chapter = this.chapterData;
                let temp = {
                    chapter:chapter.length +1,
                    cname:"",
                    subchapter:[]
                };
                chapter.push(temp);
                fnc.showAddChapter(temp,this.addSubChapter,this.reduceChapter,this.modifycname);
                window.console.log(chapter);
            },
            addSubChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.chapterData;
                let currentChapter = chapter[chapterNum-1];
                let temp = {
                    suborder: currentChapter.subchapter.length +1,
                    scname:"",
                    content:null
                }
                currentChapter.subchapter.push(temp);
                fnc.showAddSubChapter(chapterNum,temp,this.editText,this.reduceSubChapter,this.type,this.modifyscname);
            },
            reduceChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let filenames = [];
                this.chapterData[numTemp-1].subchapter.forEach((value)=>{
                    filenames.push(value.content);
                });
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.chapterData;
                axios.post("http://127.0.0.1:80/course/deletechapter",{"filenames":filenames}).then(data=>{
                    if(data.data.status == 200){
                        window.alert("删除视频成功！");
                    }
                });
                for(let i = (chapterNum-1) ; i < chapter.length-1;i++){
                    chapter[i].subchapter = chapter[i+1].subchapter;
                    chapter[i].cname = chapter[i+1].cname;
                }
                chapter.pop();
                fnc.showReduceChapter(this.chapterData,this.addSubChapter,this.reduceChapter,this.reduceSubChapter,this.editText,this.type,this.modifycname,this.modifyscname);
            },
            reduceSubChapter(ev){
                let chapterNum = Number.parseInt(ev.target.getAttribute("chapter"));
                let subOrder = Number.parseInt(ev.target.getAttribute("subchapter"));
                // 删除原有视频
                let filename = this.chapterData[chapterNum-1].subchapter[subOrder-1].content;
                axios.post("http://127.0.0.1:80/course/deletevideo",{"filename":filename}).then(data=>{
                    if(data.data.status == 204){
                        window.alert("删除视频失败！");
                    }
                });
                fnc.showReduceSubChapter(this.chapterData,chapterNum,subOrder);
                let currentChapter = this.chapterData[chapterNum -1];
                currentChapter.subchapter.splice(subOrder-1,1);
                for(let i = (subOrder-1); i < currentChapter.subchapter.length; i++){
                    currentChapter.subchapter[i].suborder --;
                }
            },
            editText(ev){
                let chapterNum = Number.parseInt(ev.target.getAttribute("chapter"));
                let subOrder = Number.parseInt(ev.target.getAttribute("subchapter"));
                this.currentEdit.currenChapter = chapterNum;
                this.currentEdit.currenSubChapter = subOrder;
                this.form.delete("file");
                this.form.append(`file`,ev.target.files[0]);
                this.form.append("chapter",chapterNum);
                this.form.append("subchapter",subOrder);
                this.form.append("filename",this.chapterData[chapterNum-1].subchapter[subOrder-1].content);
                const config = {
                    headers: { "Content-Type": "multipart/form-data" }
                };
                // 重新上传视频
                axios.post("http://127.0.0.1:80/course/modifyvideo",this.form,config).then(data=>{
                    window.alert(data.data.message);
                    this.chapterData[chapterNum-1].subchapter[subOrder-1].content = data.data.filename;
                    window.console.log(this.chapterData);
                });
            },
            modifycname(ev){
                let numTemp = ev.target.getAttribute("chapterNum");
                let chapternum = Number.parseInt(numTemp);
                let ocname = document.getElementById(`chapter${chapternum}name`);
                this.chapterData[chapternum-1].cname = ocname.value;
            },
            modifyscname(ev){
                let numTemp = ev.target.getAttribute("subchapter");
                let num = ev.target.getAttribute("chapter");
                let subchapternum = Number.parseInt(numTemp);
                let chapternum = Number.parseInt(num);
                let oscname = document.getElementById(`chapter${num}subchapter${numTemp}name`);
                window.console.log(oscname);
                this.chapterData[chapternum-1].subchapter[subchapternum-1].scname = oscname.value;
                window.console.log(this.chapterData);
            },
            saveText(){
                let chapterNum = this.currentEdit.currenChapter;
                let subOrder = this.currentEdit.currenSubChapter;
                let currentChapter = this.chapterData[chapterNum -1];
                currentChapter.subchapter[subOrder-1].content = this.currentEdit.currenContent;
                fnc.showeditText(chapterNum,subOrder,currentChapter);
                window.console.log(currentChapter);
            }

        },
        mounted() {
            fnc.showChapter(this.chapterData,this.addSubChapter,this.reduceChapter,this.reduceSubChapter,this.editText,this.type,this.modifycname,this.modifyscname);
        }
    }
</script>

<style scoped>
    .addcourse{
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
    .addcourseeditor{
        border: 20px solid #00B7FF;
        border-radius: 5px;
        margin-left: 60px;
    }
</style>
