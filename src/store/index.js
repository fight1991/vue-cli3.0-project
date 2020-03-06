import Vuex from 'vuex'
import tab from './modules/tab' // 页签管理模块
export default new Vuex.Store({
  state: {
    successCode: 0,
    lang: 'zh', // 语言
    collapse: false, // 是否折叠
    loading: false,
    tabView: true, // 是否开启页签模式
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      total: 0
    },
    access: 0, // 0 游客 1 安装商 2 代理商 255 厂商
    userInfo: {
      name: '',
      phone: '',
      email: '',
      country: '',
      address: '',
      postcode: '',
      introduction: '',
      note: ''
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
    },
    setAccess (state, payLoad) { // 用户权限
      state.access = payLoad
    },
    setUserInfo (state, payLoad) {
      state.userInfo.name = payLoad.name || ''
      state.userInfo.phone = payLoad.phone || ''
      state.userInfo.email = payLoad.email || ''
      state.userInfo.country = payLoad.country || ''
      state.userInfo.address = payLoad.address || ''
      state.userInfo.postcode = payLoad.postcode || ''
      state.userInfo.introduction = payLoad.introduction || ''
      state.userInfo.note = payLoad.note || ''
    }
  },
  actions: {
  },
  modules: {
    tab
  }
})
