<template>
  <div class="tab-container">
    <el-tabs v-model="$store.state.tab.currentTab" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <template v-for="(item, index) in tabList">
        <el-tab-pane
          :closable="index > 0"
          :key="item.tabId"
          :label="$t('navBar.'+item.title)"
          :name="item.tabId">
          <span slot="label" v-if="index==0"><i class="iconfont icon-home"></i></span>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="tab-right">
      <el-dropdown trigger="click" @command="closeTab">
        <span class="el-dropdown-link">
          <i class="iconfont icon-caidan"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeAllTab">{{$t('common.closeAll')}}</el-dropdown-item>
          <el-dropdown-item command="closeOtherTab">{{$t('common.closeOther')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-scrollbar wrap-class="tab-scrollbar-wrapper" v-loading="$store.state.loading">
      <router-view></router-view>
      <div class="copy-right" v-text="rightText"></div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'tab-view',
  data () {
    return {
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
      tabList: state => state.tab.tabList
    })
  },
  methods: {
    reload () {
      this.isReLoad = false
      this.$nextTick(() => {
        this.isReLoad = true
      })
    },
    tabClick (tabInfo) {
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
      this.$store.dispatch(type)
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
