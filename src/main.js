import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 axios
import axios from 'axios'
// 导入 Element-ui 库
import ElementUI, { Message } from 'element-ui'
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

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  if (error.response.status === 401) {
    store.commit('user/updateToken', '')
    router.push('/login')
    Message.error(error.response.data.message)
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
