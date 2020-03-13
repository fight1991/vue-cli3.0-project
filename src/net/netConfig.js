import axios from 'axios'
import interceptors from './interceptors'
let {
  onRequestResolve,
  onRequestReject,
  onResponseResolve,
  onResponseReject
} = interceptors

export default class Method {
  constructor (baseURL) {
    this.instance = axios.create({
      // 开发环境中以/api开头的接口需要设置代理
      baseURL: process.env.NODE_ENV === 'development' ? '/api' : baseURL,
      timeout: 5000
    })
    this.instance.interceptors.request.use(onRequestResolve, onRequestReject)
    this.instance.interceptors.response.use(onResponseResolve, onResponseReject)
  }
}
