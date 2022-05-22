import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Reg from '@/views/Reg/Reg.vue'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import Home from '@/views/Menus/Home/Home.vue'
import UserInfo from '@/views/Menus/User/UserInfo.vue'
import UserAvatar from '@/views/Menus/User/UserAvatar.vue'
import UserPwd from '@/views/Menus/User/UserPwd.vue'
import ArtCate from '@/views/Menus/Articl/ArtCate.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/reg', component: Reg },
  { path: '/login', component: Login },
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user-info',
        component: UserInfo
      },
      {
        path: 'user-avatar',
        component: UserAvatar
      },
      {
        path: 'user-pwd',
        component: UserPwd
      },
      {
        path: 'art-cate',
        component: ArtCate
      }
    ]
  }
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
