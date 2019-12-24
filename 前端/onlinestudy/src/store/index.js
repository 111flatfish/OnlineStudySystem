import Vue from "vue"
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        newsdata:{
            nid:"",
            nname:"",
            ntype:"",
            ncontent:""
        },
        coursedata:{
            cid:"",
            cname:"",
            ctype:"",
            csynopsis: "",
            cprice:"",
            ccontent:[],
            coursetype:null
        },
        examdata:{
            eid:"",
            etitle:"",
            esubject:"",
            esynopsis:"",
            starttime:"",
            econtent:"",
            etime:"",
            endtime:""
        },
        article:{
            content:null,
            scname:"",
            cid:null,
            chapter:null,
            subchapter:null,
            courselength:null
        },
        loginflag:false,
        logintype:window.localStorage.getItem("logintype")
    },
    getters:{
        getnewsdata:function (state) {
            return state.newsdata;
        },
        getcoursedata:function (state) {
            return state.coursedata;
        },
        getexamdata:function (state) {
            return state.examdata;
        },
        getarticle:function (state) {
            return state.article;
        },
        getlogintype:function (state) {
            return state.logintype;
        }
    }
    ,
    mutations:{
        setuserdata(state,data){
            state.newsdata.nid = data.nid?data.nid:"";
            state.newsdata.nname = data.nname?data.nname:"";
            state.newsdata.ntype = data.ntype?data.ntype:"";
            state.newsdata.ncontent = data.ncontent?data.ncontent:"";
        },
        setcoursedata(state,data){
            state.coursedata.cid = data.cid?data.cid:"";
            state.coursedata.cname = data.cname?data.cname:"";
            state.coursedata.ctype = data.ctype?data.ctype:"";
            state.coursedata.csynopsis = data.csynopsis?data.csynopsis:"";
            state.coursedata.cprice = data.cprice?data.cprice:"";
            state.coursedata.ccontent = data.ccontent?data.ccontent:"";
            state.coursedata.coursetype = data.coursetype?data.coursetype:0;
        },
        setexamdata(state,data){
            state.examdata.eid = data.eid?data.eid:"";
            state.examdata.etitle = data.etitle?data.etitle:"";
            state.examdata.esubject = data.esubject?data.esubject:"";
            state.examdata.esynopsis = data.esynopsis?data.esynopsis:"";
            state.examdata.starttime = data.starttime?data.starttime:"";
            state.examdata.econtent = data.econtent?data.econtent:"";
            state.examdata.endtime = data.endtime?data.endtime:"";
            state.examdata.etime = data.etime?data.etime:0;
        },
        setflag(state){
            state.flag = false;
        },
        setarticle(state,data){
            state.article.content = data.content?data.content:"";
            state.article.scname = data.scname?data.scname:"";
            state.article.cid = data.cid?data.cid:null;
            state.article.chapter = data.chapter?data.chapter:null;
            state.article.subchapter = data.subchapter?data.subchapter:null;
            state.article.courselength = data.courselength?data.courselength:null;

        },
        setlogintype(state,data){
            window.localStorage.setItem("logintype",data.type);
            state.logintype = window.localStorage.getItem("logintype");
        }
    },

    actions:{

    }
});

export default store;
