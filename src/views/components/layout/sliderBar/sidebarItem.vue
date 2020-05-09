<template>
  <div>
    <template v-if="!menuItem.children || menuItem.children.length === 0">
      <el-menu-item :index="menuItem.path">
        <i v-if="menuItem.icon" :class="'iconfont '+ menuItem.icon"></i>
        <span slot="title">{{$t('navBar.'+menuItem.meta.title) || ''}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="menuItem.path" popper-class="sidebar-pop">
      <template slot="title" >
        <i v-if="menuItem.icon" :class="'iconfont '+ menuItem.icon"></i>
        <span slot="title">{{$t('navBar.'+menuItem.meta.title) || ''}}</span>
      </template>

      <template v-for="child in menuItem.children">
        <!-- 递归 -->
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :menuItem="child"
          :key="child.path"/>
        <el-menu-item v-else :key="child.path" :index="child.path">
          <i v-if="child.icon" :class="'iconfont '+ child.icon"></i>
          <span slot="title">{{$t('navBar.'+child.meta.title) || ''}}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'sidebarItem',
  data () {
    return {

    }
  },
  props: {
    menuItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    testaa (child) {
      console.log(this.$store)
      this.$store.commit('addTab', {
        tabId: child.tabId,
        title: child.title,
        components: [{
          dom: child.tabId
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px;
  font-size: 18px;
}
</style>
