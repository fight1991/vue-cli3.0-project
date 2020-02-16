import permission from './permission'
import lessTime from './lessTime'
export default {
  install (Vue) {
    Vue.directive('time', lessTime)
    Vue.directive('permission', permission)
  }
}
