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
              <el-input v-model="dataForm.mobile" placeholder="手机号/邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isCode">
            <el-form-item prop="code">
              <el-input v-model="dataForm.code" placeholder="验证码"></el-input>
              <span class="get-code" @click="getCode">{{codeText}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isPw">
            <el-form-item prop="pw">
              <el-input :type="pwType" v-model="dataForm.passWord" placeholder="密码">
                <i slot="suffix" @click="showPw" class="el-input__icon el-icon-view"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="space-between">
      <span @click="registerBtn('pw')">忘记密码?</span>
      <span @click="registerBtn('reg')">立即注册</span>
    </el-row>
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="goLogin">登录</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pwType: 'password',
      codeText: '获取验证码',
      timer: null,
      loginType: 'code',
      isCode: false,
      isPw: true,
      isValid: false, // 校验节流阀
      dataForm: {
        mobile: '',
        code: '',
        passWord: ''
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
    // 登录输入框校验
    validPass () {
      // 手机或邮箱正则
      let { mobile, code } = this.dataForm
      let regM = /\d+|^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      let regC = /\d{4}/
      console.log(regM.test('001Abc@@lenovo'))
      if (!regM.test(mobile)) {
        this.$message.error('请填写正确格式的手机号/邮箱')
        return false
      }
      if (this.isCode && !regC.test(code)) {
        this.$message.error('请填写4位数验证码')
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
      let isPass = this.validPass()
      if (!isPass) return false
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
        this.codeText = '获取验证码'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import './public';
</style>
