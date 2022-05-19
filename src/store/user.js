import axios from 'axios'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    updataToken (state, token) {
      state.token = token
    },
    updataUserInfo (state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
    async getUserInfo (context) {
      const { data: res } = await axios.get('/my/userinfo')
      // console.log(res)
      if (res.code !== 0) return
      context.commit('updataUserInfo', res.data)
    }
  }
}
