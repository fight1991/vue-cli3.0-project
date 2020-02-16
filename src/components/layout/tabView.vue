<template>
  <div class="tab-container">
    <el-tabs :value="activeTabName" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <template v-for="(item, index) in tabList">
        <el-tab-pane
          v-if="item.isShow"
          :closable="index > 0"
          :key="item.tabId"
          :label="item.title"
          :name="item.tabId">
          <el-scrollbar wrap-class="tab-scrollbar-wrapper" v-loading="$store.state.loading">
            <div class="tab-content" v-if="isReLoad">
              <component :is="item.components[item.components.length-1]"></component>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="tab-right">
      <el-dropdown trigger="click" @command="closeTab">
        <span class="el-dropdown-link">
          关闭<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeAllTab">关闭全部</el-dropdown-item>
          <el-dropdown-item command="closeOtherTab">关闭其他</el-dropdown-item>
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
      activeTabName: this.$store.state.tab.currentTab,
      isReLoad: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  computed: {
    ...mapState({
      tabList: (state) => state.tab.tabList
    })
  },
  watch: {
    '$store.state.tab.currentTab': function (newData) {
      this.activeTabName = newData
    }
  },
  methods: {
    reload () {
      this.isReLoad = false
      this.$nextTick(() => {
        this.isReLoad = true
      })
    },
    tabClick (tabInfo) {
      console.log(this.activeTabName)
      let { path, query, params } = this.tabList.find(v => v.tabId === tabInfo.name)
      if (path === this.$route.path) return
      // 路由跳转
      this.$router.push({
        path,
        query,
        params
      })
    },
    removeTab (name) {
      this.$store.commit('closeTab', name)
    },
    closeTab (type) {
      this.$store.commit(type)
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
