<template>
  <div class="head-container">
    <div class="logo fl">
      <img :src="logoSrc">
      <span>{{$t('monitor')}}</span>
    </div>
    <div class="login fr">
      <el-dropdown
        trigger="click"
        @command="toggleLang"
        placement="top-start">
        <span class="lang">
          <span>{{lang}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en" divided>English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        @command="userOption"
        trigger="click"
        placement="top-start">
        <span class="user-name">
          <i class="user-logo el-icon-user-solid"></i>
          <span>{{userInfo.name || ''}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item command="logout" divided @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="info"><i class="el-icon-message-solid"></i></span>
    </div>
  </div>
</template>

<script>
import storage from '@/util/storage'
import { mapState } from 'vuex'
export default {
  name: 'layout-header',
  data () {
    return {
      lang: '中文',
      logoSrc: require('@/assets/logo.png')
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  created () {
    console.log(this.userInfo)
  },
  methods: {
    toggleLang (lang) {
      this.$switchLang(lang)
      this.lang = lang === 'en' ? 'English' : '中文'
    },
    userOption (op) {
      if (op === 'logout') {
        this.logout()
      }
    },
    // 注销登录
    async logout () {
      let res = await this.$confirm('Are you sure you want to log out?', 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => true).catch(() => false)
      if (!res) return
      this.$post({
        url: '/user/logout',
        success: () => {
          storage.removeLoginInfo()
          let { href } = this.$router.resolve({
            path: '/login'
          })
          window.open(href, '_self')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.head-container {
  width: 100%;
  height: 100%;
}
.login, .logo {
  height: 100%;
  display: flex;
  align-items: center;
}
.login {
  color: #fff;
  .el-dropdown {
    color: #fff;
  }
  .el-popper[x-placement^=bottom] .popper__arrow {
    display: none;
  }
  .lang, .user-name {
    cursor: pointer;
    margin-right: 10px;
  }
  .user-logo {
    padding-right: 5px;
  }
  .info {
    padding: 0 20px;
  }
}
.logo {
  height: 100%;
  img {
    width: 40px;
  }
  span {
    color: #fff;
    margin-left: 20px;
    font-size: 16px;
  }
}
</style>
