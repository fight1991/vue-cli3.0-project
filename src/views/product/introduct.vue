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
          <div class="item">The end customer</div>
          <el-dropdown>
            <div class="item">Installer</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Join</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <div class="item">Agent</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Join</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 轮播区域 -->
      <div class="banner"></div>
      <!-- 内容区域 -->
      <div class="content">
        <div class="banxin"></div>
      </div>
      <!-- 底部区域 -->
      <div class="footer"></div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoImg: require('@/assets/logo.png')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
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
    border-right: 1px solid @sys-main-header;
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
