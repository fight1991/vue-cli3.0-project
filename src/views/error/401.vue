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
      status: '401',
      content: '请联系管理员!'
    }
  }
}
</script>

<style>

</style>
