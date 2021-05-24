export default {
    //修改userInfo
    changeUserInfo(context,obj){
        context.commit("changeUserInfo",obj)
        //本地存储
        localStorage.setItem('userInfo',JSON.stringify(obj))
    }
}