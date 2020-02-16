let tabIndex = () => import(/* webpackChunkName: "tabIndex" */ '@/components/index')

export default {
  state: {
    currentTab: 'tab-index',
    tabList: [
      {
        tabId: 'tab-index',
        title: '首页',
        path: '/index',
        isShow: true,
        components: [tabIndex],
        query: {},
        params: {}
      }
    ]
  },
  getters: {
    currentTabInfo (state) {
      return state.tabList.find(v => v.tabId === state.currentTab)
    }
  },
  mutations: {
    // 添加新页签
    addTab (state, payLoad) {
      if (!payLoad) return
      // 是否已经存在相同的tabId
      let isExist = state.tabList.some(tab => tab.tabId === payLoad.tabId && tab.isShow)
      if (!isExist) {
        state.tabList.push(payLoad)
      }
      // 激活当前页签
      this.commit('setCurrentTab', payLoad.tabId)
    },
    // 选中当前页签
    setCurrentTab (state, payLoad) {
      state.currentTab = payLoad
    },
    // 关闭当前页签不能改变tabList长度, 否则会引发所有页签下组件刷新?
    closeTab (state, tabId) {
      let index = state.tabList.findIndex(v => v.tabId === (tabId || state.currentTab))
      let activeTabInfo = state.tabList[index + 1] || state.tabList[index - 1]
      state.tabList.splice(index, 1)
      if (tabId === state.currentTab) { // 如果关闭的是当前活动的页签
        this.commit('setCurrentTab', activeTabInfo['tabId'])
      }
    },
    // 关闭所有页签
    closeAllTab (state) {
      state.tabList.splice(1)
      this.commit('setCurrentTab', 'tab-index')
    },
    // 关闭非当前页签的所有页签
    closeOtherTab (state) {
      let temp = { ...this.getters.currentTabInfo }
      state.tabList.splice(1)
      state.tabList.push(temp)
    }
  },
  actions: {

  }
}
