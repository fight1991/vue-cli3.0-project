export default {
  data () {
    return {
      normalData: { // 今日异常统计
        title: {
          text: 0,
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
              { value: 0, name: 'Alarm' },
              { value: 0, name: 'Glitch' }
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
          legend: {
            type: 'plain',
            data: ['generating power', 'grid-connected', 'power dissipation'],
            bottom: 0
          },
          tooltip: {
            trigger: 'axis',
            showContent: true
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#287FCA'],
                type: 'dotted',
                opacity: 0.4
              }
            }
          },
          series: [{
            name: 'generating power',
            data: [[1585190129697, 820], [1585190139697, 932], [1585190149697, 901], [1585190159697, 934], [1585190169697, 1290], [1585190179697, 1330], [1585190189697, 1320]],
            type: 'line',
            smooth: true
          }, {
            name: 'grid-connected',
            data: [[1585190139697, 632], [1585190149697, 701], [1585190159697, 834], [1585190169697, 1490], [1585190179697, 1630], [1585190189697, 1920]],
            type: 'line',
            smooth: true
          }]
        },
        elec: { // 柱状图
          legend: {
            bottom: 0
          },
          tooltip: {},
          dataset: {
            dimensions: ['axis', 'generation', 'feed-in', 'loads', 'grid consumption'],
            source: [
              { axis: '01', 'generation': 43.3, 'feed-in': 85.8, 'loads': 93.7, 'grid consumption': 93.7 },
              { axis: '02', 'generation': 83.1, 'feed-in': 73.4, 'loads': 55.1, 'grid consumption': 93.7 },
              { axis: '03', 'generation': 86.4, 'feed-in': 65.2, 'loads': 82.5, 'grid consumption': 93.7 },
              { axis: '04', 'generation': 72.4, 'feed-in': 53.9, 'loads': 39.1, 'grid consumption': 93.7 }
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
