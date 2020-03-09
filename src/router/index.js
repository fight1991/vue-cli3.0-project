import VueRouter from 'vue-router'
import store from '@/store'

import Error from '@/views/error'
import Login from '@/views/login/index.js'
import Product from '@/views/product'
import Inverter from '@/views/inverter'
import businessRouter from '@/views/pages/index.js'
import storage from '@/util/storage'
import { Message } from 'element-ui'

const Main = () => import(/* webpackChunkName: "main" */ '../views/main.vue')

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '*',
    redirect: {
      name: 'error-404'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: Main,
    children: [...businessRouter]
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
// 登陆校验、放行 注意: 有些cdn路由版本 地址栏输入路由地址时会加载2次
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (!storage.getToken()) {
      Message.error('No permission')
      next('/login')
    } else {
      next()
      let _this = router.app
      // 用户信息查询
      _this.$get({
        url: '/user/info',
        success: ({ result }) => {
          if (result) {
            _this.$store.commit('setUserInfo', result)
            storage.setUserInfo(result)
          }
        }
      })
      // 权限查询
      _this.$get({
        url: '/user/access',
        success: ({ result }) => {
          if (result) {
            _this.$store.commit('setAccess', result.access)
          }
        }
      })
    }
  }
})
// 路由跳转之后
router.afterEach((to, from) => {
  document.title = to.meta.title || 'FoxEss'
  let tabId = to.query.tabId || to.params.tabId || to.name
  let title = to.query.tabTitle || to.params.tabTitle || to.meta.title
  if (store.state.tabView && to.meta.component) {
    store.commit('addTab', {
      tabId,
      title,
      isShow: true,
      components: [to.meta.component],
      path: to.path,
      query: JSON.parse(JSON.stringify(to.query)),
      params: JSON.parse(JSON.stringify(to.params))
    })
  }
})
export default router
