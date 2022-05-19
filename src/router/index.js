import Vue from 'vue'
import VueRouter from 'vue-router'
import Reg from '@/views/Reg/Reg.vue'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/reg', component: Reg },
  { path: '/login', component: Login },
  { path: '/', component: Main }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (!token && to.path !== '/login' && to.path !== '/reg') {
    next('/login')
    Vue.prototype.$message.error('验证失败, 请重新登录')
  } else {
    next()
  }
})

export default router
