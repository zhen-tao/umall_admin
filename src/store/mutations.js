
export let state = {
        userInfo:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):{},
}
export let mutations = {
        //修改个人信息
        changeUserInfo(state,obj){
            state.userInfo = obj
        }
}
export let getters = {
        //同步数据
        userInfo(state){
            return state.userInfo
        }
}