// 显示全部章节函数
function showChapter(cname,chapterData,addSub,reduceChapter,reduceSubChapter,editText){
    let ocont = document.getElementById("course_content");
    for(let i = 0 ; i < chapterData.length;i++){
        let odiv = document.createElement("div");
        odiv.setAttribute("chapterNum",chapterData[i].chapter);
        odiv.setAttribute("id","chapter"+chapterData[i].chapter);
        odiv.style.border = "1px solid #000";
        odiv.style.margin = "10px";
        chapterData[i].cname = cname;

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
        
        
        odiv.appendChild(oreduce);
        odiv.appendChild(ospan);
        odiv.appendChild(oaddsub);

        for(let j = 0 ; j < chapterData[i].subchapter.length; j++){
            let osubtxt = document.createElement("div");
            let oedit = document.createElement("button");
            let oreduce = document.createElement("button");
            
            osubtxt.setAttribute("id","suborder"+chapterData[i].subchapter[j].suborder);
            osubtxt.setAttribute("class","subchapter");
            osubtxt.style.border = "1px solid #000";
            osubtxt.style.width = "280px";
            osubtxt.style.margin = "10px";
            chapterData[i].subchapter[j].cname = cname;

            let otxt = document.createElement("span");
            otxt.innerText = `order:${chapterData[i].subchapter[j].suborder} content:${ chapterData[i].subchapter[j].content}`;

            osubtxt.appendChild(otxt);


            oedit.setAttribute("class","btn btn-primary");
            oedit.setAttribute("chapter",chapterData[i].chapter);
            oedit.setAttribute("subchapter",chapterData[i].subchapter[j].suborder);
            oedit.setAttribute("type","button");
            oedit.setAttribute("data-toggle","modal");
            oedit.setAttribute("data-target","#myModal");
            oedit.addEventListener("click",editText);
            oedit.style.margin = "10px";
            oedit.innerText = "编辑";

            oreduce.setAttribute("class","btn btn-primary");
            oreduce.setAttribute("chapter",chapterData[i].chapter);
            oreduce.setAttribute("subchapter",chapterData[i].subchapter[j].suborder);
            oreduce.setAttribute("type","button");
            oreduce.addEventListener("click",reduceSubChapter);
            oreduce.style.margin = "10px";
            oreduce.innerText = "删除";

            osubtxt.appendChild(oedit);
            osubtxt.appendChild(oreduce);
            osubarea.appendChild(osubtxt);


        }
        odiv.appendChild(oreduce);
        odiv.appendChild(osubarea);
        ocont.appendChild(odiv);
    }

}

// 显示新增加的章节
function showAddChapter(temp,addSub,reduceChapter) {
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



    odiv.appendChild(ospan);
    odiv.appendChild(oaddsub);
    odiv.appendChild(oreduce);
    
    ocont.appendChild(odiv);
}

// 显示新增加的次章节
function showAddSubChapter(num,temp,editText,reduceSubChapter) {
    let osubarea = document.getElementById("sub"+num);
    let osubtxt = document.createElement("div");
    let oedit = document.createElement("button");
    let oreduce = document.createElement("button");
    let odiv = document.getElementById("chapter"+num);

    oedit.setAttribute("class","btn btn-primary");
    oedit.setAttribute("chapter",num);
    oedit.setAttribute("subchapter",temp.suborder);
    oedit.addEventListener("click",editText);
    oedit.setAttribute("data-toggle","modal");
    oedit.setAttribute("data-target","#myModal");

    oedit.setAttribute("type","button");
    oedit.style.margin = "10px";
    oedit.innerText = "编辑";

    oreduce.setAttribute("class","btn btn-primary");
    oreduce.setAttribute("chapter",num);
    oreduce.setAttribute("subchapter",temp.suborder);
    oreduce.addEventListener("click",reduceSubChapter);
    oreduce.setAttribute("type","button");
    oreduce.style.margin = "10px";
    oreduce.innerText = "删除";

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
        osubarea.appendChild(osubtxt);
    }else {
        osubarea = document.createElement("div");
        osubarea.style.border = "1px solid #000";
        osubarea.style.width = "500px";
        osubarea.style.marginLeft = "80px";
        osubarea.setAttribute("id","sub"+num);

        osubtxt.appendChild(oedit);
        osubtxt.appendChild(oreduce);
        osubarea.appendChild(osubtxt);
    }
    odiv.appendChild(osubarea);
}

function showReduceChapter(chapterNum) {
    window.console.log("reduceChapter");
    let ocont = document.getElementById("course_content");
    let odiv = document.getElementById("chapter"+chapterNum);
    if(odiv){
        ocont.removeChild(odiv);
        let otemp = document.getElementById("chapter"+(chapterNum+1));
        while(otemp){
            let ochild = otemp.children[0];
            ochild.innerText = `章节${chapterNum}:`;
            otemp.children[1].setAttribute("chapterNum",chapterNum);
            otemp.children[2].setAttribute("chapterNum",chapterNum);
            if(otemp.children[3]) {
                otemp.children[3].setAttribute("id", "sub" + chapterNum);
            }
            otemp.setAttribute("chapterNum",chapterNum);
            otemp.setAttribute("id","chapter"+ chapterNum);
            chapterNum ++;
            otemp = document.getElementById("chapter"+(chapterNum+1));
        }
    }else {
        window.console.log("删除章节失败");
    }
}

function showReduceSubChapter(chapterNum,subOrder) {
    let osubarea = document.getElementById("sub"+chapterNum);
    let osubtxt = document.querySelector(`#sub${chapterNum} #suborder${subOrder}`);
    if(osubtxt){
        osubarea.removeChild(osubtxt);
        let otemp = document.querySelector(`#sub${chapterNum} #suborder${subOrder+1}`);
        while(otemp){
            let ochild = otemp.children[0];
            ochild.innerText = `order:${subOrder} content:`;
            otemp.children[1].setAttribute("chapter",chapterNum);
            otemp.children[1].setAttribute("subchapter",subOrder);
            otemp.children[2].setAttribute("chapter",chapterNum);
            otemp.children[2].setAttribute("subchapter",subOrder);

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


export default {
    showChapter,
    showAddChapter,
    showAddSubChapter,
    showeditText,
    showReduceChapter,
    showReduceSubChapter
}