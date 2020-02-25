import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/style/variable/theme.scss'
// import 'element-ui/lib/theme-chalk/index.css'

// 覆盖样式
import '@/style/base.less'
import '@/style/main.less'

// 封装网路请求
import '@/net/netMethods'

// 注册全局组件,指令,过滤器,引入语言包
import MyComponents from '@/components'
import MyDirectives from '@/derectives'
import * as filters from '@/filters'
import langs from '@/i18n'

Vue.use(MyComponents)
Vue.use(MyDirectives)
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.lang = 'zh'
Object.keys(langs).forEach(key => Vue.locale(key, langs[key]))

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
