import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/net/netMethods'
import '@/components/global/registerGlobal'
import '@/style/base.less'
import '@/style/main.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
