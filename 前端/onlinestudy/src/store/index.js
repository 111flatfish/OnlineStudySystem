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
        loginflag:false
    },
    getters:{
        getnewsdata:function (state) {
            return state.newsdata;
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
        setflag(state){
            state.flag = false;
        }
    },
    
    actions:{

    }
});

export default store;