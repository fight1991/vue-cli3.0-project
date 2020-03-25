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
          <el-dropdown-item>app下载</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">
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
    display: flex;
    flex-direction: column;
    height: 100%;
    background-size: cover;
    height: 600px;
    background-color: #00a0e9;
    position: relative;
    transform: translateY(20%);
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
      background: url("../../assets/login-bg.jpg") no-repeat center;
      // justify-content: center;
      align-items: center;
      transform: translateY(-6%);
    }
    .login {
      position: absolute;
      right: 20%;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%,-50%); // 会改变变换的中心值
      transform-origin: center;
      width: 470px;
      box-sizing: border-box;
      // background-color:rgba(125, 172, 200, 0.7);
      background-color: #99D9F6;
      border-radius: 6px;
      padding: 40px;
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
      color: #fff;
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
