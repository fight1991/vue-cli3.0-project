// import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab' // 页签管理模块
// Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    collapse: false // 是否折叠
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tab
  }
})
