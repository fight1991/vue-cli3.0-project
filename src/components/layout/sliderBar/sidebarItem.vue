<template>
  <div v-if="menuItem.children">
    <template v-if="menuItem.children.length === 0">
      <el-menu-item :index="menuItem.tabId">
        <i class="el-icon-menu"></i>
        {{menuItem.title}}
      </el-menu-item>
    </template>
    <el-submenu v-else :index="menuItem.menuId">
      <template slot="title" >
        <i class="el-icon-menu"></i>
        {{menuItem.title}}
      </template>

      <template v-for="child in menuItem.children">
        <!-- 递归 -->
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :menuItem="child"
          :key="child.menuId"/>
        <el-menu-item v-else :key="child.tabId" :index="child.tabId" @click="testaa(child)">
          <i class="el-icon-location"></i>
          {{child.title}}
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

</style>
