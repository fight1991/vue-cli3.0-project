<template>
  <div class="login-container">
    <div class="header">哈哈</div>
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
      isLogin: 'login' // 登录还是注册
    }
  },
  methods: {
    // 切换登录还是注册
    toggleStatus (typeStatus) {
      this.isLogin = typeStatus.type
      this.pageFlag = typeStatus.page
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
  .component-fade-enter-active, .component-fade-leave-active {
    // transition: opacity .2s linear;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    // opacity: 0;
  }
</style>
