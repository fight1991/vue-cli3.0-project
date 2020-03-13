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
      baseURL: process.env.NODE_ENV === 'development' ? '/api' : baseURL, // vue.config.js已配置了跨域
      timeout: 5000
    })
    this.instance.interceptors.request.use(onRequestResolve, onRequestReject)
    this.instance.interceptors.response.use(onResponseResolve, onResponseReject)
  }
}
