<template>
  <div class="echart-box">
    <div class="echart" ref="echart" :style="{'width':width,'height':height}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
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
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang,
      currentTab: state => state.tab.currentTab
    })
  },
  watch: {
    datas: {
      handler: function () {
        this.asyncInit()
      },
      deep: true
    },
    lang: function () {
      this.asyncInit()
    },
    currentTab: function () {
      this.asyncInit()
    }
  },
  data () {
    return {}
  },
  created () {
    window.addEventListener('resize', this.asyncInit)
    console.log(this.$store.state.tab.currentTab)
  },
  mounted () {
    this.asyncInit()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.asyncInit)
  },
  methods: {
    asyncInit () {
      this.$nextTick(() => {
        this.initEchart()
      })
    },
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
