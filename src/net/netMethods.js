
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
  }
}

const requests = {
  // 返回 promise
  async $axios ({ url, data = {}, method = 'get', isLoad = true }) {
    let params = method === 'get' ? { params: data } : data
    // 无论resolve还是reject都返回一个结果
    try {
      if (isLoad) store.commit('changeLoading', true)
      let res = await commonInstance[method](url, params)
      if (isLoad) store.commit('changeLoading', false)
      if (res.errno === store.state.successCode) {
        return { result: res.result }
      } else {
        return { other: res.result }
      }
    } catch (err) {
      // console.log(err)
      if (isLoad) store.commit('changeLoading', false)
      return { error: err }
    }
  },
  // 自定义请求
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
