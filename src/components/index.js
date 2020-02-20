import Echart from './global/echart'
import Pagination from './global/pagination'
export default {
  install (Vue) {
    Vue.component('el-echart', Echart)
    Vue.component('page-box', Pagination)
  }
}
