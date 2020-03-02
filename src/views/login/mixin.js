export default {
  data () {
    return {
      timer: null,
      codeText: 'Send',
      regRules: {
        email: /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/, // 邮箱
        phone: /\d+/, // 手机号
        user: /^[A-Za-z][A-Za-z0-9_-]{5,7}$/, // 以字母开头的6-8位用户名
        password: /^[A-Za-z0-9_&$#]{6,}$/, // 至少六位数密码
        code: /[0-9]{4}/ // 验证码
      }
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
