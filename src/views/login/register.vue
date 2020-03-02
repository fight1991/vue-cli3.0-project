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
           <el-col :span="24" >
            <el-form-item prop="pw">
              <el-popover
                trigger="focus"
                popper-class="login-pop"
                width="200"
                placement="bottom-start">
                <span>Make sure it's at least 6 characters including a number and a letter</span>
                <el-input slot="reference" :type="pwType" v-model="dataForm.passWord" placeholder="Password">
                  <i slot="suffix" @click="showPw('pwType')" class="el-input__icon el-icon-view"></i>
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="pageFlag==='reg'">
            <el-form-item>
              <el-input :type="confirmPwType" v-model="dataForm.confirmWord" placeholder="Verify password">
                <i slot="suffix" @click="showPw('confirmPwType')" class="el-input__icon el-icon-view"></i>
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
              <el-input v-model="dataForm.captcha" placeholder="Code"></el-input>
              <span class="get-code" @click="getCode">{{codeText}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="space-between">
      <el-checkbox v-model="isAgreen" v-if="pageFlag==='reg'">
        <span class="agree-text">Agree</span>
        <span class="user-agree">《user agreement》</span>
      </el-checkbox>
      <span v-if="pageFlag==='pw'"></span>
      <span @click="backLogin">Back</span>
    </el-row>
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="goRegister">{{pageFlag==='pw' ? 'Reset password' : 'Sign up'}}</el-button>
    </el-row>
  </div>
</template>

<script>
import mixins from './mixin'
import md5 from 'js-md5'
export default {
  mixins: [mixins],
  data () {
    return {
      pwType: 'password',
      confirmPwType: 'password',
      isAgreen: true,
      loginType: 'code',
      isCode: true,
      isPw: false,
      isValid: false, // 校验节流阀
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
      this.$emit('toggleStatus', { type: 'login' })
    },
    // 登录输入框校验
    validPass () {
      // 手机或邮箱正则
      let { account, password, confirmWord, contact, captcha } = this.dataForm
      if (!this.regRules.user.test(account)) {
        this.$message.error('请填写正确格式的用户名')
        return false
      }
      if (confirmWord !== password) {
        this.$message.error('两次输入的密码不一致')
        return false
      }
      if (!this.regRules.phone.test(contact) || !this.regRules.email.test(contact)) {
        this.$message.error('请填写正确格式的手机号或邮箱')
        return false
      }
      if (!this.regRules.code.test(captcha)) {
        this.$message.error('请填写4位数验证码')
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
