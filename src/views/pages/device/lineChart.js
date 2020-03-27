export default {
  data () {
    return {
      lineChart: { // 折线图表
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
      }
    }
  }
}