import Vue from "vue"

import delBtn from './delBtn.vue'
let myComponents = {
    delBtn
}

for(let key in myComponents){
    Vue.component(key,myComponents[key])
}