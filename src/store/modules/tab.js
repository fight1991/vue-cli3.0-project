export default {
  state: {
    currentTabName: 'tab-index',
    activeIndex: '',
    tabList: [
      {
        tabId: 'tab-index',
        title: '首页',
        components: [
          {
            name: 'tab-index',
            dom: () => import(/* webpackChunkName: "tabIndex" */ '@/components/index')
          }
        ]
      }
    ]
  },
  mutations: {
    setActiveIndex (state, activeIndex) {
      state.activeIndex = activeIndex
    },
    setCurrentTabName (state, tabName) {
      state.currentTabName = tabName
    },
    removeTab (state, tabId) {
      let index = state.tabList.findIndex(v => v.tabId === tabId)
      state.tabList.splice(index, 1)
      let tempTab = state.tabList[index - 1] || state.tabList[index + 1]
      this.commit('setCurrentTabName', tempTab.tabId)
    },
    addTab (state, tabInfo) {
      console.log('打哈哈')
      let temp = state.tabList.find(v => v.tabId === tabInfo.tabId)
      if (!temp) {
        state.tabList.push({
          tabId: tabInfo.tabId,
          title: tabInfo.title,
          components: [...tabInfo.components]
        })
      }
      this.commit('setCurrentTabName', tabInfo.tabId)
    }
  },
  actions: {

  },
  getters: {

  }
}
