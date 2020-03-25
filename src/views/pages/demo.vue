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
    <router-link to="/login">返回登录</router-link>
    <div class="line"></div>
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
.line {
  height: 20px;
  width: 200px;
  margin: 0 auto;
  border: 1px solid red;
  animation: animate 1s linear infinite;
  background-size: 20px 20px;
  background-image: linear-gradient(  135deg, #fff, #fff 25%, green 25%, green 50%, #fff 50%, #fff 75%, green 75%, green 100%  );
}
@keyframes animate {
  0% {
  }
  100% {
    background-position:20px 0;
  }
}
</style>
