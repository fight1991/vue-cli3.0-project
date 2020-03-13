<template>
  <section class="sys-main">
    <div class="block mg-b15">
      <el-row :gutter="15">
        <el-col :span="8">
          <el-card shadow="never">
            <div class="title border-line" slot="header">Today's abnormal</div>
            <el-echart :datas="normalData" height="250px"></el-echart>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            总是显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            总是显示
          </el-card>
        </el-col>
      </el-row>
    </div>
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
export default {
  components: {

  },
  data () {
    return {
      normalData: {
        color: ['#F96867', '#FDC70D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          data: ['Alarm', 'Glitch'],
          formatter: function (name) {
            return name
          }
        },
        series: [
          {
            name: 'abnormal',
            type: 'pie',
            radius: ['50%', '70%'],
            right: '50px',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{c}'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 3, name: 'Alarm' },
              { value: 7, name: 'Glitch' }
            ]
          }
        ]
      },
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
