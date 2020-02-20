import Vue from 'vue'
import ELEMENT from 'element-ui'

import en from './lang/en'
import zh from './lang/zh'

Vue.config.lang = 'zh'
Vue.locale('en', {
  ...ELEMENT.lang.en,
  ...en
})
Vue.locale('zh', {
  ...ELEMENT.lang.zhCN,
  ...zh
})
