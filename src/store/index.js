import WebSocketClient from '@/utils/websocket'
import Vue from 'vue'
import Vuex from 'vuex'
// vuex持久化
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态
  state: {
    sid: '', // 图片验证码唯一标识
    token: '', // 令牌
    isLogin: false, // 是否登录
    userInfo: {}, // 用户信息
    ws: null, // webscoekt
    num: 0
  },

  // 变化 (提交 mutation 是更改状态的唯一方法)
  mutations: {
    // 设置图片验证码唯一标识
    setSid (state, value) {
      state.sid = value
    },
    // 保存令牌
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置登录标识
    setIsLogin (state, value) {
      state.isLogin = value
    },
    // 设置用户信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 初始化webscoekt服务
    initWebSocket (state, config) {
      // if (state.ws) return
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    // 设置未读消息数量
    setMessage (state, value) {
      state.num = value
      console.log('vuex 未读消息数量 ==> ', value.message)
    }
  },

  // 行为
  actions: {
    message ({ commit }, msgObj) {
      commit('setMessage', msgObj)
    }
  },

  // 模块
  modules: {}

  // plugins: [createPersistedState()]
})
