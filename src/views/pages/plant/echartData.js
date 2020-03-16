export default {
  data () {
    return {
      normalData: { // 今日异常统计
        title: {
          text: '10',
          textAlign: 'center',
          textStyle: {
            color: '#666'
          },
          left: '35%',
          top: 'center'
        },
        color: ['#F96867', '#FDC70D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '0px',
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
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
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
      powerData: { // 当前功率
        title: {
          text: '哈哈',
          bottom: '10%',
          left: 'center'
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            axisLine: {
              lineStyle: {
                color: [[0.5, '#63869e'], [1, '#67c23a']]
              }
            },
            detail: {
              formatter: '{value}%'
            },
            data: [
              { value: 10, name: 'watts' }
            ]
          }
        ]
      },
      echartData: {
        power: { // 折线图表
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
        },
        elec: { // 柱状图
          legend: {
            bottom: 0
          },
          tooltip: {},
          dataset: {
            dimensions: ['product', '发电量', '并网发电量', '负载损耗', '电网损耗'],
            source: [
              { product: '01', '发电量': 43.3, '并网发电量': 85.8, '负载损耗': 93.7, '电网损耗': 93.7 },
              { product: '02', '发电量': 83.1, '并网发电量': 73.4, '负载损耗': 55.1, '电网损耗': 93.7 },
              { product: '03', '发电量': 86.4, '并网发电量': 65.2, '负载损耗': 82.5, '电网损耗': 93.7 },
              { product: '04', '发电量': 72.4, '并网发电量': 53.9, '负载损耗': 39.1, '电网损耗': 93.7 }
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' }
          ]
        }
      }
    }
  }
}
