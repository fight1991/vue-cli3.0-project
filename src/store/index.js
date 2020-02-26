import Vuex from 'vuex'
import tab from './modules/tab' // 页签管理模块
export default new Vuex.Store({
  state: {
    lang: 'zh', // 语言
    collapse: false, // 是否折叠
    loading: false,
    tabView: true, // 是否开启页签模式
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      total: 0
    }
  },
  mutations: {
    changeLoading (state, res) {
      state.loading = res
    },
    changeCollapse (state) {
      state.collapse = !state.collapse
    },
    toggleLang (state, payLoad) {
      state.lang = payLoad
    }
  },
  actions: {
  },
  modules: {
    tab
  }
})
