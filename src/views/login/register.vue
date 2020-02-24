<template>
  <div class="login">
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="手机号/邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="code">
              <el-input v-model="dataForm.code" placeholder="验证码"></el-input>
              <span class="get-code" @click="getCode">{{codeText}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item prop="pw">
              <el-input :type="pwType" v-model="dataForm.passWord" placeholder="密码">
                <i slot="suffix" @click="showPw('pwType')" class="el-input__icon el-icon-view"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="pageFlag==='reg'">
            <el-form-item>
              <el-input :type="confirmPwType" v-model="dataForm.confirmWord" placeholder="确认密码">
                <i slot="suffix" @click="showPw('confirmPwType')" class="el-input__icon el-icon-view"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="space-between">
      <el-checkbox v-model="isAgreen" v-if="pageFlag==='reg'">
        <span class="agree-text">同意</span>
        <span class="user-agree">《用户协议》</span>
      </el-checkbox>
      <span v-if="pageFlag==='pw'"></span>
      <span @click="backLogin">返回登录</span>
    </el-row>
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="goRegister">{{pageFlag==='pw' ? '重置密码' : '免费注册'}}</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pwType: 'password',
      confirmPwType: 'password',
      codeText: '获取验证码',
      timer: null,
      isAgreen: true,
      loginType: 'code',
      isCode: true,
      isPw: false,
      isValid: false, // 校验节流阀
      dataForm: {
        mobile: '',
        code: '',
        passWord: '',
        confirmWord: ''
      },
      loginRules: {}
    }
  },
  props: ['pageFlag'],
  methods: {
    // 返回登录模块
    backLogin () {
      this.$emit('toggleStatus', { type: 'login' })
    },
    // 登录输入框校验
    validPass () {
      // 手机或邮箱正则
      let { mobile, code, passWord, confirmWord } = this.dataForm
      let regM = /\d+|^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      let regC = /\d{4}/
      console.log(regM.test('001Abc@@lenovo'))
      if (!regM.test(mobile)) {
        this.$message.error('请填写正确格式的手机号/邮箱')
        return false
      }
      if (regC.test(code)) {
        this.$message.error('请填写4位数验证码')
        return false
      }
      if (confirmWord !== passWord) {
        this.$message.error('两次输入的密码不一致')
        return false
      }
      if (!this.isAgreen) {
        this.$message.error('请勾选用户协议')
        return false
      }
      return true
    },
    showPw (type) {
      this[type] = this[type] === 'text' ? 'password' : 'text'
    },
    // 登录按钮
    goRegister () {
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
  .user-agree {
    color: @sys-main-header;
  }
  .agree-text {
    color: #4c4c4c;
  }
</style>
