<template>
  <section class="sys-bus-container">
    <div class="left">
      <div class="top-item flex-between mg-b10">
        <div class="items">电站总数</div>
        <div class="items">正常电站</div>
        <div class="items">离线电站</div>
        <div class="items">故障电站</div>
      </div>
      <div class="status-count bg-c mg-b10">
        <div class="title">状态统计</div>
        <div class="content flex">
          <div class="content-item">1</div>
          <div class="content-item">2</div>
          <div class="content-item">3</div>
        </div>
      </div>
      <div class="power bg-c">
        <div class="header flex-between pd10">
          <div class="btn">
            <el-button size="mini" type="primary">功率</el-button>
            <el-button size="mini">电量统计</el-button>
          </div>
          <div class="date"></div>
        </div>
        <div class="chart">
          <el-echart :datas="chartData"></el-echart>
        </div>
      </div>
    </div>
    <div class="right bg-c">
      <div class="weather-content">天气</div>
      <div id="map-content" style="width:100%;height:245px;"></div>
    </div>
  </section>
</template>
<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      chartData: {
        tooltip: {
          trigger: 'axis',
          showContent: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  created () {
    window.addEventListener('resize', this.asyncInit)
  },
  mounted () {
    this.initBaiduMap()
  },
  methods: {
    initBaiduMap () {
      let mp = new BMap.Map('map-content')
      mp.centerAndZoom(new BMap.Point(-118.24532, 34.05349), 11)
      mp.enableScrollWheelZoom(true)
    }
  },
  asyncInit () {
    this.$nextTick(() => {
      this.initBaiduMap()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.asyncInit)
  }
}
</script>
<style lang="less" scoped>
.sys-bus-container {
  padding: 5px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  .left {
    flex: 1;
    height: 100%;
    margin-right: 5px;
    .top-item {
      .items {
        background-color: #fff;
        width: 24%;
        height: 100px;
      }
    }
    .status-count {
      padding: 5px 0;
      .title {
        margin: 5px 10px;
        text-indent: 10px;
        border-left: 2px solid @sys-main-header;
        font-size: 12px;
        color:#555;
        font-weight: bold;
      }
      .content {
        border-top: 1px solid #f5f5f5;
        padding: 5px 10px;
      }
      .content-item {
        width: 33.3%;
        height: 200px;
        border-right:1px solid #f5f5f5;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .right {
    .weather-content {
      height: 95px;
      margin-bottom: 10px;
    }
    width: 250px;
    padding: 5px;
    box-sizing: border-box;
  }
}
.power {
  .header {
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
