import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入assets
import './assets/css/reset.css'

//引入全局组件和过滤器
import './components'
import './filters'

//引入 Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')