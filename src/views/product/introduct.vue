<template>
  <div class="container">
    <!-- 头部区域 -->
    <div class="header flex-between">
      <div class="header-left flex-start">
        <img :src="logoImg" alt="">
        <span class="company-name">FoxEss</span>
      </div>
      <div class="header-right flex-start">
        <div class="join-us"><i class="iconfont icon-hand-right"></i>JOIN US</div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div class="banxin">
        <el-card shadow="always">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <span class="collape-item user"><i class="iconfont icon-end-user"></i> User</span>
            </template>
            <div class="op-click" @click="userClick"><i class="iconfont icon-new"></i> New</div>
          </el-collapse-item>
          <el-collapse-item title="Installer" name="2">
            <template slot="title">
              <span class="collape-item installer"><i class="iconfont icon-installer"></i> installer</span>
            </template>
            <div class="op-click" @click="installerClick('add')"><i class="iconfont icon-new"></i> New</div>
            <div class="op-click" @click="installerClick('join')"><i class="iconfont icon-join"></i> Join</div>
          </el-collapse-item>
          <el-collapse-item title="Agent" name="3">
            <template slot="title">
              <span class="collape-item agent"><i class="iconfont icon-agent"></i> Agent</span>
            </template>
            <div class="op-click" @click="agentClick('add')"><i class="iconfont icon-new"></i> New</div>
            <div class="op-click" @click="agentClick('join')"><i class="iconfont icon-join"></i> Join</div>
          </el-collapse-item>
        </el-collapse>
        </el-card>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <div class="rights-info">
        Copyright ©2008-2020 江苏麦田能源有限公司, All Rights Reserved.
      </div>
    </div>
    <!-- 注册或加入 -->
    <submit-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :tag="tag"
      :type="opType">
    </submit-dialog>
  </div>
</template>

<script>
import submitDialog from './submitDialog'
import { mapState } from 'vuex'
export default {
  components: {
    submitDialog
  },
  data () {
    return {
      activeName: '1',
      dialogTitle: '',
      tag: '', // user agent installer
      opType: 'add',
      dialogVisible: false,
      logoImg: require('@/assets/logo.png'),
      bannerList: [require('@/assets/banner-test.jpg'), require('@/assets/banner-test2.jpg')]
    }
  },
  computed: {
    ...mapState({
      access: state => state.access
    })
  },
  created () {

  },
  methods: {
    userClick () {
      if (this.access) {
        this.tips()
        return
      }
      this.dialogTitle = 'New User'
      this.tag = 'user'
      this.opType = 'join'
      this.dialogVisible = true
    },
    installerClick (command) {
      // if (this.access) {
      //   this.tips()
      //   return
      // }
      this.dialogTitle = command === 'add' ? 'New Installer' : 'Existing Installer'
      this.tag = 'installer'
      this.opType = command
      this.dialogVisible = true
    },
    agentClick (command) {
      if (this.access) {
        this.tips()
        return
      }
      this.dialogTitle = command === 'add' ? 'New Agent' : 'Existing Agent'
      this.tag = 'agent'
      this.opType = command
      this.dialogVisible = true
    },
    tips () {
      this.$notify({
        title: 'warning',
        message: 'You have created the organization',
        offset: 100,
        type: 'warning'
      })
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
  display: flex;
  flex-direction: column;
  // background-color: rgba(125, 172, 200);
  .header {
    width: 80%;
    margin: 0 auto;
    padding: 20px 40px;
    margin-bottom: 20px;
  }
  .header-right {
    .iconfont {
      font-size: 22px;
      margin-right: 10px;
    }
    padding-right: 15px;
    font-size: 1.5rem;
  }
  .header-left {
    img {
      width: 50px;
    }
  }
  .company-name {
    margin-left: 10px;
    font-size: 1.5rem;
  }
  .join-us {
    font-weight: bold;
    color: @sys-main-header;
  }
  .collape-item {
    font-size: 16px;
    font-weight: bold;
    .iconfont {
      font-size: 22px;
      margin-right: 5px;
    }
    &.user {
      color: #E6A23C;
    }
    &.installer {
      color: #67C23A;
    }
    &.agent {
      color: #F56C6C;
    }
  }
  .op-click {
    text-indent: 30px;
    cursor: pointer;
    padding: 8px 0;
    margin: 5px 0;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #009BE2;
    background:linear-gradient(to right,#99bae4 0% #009BE2 5%,#99bae4 80%, #fff 100%);
  }
  .content {
    flex: 1;
    .banxin {
      width: 80%;
      margin: 0 auto;
    }
  }
  .footer {
    height: 100px;
    background-color: #fff;
    text-align: center;
    .rights-info {
      padding-top: 20px;
      opacity: 0.5
    }
  }
}
</style>
