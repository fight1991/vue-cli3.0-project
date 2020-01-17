<template>
  <div class="container">
    <el-container class="outside-container">
      <el-header class="main-header" height="50px">
        <layout-header></layout-header>
      </el-header>
      <el-container class="main-container">
        <el-aside class="main-aside" width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutHeader from './layout/header'
export default {
  components: {
    layoutHeader
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.outside-container {
  height: 100%;
}
.main-header {
  background-color: @sys-main-bg;
}
.main-container {
  height: 100%;
}
.main-aside {
  border-right: 1px solid #ccc;
  height: 100%;
}
</style>
