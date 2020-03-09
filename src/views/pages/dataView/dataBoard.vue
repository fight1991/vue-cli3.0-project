<template>
  <section class="sys-main">
    <show-item></show-item>
    <div class="container-bottom">
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
  </section>
</template>
<script>
import showItem from '../components/showItem'
export default {
  components: {
    showItem
  },
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

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.power {
  .header {
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
