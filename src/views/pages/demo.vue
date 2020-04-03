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
    <el-button type="primary" @click="closeWebsocket">关闭连接</el-button>
    <el-table :data="[{age:'1111111111111111111111111111'}]" border>
      <el-table-column prop="age" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="age" min-width="20" show-overflow-tooltip></el-table-column>
      <el-table-column prop="age" min-width="20"></el-table-column>
      <el-table-column prop="age" min-width="20"></el-table-column>
      <el-table-column prop="age" min-width="20"></el-table-column>
    </el-table>
    <div class="flex" v-if="dot">
      <div class="circle-line">
        <div class="dot"></div>
        <div class="dot3"></div>
      </div>
      <div class="circle-line">
        <div class="dot2"></div>
      </div>
    </div>
    <el-button @click="dot=!dot">点击切换</el-button>
  </div>
</template>

<script>
import Socket from '@/net/socket'
export default {
  data () {
    return {
      dot: true,
      value2: '',
      socket: null
    }
  },
  created () {
    this.socket = new Socket('ws://192.168.10.118:8000/c/v0/websocket')
    this.socket.startLink('hah', (res) => {
      console.log(res)
    })
  },
  methods: {
    closeWebsocket () {
      this.socket.closeLink()
    }
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
.circle-line {
  width: 200px;
  height: 100px;
  border: 1px solid green;
  position: relative;
  left: 60px;
  top: 60px;
  .dot,.dot2,.dot3 {
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid red;
    box-shadow: 1px;
  }
  .dot,.dot3 {
    left: 0;
    background-color: green;
    transform: translate(-50%,-50%);
    animation: dot 2s linear infinite;
  }
  .dot3 {
    animation: dot3 2s linear infinite;
    background-color: red;
  }
  .dot2 {
    right: 0;
    background-color: blue;
    transform: translate(50%,-50%);
    animation: dot2 2s linear infinite;

  }
}
@keyframes dot {
  0% {
    left: 0;
    top: 0;
  }
  50% {
    top: 0;
    left: 100%;
  }
  100% {
    left: 100%;
    top: 100%;
  }
}
@keyframes dot2 {
  0% {
    right: 0;
    top: 0;
  }
  50% {
    top: 0;
    right: 100%;
  }
  100% {
    right: 100%;
    top: 100%;
  }
}
@keyframes dot3 {
  0% {
    left: 0;
    top: 0;
  }
  50% {
    top: 0;
    left: 100%;
  }
  100% {
    left: 200%;
    top: 0;
  }
}
@keyframes animate {
  0% {
  }
  100% {
    background-position:20px 0;
  }
}
</style>
