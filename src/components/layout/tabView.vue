<template>
  <div class="tab-container">
    <el-tabs v-model="activeTabName" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <template v-for="(item, index) in tabList">
        <el-tab-pane
          :closable="index > 0"
          :key="item.tabId"
          :label="item.title"
          :name="item.tabId">
          <el-scrollbar wrap-class="tab-scrollbar-wrapper">
            <component :is="item.components[item.components.length-1]['dom']"></component>
          </el-scrollbar>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="tab-right">
      <el-dropdown trigger="click" class="demp">
        <span class="el-dropdown-link">
          关闭<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭全部</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeTabName: this.$store.state.tab.currentTabName
    }
  },
  watch: {
    '$store.state.tab.currentTabName': function (res) {
      this.activeTabName = res
    }
  },
  computed: {
    ...mapState({
      tabList: (state) => state.tab.tabList
    })
  },
  methods: {
    tabClick () {
      this.$store.commit('setActiveIndex', this.activeTabName)
    },
    removeTab () {
      this.$store.commit('removeTab', this.activeTabName)
    }
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
.tab-container {
  position: relative;
  .tab-right {
    width: 60px;
    border-left: 1px solid #E4E7ED;
    line-height: 40px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.el-scrollbar {
  height: 100%;
}
.test {
  height: 1000px;
}
</style>
