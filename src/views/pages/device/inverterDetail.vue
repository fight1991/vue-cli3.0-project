<template>
  <section class="sys-main">
    <!-- 设备状态 -->
    <device-status :title="'Device status'"></device-status>
    <!-- 流向图 -->
    <el-card shadow="never">
      <div class="title border-line" slot="header">
        Flow graph
        <i class="fr el-icon-more"></i>
      </div>
      <div class="flow-map" style="height:100px"></div>
    </el-card>
    <!-- 功率折线图和电量统计柱状图 -->
    <div class="container-bottom bg-c">
      <line-bar>
        <template v-slot:radioBtn>
          <el-radio-button label="power">Power</el-radio-button>
          <el-radio-button label="elec">Generation</el-radio-button>
        </template>
      </line-bar>
    </div>
    <!-- 多选折线图 -->
    <div class="container-bottom bg-c">
      <el-row class="select-line">
        <el-select v-model="multiValue" multiple size="mini" placeholder="choose">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-echart :datas="lineChart" height="300px"></el-echart>
    </div>
  </section>
</template>
<script>
import deviceStatus from '../components/plantStatus'
import lineBar from '@/views/pages/components/lineBar/lineBar'
import lineChart from './lineChart'
export default {
  components: {
    deviceStatus,
    lineBar
  },
  mixins: [lineChart],
  data () {
    return {
      multiValue: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }]
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.el-icon-more {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.container-bottom {
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.select-line {
  padding:10px;
  border-bottom:1px solid #f5f5f5;
}
</style>
