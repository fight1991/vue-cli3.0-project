import VueRouter from 'vue-router'
import store from '@/store'

import Error from '@/views/error'
import Login from '@/views/login/index.js'
import Product from '@/views/product'
import Inverter from '@/views/inverter'
import BusinessRouter from '@/views/pages/index.js'
import storage from '@/util/storage'

const Main = () => import(/* webpackChunkName: "bus-main" */ '../views/main.vue')

const routes = [
  {
    path: '/',
    redirect: '/bus/index'
  },
  {
    path: '*',
    redirect: {
      name: 'error-404'
    }
  },
  {
    path: '/bus/index',
    name: 'bus-index',
    component: Main,
    children: [...BusinessRouter]
  }
]

routes.push(...Error)
routes.push(...Inverter)
routes.push(...Product)
routes.push(Login)

const router = new VueRouter({
  mode: 'history',
  routes
})
// 登录校验、放行 注意: 有些cdn路由版本 地址栏输入路由地址时会加载2次
router.beforeEach(async (to, from, next) => {
  let _this = router.app
  // 不需权限,直接放行 /login,/error-xx等
  if (to.meta.requiresAuth === false) {
    if (to.path === '/login') {
      storage.removeToken('token')
      storage.removeLoginInfo()
      _this.$options.store.state.isFirst = true
    }
    next()
    return
  }
  // token不存在,跳转到login
  if (!storage.getToken()) {
    next('/login')
    return
  }
  // 第一次进入系统需要获取权限状态和用户信息(刷新地址栏)
  if (_this.$options.store.state.isFirst) {
    // 用户信息查询
    let { result: userInfo } = await _this.$axios({ url: '/v0/user/info' })
    // 权限查询
    let { result: accessStatus } = await _this.$axios({ url: '/v0/user/access' })
    if (userInfo) {
      _this.$options.store.commit('setUserInfo', userInfo)
      storage.setUserInfo(userInfo)
    }
    if (accessStatus && typeof accessStatus.access === 'number') {
      _this.$options.store.commit('setAccess', accessStatus.access)
    }
    if (userInfo || accessStatus) {
      _this.$options.store.commit('changeFirst', false)
    }
  }
  // 路由跳转鉴别权限
  if (!(to.meta.permission && to.meta.permission.includes(store.state.access))) {
    _this.$message.error('No permissions!')
    return
  }
  next()
})
// 路由跳转之后
router.afterEach((to, from) => {
  document.title = to.meta.title || 'FoxESS'
  // 粗出路由信息列表
  store.commit('addRouteList', {
    name: to.name,
    path: to.path,
    title: to.meta.title
  })
})
export default router
