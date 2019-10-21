<template>
    <div class="course">
        <div class="addcourse">
            <h1 class="page-head">添加课程：</h1>
            <form action="" method="post" class="form-group">
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

            <!-- Modal -->
            <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" id="myModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="gridSystemModalLabel">Modal title</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="addcourseeditor">
                                <Editor :catch-data="catchData" ref="edit" v-bind:course="true"></Editor>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveText">Save changes</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <!--<div class="addcourseeditor">-->
                <!--<Editor catch-data="catchData"></Editor>-->
            <!--</div>-->
        </div>
    </div>
</template>


<script>
    import axios from "../../../util/axios-auth"
    import editor from "../../../components/Editor"
    import fnc from "../../../util/fnc";
    export default {
        name: 'course',
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
                                cname:"",
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
                axios.post("http://127.0.0.1:80/course/addcourse",this.formdata).then(data=>{
                    window.console.log(data.data);
                    window.alert("添加成功")
                    // this.$router.push("/usercenter/newsmanage/shownews")
                })
            },
            catchData(value){
                this.formdata.content = value;
                this.currentEdit.currenContent = value;
            },
            addChapter(){
                let chapter = this.chapterData;
                let temp = {
                    chapter:chapter.length +1,
                    cname:this.formdata.title,
                    subchapter:[]
                };
                chapter.push(temp);
                fnc.showAddChapter(temp,this.addSubChapter,this.reduceChapter);
                window.console.log(chapter);
            },
            addSubChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.chapterData;
                let currentChapter = chapter[chapterNum-1];
                let temp = {
                    suborder: currentChapter.subchapter.length +1,
                    cname:this.formdata.title,
                    content:""
                }
                currentChapter.subchapter.push(temp);
                fnc.showAddSubChapter(chapterNum,temp,this.editText,this.reduceSubChapter);
            },
            reduceChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.chapterData;
                chapter.splice(chapterNum-1,1);
                for(let i = (chapterNum-1) ; i < chapter.length;i++){
                    chapter[i].chapter --;
                }
                window.console.log(chapter);
                fnc.showReduceChapter(chapterNum);
            },
            reduceSubChapter(ev){
                let chapterNum = Number.parseInt(ev.target.getAttribute("chapter"));
                let subOrder = Number.parseInt(ev.target.getAttribute("subchapter"));
                let currentChapter = this.chapterData[chapterNum -1];
                currentChapter.subchapter.splice(subOrder-1,1);
                for(let i = (subOrder-1); i < currentChapter.subchapter.length; i++){
                    currentChapter.subchapter[i].suborder --;
                }
                window.console.log(currentChapter.subchapter);
                fnc.showReduceSubChapter(chapterNum,subOrder);
            },
            editText(ev){
                let chapterNum = Number.parseInt(ev.target.getAttribute("chapter"));
                let subOrder = Number.parseInt(ev.target.getAttribute("subchapter"));
                let content = this.chapterData[chapterNum-1].subchapter[subOrder-1].content;
                if(content){
                    this.currentEdit.currenContent = content;
                }else {
                    this.currentEdit.currenContent = "";
                }
                this.$refs.edit.initTxt(this.currentEdit.currenContent);
                this.currentEdit.currenChapter = chapterNum;
                this.currentEdit.currenSubChapter = subOrder;

            },
            saveText(){
                let chapterNum = this.currentEdit.currenChapter;
                let subOrder = this.currentEdit.currenSubChapter;
                let currentChapter = this.chapterData[chapterNum -1];
                currentChapter.subchapter[subOrder-1].content = this.currentEdit.currenContent;
                currentChapter.subchapter[subOrder-1].cname = this.formdata.title;
                fnc.showeditText(chapterNum,subOrder,currentChapter);
                window.console.log(currentChapter);
            }

        },
        mounted() {
            let cname = this.formdata.title;
            fnc.showChapter(cname,this.chapterData,this.addSubChapter,this.reduceChapter,this.reduceSubChapter,this.editText);
        },
        components:{
            Editor:editor
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
