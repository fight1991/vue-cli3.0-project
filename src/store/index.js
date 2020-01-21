import Vuex from 'vuex'
import tab from './tab' // 页签管理模块
export default new Vuex.Store({
  state: {
    collapse: false, // 是否折叠
    loading: false
  },
  mutations: {
    changeLoading (state, res) {
      state.loading = res
    }
  },
  actions: {
  },
  modules: {
    tab
  }
})
