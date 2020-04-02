<template>
  <el-card shadow="never">
    <div class="title border-line" slot="header">{{title}}</div>
    <div class="current-kw flex-around">
      <div class="my-pg">
        <el-progress :width="150" type="circle" color="#67C23A" :show-text="false" :percentage="49" :stroke-width="12"></el-progress>
        <div class="progress-txt">
          <div class="number">{{power + 'kw'}}</div>
          <div class="f12">{{$t('common.currentP')}}</div>
        </div>
      </div>
      <div class="details flex">
        <div class="content-item flex-around">
        <i class="icon icon-plant-day"></i>
        <div class="plant-text">
          <p><span>{{$t('common.elec')}} (kwh)</span></p>
          <p><span>{{$t('common.income')}} ($)</span></p>
        </div>
        <div class="plant-money">
          <p><span class="num">333</span></p>
          <p><span class="money">333</span></p>
        </div>
      </div>
      <div class="content-item flex-around">
        <i class="icon icon-plant-month"></i>
        <div class="plant-text">
          <p><span>{{$t('common.elec')}} (kwh)</span></p>
          <p><span>{{$t('common.income')}} ($)</span></p>
        </div>
        <div class="plant-money">
          <p><span class="num">333</span></p>
          <p><span class="money">333</span></p>
        </div>
      </div>
      <div class="content-item flex-around">
        <i class="icon icon-plant-year"></i>
        <div class="plant-text">
          <p><span>{{$t('common.elec')}} (kwh)</span></p>
          <p><span>{{$t('common.income')}} ($)</span></p>
        </div>
        <div class="plant-money">
          <p><span class="num">333</span></p>
          <p><span class="money">333</span></p>
        </div>
      </div>
      <div class="content-item flex-around">
        <i class="icon icon-plant-total"></i>
        <div class="plant-text">
          <p><span>{{$t('common.elec')}} (kwh)</span></p>
          <p><span>{{$t('common.income')}} ($)</span></p>
        </div>
        <div class="plant-money">
          <p><span class="num">333</span></p>
          <p><span class="money">333</span></p>
        </div>
      </div>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    title: {
      default: ''
    },
    power: { // 当前功率
      default: 0
    }
  }
}
</script>
<style lang="less" scoped>
.current-kw {
  height: 200px;
  .details {
    flex-wrap: wrap;
  }
}
.my-pg {
  position: relative;
  margin-right: 15px;
  .el-progress {
    vertical-align: top
  }
  .progress-txt {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: #999;
    .number {
      color: #67C23A;
    }
  }
}
.content-item {
  padding: 10px 0;
  width: 50%;
  box-sizing: border-box;
  &:nth-child(2n+1) {
    border-right: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
  }
  .plant-money {
    .num {
      color: #FFC245;
      font-weight: bold;
    }
    .money {
      color: #67C23A;
      font-weight: bold;
    }
  }
}
</style>
