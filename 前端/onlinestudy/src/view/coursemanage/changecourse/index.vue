<template>
    <div class="changecourse">
        <h1 class="page-head">修改课程：</h1>
        <form action="" method="post" class="form-group">
            <label>标题：</label>
            <input type="text" name="title" class="form-control" placeholder="标题" v-model="coursedata.cname">
            <label>分类：</label>
            <input type="text" name="type" class="form-control" placeholder="前端" v-model="coursedata.ctype">
            <label>价格：</label>
            <input type="text" name="price" class="form-control" placeholder="价格" v-model="coursedata.cprice">
            <label>简介：</label>
            <br>
            <textarea name="synopsis" id="" cols="50" rows="10" placeholder="简介" v-model="coursedata.csynopsis"></textarea>
            <br>
            <label>内容：</label>
            <!--<input type="text" name="content" class="form-control" placeholder="键入内容" v-model="formdata.content">-->
            <button class="btn-primary" @click="addChapter" type="button">增加章节</button>
            <div id="course_content">
            </div>





            <!--<Editor :catch-data="catchData" v-bind:content="txtcontent"></Editor>-->
            <input type="button" value="上传" @click="modifiy_save" class="btn btn-primary">
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
</template>


<script>
    import axios from "../../../util/axios-auth";
    import Editor from "../../../components/Editor"
    import fnc from "../../../util/fnc"
    export default {
        name: 'changecourse',
        data(){
            return {
                coursedata:this.$store.getters.getcoursedata,
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

            }
        },
        methods:{
            modifiy_save(){
                axios.post("http://127.0.0.1:80/course/modify",this.coursedata).then(data=>{
                    if(data.data.status == "修改成功"){
                        window.console.log("修改成功");
                        window.alert("修改成功");
                        this.$store.commit("setcoursedata",{});
                        this.$router.push("/usercenter/coursemanage/showcourse");
                    }

                });
            },
            catchData(value){
                this.currentEdit.currenContent = value;
            },
            addChapter(){
                let chapter = this.coursedata.ccontent;
                let temp = {
                    chapter:chapter.length +1,
                    cname:this.coursedata.cname,
                    subchapter:[]
                };
                chapter.push(temp);
                fnc.showAddChapter(temp,this.addSubChapter,this.reduceChapter);
                window.console.log(chapter);
            },
            addSubChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.coursedata.ccontent;
                let currentChapter = chapter[chapterNum-1];
                let temp = {
                    suborder: currentChapter.subchapter.length +1,
                    cname:this.coursedata.cname,
                    content:""
                }
                currentChapter.subchapter.push(temp);
                fnc.showAddSubChapter(chapterNum,temp,this.editText,this.reduceSubChapter);
            },
            reduceChapter(ev){
                let numTemp = ev.target.getAttribute("chapternum");
                let chapterNum = Number.parseInt(numTemp);
                let chapter = this.coursedata.ccontent;
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
                let currentChapter = this.coursedata.ccontent[chapterNum -1];
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
                let content = this.coursedata.ccontent[chapterNum-1].subchapter[subOrder-1].content;
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
                // window.console.log(chapterNum,subOrder,this.coursedata.ccontent);
                let currentChapter = this.coursedata.ccontent[chapterNum -1];
                console.log(currentChapter);
                currentChapter.subchapter[subOrder-1].content = this.currentEdit.currenContent;
                currentChapter.subchapter[subOrder-1].cname = this.coursedata.cname;
                fnc.showeditText(chapterNum,subOrder,currentChapter);
                window.console.log(currentChapter);
            }

        },
        mounted() {
            let cname = this.coursedata.cname;
            fnc.showChapter(cname,this.coursedata.ccontent,this.addSubChapter,this.reduceChapter,this.reduceSubChapter,this.editText);
        },
        components:{
            Editor
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
