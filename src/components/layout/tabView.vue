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
.el-scrollbar {
  height: 100%;
}
.test {
  height: 1000px;
}
</style>
