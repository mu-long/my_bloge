import Vue from 'vue'
import Vuex from 'vuex'
// vuex持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态
  state: {
    sid: '', // 图片验证码唯一标识
    token: '', // 令牌
    isLogin: false, // 是否登录
    userInfo: {} // 用户信息
  },

  // 变化 (提交 mutation 是更改状态的唯一方法)
  mutations: {
    // 设置图片验证码唯一标识
    setSid(state, value) {
      state.sid = value
    },
    // 保存令牌
    setToken(state, value) {
      state.token = value
    },
    // 设置登录标识
    setIsLogin(state, value) {
      state.isLogin = value
    },
    // 设置用户信息
    setUserInfo(state, value) {
      if (value === '') return
      state.userInfo = value
    }
  },
  // 行为
  actions: {},
  // 模块
  modules: {},
  plugins: [createPersistedState()]
})
