<template>
<div class="sidebar-container">
  <span class="pull-button left" @click="toggleMenu" v-if="!$store.state.collapse">
    <i class="el-icon-arrow-left"></i>
  </span>
  <span class="pull-button right" @click="toggleMenu" v-else>
    <i class="el-icon-arrow-right"></i>
  </span>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      router
      text-color="#fff"
      :collapse="$store.state.collapse">
      <sidebar-item v-for="(menu, index) in menuList" :key="'menu'+index" :menuItem="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</div>
</template>

<script>
import navMenu from '@/views/pages/index.js'
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
  },
  computed: {

  },
  methods: {
    toggleMenu () {
      this.$store.commit('changeCollapse')
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  position: relative;
  .el-scrollbar {
    height: 100%;
  }
  .pull-button {
    cursor: pointer;
    border-radius: 5px 0 0 5px;
    background-color: @sys-main-header;
    width: 10px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(0, -50%);
    color: #fff;
    z-index: 999;
  }
  .pull-button.right {
    border-radius: 0 5px 5px 0;
    transform: translate(100%, -50%);
    right: 1px;
  }
}
</style>
