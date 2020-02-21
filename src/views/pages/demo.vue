<template>
  <div style="height: 1000px;background-color:#fff;border-top:1px solid transparent">
    <p>{{$route.meta.title || ''}}</p>
    <el-date-picker
      size="mini"
      v-model="value2"
      align="right"
      type="date"
      :placeholder="$t('chooseDate')">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value2: ''
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
