<template>
  <error :status="status" :content="content"></error>
</template>

<script>
import error from './error'
export default {
  components: {
    error
  },
  data () {
    return {
      status: '403',
      content: '您的权限不足, 请联系管理员!'
    }
  }
}
</script>

<style>

</style>
