<template>
  <div class="login">
    <!-- <div class="tab-header">
      <div @click="toggleClick('code')" :class="{'tab-item':true, 'active': isCode}">验证码登录</div>
      <div @click="toggleClick('pw')" :class="{'tab-item':true, 'active': isPw}">密码登录</div>
    </div> -->
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="mobile">
              <el-input v-model="dataForm.account" placeholder="Username/Mobile phone/Email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isCode">
            <!-- <el-form-item prop="code">
              <el-input v-model="dataForm.code" placeholder="验证码"></el-input>
              <span class="get-code" @click="getCode">{{codeText}}</span>
            </el-form-item> -->
          </el-col>
          <el-col :span="24" v-if="isPw">
            <el-form-item prop="pw">
              <el-input :type="pwType" v-model="dataForm.password" placeholder="Password">
                <i slot="suffix" @click="showPw" class="el-input__icon el-icon-view"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="space-between">
      <span @click="registerBtn('pw')">Forget password?</span>
      <span @click="registerBtn('reg')">Sign up</span>
    </el-row>
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="goLogin">Sign in</el-button>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5'
import mixins from './mixin'
export default {
  mixins: [mixins],
  data () {
    return {
      pwType: 'password',
      loginType: 'code',
      isCode: false,
      isPw: true,
      isValid: false, // 校验节流阀
      dataForm: {
        account: '',
        password: '',
        accountType: '' //  user, email, phone
      },
      loginRules: {}
    }
  },
  methods: {
    toggleClick (type) {
      this.loginType = 'code'
      if (type === 'code') {
        this.isCode = true
        this.isPw = false
      } else {
        this.isCode = false
        this.isPw = true
      }
    },
    // 密码登录输入框校验
    passwordValid () {
      // 手机或邮箱正则
      let { account, password } = this.dataForm
      if (!this.getAcountType(account)) {
        this.$message.error('请填写正确格式的用户名/手机号/邮箱')
        return false
      }
      if (!this.regRules.password.test(password)) {
        this.$message.error('请填写至少6位包含字母数字特殊字符的密码')
        return false
      }
      return true
    },
    showPw () {
      this.pwType = this.pwType === 'text' ? 'password' : 'text'
    },
    // 打开注册组件/密码找回
    registerBtn (page) {
      this.clearTime()
      this.$emit('toggleStatus', { page, type: 'register' })
    },
    // 登录
    goLogin () {
      // 自定义表单校验
      if (!this.passwordValid()) return false
      this.dataForm.accountType = this.getAcountType(this.dataForm.account)
      this.$post({
        url: '/user/login',
        data: {
          ...this.dataForm,
          password: md5(this.dataForm.password)
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
</style>
