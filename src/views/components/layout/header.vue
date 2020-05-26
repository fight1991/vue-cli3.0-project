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
          <i class="user-logo iconfont icon-user"></i>
          <span>{{userInfo.user || ''}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="reset">{{$t('login.resetPw')}}</el-dropdown-item>
          <el-dropdown-item command="logout" divided>{{$t('login.goOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <span class="info"><i class="iconfont icon-info"></i></span> -->
    </div>
  </div>
</template>

<script>
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
  created () {},
  methods: {
    toggleLang (lang) {
      this.$i18n.locale = lang
      this.lang = lang === 'en' ? 'English' : '中文'
      this.$store.commit('toggleLang', lang)
      document.title = this.$t('navBar.' + this.$route.meta.title)
    },
    userOption (op) {
      if (op === 'logout') {
        this.logout()
      } else {
        this.goResetPw()
      }
    },
    // 修改密码
    goResetPw () {
      let { href } = this.$router.resolve({
        path: '/login?type=reset'
      })
      window.open(href, '_self')
    },
    // 注销登录
    async logout () {
      let res = await this.$confirm(this.$t('login.tips3'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => true).catch(() => false)
      if (!res) return
      this.$post({
        url: '/v0/user/logout',
        success: () => {
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
