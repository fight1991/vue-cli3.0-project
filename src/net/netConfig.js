import axios from 'axios'
let reqInstance = axios.create({
  timeout: 5000
})
let token = localStorage.getItem('token')
reqInstance.defaults.headers.common['ssoToken'] = token || ''
// 添加请求拦截器
reqInstance.interceptors.request.use(function (config) {
  let temp = config.data
  config.data = {
    appWebFlag: '1',
    reqData: temp,
    sysId: 'CCBA'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
reqInstance.interceptors.response.use(function (response) {
  console.log(response)
  return response.data
}, function (error) {
  return Promise.reject(error)
})
export default reqInstance
