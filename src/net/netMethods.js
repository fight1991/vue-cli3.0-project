import Vue from 'vue'
import store from '@/store'
import Method from './netConfig'

let { instance: commonInstance } = new Method(process.env.VUE_APP_API)
let { instance: upLoadInstance } = new Method(process.env.VUE_APP_FILE)

// 响应200时 业务状态码处理
function bussinessBundle (code, res, other, success) {
  if (code === store.state.successCode) {
    success && success(res)
    return
  }
  if (other) {
    other(res)
    return
  }
  Vue.prototype.$message.error(res.errno)
}
const request = {
  $get ({ url, data = {}, success, other, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    commonInstance.get(url, {
      params: data
    }).then(res => {
      bussinessBundle(res.errno, res, other, success)
    }).catch(err => {
      error && error(err)
    }).finally(() => {
      store.commit('changeLoading', false)
    })
    return commonInstance.get(url, {
      params: data
    })
  },
  $post ({ url, data = {}, success, other, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    commonInstance.post(url, data)
      .then(res => {
        bussinessBundle(res.errno, res, other, success)
      })
      .catch(err => {
        console.dir(err)
        error && error(err)
      })
      .finally(() => {
        store.commit('changeLoading', false)
      })
    return commonInstance.post(url, data)
  },
  $upload ({ url, data = {}, success, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    upLoadInstance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      success && success(res)
    }).catch(err => {
      error && error(err)
    }).finally(() => {
      store.commit('changeLoading', false)
    })
  }
}
// 绑定vue原型
Object.keys(request).forEach(key => {
  Vue.prototype[key] = request[key]
})
