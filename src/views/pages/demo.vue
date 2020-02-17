<template>
  <div style="height: 1000px;background-color:#fff">
    <p>{{$route.meta.title || ''}}</p>
    <p>{{$t('login')}}</p>
    <el-button @click="toggleLang">切换语言</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {}
  },
  created () {
    console.log('hha')
  },
  methods: {
    test () {

    },
    toggleLang () {
      if (Vue.config.lang === 'zh-cn') {
        Vue.config.lang = 'en'
      } else {
        Vue.config.lang = 'zh-cn'
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
