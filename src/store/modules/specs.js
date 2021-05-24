import {
    reqspecslist,reqspecscount
} from "../../request/api"

let state = {
    list: [],
    total:1,
    size:2,
    page:1
}

let mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state,num) {
        state.total = num
    },
    changePage(state,num){
        state.page = num
    }
}

let actions = {
    reqList({
        commit,dispatch,state:{size,page}
    }) {
        reqspecslist({size,page}).then(res => {
            let list = res.data.list ? res.data.list : []
            //如果取到的数据没有，并且不是第一页，就请求上一页
            if(list.length == 0 && page != 1){
                commit("changePage",page-1)
                dispatch("reqList");
                return
            }
            commit("changeList", list)
        })
    },
    reqTotal({commit}){
        reqspecscount().then(res=>{
            commit("changeTotal",res.data.list[0].total)
        })
    },
    changePage({commit},num){
        commit("changePage",num)
    }
}

let getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}