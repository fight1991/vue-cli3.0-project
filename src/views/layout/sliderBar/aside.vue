<template>
<div class="sidebar-container">
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu>
      <sidebar-item v-for="(menu, index) in menuList" :key="'menu'+index" :menuItem="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</div>
</template>

<script>
import navMenu from './asideNav'
import sidebarItem from './sidebarItem'
console.log(navMenu)
export default {
  components: {
    sidebarItem
  },
  data () {
    return {
      menuList: navMenu
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  .el-scrollbar {
    height: 100%;
  }
}
</style>
