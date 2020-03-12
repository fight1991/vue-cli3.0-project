import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import '@/style/variable/theme.scss' // 出现样式重复现象
import 'element-ui/lib/theme-chalk/index.css'
// 覆盖样式
import '@/style/base.less'
import '@/style/main.less'
// 雪碧图
import '@/style/sprite.less'

import Request from '@/net/netMethods' // 网路请求
import Filters from '@/filters' // 过滤器
import MyComponents from '@/components' // 自定义全局组件
import MyDirectives from '@/derectives' // 自定义指令
import Langs from '@/i18n' // 语言包
import Mixins from '@/mixin'

Vue.use(ElementUI)
Vue.use(Request)
Vue.use(Filters)
Vue.use(MyComponents)
Vue.use(MyDirectives)
Vue.use(Langs)
Vue.mixin(Mixins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
