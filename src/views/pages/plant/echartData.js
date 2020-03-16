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
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            data: [
              { value: 50, name: 'watts' }
            ]
          }
        ]
      },
      chartData: { // 折线图表
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
  }
}
