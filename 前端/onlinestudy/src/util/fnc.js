// 显示全部章节函数
import $ from "jquery/dist/jquery"
function showChapter(chapterData,addSub,reduceChapter,reduceSubChapter,editText,type,modifycname,modifyscname){
    let ocont = document.getElementById("course_content");
    for(let i = 0 ; i < chapterData.length;i++){
        let odiv = document.createElement("div");
        odiv.setAttribute("chapterNum",chapterData[i].chapter);
        odiv.setAttribute("id","chapter"+chapterData[i].chapter);
        odiv.style.border = "1px solid #000";
        odiv.style.margin = "10px";

        let osubarea = document.createElement("div");
        osubarea.style.border = "1px solid #000";
        osubarea.style.width = "500px";
        osubarea.style.marginLeft = "80px";
        osubarea.setAttribute("id","sub"+chapterData[i].chapter);

        let ospan = document.createElement("span");
        ospan.style.border = "1px solid #000";
        ospan.style.marginRight = "10px";
        ospan.innerText = `章节${chapterData[i].chapter}:`;

        let oaddsub = document.createElement("span");
        oaddsub.style.border = "1px solid #000";
        oaddsub.setAttribute("chapterNum",chapterData[i].chapter);
        oaddsub.style.borderRadius = "50%";
        oaddsub.style.cursor = "pointer";
        oaddsub.style.marginRight = "10px";
        oaddsub.innerText = `┿`;
        oaddsub.addEventListener("click",addSub);

        let oreduce = document.createElement("span");
        oreduce.style.border = "1px solid #000";
        oreduce.setAttribute("chapterNum",chapterData[i].chapter);
        oreduce.style.borderRadius = "50%";
        oreduce.style.marginRight = "10px";
        oreduce.style.cursor = "pointer";
        oreduce.addEventListener("click",reduceChapter);
        oreduce.innerText = `━`;

        let ocname = document.createElement("input");
        ocname.style.border = "1px solid #000";
        ocname.setAttribute("chapterNum",chapterData[i].chapter);
        ocname.setAttribute("id",`chapter${chapterData[i].chapter}name`);
        ocname.style.marginRight = "10px";
        ocname.style.display = "inline-block";
        ocname.setAttribute("type","text");
        ocname.setAttribute("value",chapterData[i].cname);

        let omodicname = document.createElement("input");
        omodicname.style.border = "1px solid #000";
        omodicname.setAttribute("chapterNum",chapterData[i].chapter);
        omodicname.setAttribute("type","button");
        omodicname.setAttribute("value","修改章节名称");
        omodicname.style.marginRight = "10px";
        omodicname.addEventListener("click",modifycname);


        odiv.appendChild(oreduce);
        odiv.appendChild(ospan);
        odiv.appendChild(oaddsub);
        odiv.appendChild(ocname);
        odiv.appendChild(omodicname);

        for(let j = 0 ; j < chapterData[i].subchapter.length; j++){
            let osubtxt = document.createElement("div");
            let oedit = document.createElement("input");
            let oreduce = document.createElement("button");

            osubtxt.setAttribute("id","suborder"+chapterData[i].subchapter[j].suborder);
            osubtxt.setAttribute("class","subchapter");
            osubtxt.style.border = "1px solid #000";
            osubtxt.style.width = "280px";
            osubtxt.style.margin = "10px";


            let otxt = document.createElement("span");
            otxt.innerText = `order:${chapterData[i].subchapter[j].suborder} content:${ chapterData[i].subchapter[j].content}`;

            osubtxt.appendChild(otxt);


            oedit.setAttribute("class","btn btn-primary");
            oedit.setAttribute("chapter",chapterData[i].chapter);
            oedit.setAttribute("subchapter",chapterData[i].subchapter[j].suborder);
            oedit.setAttribute("id","video");
            oedit.style.margin = "10px";
            if(type == 0){
                oedit.setAttribute("type","button");
                oedit.addEventListener("click",editText);
                oedit.setAttribute("data-toggle","modal");
                oedit.setAttribute("data-target","#myModal");
                oedit.innerText = "编辑";
                oedit.value = "编辑";
            }else {
                oedit.setAttribute("type","file");
                oedit.addEventListener("change",editText);
                oedit.innerText = "添加文件"
            }


            oreduce.setAttribute("class","btn btn-primary");
            oreduce.setAttribute("chapter",chapterData[i].chapter);
            oreduce.setAttribute("subchapter",chapterData[i].subchapter[j].suborder);
            oreduce.setAttribute("type","button");
            oreduce.addEventListener("click",reduceSubChapter);
            oreduce.style.margin = "10px";
            oreduce.innerText = "删除";

            let ocname = document.createElement("input");
            ocname.style.border = "1px solid #000";
            ocname.setAttribute("chapter",chapterData[i].chapter);
            ocname.setAttribute("id",`chapter${chapterData[i].chapter}subchapter${chapterData[i].subchapter[j].suborder}name`);
            ocname.style.marginRight = "10px";
            ocname.style.display = "inline-block";
            ocname.setAttribute("type","text");
            ocname.setAttribute("value",chapterData[i].subchapter[j].scname);

            let omodicname = document.createElement("input");
            omodicname.style.border = "1px solid #000";
            omodicname.setAttribute("chapter",chapterData[i].chapter);
            omodicname.setAttribute("subchapter",chapterData[i].subchapter[j].suborder);
            omodicname.setAttribute("type","button");
            omodicname.setAttribute("value","修改章节名称");
            omodicname.style.marginRight = "10px";
            omodicname.addEventListener("click",modifyscname);

            osubtxt.appendChild(oedit);
            osubtxt.appendChild(oreduce);
            osubtxt.appendChild(ocname);
            osubtxt.appendChild(omodicname);

            osubarea.appendChild(osubtxt);


        }
        odiv.appendChild(oreduce);
        odiv.appendChild(osubarea);
        ocont.appendChild(odiv);
    }
}

// 显示新增加的章节
function showAddChapter(temp,addSub,reduceChapter,modifycname) {
    let chapter = temp.chapter;
    let ocont = document.getElementById("course_content");
    let odiv = document.createElement("div");
    odiv.setAttribute("chapterNum",chapter);
    odiv.setAttribute("id","chapter"+chapter);
    odiv.style.border = "1px solid #000";
    odiv.style.margin = "10px";



    let ospan = document.createElement("span");
    ospan.style.border = "1px solid #000";
    ospan.style.marginRight = "10px";
    ospan.innerText = `章节${chapter}:`;

    let oaddsub = document.createElement("span");
    oaddsub.style.border = "1px solid #000";
    oaddsub.setAttribute("chapterNum",chapter);
    oaddsub.style.borderRadius = "50%";
    oaddsub.style.marginRight = "10px";
    oaddsub.style.cursor = "pointer";
    oaddsub.addEventListener("click",addSub);
    oaddsub.innerText = `┿`;

    let oreduce = document.createElement("span");
    oreduce.style.border = "1px solid #000";
    oreduce.setAttribute("chapterNum",chapter);
    oreduce.style.borderRadius = "50%";
    oreduce.style.marginRight = "10px";
    oreduce.style.cursor = "pointer";
    oreduce.addEventListener("click",reduceChapter);
    oreduce.innerText = `━`;

    let ocname = document.createElement("input");
    ocname.style.border = "1px solid #000";
    ocname.setAttribute("chapterNum",chapter);
    ocname.setAttribute("id",`chapter${chapter}name`);
    ocname.style.marginRight = "10px";
    ocname.style.display = "inline-block";
    ocname.setAttribute("type","text");

    let omodicname = document.createElement("input");
    omodicname.style.border = "1px solid #000";
    omodicname.setAttribute("chapterNum",chapter);
    omodicname.setAttribute("type","button");
    omodicname.setAttribute("value","修改章节名称");
    omodicname.style.marginRight = "10px";
    omodicname.addEventListener("click",modifycname);



    odiv.appendChild(ospan);
    odiv.appendChild(oaddsub);
    odiv.appendChild(oreduce);
    odiv.appendChild(ocname);
    odiv.appendChild(omodicname);

    ocont.appendChild(odiv);
}

// 显示新增加的次章节
function showAddSubChapter(num,temp,editText,reduceSubChapter,type,modifyscname) {
    let osubarea = document.getElementById("sub"+num);
    let osubtxt = document.createElement("div");
    let oedit = document.createElement("input");
    let oreduce = document.createElement("button");
    let odiv = document.getElementById("chapter"+num);

    oedit.setAttribute("class","btn btn-primary");
    oedit.setAttribute("chapter",num);
    oedit.setAttribute("name","video");
    oedit.setAttribute("subchapter",temp.suborder);
    oedit.style.margin = "10px";
    if(type == 0){
        oedit.setAttribute("data-toggle","modal");
        oedit.setAttribute("data-target","#myModal");
        oedit.setAttribute("type","button");
        oedit.addEventListener("click",editText);
        oedit.innerText = "编辑";
        oedit.value = "编辑"
    }else {
        oedit.setAttribute("type","file");
        oedit.addEventListener("change",editText);
        oedit.innerText = "添加文件";
    }


    oreduce.setAttribute("class","btn btn-primary");
    oreduce.setAttribute("chapter",num);
    oreduce.setAttribute("subchapter",temp.suborder);
    oreduce.addEventListener("click",reduceSubChapter);
    oreduce.setAttribute("type","button");
    oreduce.style.margin = "10px";
    oreduce.innerText = "删除";

    let ocname = document.createElement("input");
    ocname.style.border = "1px solid #000";
    ocname.setAttribute("chapter",num);
    ocname.setAttribute("id",`chapter${num}subchapter${temp.suborder}name`);
    ocname.style.marginRight = "10px";
    ocname.style.display = "inline-block";
    ocname.setAttribute("type","text");

    let omodicname = document.createElement("input");
    omodicname.style.border = "1px solid #000";
    omodicname.setAttribute("chapter",num);
    omodicname.setAttribute("subchapter",temp.suborder);
    omodicname.setAttribute("type","button");
    omodicname.setAttribute("value","修改章节名称");
    omodicname.style.marginRight = "10px";
    omodicname.addEventListener("click",modifyscname);


    osubtxt.setAttribute("id","suborder"+temp.suborder);
    osubtxt.setAttribute("class","subchapter");
    osubtxt.style.border = "1px solid #000";
    osubtxt.style.margin = "10px";
    osubtxt.style.width = "280px";

    let otxt = document.createElement("span");
    otxt.innerText = `order:${temp.suborder} content:${ temp.content}`;

    osubtxt.appendChild(otxt);

    if(osubarea){
        osubtxt.appendChild(oedit);
        osubtxt.appendChild(oreduce);
        osubtxt.appendChild(ocname);
        osubtxt.appendChild(omodicname);
        osubarea.appendChild(osubtxt);

    }else {
        osubarea = document.createElement("div");
        osubarea.style.border = "1px solid #000";
        osubarea.style.width = "500px";
        osubarea.style.marginLeft = "80px";
        osubarea.setAttribute("id","sub"+num);

        osubtxt.appendChild(oedit);
        osubtxt.appendChild(oreduce);
        osubtxt.appendChild(ocname);
        osubtxt.appendChild(omodicname);
        osubarea.appendChild(osubtxt);
    }
    odiv.appendChild(osubarea);
}

function showReduceChapter(chapterData,addSub,reduceChapter,reduceSubChapter,editText,type,modifycname,modifyscname) {
    window.console.log("reduceChapter");
    // let ocont = document.getElementById("course_content");
    $(function () {
       $("#course_content").empty();
        showChapter(chapterData,addSub,reduceChapter,reduceSubChapter,editText,type,modifycname,modifyscname);
    });
    // let odiv = document.getElementById("chapter"+chapterNum);
    // if(odiv){
    //     ocont.removeChild(odiv);
    //     let otemp = document.getElementById("chapter"+(chapterNum+1));
    //     while(otemp){
    //         let ochild = otemp.children[0];
    //         ochild.innerText = `章节${chapterNum}:`;
    //         otemp.children[1].setAttribute("chapterNum",chapterNum);
    //         otemp.children[2].setAttribute("chapterNum",chapterNum);
    //         if(otemp.children[3]) {
    //             otemp.children[3].setAttribute("id", "sub" + chapterNum);
    //         }
    //         otemp.setAttribute("chapterNum",chapterNum);
    //         otemp.setAttribute("id","chapter"+ chapterNum);
    //         chapterNum ++;
    //         otemp = document.getElementById("chapter"+(chapterNum+1));
    //     }
    // }else {
    //     window.console.log("删除章节失败");
    // }
}

function showReduceSubChapter(chapterData,chapterNum,subOrder) {
    chapterNum = Number.parseInt(chapterNum);
    let osubarea = document.getElementById("sub"+chapterNum);
    let osubtxt = document.querySelector(`#sub${chapterNum} #suborder${subOrder}`);
    if(osubtxt){
        osubarea.removeChild(osubtxt);
        let otemp = document.querySelector(`#sub${chapterNum} #suborder${subOrder+1}`);
        while(otemp){
            let ochild = otemp.children[0];
            subOrder = Number.parseInt(subOrder);
            ochild.innerText = `order:${subOrder} content:${chapterData[chapterNum-1].subchapter[subOrder].content}`;
            otemp.children[1].setAttribute("chapter",chapterNum);
            otemp.children[1].setAttribute("subchapter",subOrder);
            otemp.children[2].setAttribute("chapter",chapterNum);
            otemp.children[2].setAttribute("subchapter",subOrder);
            otemp.children[3].setAttribute("id",`chapter${chapterNum}subchapter${subOrder}name`)
            otemp.children[4].setAttribute("chapter",chapterNum);
            otemp.children[4].setAttribute("subchapter",subOrder);
            otemp.setAttribute("id","suborder"+ subOrder);
            subOrder ++;
            otemp = document.querySelector(`#sub${chapterNum} #suborder${subOrder+1}`);
        }
    }else {
        window.console.log("删除子章节失败");
    }

}

function showeditText(chapterNum,subOrder,currentChapter) {
    window.console.log("editText");
    let osubtxt = document.querySelector(`#sub${chapterNum} #suborder${subOrder}`);
    osubtxt.children[0].style.backgroundColor = "green";
    window.console.log(currentChapter.subchapter[subOrder-1].content);
    osubtxt.children[0].innerText = `order:${subOrder} content:${currentChapter.subchapter[subOrder-1].content}`;

}

// 显示考试题目
function showExam(chapterData,reduceChapter,modifyquestion,modifyanswer){
    let ocont = document.getElementById("course_content");
    for(let i = 0 ; i < chapterData.length;i++){
        let odiv = document.createElement("div");
        odiv.setAttribute("chapterNum",chapterData[i].chapter);
        odiv.setAttribute("id","chapter"+chapterData[i].chapter);
        odiv.style.border = "1px solid #000";
        odiv.style.margin = "10px";
        odiv.style.padding = "10px";

        let ospan = document.createElement("span");
        ospan.style.border = "1px solid #000";
        ospan.style.marginRight = "10px";
        ospan.innerText = `题目${chapterData[i].chapter}:`;


        let oreduce = document.createElement("span");
        oreduce.style.border = "1px solid #000";
        oreduce.setAttribute("chapterNum",chapterData[i].chapter);
        oreduce.style.borderRadius = "50%";
        oreduce.style.marginRight = "10px";
        oreduce.style.cursor = "pointer";
        oreduce.addEventListener("click",reduceChapter);
        oreduce.innerText = `━`;

        let oquestion = document.createElement("input");
        oquestion.style.border = "1px solid #000";
        oquestion.setAttribute("chapterNum",chapterData[i].chapter);
        oquestion.setAttribute("id",`exam${chapterData[i].chapter}question`);
        oquestion.style.marginRight = "10px";
        oquestion.style.display = "inline-block";
        oquestion.setAttribute("type","text");
        oquestion.setAttribute("value",chapterData[i].question);

        let omodiquestion = document.createElement("input");
        omodiquestion.style.border = "1px solid #000";
        omodiquestion.setAttribute("chapterNum",chapterData[i].chapter);
        omodiquestion.setAttribute("type","button");
        omodiquestion.setAttribute("value","修改问题");
        omodiquestion.style.marginRight = "10px";
        omodiquestion.addEventListener("click",modifyquestion);

        let oanswer = document.createElement("input");
        oanswer.style.border = "1px solid #000";
        oanswer.setAttribute("chapterNum",chapterData[i].chapter);
        oanswer.setAttribute("id",`exam${chapterData[i].chapter}answer`);
        oanswer.style.marginRight = "10px";
        oanswer.style.display = "inline-block";
        oanswer.setAttribute("type","text");
        oanswer.setAttribute("value",chapterData[i].answer);

        let omodianswer = document.createElement("input");
        omodianswer.style.border = "1px solid #000";
        omodianswer.setAttribute("chapterNum",chapterData[i].chapter);
        omodianswer.setAttribute("type","button");
        omodianswer.setAttribute("value","修改答案");
        omodianswer.style.marginRight = "10px";
        omodianswer.addEventListener("click",modifyanswer);

        if(chapterData[i].type == "choice"){
            let ochoice = document.createElement("div");
            ochoice.style.width = "100%";
            ochoice.style.margin = "10px";
            ochoice.setAttribute("id","choice"+chapterData[i].chapter);
            for(let j = 0 ; j < 4;j++){
                let ospan = document.createElement("span");
                ospan.style.display = "inline-block";
                ospan.style.margin = "10px";
                ospan.innerHTML = `&#${65+j};、`;

                let oitem = document.createElement("input");
                oitem.style.border = "1px solid #000";
                oitem.setAttribute("chapterNum",chapterData[i].chapter);
                oitem.setAttribute("id",`exam${chapterData[i].chapter}choice`);
                oitem.style.marginRight = "10px";
                oitem.style.display = "inline-block";
                oitem.setAttribute("type","text");
                oitem.setAttribute("value",chapterData[i].choice[j]);

                ochoice.appendChild(ospan);
                ochoice.appendChild(oitem);
            }
            odiv.appendChild(ospan);
            odiv.appendChild(oquestion);
            odiv.appendChild(omodiquestion);
            odiv.appendChild(oreduce);
            odiv.appendChild(ochoice);
            odiv.appendChild(oanswer);
            odiv.appendChild(omodianswer);
            ocont.appendChild(odiv);

        }else {
            odiv.appendChild(ospan);
            odiv.appendChild(oquestion);
            odiv.appendChild(omodiquestion);
            odiv.appendChild(oanswer);
            odiv.appendChild(omodianswer);
            odiv.appendChild(oreduce);
            ocont.appendChild(odiv);
        }

    }
}
// 添加考试题目
function showAddChoice(temp,reduceChapter,modifyquestion,modifyanswer) {
    let chapter = temp.chapter;
    let ocont = document.getElementById("course_content");
    let odiv = document.createElement("div");
    odiv.setAttribute("chapterNum",chapter);
    odiv.setAttribute("id","chapter"+chapter);
    odiv.style.border = "1px solid #000";
    odiv.style.margin = "10px";
    odiv.style.padding = "10px";

    let ospan = document.createElement("span");
    ospan.style.border = "1px solid #000";
    ospan.style.marginRight = "10px";
    ospan.innerText = `题目${chapter}:`;

    let oreduce = document.createElement("span");
    oreduce.style.border = "1px solid #000";
    oreduce.setAttribute("chapterNum",chapter);
    oreduce.style.borderRadius = "50%";
    oreduce.style.marginRight = "10px";
    oreduce.style.cursor = "pointer";
    oreduce.addEventListener("click",reduceChapter);
    oreduce.innerText = `━`;

    let oquestion = document.createElement("input");
    oquestion.style.border = "1px solid #000";
    oquestion.setAttribute("chapterNum",temp.chapter);
    oquestion.setAttribute("id",`exam${temp.chapter}question`);
    oquestion.style.marginRight = "10px";
    oquestion.style.display = "inline-block";
    oquestion.setAttribute("type","text");
    oquestion.setAttribute("value",temp.question);

    let omodiquestion = document.createElement("input");
    omodiquestion.style.border = "1px solid #000";
    omodiquestion.setAttribute("chapterNum",temp.chapter);
    omodiquestion.setAttribute("type","button");
    omodiquestion.setAttribute("value","修改问题");
    omodiquestion.style.marginRight = "10px";
    omodiquestion.addEventListener("click",modifyquestion);

    let ochoice = document.createElement("div");
    ochoice.style.width = "100%";
    ochoice.style.margin = "10px";
    ochoice.setAttribute("id","choice"+temp.chapter);

    for(let i = 0 ; i < 4;i++){
        let ospan = document.createElement("span");
        ospan.setAttribute("chapterNum",chapter);
        ospan.style.display = "inline-block";
        ospan.style.marginLeft = "10px";
        ospan.innerHTML = `&#${65+i};、`;

        let oitem = document.createElement("input");
        oitem.style.border = "1px solid #000";
        oitem.setAttribute("chapterNum",temp.chapter);
        oitem.setAttribute("id",`exam${temp.chapter}choice`);
        oitem.style.marginRight = "10px";
        oitem.style.display = "inline-block";
        oitem.setAttribute("type","text");
        oitem.setAttribute("value",temp.choice[i]);

        ochoice.appendChild(ospan);
        ochoice.appendChild(oitem);
    }

    let oanswer = document.createElement("input");
    oanswer.style.border = "1px solid #000";
    oanswer.setAttribute("chapterNum",temp.chapter);
    oanswer.setAttribute("id",`exam${temp.chapter}answer`);
    oanswer.style.margin = "10px";
    oanswer.style.display = "inline-block";
    oanswer.setAttribute("type","text");
    oanswer.setAttribute("value",temp.answer);
    oanswer.setAttribute("placeholder","答案填写相应的大写字母");

    let omodianswer = document.createElement("input");
    omodianswer.style.border = "1px solid #000";
    omodianswer.setAttribute("chapterNum",temp.chapter);
    omodianswer.setAttribute("type","button");
    omodianswer.setAttribute("value","修改答案");
    omodianswer.style.marginRight = "10px";
    omodianswer.addEventListener("click",modifyanswer);

    odiv.appendChild(ospan);
    odiv.appendChild(oquestion);
    odiv.appendChild(omodiquestion);
    odiv.appendChild(oreduce);
    odiv.appendChild(ochoice);
    odiv.appendChild(oanswer);
    odiv.appendChild(omodianswer);
    ocont.appendChild(odiv);
}
function showAddBlank(temp,reduceChapter,modifyquestion,modifyanswer) {
    let chapter = temp.chapter;
    let ocont = document.getElementById("course_content");
    let odiv = document.createElement("div");
    odiv.setAttribute("chapterNum",chapter);
    odiv.setAttribute("id","chapter"+chapter);
    odiv.style.border = "1px solid #000";
    odiv.style.margin = "10px";
    odiv.style.padding = "10px";

    let ospan = document.createElement("span");
    ospan.style.border = "1px solid #000";
    ospan.style.marginRight = "10px";
    ospan.innerText = `题目${chapter}:`;

    let oreduce = document.createElement("span");
    oreduce.style.border = "1px solid #000";
    oreduce.setAttribute("chapterNum",chapter);
    oreduce.style.borderRadius = "50%";
    oreduce.style.marginRight = "10px";
    oreduce.style.cursor = "pointer";
    oreduce.addEventListener("click",reduceChapter);
    oreduce.innerText = `━`;

    let oquestion = document.createElement("input");
    oquestion.style.border = "1px solid #000";
    oquestion.setAttribute("chapterNum",temp.chapter);
    oquestion.setAttribute("id",`exam${temp.chapter}question`);
    oquestion.style.marginRight = "10px";
    oquestion.style.display = "inline-block";
    oquestion.setAttribute("type","text");
    oquestion.setAttribute("value",temp.question);

    let omodiquestion = document.createElement("input");
    omodiquestion.style.border = "1px solid #000";
    omodiquestion.setAttribute("chapterNum",temp.chapter);
    omodiquestion.setAttribute("type","button");
    omodiquestion.setAttribute("value","修改问题");
    omodiquestion.style.marginRight = "10px";
    omodiquestion.addEventListener("click",modifyquestion);

    let oanswer = document.createElement("input");
    oanswer.style.border = "1px solid #000";
    oanswer.setAttribute("chapterNum",temp.chapter);
    oanswer.setAttribute("id",`exam${temp.chapter}answer`);
    oanswer.style.marginRight = "10px";
    oanswer.style.display = "inline-block";
    oanswer.setAttribute("type","text");
    oanswer.setAttribute("value",temp.answer);

    let omodianswer = document.createElement("input");
    omodianswer.style.border = "1px solid #000";
    omodianswer.setAttribute("chapterNum",temp.chapter);
    omodianswer.setAttribute("type","button");
    omodianswer.setAttribute("value","修改答案");
    omodianswer.style.marginRight = "10px";
    omodianswer.addEventListener("click",modifyanswer);

    odiv.appendChild(ospan);
    odiv.appendChild(oquestion);
    odiv.appendChild(omodiquestion);
    odiv.appendChild(oanswer);
    odiv.appendChild(omodianswer);
    odiv.appendChild(oreduce);
    ocont.appendChild(odiv);
}
function showReduceExam(chapterData,reduceChapter,modifyquestion,modifyanswer) {
    $(function () {
        $("#course_content").empty();
        showExam(chapterData,reduceChapter,modifyquestion,modifyanswer);
    });
}


export default {
    showChapter,
    showAddChapter,
    showAddSubChapter,
    showeditText,
    showReduceChapter,
    showReduceSubChapter,
    showExam,
    showAddChoice,
    showAddBlank,
    showReduceExam
}
