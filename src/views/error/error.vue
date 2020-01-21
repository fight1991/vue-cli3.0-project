<template>
  <div class="error">
    <h2>
      出错了
      <small>{{status}}</small>
    </h2>
    <div>
      <span>{{content}}</span>
      <el-link type="primary" @click="gotoHome()">返回首页</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    status: {
      default: ''
    },
    content: {
      default: ''
    }
  },
  methods: {
    gotoHome () {
    }
  }
}
</script>

<style scoped>
.error {
  text-align: center;
}

.error h2 {
  color: #666;
}
</style>
