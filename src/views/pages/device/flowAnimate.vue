<template>
  <div class="flex" v-if="dot">
    <div class="circle-line box-left">
      <div class="pv icon-pv"></div>
      <div class="inverter icon-inverter"></div>
      <div class="dot1"></div>
      <div class="dot3"></div>
    </div>
    <div class="circle-line box-right">
      <!-- <div class="dot2"></div> -->
      <div class="grid icon-grid"></div>
      <div class="load icon-load"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dot: true
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.flex {
  width: 95%;
}
.circle-line {
  height: 150px;
  position: relative;
  &:first-child {
    border-top: 1px dotted green;
    width: 66%;
  }
  &:last-child {
    width: 33%;
    border: 1px dotted green;
    border-right: none;
    border-bottom: none;
  }
  .pv,
  .load,
  .grid,
  .inverter {
    position: absolute;
    width: 85px;
    height: 85px;
    background-image: url('../../../assets/sprite/sprite.png');
    // transform: translate(-50%,-50%) scale(.6);
    z-index: 99;
    background-color: #fff;
  }
  .pv {
    top: 0;
    left: 0;
    transform: translate(-10px,-50%);
  }
  .inverter {
    top: 0;
    right: 50px;
    transform: translate(0, -50%)
  }
  .grid {
    top: 0;
    right: 0;
    transform: translate(10px, -50%)
  }
  .load {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%)
  }
  .dot1,.dot2,.dot3 {
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0px 0px 4px 1px #ccc;
    z-index: 66;
  }
  .dot1,.dot3 {
    left: 0;
    background-color: #67C23A;
    transform: translate(-50%,-50%);
    animation: dot1 2s linear infinite;
  }
  .dot3 {
    animation: dot3 2s linear infinite;
  }
  .dot2 {
    right: 0;
    background-color: blue;
    transform: translate(50%,-50%);
    animation: dot2 2s linear infinite;

  }
}
@keyframes dot1 {
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
    left: 150%;
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
