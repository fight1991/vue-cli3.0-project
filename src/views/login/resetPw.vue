<template>
  <div class="login">
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24" v-if="isEmail">
            <el-form-item prop="account">
              <el-input v-model="dataForm.account" placeholder="Email address"></el-input>
            </el-form-item>
          </el-col>
          <div v-else>
            <el-col :span="6" class="phone-area">
              <el-form-item>
                <el-select v-model="dataForm.area">
                  <el-option v-for="item in areaNum" :key="item.num" :label="item.num" :value="item.num"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="account">
                <el-input v-model="dataForm.account" placeholder="Mobile number"></el-input>
              </el-form-item>
            </el-col>
          </div>
           <el-col :span="24" class="password">
            <el-form-item prop="pw">
              <el-popover
                :visible-arrow="false"
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
          <el-col :span="24" class="code-area">
            <el-form-item prop="code">
              <el-input v-model="dataForm.captcha" :maxlength="4" placeholder="4-digit verification code">
                <el-button slot="append" @click="getCode">{{codeText}}</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="space-between">
      <span v-if="isEmail" @click="toggleEmail">Mobile number</span>
      <span v-else @click="toggleEmail">Email</span>
      <span class="f12" @click="backLogin">Back sign in</span>
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
      isEmail: false,
      areaNum: [ { num: '+86', contry: 'china' } ],
      dataForm: {
        area: '+86',
        account: '', // 账号
        newPassword: '', // 密码
        accountType: '', // 类型 email, phone
        captcha: '' // 验证码
      },
      loginRules: {
        account: [{ required: true, validator: this.accountValid, trigger: 'blur' }]
      }
    }
  },
  computed: {
    accountType () {
      return this.isEmail ? 'email' : 'phone'
    }
  },
  props: ['pageFlag'],
  methods: {
    toggleEmail () {
      this.isEmail = !this.isEmail
      this.dataForm.account = ''
      this.$refs.dataForm.clearValidate('account')
    },
    // 返回登录模块
    backLogin () {
      this.$emit('toggleStatus', 'login')
    },
    // 手机/邮箱校验
    accountValid (rule, value, callback) {
      let typeValue = this.isEmail ? 'email' : 'phone'
      if (!valid[typeValue].rule.test(value)) {
        callback(new Error(valid[typeValue].message))
      } else {
        callback()
      }
    },
    // 输入框校验
    validPass () {
      // 手机或邮箱正则
      let { account, newPassword, captcha } = this.dataForm
      if (this.isEmail) {
        if (!valid.email.rule.test(account)) {
          this.$message.error('Email is invalid')
          return false
        }
      } else {
        if (!valid.phone.rule.test(account)) {
          this.$message.error('Mobile number is invalid')
          return false
        }
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
    getCode () {
      this.$refs.dataForm.validateField('account', (valid) => {
        if (!valid) {
          this.sendCode({
            contact: this.dataForm.area + '-' + this.dataForm.account,
            accountType: this.accountType
          }, this.codeBtn)
        }
      })
    },
    // 重置密码
    resetPassword () {
      if (!this.validPass()) return false
      this.dataForm.accountType = this.accountType
      let tempData = { ...this.dataForm }
      if (this.accountType === 'phone') {
        let { area, account } = this.dataForm
        tempData.account = area + '-' + account
      }
      this.$post({
        url: '/v0/user/reset',
        data: {
          ...tempData,
          newPassword: md5(tempData.newPassword)
        },
        success: res => {
          this.$message.success('Reset successful')
          this.backLogin()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import './public';
  .user-agree {
    color: #d40e0e;
  }
  .agree-text {
    color: #4c4c4c;
  }
</style>
