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
            ccontent:[]
        },
        loginflag:false
    },
    getters:{
        getnewsdata:function (state) {
            return state.newsdata;
        },
        getcoursedata:function (state) {
            return state.coursedata;
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
        },
        setflag(state){
            state.flag = false;
        }
    },

    actions:{

    }
});

export default store;
