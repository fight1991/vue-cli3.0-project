import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import en from './lang/en'
import zh from './lang/zh'

export default {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
}
