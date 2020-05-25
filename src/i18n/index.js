import store from '@/store'
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import ElementUI from 'element-ui'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// import ELEMENT from 'element-ui'
// ...ELEMENT.lang.en
// ...ELEMENT.lang.zhCN

import en from './lang/en'
import zh from './lang/zh'

Vue.use(VueI18n)
Vue.use(ElementUI)
const messages = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
}
const i18n = new VueI18n({
  // missing: function () {},
  silentTranslationWarn: true,
  locale: store.state.lang, // set locale
  messages // set locale messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$switchLang = function (lang) {
  i18n.locale = lang
  store.commit('toggleLang', lang)
}
window.translateT = i18n.t

export default i18n
// export default {
//   install (Vue) {
//     Vue.config.lang = store.state.lang
//     Vue.config.missingHandler = function () {} // 关闭告警
//     Vue.prototype.$switchLang = function (lang) {
//       this.config.lang = lang
//       store.commit('toggleLang', lang)
//     }.bind(Vue)
//     Object.keys(langs).forEach(key => Vue.locale(key, langs[key]))
//   }
// }
