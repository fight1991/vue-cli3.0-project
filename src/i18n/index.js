import store from '@/store'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import en from './lang/en'
import zh from './lang/zh'

const langs = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
}
export default {
  install (Vue) {
    Vue.config.lang = store.state.lang
    Vue.prototype.$switchLang = function (lang) {
      this.config.lang = lang
      store.commit('toggleLang', lang)
    }.bind(Vue)
    Object.keys(langs).forEach(key => Vue.locale(key, langs[key]))
  }
}
