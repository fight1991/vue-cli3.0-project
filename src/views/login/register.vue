<template>
  <div class="login login-register">
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="user">
              <el-popover
                :visible-arrow="false"
                trigger="focus"
                popper-class="login-pop"
                width="200"
                placement="right-end">
                <span>Make sure it starts width a letter and it's at least 6 characters including a number and a letter</span>
                <el-input slot="reference" v-model="dataForm.user" placeholder="Username"></el-input>
              </el-popover>
            </el-form-item>
          </el-col>
           <el-col :span="24" class="password">
            <el-form-item prop="password">
              <el-popover
                :visible-arrow="false"
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
          <el-col :span="24" v-if="isEmail">
            <el-form-item prop="contact">
              <el-input v-model="dataForm.contact" placeholder="Email address"></el-input>
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
            <el-col :span="18" >
              <el-form-item prop="contact">
                <el-input v-model="dataForm.contact" placeholder="Mobile number"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="24" class="code-area">
            <el-form-item prop="captcha">
              <el-input v-model="dataForm.captcha" :maxlength="4" placeholder="4-digit verification code">
                <el-button slot="append" @click="getCode">{{codeText}}</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="find-btn" type="flex" justify="space-between">
      <el-checkbox v-model="isAgreen">
        <span class="agree-text f12">Agree</span>
        <span class="user-agree f12">《Terms of Service》</span>
      </el-checkbox>
      <span class="f12" v-if="isEmail" @click="toggleClick">Mobile number sign up</span>
      <span class="f12" v-else @click="toggleClick">Email sign up</span>
    </el-row>
    <!-- 注册按钮 -->
    <el-row class="login-btn">
      <el-button :disabled="!isAgreen" class="login-click" type="primary" @click="goRegister">Sign up</el-button>
    </el-row>
    <el-row class="f12" type="flex" justify="end">
      <span @click="backLogin">Back sign in</span>
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
      isEmail: false,
      areaNum: [ { num: '+86', contry: 'china' } ],
      dataForm: {
        area: '+86',
        user: '', // 用户名
        password: '', // 密码
        contactType: '', // 类型 email, phone
        contact: '', // 联系方式
        captcha: '', // 验证码
        confirmWord: '' // 密码确认
      },
      loginRules: {
        user: [{ required: true, pattern: valid.user.rule, message: valid.user.message, trigger: 'blur' }],
        password: [{ required: true, pattern: valid.password.rule, message: valid.password.message, trigger: 'blur' }],
        contact: [{ required: true, validator: this.contactValid, trigger: 'blur' }],
        captcha: [{ required: true, pattern: valid.code.rule, message: valid.code.message, trigger: 'blur' }]
      }
    }
  },
  props: ['pageFlag'],
  computed: {
    contactType () {
      return this.isEmail ? 'email' : 'phone'
    }
  },
  methods: {
    toggleClick () {
      this.isEmail = !this.isEmail
      this.$refs.dataForm.clearValidate('contact')
      this.dataForm.contact = ''
    },
    // 返回登录模块
    backLogin () {
      this.$emit('toggleStatus', 'login')
    },
    // 手机/邮箱校验
    contactValid (rule, value, callback) {
      let typeValue = this.isEmail ? 'email' : 'phone'
      if (!valid[typeValue].rule.test(value)) {
        callback(new Error(valid[typeValue].message))
      } else {
        callback()
      }
    },
    showPw (type) {
      this[type] = this[type] === 'text' ? 'password' : 'text'
    },
    // 获取验证码
    getCode () {
      this.$refs.dataForm.validateField('contact', (valid) => {
        if (!valid) {
          this.sendCode({
            contact: this.dataForm.area + '-' + this.dataForm.contact,
            contactType: this.contactType
          }, this.codeBtn)
        }
      })
    },
    // 注册按钮
    goRegister () {
      // 自定义表单校验
      let isPass = true
      this.$refs.dataForm.validate(valid => (isPass = valid))
      if (!isPass) return
      this.dataForm.contactType = this.contactType
      let tempData = { ...this.dataForm }
      if (this.contactType === 'phone') {
        let { area, contact } = this.dataForm
        tempData.contact = area + '-' + contact
      }
      this.$post({
        url: '/v0/user/register',
        data: {
          ...tempData,
          password: md5(tempData.password)
        },
        success: res => {
          // 1.注册成功, 调用自动登录接口 ? 2. 跳转到产品介绍页面
          // this.$router.push('/product/index')
          this.$message.success('sign up success')
          this.backLogin()
        },
        other: res => {
          // 41801 用户名/邮箱/手机号已被注册
          if (res.errno === 41801) {
            this.dataForm.account = ''
            this.dataForm.contact = ''
          }
          // 若验证码注册则 41900 41901 41902 验证码已失效, 验证码错误 验证码不存在
          if ([41900, 41901, 41902].includes(res.errno)) {
            this.dataForm.captcha = ''
            this.clearTime()
          }
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
</style>
