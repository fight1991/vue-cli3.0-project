export default {
  data () {
    return {
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