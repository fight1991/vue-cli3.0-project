<template>
  <div class="container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 头部区域 -->
      <div class="header flex-between">
        <div class="header-left flex-start">
          <img :src="logoImg" alt="">
          <span class="company-name">FoxEss</span>
        </div>
        <div class="header-right flex-start">
          <div class="join-us">JOIN US</div>
          <div class="item" @click="endCustomerVisible=true">User</div>
          <el-dropdown @command="installerClick">
            <div class="item">Installer</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="create">Add</el-dropdown-item>
              <el-dropdown-item command="join">Join</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="agentClick">
            <div class="item">Agent</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="create">Add</el-dropdown-item>
              <el-dropdown-item command="join">Join</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 轮播区域 -->
      <div class="banner" style="height:1000px">
        <el-carousel :interval="3000" :autoplay="false">
          <el-carousel-item v-for="item in bannerList" :key="'item'+item">
            <img :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div class="banxin"></div>
      </div>
      <!-- 底部区域 -->
      <div class="footer">
      </div>
    </el-scrollbar>

    <!-- 终端用户注册dialog -->
    <create-end-customer :visible.sync="endCustomerVisible"></create-end-customer>
    <!-- 新建安装商dialog -->
    <create-installer :visible.sync="createInstallVisible"></create-installer>
    <!-- 加入安装商dialog -->
    <join-installer :visible.sync="joinInstallVisible"></join-installer>
    <!-- 新建代理商dialog -->
    <create-agent :visible.sync="createAgentVisible"></create-agent>
    <!-- 加入代理商dialog -->
    <join-agent :visible.sync="joinAgentVisible"></join-agent>
  </div>
</template>

<script>
import createEndCustomer from './createEndCustomer'
import createInstaller from './createInstaller'
import joinInstaller from './joinInstaller'
import createAgent from './createAgent'
import joinAgent from './joinAgent'
export default {
  components: {
    createEndCustomer,
    createInstaller,
    joinInstaller,
    createAgent,
    joinAgent
  },
  data () {
    return {
      endCustomerVisible: false,
      createInstallVisible: false,
      joinInstallVisible: false,
      createAgentVisible: false,
      joinAgentVisible: false,
      logoImg: require('@/assets/logo.png'),
      bannerList: [require('@/assets/banner-test.jpg'), require('@/assets/banner-test2.jpg')]
    }
  },
  methods: {
    installerClick (command) {
      this[command + 'InstallVisible'] = true
    },
    agentClick (command) {
      this[command + 'AgentVisible'] = true
    }
  }
}
</script>

<style lang="less" scoped>
.banner img {
  width: 100%;
}
.container {
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .header {
    background-color: #ebebeb;
    padding: 0 40px;
    border-bottom: 1px solid #ccc;
  }
  .company-name {
    margin-left: 10px;
    font-size: 18px;
  }
  .join-us {
    padding: 0 15px;
    margin-right: 5px;
    border-right: 2px solid @sys-main-header;
  }
  .header-right {
    padding-right: 40px;
    .item {
      line-height: 48px;
      cursor: pointer;
      padding: 0 10px;
      &:hover {
        color: @sys-main-header;
        background-color: #feefeb;
        box-shadow: 0px 0px 1px 0px #ccc;
      }
    }
  }
}
</style>
