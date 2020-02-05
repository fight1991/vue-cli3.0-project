<template>
<div class="sidebar-container">
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu @select="selectMenuItem" :default-active="activeIndex">
      <sidebar-item v-for="(menu, index) in menuList" :key="'menu'+index" :menuItem="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</div>
</template>

<script>
import navMenu from './asideNav'
import sidebarItem from './sidebarItem'
import { mapState } from 'vuex'
console.log(navMenu)
export default {
  components: {
    sidebarItem
  },
  data () {
    return {
      menuList: navMenu
    }
  },
  computed: {
    ...mapState({
      activeIndex: state => state.tab.activeIndex
    })
  },
  methods: {
    selectMenuItem (index) {
      console.log(index)
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
