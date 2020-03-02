import router from '@/router/index'
import { Message } from 'element-ui'
/**
 * 请求拦截器 onRequestResolve
 * @param {*} config
 */
export default {
  // 请求发送成功之前
  onRequestResolve: function (config) {
    // ajax异步请求
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    let token = localStorage.getItem('token')
    config.headers['token'] = token || ''
    return config
  },
  // 请求发送失败之前
  onRequestReject: function (error) {
    return Promise.reject(error)
  },
  // 响应成功
  onResponseResolve: function (response) {
    return response.data
  },
  // 响应失败
  onResponseReject: function (error) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 清除用户登录信息
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          router.push({
            path: '/error/403',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 404:
          Message({
            message: `path:${error.response.data.path} ${
              error.response.data.error
            }`,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 405:
          Message({
            message: `path:${error.response.data.path} ${
              error.response.data.error
            }`,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 500:
          router.push('/error/5xx')
          break
        default:
          router.push('/error/5xx')
      }
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      return Promise.reject(error.response)
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error.message)
    }
  }
}
