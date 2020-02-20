<template>
  <div class="echart-box">
    <div class="echart" ref="echart" :style="{'width':width,'height':height}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'e-chart',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    datas: {
      type: Object,
      default: function () {
        return {}
      }
    },
    reset: {
      default: ''
    }
  },
  watch: {
    'datas': function () {
      this.$nextTick(() => {
        this.initEchart()
      })
    },
    'reset': function () {
      this.$nextTick(() => {
        this.initEchart()
      })
    }
  },
  data () {
    return {}
  },
  created () {
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.initEchart()
      })
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.initEchart()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize')
  },
  methods: {
    initEchart () {
      // 获取DOM节点并初始化
      let chart = echarts.init(this.$refs.echart)
      // 设置图表的参数
      chart.setOption(this.datas, { notMerge: true })
      chart.resize()
    }
  }
}
</script>
<style lang="less" scoped>
.echart {
  overflow: hidden!important;
}
</style>
