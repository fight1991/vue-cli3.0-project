<template>
  <div class="login">
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="account">
              <el-input v-model="dataForm.account" placeholder="Mobile phone/Email address"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="24" class="password">
            <el-form-item prop="pw">
              <el-popover
                trigger="focus"
                popper-class="login-pop"
                width="200"
                placement="bottom-start">
                <span>Make sure it's at least 6 characters including a number and a letter</span>
                <el-input slot="reference" :type="pwType" v-model="dataForm.newPassword" placeholder="Password">
                  <i slot="suffix" @click="showPw('pwType')" :class="pwType === 'password'?'iconfont icon-hide':'iconfont icon-show'"></i>
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="code">
              <el-input v-model="dataForm.captcha" placeholder="4-digit verification code"></el-input>
              <span class="get-code" @click="getCode">{{codeText}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="end">
      <span @click="backLogin">Back</span>
    </el-row>
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="resetPassword">Reset password</el-button>
    </el-row>
  </div>
</template>

<script>
import mixins from './mixin'
import md5 from 'js-md5'
import valid from './validate'
export default {
  name: 'resetPw',
  mixins: [mixins],
  data () {
    return {
      pwType: 'password',
      confirmPwType: 'password',
      isAgreen: true,
      loginType: 'code',
      isCode: true,
      isPw: false,
      dataForm: {
        account: '', // 账号
        newPassword: '', // 密码
        contactType: '', // 类型 email, phone
        captcha: '' // 验证码
      },
      loginRules: {}
    }
  },
  props: ['pageFlag'],
  methods: {
    // 返回登录模块
    backLogin () {
      this.$emit('toggleStatus', 'login')
    },
    // 登录输入框校验
    validPass () {
      // 手机或邮箱正则
      let { account, newPassword, captcha } = this.dataForm
      if (!valid.phone.rule.test(account) || !valid.email.rule.test(account)) {
        this.$message.error('Mobile phone or Email is invalid')
        return false
      }
      if (!valid.password.rule.test(newPassword)) {
        this.$message.error(valid.password.message)
        return false
      }
      if (!valid.code.rule.test(captcha)) {
        this.$message.error(valid.code.message)
        return false
      }
      return true
    },
    showPw (type) {
      this[type] = this[type] === 'text' ? 'password' : 'text'
    },
    // 重置密码
    resetPassword () {
      if (!this.validPass()) return false
      this.accountType = this.getAcountType(this.dataForm.accountType)
      this.$post({
        url: '/user/reset',
        data: {
          ...this.dataForm,
          newPassword: md5(this.dataForm.newPassword)
        },
        success: res => {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import './public';
  .user-agree {
    color: @sys-main-header;
  }
  .agree-text {
    color: #4c4c4c;
  }
</style>
