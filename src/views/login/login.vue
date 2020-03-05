<template>
  <div class="login">
    <!-- <div class="tab-header">
      <div @click="toggleClick('code')" :class="{'tab-item':true, 'active': isCode}">验证码登录</div>
      <div @click="toggleClick('pw')" :class="{'tab-item':true, 'active': isPw}">密码登录</div>
    </div> -->
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" label-width="0px" :rules="loginRules">
        <el-row>
          <el-col :span="24" v-if="isEmail">
            <el-form-item prop="mobile">
              <el-input v-model="dataForm.account" placeholder="Email address or Username"></el-input>
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
              <el-form-item prop="mobile">
                <el-input v-model="dataForm.account" placeholder="Mobile number"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <!-- <el-col :span="24" v-if="isCode">
            <el-form-item prop="code">
              <el-input v-model="dataForm.code" placeholder="验证码"></el-input>
              <span class="get-code" @click="getCode">{{codeText}}</span>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" v-if="isPw" class="password">
            <el-form-item prop="pw">
              <el-input :type="pwType" v-model="dataForm.password" placeholder="Password" @keyup.native.enter="goLogin">
                <i slot="suffix" @click="showPw" :class="pwType === 'password'?'iconfont icon-hide':'iconfont icon-show'"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="forgot-pw" align="right">
            <span @click="registerBtn('resetPw')">Forgot password?</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="login-btn">
      <el-button class="login-click" type="primary" @click="goLogin">Sign in</el-button>
    </el-row>
    <el-row class="find-btn" type="flex" justify="space-between">
      <span v-if="isEmail" @click="isEmail=false">Mobile number sign in</span>
      <span v-else @click="isEmail=true">Email sign in</span>
      <span @click="registerBtn('register')">Sign up</span>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5'
import mixins from './mixin'
import valid from './validate'
import storage from '@/util/storage'
export default {
  name: 'login',
  mixins: [mixins],
  data () {
    return {
      pwType: 'password',
      loginType: 'code',
      isCode: false,
      isPw: true,
      isEmail: false,
      areaNum: [ { num: '+86', contry: 'china' } ],
      dataForm: {
        area: '+86',
        account: '',
        password: '',
        accountType: '' //  user, email, phone
      },
      loginRules: {}
    }
  },
  created () {
    if (this.isEmail) {
      this.dataForm.account = storage.getUserInfo('username')
    } else {
      let phone = storage.getUserInfo('phone')
      if (!phone) return
      this.dataForm.account = phone.split('-')[1]
      this.dataForm.area = phone.split('-')[0]
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
        let erroMsg = this.isEmail ? 'Username or Email is invalid' : 'Mobile number is invalid'
        this.$message.error(erroMsg)
        return false
      }
      if (!valid.password.rule.test(password)) {
        this.$message.error(valid.password.message)
        return false
      }
      return true
    },
    showPw () {
      this.pwType = this.pwType === 'text' ? 'password' : 'text'
    },
    // 打开注册组件/密码找回
    registerBtn (type) {
      this.clearTime()
      this.$emit('toggleStatus', type)
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
        success: ({ result }) => {
          storage.setToken(result.token)
          // 存储用户信息
          this.getUserInfo()
          let path = '/'
          if (result.access === 0) { // 游客
            path = '/product/index'
          } else {
            path = this.$route.query.redirect || '/dataView'
          }
          this.$router.push(path)
        },
        other: res => {
          // 41805 账号不存在 打开注册页面
          // 41807 用户名或密码错误
          this.$message.warning(res.errno)
          if (res.errno === 41805) {
            this.registerBtn('register')
            return false
          }
          // 若验证码登录则 41900 41901 41902验证码已失效, 验证码错误 验证码不存在
        }
      })
    },
    // 获取用户信息
    async getUserInfo () {
      let { result } = await this.$axios({ url: '/user/info' })
      if (result) {
        this.$store.commit('setUserInfo', result)
        storage.setUserInfo(result)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import './public';
  .find-btn {
    color: #4c4c4c;
    font-size: 12px;
  }
  .phone-area {
    border-right: none;
  }
</style>
