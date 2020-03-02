export default {
  data () {
    return {
      timer: null,
      codeText: 'Send'
    }
  },
  methods: {
    // 判断是邮箱/手机号/用户名
    getAcountType (account) {
      if (this.regRules.email.test(account)) return 'email'
      if (this.regRules.phone.test(account)) return 'phone'
      if (this.regRules.user.test(account)) return 'user'
      return false
    },
    // 获取验证码
    getCode () {
      // 发送验证码请求
      if (this.timer) return false
      let secs = 11
      this.codeText = secs + 's'
      this.timer = setInterval(() => {
        secs--
        if (secs < 10 && secs > 0) {
          this.codeText = '0' + secs + 's'
        } else {
          this.codeText = secs + 's'
        }
        if (secs < 0) {
          this.clearTime()
        }
      }, 1000)
    },
    // 清除定时器
    clearTime () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.codeText = 'send'
      }
    }
  }
}
