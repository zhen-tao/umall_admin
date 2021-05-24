import Vue from "vue"

let myFilters = {

}

for(let key in myFilters){
    Vue.filter(key,myFilters[key])
}