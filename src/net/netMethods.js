
import { Message } from 'element-ui'
import store from '@/store'
import Method from './netConfig'

let { instance: commonInstance } = new Method(process.env.VUE_APP_API)
let { instance: upLoadInstance } = new Method(process.env.VUE_APP_FILE)

// 响应200时 业务状态码处理
function bussinessBundle (res, other, success) {
  if (res.errno === store.state.successCode) {
    success && success(res)
    return
  }
  if (other) {
    other(res)
    return
  }
  Message.error(res.errno)
}

const requests = {
  $axios ({ url, data = {}, method = 'get' }) {
    return commonInstance({ method, url, data })
  },
  $get ({ url, data = {}, success, other, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    commonInstance.get(url, {
      params: data
    }).then(res => {
      bussinessBundle(res, other, success)
    }).catch(err => {
      if (process.env.NODE_ENV === 'development') console.log('api is ' + url, err)
      error && error(err)
    }).finally(() => {
      store.commit('changeLoading', false)
    })
  },
  $post ({ url, data = {}, success, other, error, isLoad = true }) {
    if (isLoad) store.commit('changeLoading', true)
    commonInstance.post(url, data)
      .then(res => {
        bussinessBundle(res, other, success)
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') console.log('api is ' + url, err)
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

export default {
  install (Vue) {
    Object.keys(requests).forEach(key => {
      Vue.prototype[key] = requests[key]
    })
  }
}
