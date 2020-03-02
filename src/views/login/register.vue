<template>
  <div class="login">
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="account">
              <el-popover
                trigger="focus"
                popper-class="login-pop"
                width="200"
                placement="bottom-start">
                <span>Make sure it starts width a letter and it's at least 6 characters including a number and a letter</span>
                <el-input slot="reference" v-model="dataForm.account" placeholder="Username"></el-input>
              </el-popover>
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
                <el-input slot="reference" :type="pwType" v-model="dataForm.password" placeholder="Password">
                  <i slot="suffix" @click="showPw('pwType')" :class="pwType === 'password'?'iconfont icon-hide':'iconfont icon-show'"></i>
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="password">
            <el-form-item>
              <el-input :type="confirmPwType" v-model="dataForm.confirmWord" placeholder="Verify password">
                <i slot="suffix" @click="showPw('confirmPwType')" :class="confirmPwType === 'password'?'iconfont icon-hide':'iconfont icon-show'"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="contact">
              <el-input v-model="dataForm.contact" placeholder="Mobile Phone / Email"></el-input>
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
    <el-row class="find-btn" type="flex" justify="space-between">
      <el-checkbox v-model="isAgreen">
        <span class="agree-text">Agree</span>
        <span class="user-agree">《Terms of Service》</span>
      </el-checkbox>
      <span @click="backLogin">Back</span>
    </el-row>
    <!-- 注册按钮 -->
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="goRegister">Sign up</el-button>
    </el-row>
  </div>
</template>

<script>
import mixins from './mixin'
import md5 from 'js-md5'
export default {
  name: 'register',
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
        account: '', // 用户名
        password: '', // 密码
        contactType: '', // 类型 email, phone
        contact: '', // 联系方式
        captcha: '', // 验证码
        confirmWord: '' // 密码确认
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
      let { account, password, confirmWord, contact, captcha } = this.dataForm
      if (!this.regRules.user.test(account)) {
        this.$message.error(`Username ${account} is not available`)
        return false
      }
      if (confirmWord !== password) {
        this.$message.error('The passwords entered twice are inconsistent')
        return false
      }
      if (!this.regRules.phone.test(contact) || !this.regRules.email.test(contact)) {
        this.$message.error('Mobile phone or Email is invalid')
        return false
      }
      if (!this.regRules.code.test(captcha)) {
        this.$message.error('Please enter 4-digit verification code')
        return false
      }
      if (!this.isAgreen) {
        this.$message.error('Please check our Terms of Service')
        return false
      }
      return true
    },
    showPw (type) {
      this[type] = this[type] === 'text' ? 'password' : 'text'
    },
    // 注册按钮
    goRegister () {
      // 自定义表单校验
      if (!this.validPass()) return false
      this.contactType = this.getAcountType(this.dataForm.contact)
      this.$post({
        url: '/user/register',
        data: {
          ...this.dataForm,
          password: md5(this.dataForm.password)
        },
        success: res => {
          console.log(res)
        }
      })
    },
    // 重置密码
    resetPassword () {
      if (!this.validPass()) return false
      this.contactType = this.getAcountType(this.dataForm.contact)
      this.$post({
        url: '/user/register',
        data: {
          ...this.dataForm,
          newPassword: md5(this.dataForm.password)
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
