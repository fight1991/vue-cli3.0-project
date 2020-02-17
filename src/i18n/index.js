import Vue from 'vue'
import ELEMENT from 'element-ui'

import en from './lang/en'
import zh from './lang/zh'
// import VueI18n from 'vue-i18n'
Vue.config.lang = 'zh-cn'
Vue.locale('en', {
  ...ELEMENT.lang.en,
  ...en
})
Vue.locale('zh-cn', {
  ...ELEMENT.lang.zhCN,
  ...zh
})
console.log(Vue.prototype)
