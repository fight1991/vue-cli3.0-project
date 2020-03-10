<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import storage from '@/util/storage'
export default {
  data () {
    return {}
  },
  created () {
    if (this.$route.meta.requiresAuth !== false) {
      this.getUserInfo()
      this.getAccessStatus()
    }
  },
  methods: {
    // 用户信息查询
    async getUserInfo () {
      let { result } = await this.$axios({ url: '/user/info' })
      if (result) {
        this.$store.commit('setUserInfo', result)
        storage.setUserInfo(result)
      }
    },
    // 权限查询
    async getAccessStatus () {
      let { result } = await this.$axios({ url: '/user/access' })
      if (result) {
        this.$store.commit('setAccess', result.access)
      }
    }
  }
}
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  color: #4c4c4c;
}
</style>
