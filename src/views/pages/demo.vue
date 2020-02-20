<template>
  <div style="height: 1000px;background-color:#fff;border-top:1px solid transparent">
    <p>{{$route.meta.title || ''}}</p>
    <p>{{$t('login')}}</p>
    <el-button @click="toggleLang">切换语言</el-button>
    <el-col :span="24" align="right">
      <!-- <page-box :pageSizes="[10, 20, 50, 100, 200, 500]" :pagination='paginationInit' @change="getAccountList"></page-box> -->
    </el-col>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {}
  },
  created () {

  },
  methods: {
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
