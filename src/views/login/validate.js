export default {
  email: {
    rule: /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/, // 邮箱
    message: 'Email is invalid'
  },
  phone: {
    rule: /^\d+$/, // 手机号
    message: 'Mobile number is invalid'
  },
  user: {
    rule: /^[A-Za-z][A-Za-z0-9_-]{5,7}$/, // 以字母开头的6-8位用户名
    message: 'Username is not available'
  },
  password: {
    rule: /^[A-Za-z0-9_&$#]{6,}$/, // 至少六位数密码
    message: 'Password is invalid'
  },
  code: {
    rule: /^\d{4}$/, // 验证码
    message: 'Please enter 4-digit verification code'
  }
}
