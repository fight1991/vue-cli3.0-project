import valid from './validate'
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
      if (valid.email.rule.test(account)) return 'email'
      if (valid.phone.rule.test(account)) return 'phone'
      if (valid.user.rule.test(account)) return 'user'
      return false
    },
    // 发送验证码
    sendCode ({ contact, contactType }, callback) {
      if (this.timer) return
      this.$post({
        url: '/v0/user/sendcaptcha',
        data: {
          contact,
          contactType
        },
        success: () => {
          callback && callback()
          this.$message.success('send successful')
        }
      })
    },
    // 验证码按钮
    codeBtn () {
      // 发送验证码请求
      if (this.timer) return false
      let secs = 60
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
        this.codeText = 'Send'
      }
    }
  }
}
