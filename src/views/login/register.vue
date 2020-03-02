<template>
  <div class="login login-register">
    <div class="tab-header">
      <div @click="toggleClick('phone')" :class="{'tab-item':true, 'active': isPhone}">Mobile Phone</div>
      <div @click="toggleClick('email')" :class="{'tab-item':true, 'active': isEmail}">Email</div>
    </div>
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="account">
              <el-popover
                trigger="click"
                popper-class="login-pop"
                width="200"
                placement="right-end">
                <span>Make sure it starts width a letter and it's at least 6 characters including a number and a letter</span>
                <el-input slot="reference" v-model="dataForm.account" placeholder="Username"></el-input>
              </el-popover>
            </el-form-item>
          </el-col>
           <el-col :span="24" class="password">
            <el-form-item prop="password">
              <el-popover
                trigger="focus"
                popper-class="login-pop"
                width="200"
                placement="right">
                <span>Make sure it's at least 6 characters including a number and a letter</span>
                <el-input slot="reference" :type="pwType" v-model="dataForm.password" placeholder="Password">
                  <i slot="suffix" @click="showPw('pwType')" :class="pwType === 'password'?'iconfont icon-hide':'iconfont icon-show'"></i>
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" class="password">
            <el-form-item>
              <el-input :type="confirmPwType" v-model="dataForm.confirmWord" placeholder="Verify password">
                <i slot="suffix" @click="showPw('confirmPwType')" :class="confirmPwType === 'password'?'iconfont icon-hide':'iconfont icon-show'"></i>
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" v-if="isPhone">
            <el-form-item prop="contact">
              <el-input v-model="dataForm.contact" placeholder="Mobile Phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-else>
            <el-form-item prop="contact">
              <el-input v-model="dataForm.contact" placeholder="Email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="captcha">
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
import valid from './validate'
export default {
  name: 'register',
  mixins: [mixins],
  data () {
    return {
      pwType: 'password',
      confirmPwType: 'password',
      isAgreen: true,
      loginType: 'code',
      isPhone: true,
      isEmail: false,
      dataForm: {
        account: '', // 用户名
        password: '', // 密码
        contactType: '', // 类型 email, phone
        contact: '', // 联系方式
        captcha: '', // 验证码
        confirmWord: '' // 密码确认
      },
      loginRules: {
        account: [{ required: true, pattern: valid.user.rule, message: valid.user.message, trigger: 'blur' }],
        password: [{ required: true, pattern: valid.password.rule, message: valid.password.message, trigger: 'blur' }],
        contact: [{ required: true, validator: this.contactValid, trigger: 'blur' }],
        captcha: [{ required: true, pattern: valid.code.rule, message: valid.code.message, trigger: 'blur' }]
      }
    }
  },
  props: ['pageFlag'],
  methods: {
    toggleClick (type) {
      if (type === 'phone' && this.isPhone) return false
      if (type === 'email' && this.isEmail) return false
      if (type === 'phone') {
        this.isPhone = true
        this.isEmail = false
      } else {
        this.isPhone = false
        this.isEmail = true
      }
      this.$refs.dataForm.clearValidate('contact')
      this.dataForm.contact = ''
    },
    // 返回登录模块
    backLogin () {
      this.$emit('toggleStatus', 'login')
    },
    // 手机/邮箱校验
    contactValid (rule, value, callback) {
      let typeValue = this.isPhone ? 'phone' : 'email'
      if (!valid[typeValue].rule.test(value)) {
        callback(new Error(valid[typeValue].message))
      } else {
        callback()
      }
    },
    showPw (type) {
      this[type] = this[type] === 'text' ? 'password' : 'text'
    },
    // 注册按钮
    goRegister () {
      // 自定义表单校验
      if (!this.validPass()) return false
      let contactType = 'phone'
      if (this.isEmail) {
        contactType = 'email'
      }
      this.dataForm.contactType = contactType
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
