import router from '@/router'
let Home = () => import(/* webpackChunkName: "home" */ '@/views/pages/home')
export default {
  state: {
    currentTab: 'tab-index',
    tabList: [
      {
        tabId: 'tab-index',
        title: 'home',
        path: '/bus/index',
        isShow: true,
        components: [Home],
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
      // 有无相同的组件
      let sameTab = state.tabList.find(tab => tab.path === payLoad.path)
      // 是否已经存在相同的组件id
      let sameId = state.tabList.some(tab => tab.tabId === payLoad.tabId)
      if (payLoad.params.refresh) { // 有相同组件则替换
        if (sameTab) {
          // 改变列表绑定的key值才会刷新
          let newTabId = Date.now().toString()
          sameTab.tabId = payLoad.tabId = newTabId
        } else {
          state.tabList.push(payLoad)
        }
      } else {
        if (!sameId) {
          state.tabList.push(payLoad)
        }
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
      if (tabId === state.currentTab) { // 如果关闭的是当前活动的页签,激活相邻页签(路由跳转)
        let { path, query, params } = activeTabInfo
        router.push({
          path,
          query,
          params
        })
      }
    }
  },
  actions: {
    // 关闭所有页签
    closeAllTab ({ state, commit }) {
      state.tabList.splice(1)
      commit('setCurrentTab', 'tab-index')
    },
    // 关闭非当前页签的所有页签
    closeOtherTab ({ state, getters }) {
      let temp = { ...getters.currentTabInfo }
      state.tabList.splice(1)
      if (temp.tabId === 'tab-index') return
      state.tabList.push(temp)
    },
    // 关闭当前页签,并打开指定的路由, 用name做跳转,当path和params共用时会失效
    backGo ({ state }, routerInfo) {
      let index = state.tabList.findIndex(v => v.tabId === state.currentTab)
      state.tabList.splice(index, 1)
      if (typeof routerInfo === 'string') {
        router.push({
          name: routerInfo,
          params: {
            refresh: true
          }
        })
      }
      if (typeof routerInfo === 'object') {
        let params = { refresh: true }
        if (routerInfo.params !== '{}') {
          params = Object.assign(params, routerInfo.params)
        }
        router.push({
          name: routerInfo.name,
          query: routerInfo.query || {},
          params: params
        })
      }
    }
  }
}
