<template>
  <div class="tab-container">
    <el-tabs v-model="activeTabName" closable type="card">
      <el-tab-pane
        label="哈哈"
        name="1">
        <div class="tab-content">哈哈</div>
      </el-tab-pane>
      <el-tab-pane
        label="呵呵"
        name="2">
        <div class="tab-content">呵呵</div>
      </el-tab-pane>
      <el-tab-pane
        label="啦啦"
        name="3">
        <div class="tab-content">啦啦</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeTabName: '1'
    }
  }
}
</script>
<style lang="less" scoped>
.tab-content {
  height: 100%;
  width: calc(100% + 17px);
  overflow-y: scroll;
  overflow-x: auto;
}
</style>
