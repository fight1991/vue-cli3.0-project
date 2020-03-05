import router from '@/router/index'
import storage from '@/util/storage'
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
    config.headers['token'] = storage.getToken()
    return config
  },
  // 请求发送失败之前
  onRequestReject: function (error) {
    return Promise.reject(error)
  },
  // 响应成功
  onResponseResolve: function (response) {
    // 41808 token失效 ; 41809 不合法token ; 41810 用户名已在其他地方登录
    if ([41808, 41809, 41810].includes(response.data.errno)) {
      Message.error(response.data.errno)
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    } else {
      return response.data
    }
  },
  // 响应失败
  onResponseReject: function (error) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 清除token
          storage.removeToken()
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
      return Promise.reject(error.response)
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error.message)
    }
  }
}
