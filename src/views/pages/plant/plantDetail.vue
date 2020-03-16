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
            <div class="title border-line" slot="header">Power station condition</div>
            <el-echart :datas="powerData" height="250px"></el-echart>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            <div class="title border-line" slot="header">Device status</div>
            <div class="progress-container">
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Normal</span><span style="color:#67c23a">8</span></div>
                <el-progress class="progress" :show-text="false" :stroke-width="18" :percentage="33" color="#67c23a"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Alarm</span><span style="color:#e6a23c">12</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="18" :percentage="45" color="#e6a23c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Abnormal</span><span style="color:#f56c6c">12</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="18" :percentage="45" color="#f56c6c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Offline</span><span style="color:#909399">12</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="18" :percentage="45" color="#909399"></el-progress>
              </div>
            </div>
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
          <el-echart :datas="chartData" height="300px"></el-echart>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import echartData from './echartData'
export default {
  mixins: [echartData],
  components: {

  },
  data () {
    return {

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
.progress-container {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.status-text {
  padding: 2px 5px;
}
.power {
  .header {
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
