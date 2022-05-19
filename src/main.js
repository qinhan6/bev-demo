import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 axios
import axios from 'axios'
// 导入 Element-ui 库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/assets/global.less'

Vue.config.productionTip = false
// 设置 axios 的根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
// 将 axios 挂载到 Vue 的原型上
Vue.prototype.$axios = axios
// 挂载
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
