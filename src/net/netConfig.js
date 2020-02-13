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
      baseURL: baseURL,
      timeout: 5000
    })
    this.instance.interceptors.request.use(onRequestResolve, onRequestReject)
    this.instance.interceptors.response.use(onResponseResolve, onResponseReject)
  }
}
