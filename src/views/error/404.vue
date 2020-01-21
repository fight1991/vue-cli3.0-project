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
      status: '404',
      content: '页面找不到了, 请和管理员联系！!'
    }
  }
}
</script>

<style>

</style>
