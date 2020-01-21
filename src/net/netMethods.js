import reqInstance from './netConfig'
import Vue from 'vue'
const request = {
  $get ({ url, data = {}, success, error }) {
    reqInstance.get(url, {
      params: data
    }).then((res) => {
      success && success(res)
    }).catch((err) => {
      error && error(err)
    })
  },
  $post ({ url, data = {}, success, error }) {
    console.log('哈哈')
    console.log(data)
    reqInstance.post(url, data)
      .then((res) => {
        success && success(res)
      })
      .catch((err) => {
        console.log(err)
        error && error(err)
      })
  }
}
// 绑定vue原型
Object.keys(request).forEach(key => {
  Vue.prototype[key] = request[key]
})
console.log(Vue.prototype)
