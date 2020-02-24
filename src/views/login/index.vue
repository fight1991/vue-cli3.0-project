<template>
  <div class="login-container">
    <div class="header">
      <el-dropdown
        @command="toggleLang"
        placement="top-start">
        <span class="lang">
          <i class="iconfont icon-yuyan"></i>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en" divided>English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        placement="top-start">
        <span class="app-downLoad">
          <i class="iconfont icon-app"></i>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>app下载</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">
      <transition name="component-fade" mode="out-in">
        <component :is="isLogin" @toggleStatus="toggleStatus" :pageFlag="pageFlag"></component>
        <!-- <login v-if="isLogin" @toggleStatus="toggleStatus"></login>
        <register v-else @toggleStatus="toggleStatus"></register> -->
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import login from './login'
import register from './register'
export default {
  components: {
    login,
    register
  },
  data () {
    return {
      pageFlag: '', // 注册和密码公用页面
      isLogin: 'login', // 登录还是注册
      lang: '中文'
    }
  },
  methods: {
    // 切换登录还是注册
    toggleStatus (typeStatus) {
      this.isLogin = typeStatus.type
      this.pageFlag = typeStatus.page
    },
    toggleLang (lang) {
      Vue.config.lang = lang
      this.lang = lang === 'en' ? 'English' : '中文'
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
    background-size: cover;
    .header {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px;
      font-size: 22px;
      .el-dropdown {
        color: #fff;
      }
      .app-downLoad, .lang {
        cursor: pointer;
      }
      .lang {
        margin-right: 10px;
      }
    }
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
  .component-fade-enter-active, .component-fade-leave-active {
    // transition: opacity .2s linear;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    // opacity: 0;
  }
</style>
