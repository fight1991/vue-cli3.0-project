<template>
  <div class="tab-container">
    <el-tabs v-model="activeTabName" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <template v-for="(item, index) in tabList">
        <el-tab-pane
          v-if="item.isShow"
          :closable="index > 0"
          :key="item.tabId"
          :label="item.title"
          :name="item.tabId">
          <span slot="label" v-if="index==0"><i class="iconfont icon-home"></i></span>
          <el-scrollbar wrap-class="tab-scrollbar-wrapper" v-loading="$store.state.loading">
            <div class="tab-content" v-if="isReLoad">
              <component :is="item.components[item.components.length-1]"></component>
              <div v-show="index>0" class="copy-right" v-text="rightText"></div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="tab-right">
      <el-dropdown trigger="click" @command="closeTab">
        <span class="el-dropdown-link">
          <i class="iconfont icon-caidan"></i>
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
      isReLoad: true,
      rightText: 'Copyrights © 2010-2020'
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
      // if (tabInfo.name === 'tab-index') {
      //   this.$store.commit('setCurrentTab', 'tab-index')
      //   return
      // }
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
.el-dropdown-link i{
  cursor: pointer;
  font-size: 20px;
  line-height: 35px;
}
.el-icon-s-home {
  font-size: 20px;
  line-height: 30px;
}
.tab-container {
  position: relative;
  .tab-right {
    width: 40px;
    border-left: 1px solid #E4E7ED;
    line-height: 32px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.test {
  height: 1000px;
}
.copy-right {
  font-size: 12px;
  color: #ccc;
  margin-top: 20px;
  text-align: center;

}
</style>
