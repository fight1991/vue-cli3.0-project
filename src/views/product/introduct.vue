<template>
  <div class="container">
    <el-scrollbar wrap-class="tab-scrollbar-wrapper">
      <!-- 头部区域 -->
      <div class="header flex-between">
        <div class="header-left flex-start">
          <img :src="logoImg" alt="">
          <span class="company-name">FoxEss</span>
        </div>
        <div class="header-right flex-start">
          <div class="join-us">JOIN US</div>
          <div class="item" @click="endVisible=true">The end customer</div>
          <el-dropdown @command="installerClick">
            <div class="item">Installer</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">Add</el-dropdown-item>
              <el-dropdown-item command="join">Join</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="agentClick">
            <div class="item">Agent</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">Add</el-dropdown-item>
              <el-dropdown-item command="join">Join</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 轮播区域 -->
      <div class="banner" style="height:1000px"></div>
      <!-- 内容区域 -->
      <div class="content">
        <div class="banxin"></div>
      </div>
      <!-- 底部区域 -->
      <div class="footer"></div>
    </el-scrollbar>
    <!-- 终端用户注册 -->
    <el-dialog
      class="sys-dialog"
      title="End Customer Register"
      :visible.sync="endVisible"
      width="700px">
      <div class="content">
        <end-register @close:dialog="closeDialog('endVisible')"></end-register>
      </div>
      <div class="foot-btn flex-center">
        <el-button size="mini">取消</el-button>
        <el-button size="mini" type="primary">注册</el-button>
      </div>
    </el-dialog>
    <!-- 新建安装商 -->
    <el-dialog
      title="installer Register"
      :visible.sync="addInstallVisible"
      width="600px">
      <add-installer @close:dialog="closeDialog('addInstallVisible')"></add-installer>
    </el-dialog>
    <!-- 加入安装商 -->
    <el-dialog
      title="Join Installer"
      :visible.sync="joinInstallVisible"
      width="600px">
      <join-installer @close:dialog="closeDialog('joinInstallVisible')"></join-installer>
    </el-dialog>
    <!-- 新建代理商 -->
    <el-dialog
      title="Agent Register"
      :visible.sync="addAgentVisible"
      width="600px">
      <add-agent @close:dialog="closeDialog('addAgentVisible')"></add-agent>
    </el-dialog>
    <!-- 加入代理商 -->
    <el-dialog
      title="Join Agent"
      :visible.sync="joinAgentVisible"
      width="600px">
      <join-agent @close:dialog="closeDialog('joinAgentVisible')"></join-agent>
    </el-dialog>
  </div>
</template>

<script>
import endRegister from './endRegister'
import addInstaller from './addInstaller'
import joinInstaller from './joinInstaller'
import addAgent from './addAgent'
import joinAgent from './joinAgent'
export default {
  components: {
    endRegister,
    addInstaller,
    joinInstaller,
    addAgent,
    joinAgent
  },
  data () {
    return {
      endVisible: false,
      addInstallVisible: false,
      joinInstallVisible: false,
      addAgentVisible: false,
      joinAgentVisible: false,
      logoImg: require('@/assets/logo.png')
    }
  },
  methods: {
    closeDialog (dialogType) {
      this[dialogType] = false
    },
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
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .header {
    background-color: #ebebeb;
    padding: 0 40px;
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
