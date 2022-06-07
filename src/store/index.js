import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态
  state: {
    sid: ''
  },

  // 变化 (提交 mutation 是更改状态的唯一方法)
  mutations: {
    setSid(state, value) {
      state.sid = value
    }
  },
  // 行为
  actions: {},
  // 模块
  modules: {}
})