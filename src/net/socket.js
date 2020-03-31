export default class socket {
  constructor (url) {
    this.ws = null
    this.url = url
    this.isConnect = null // 是否在重新连接
    this.timeout = 10 * 1000 // 间隔10s心跳检测
    this.timeoutObj = null
    this.serverTimeout = 5000 // 服务器超时
    this.serverTimeoutObj = null
  }
  startLink (params, getData) {
    this.ws = new WebSocket(this.url)
    this.ws.onclose = (e) => { // 连接关闭触发
      console.error('websocket close')
    }
    this.ws.onerror = () => { // 发生异常
      console.log('error')
      // 重新连接
      this.reconnect()
    }
    this.ws.onopen = () => { // 连接开始
      // 心跳检测重置
      this.reset()
      params && this.ws.send(params)
    }
    this.ws.onmessage = (res) => {
      // 接受到服务器任何信息 说明连接没有断开,ws重新开启心跳检测
      this.reset()
      getData && getData(res)
    }
  }
  closeLink () {
    this.ws.close()
  }
  reconnect () {
    console.log('哈哈')
    let that = this
    // 设置节流,避免重连请求重复
    if (this.isConnect) return
    this.isConnect = setTimeout(() => {
      that.startLink()
      clearTimeout(that.isConnect)
      that.isConnect = null
    }, 4000)
  }
  reset () {
    this.timeoutObj && clearInterval(this.timeoutObj)
    this.serverTimeoutObj && clearInterval(this.serverTimeoutObj)
    this.start()
  }
  start () {
    let _this = this
    _this.timeoutObj = setTimeout(() => { // 每x秒发送一次
      _this.ws.send('heartBeat')
      _this.serverTimeoutObj = setTimeout(() => { // 服务器间隔5000没有响应的话重新连接
        // 执行ws.close()会触发onclose
        _this.ws.close()
        _this.ws.reconnect()
      }, _this.serverTimeout)
    }, _this.timeout)
  }
}
