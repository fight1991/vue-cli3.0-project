<template>
  <div>
    <el-container>
      <el-header class="main-header">头部</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.main-header {
  background-color: @sys-main-bg;
}
</style>
