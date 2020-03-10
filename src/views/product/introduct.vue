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
          <div class="item" @click="userClick">User</div>
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
