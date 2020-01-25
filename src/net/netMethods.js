import reqInstance from './netConfig'
import Vue from 'vue'
import store from '@/store/index'
const request = {
  $get ({ url, data = {}, success, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    reqInstance.get(url, {
      params: data
    }).then((res) => {
      success && success(res)
    }).catch((err) => {
      error && error(err)
    }).finally(() => {
      store.commit('changeLoading', false)
    })
  },
  $post ({ url, data = {}, success, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    reqInstance.post(url, data)
      .then((res) => {
        success && success(res)
      })
      .catch((err) => {
        console.log(err)
        error && error(err)
      })
      .finally(() => {
        store.commit('changeLoading', false)
      })
  },
  $upload ({ url, data = {}, success, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    reqInstance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      success && success(res)
    }).catch((err) => {
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
