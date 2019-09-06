import Vue from "vue"
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        newsdata:{
            nid:"",
            nname:"aa",
            ntype:"bb",
            ncontent:"cc"
        },
        flag:true
    },
    getters:{
        getnewsdata:function (state) {
            return state.newsdata;
        }
    }
    ,
    mutations:{
        setuserdata(state,data){
            state.newsdata.nid = data.nid;
            state.newsdata.nname = data.nname;
            state.newsdata.ntype = data.ntype;
            state.newsdata.ncontent = data.ncontent;
        },
        setflag(state){
            state.flag = false;
        }
    },
    
    actions:{

    }
});

export default store;