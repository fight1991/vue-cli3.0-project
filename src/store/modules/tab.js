export default {
  state: {
    currentTabName: 'tab-index',
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
    setCurrentTabName (state, tabName) {
      state.currentTabName = tabName
    },
    removeTab (state, tabId, { commit }) {
      let index = state.tabList.findIndex(v => v.tabId === tabId)
      state.tabList.splice(index, 1)
      let tempTab = state.tabList[index - 1] || state.tabList[index + 1]
      commit('setCurrentTabName', tempTab.tabId)
    },
    addTab (state, tabInfo, { commit }) {
      state.tabList.push({
        tabId: tabInfo.tabId,
        title: tabInfo.title,
        components: [...tabInfo.components]
      })
      commit('setCurrentTabName', tabInfo.tabId)
    }
  },
  actions: {

  },
  getters: {

  }
}
