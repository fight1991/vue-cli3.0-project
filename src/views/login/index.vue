<template>
  <div class="login-container" v-loading="$store.state.loading">
    <div class="header">
      <el-dropdown
        @command="toggleLang"
        placement="top-start">
        <span class="lang flex-center">
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
        <span class="app-downLoad flex-center">
          <i class="iconfont icon-app"></i>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>app-downLoad</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">
      <div class="bg"><img src="../../assets/login-bg.png" alt=""></div>
      <transition name="zoom">
        <keep-alive>
          <component :is="pageFlag" @toggleStatus="toggleStatus"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import login from './login'
import register from './register'
import resetPw from './resetPw'
export default {
  components: {
    login,
    register,
    resetPw
  },
  data () {
    return {
      pageFlag: 'login', // 注册和密码公用页面
      lang: '中文'
    }
  },
  methods: {
    // 切换登录还是注册
    toggleStatus (typeStatus) {
      this.pageFlag = typeStatus
    },
    toggleLang (lang) {
      this.$switchLang(lang)
      this.lang = lang === 'en' ? 'English' : '中文'
    }
  }
}
</script>
<style lang="less" scoped>
  .login-container {
    min-width: 900px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-size: cover;
    background: linear-gradient(to top right, #1174b6, #2398dd);
    position: relative;
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
      .iconfont {
        font-size: 32px;
      }
    }
    .content {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      .bg {
        animation: drop 3s ease-in-out infinite;
        z-index: 5;
        position: absolute;
        left: 10%;
        width: 500px;
        img {
          width: 100%;
        }
      }
    }
    .login {
      z-index: 6;
      position: absolute;
      right: 10%;
      // transform: translate(-50%,-50%); // 会改变变换的中心值
      // transform-origin: center;
      width: 450px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 4px;
      padding: 25px;
      color: #999;
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
      color: #3883c2;
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
@media only screen and(max-width:1080px) {
  .login{
    width: 380px!important;
    right: 5%;
  }
  .content .bg {
    width: 360px!important;
    left: 5%!important;
  }
}
@media only screen and(min-width:1080px) {
  .login{
    width: 480px!important;
    right: 5%!important;
  }
  .content .bg {
    width: 550px!important;
    left: 5%!important;
  }
}
@media only screen and(min-width:1400px) {
  .login{
    width: 480px!important;
    right: 10%!important;
  }
  .content .bg {
    width: 600px!important;
    left: 10%!important;
  }
}
@keyframes drop {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  to {
    opacity: 0;
  }
}
.zoom-enter-active,.zoom-leave-active {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.zoom-enter-active {
  animation-name: zoomIn;
}
.zoom-leave-active {
  animation-name: zoomOut;
}
</style>
