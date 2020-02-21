<template>
  <div class="login-container">
    <div class="header">哈哈</div>
    <div class="content">
      <div class="login">
        <div class="tab-header">
          <div @click="toggleClick('code')" :class="{'tab-item':true, 'active': isCode}">验证码登录</div>
          <div @click="toggleClick('pw')" :class="{'tab-item':true, 'active': isPw}">密码登录</div>
        </div>
        <div class="form">
          <el-form ref="loginForm" :model="loginForm" label-width="0px" :rules="loginRules">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="isCode">
                <el-form-item prop="code">
                  <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="isPw">
                <el-form-item prop="pw">
                  <el-input v-model="loginForm.passWord" placeholder="密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-row class="find-btn" type="flex" justify="space-between">
          <span>密码找回</span>
          <span>立即注册</span>
        </el-row>
        <el-row class="login-btn">
          <el-button class="login-click" type="primary" @click="goLogin">登录</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginType: 'code',
      isCode: true,
      isPw: false,
      isValid: false, // 校验节流阀
      loginForm: {
        mobile: '',
        code: '',
        passWord: ''
      },
      loginRules: {
        mobile: [{ required: true, validator: this.validPass, message: '请输入手机号', trigger: 'blur' }],
        code: [{ required: true, validator: this.validPass, message: '请输入验证码', trigger: 'blur' }],
        pw: [{ required: true, validator: this.validPass, message: '请输入密码', trigger: 'blur' }]
      }
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
    validPass (rule, value, callback) {
      if (!value) {
        if (this.isValid) return false
        this.isValid = true
        this.$message({
          type: 'warning',
          message: rule.message,
          onClose: () => {
            this.isValid = false
          }
        })
      }
      callback()
    },
    // 登录按钮
    goLogin () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return false
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: url("../../assets/login-bg.jpg") no-repeat center;
    .content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login {
      width: 400px;
      box-sizing: border-box;
      background-color: #fff;
      padding: 20px;
      color: #999;
      .form {
        margin-top: 20px;
        .el-form-item {
          margin-bottom: 18px;
        }
      }
    }
    .tab-header {
      display: flex;
      // border-bottom: 1px solid #d8d8d8;
      .tab-item {
        user-select: none;
        cursor: pointer;
        width: 50%;
        text-align: center;
        font-size: 16px;
        line-height: 38px;
        height: 38px;
        border-bottom: 2px solid #d8d8d8;
      }
      .active {
        border-bottom: 2px solid @sys-main-header;
      }
    }
    .find-btn {
      color: #4c4c4c;
      span {
        &:hover {
          color: @sys-main-header;
        }
        cursor: pointer;
      }
    }
  }
  .login-btn {
    padding: 18px 0 10px;
  }
</style>
