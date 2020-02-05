<template>
  <div class="tab-container">
    <el-tabs v-model="activeTabName" type="card">
      <template v-for="(item, index) in tabList">
        <el-tab-pane
          :closable="index > 1"
          :key="item.tabId"
          :label="item.title"
          :name="item.tabId">
          <el-scrollbar wrap-class="tab-scrollbar-wrapper">
            <component :is="item.components[item.components.length-1]['dom']"></component>
          </el-scrollbar>
        </el-tab-pane>
      </template>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeTabName: 'tab-index'
    }
  },
  computed: {
    ...mapState({
      tabList: (state) => state.tab.tabList
    })
  }
}
</script>
<style lang="less" scoped>
// .tab-content {
//   height: 100%;
//   width: calc(100% + 17px);
//   overflow-y: scroll;
//   overflow-x: auto;
// }
.el-scrollbar {
  height: 100%;
}
.test {
  height: 1000px;
}
</style>
