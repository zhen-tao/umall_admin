import axios from 'axios'
import qs from 'qs';
import Vue from 'vue'

//环境
if (process.env.NODE_ENV == 'development') {
    Vue.prototype.$api = 'http://localhost:3000'
}

if (process.env.NODE_ENV == 'production') {
    Vue.prototype.$api == ''
}

//请求拦截
axios.interceptors.request.use(config => {

    return config
})

//响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址为："+res.config.url);
    console.log(res);
    return res
})

//get封装
export let get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res)
        })
    })
}

//post 封装
export let post = (url, params, isFile = false) => {
    let data = null;
    if (isFile) {
        data = new FormData()
        for (let i in params) {
            data.append(i, params[i])
        }
    } else {
        data = qs.stringify(params);
    }

    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        })
    })
}