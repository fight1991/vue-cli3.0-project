import Vue from 'vue'
import store from '@/store'
import Method from './netConfig'

let { instance: commonInstance } = new Method(process.env.VUE_APP_API)
let { instance: upLoadInstance } = new Method(process.env.VUE_APP_FILE)
const request = {
  $get ({ url, data = {}, success, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    commonInstance.get(url, {
      params: data
    }).then(res => {
      if (res.errno === store.state.successCode) {
        success && success(res)
      } else {
        Vue.prototype.$message.error(res.errno)
      }
    }).catch(err => {
      error && error(err)
    }).finally(() => {
      store.commit('changeLoading', false)
    })
  },
  $post ({ url, data = {}, success, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    commonInstance.post(url, data)
      .then(res => {
        success && success(res)
      })
      .catch(err => {
        console.dir(err)
        error && error(err)
      })
      .finally(() => {
        store.commit('changeLoading', false)
      })
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
