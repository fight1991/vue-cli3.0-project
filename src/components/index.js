// import Echart from './global/echart'
import Pagination from './global/pagination'
import SearchBar from './global/searchBar'
import FuncBar from './global/funcBar'

const Echart = () => import(/* webpackChunkName: "echarts" */ './global/echart')

export default {
  install (Vue) {
    Vue.component('el-echart', Echart)
    Vue.component('page-box', Pagination)
    Vue.component('search-bar', SearchBar)
    Vue.component('func-bar', FuncBar)
  }
}
