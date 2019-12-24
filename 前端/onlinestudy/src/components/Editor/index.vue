<template>
    <div class="Editor" style="width: 100%">
        <div ref="editor" style="text-align:left;width: 100%"></div>
        <button v-on:click="getContent">查看内容</button>
    </div>
</template>

<script>
    import E from 'wangeditor';
    // import axios from "../../../util/axios-auth"
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: "",
            txtcontent:"",
            editor:null,
            isCourse:false
        }
      },
        props:["catchData","content","course"],
      methods: {
        getContent: function () {
            // axios.post("/addnews",function (err,data) {
            //     console.log();
            // });
            window.console.log(this.editorContent);
        },
          initTxt(value){
            window.console.log("aa");
            this.editor.txt.html(value);
          }
      },
      mounted() {

        var editor = new E(this.$refs.editor);
        this.txtcontent = this.content;
        if(this.course == true){
            window.console.log(this.course);
            this.isCourse = true;
        }
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
            this.catchData(html);
        }
            if(this.isCourse){
                editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
            }else {
                editor.customConfig.uploadImgServer = "http://127.0.0.1:80/news/loadimg";
                editor.customConfig.uploadFileName = "file" + new Date().getTime();
                editor.customConfig.uploadImgHeaders = {
                    'Accept': '*/*',
                    // 'Content-type':'multipart/form-data'
                };
                editor.customConfig.uploadImgHooks = {
                    before: function (xhr, editor, files) {
                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //   prevent: true,
                        //   msg: '放弃上传'
                        // }
                        window.console.log("上传前：" + files);
                    },
                    success: function (xhr, editor, result) {
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                        if (result.data.length > 0) {
                            this.imgUrl = Object.values(result.data).toString();
                            window.console.log("上传成功：" + this.imgUrl);
                        } else {
                            this.imgUrl = ""
                        }

                    },
                    fail: function () {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                        window.console.log("插入失败");
                    },
                    error: function () {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                        window.console.log("上传失败");
                    },
                    timeout: function () {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                        window.console.log("上传超时");
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        // let url = Object.values(result.data)   //result.data就是服务器返回的图片名字和链接
                        // JSON.stringify(url)  //在这里转成JSON格式
                        // insertImg(url)
                        // result 必须是一个 JSON 格式字符串！！！否则报错
                        window.console.log(result);
                        let url = "http://127.0.0.1:80/" + result.data[0];
                        insertImg(url);
                    }
                };
            }
        editor.create();
        editor.txt.html(this.txtcontent);
        this.editor = editor;
      },
      updated() {

      }
    }
</script>

<style scoped>
</style>
