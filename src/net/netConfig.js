import axios from 'axios'
import interceptors from './interceptors'
let {
  onRequestResolve,
  onRequestReject,
  onResponseResolve,
  onResponseReject
} = interceptors
let reqInstance = axios.create({
  timeout: 5000
})
// ajax异步请求
reqInstance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
let token = localStorage.getItem('token')
reqInstance.defaults.headers.common['ssoToken'] = token || ''
// 添加请求拦截器
reqInstance.interceptors.request.use(onRequestResolve, onRequestReject)
// 添加响应拦截器
reqInstance.interceptors.response.use(onResponseResolve, onResponseReject)
export default reqInstance
