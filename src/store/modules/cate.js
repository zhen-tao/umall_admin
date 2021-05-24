import {
    reqcatelist
} from "../../request/api"

let state = {
    list: []
}

let mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}

let actions = {
    reqList({
        commit
    }) {

        reqcatelist({
            istree: true
        }).then(res => {
            let list = res.data.list ? res.data.list : []
            commit("changeList", list)
        })
    }
}

let getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}