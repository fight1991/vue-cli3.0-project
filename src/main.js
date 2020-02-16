import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/net/netMethods'
import '@/components/global/registerGlobal'
import '@/style/base.less'
import '@/style/main.less'

import MyComponents from '@/components'
import MyDirectives from '@/derectives'
import * as filters from '@/filters'
Vue.use(MyComponents)
Vue.use(MyDirectives)
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
