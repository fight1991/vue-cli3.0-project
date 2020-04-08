<template>
  <section class="sys-main">
    <!-- 电站名称区域 -->
    <div class="block bg-c mg-b15">
      <div class="plant-head clearfix">
        <div class="plant-name flex-center fl">
          <i class="iconfont icon-fadianzhan"></i>
          <div>
            <span>逆变器sn :</span>
            <span>国家 :</span>
            <span>城市 :</span>
          </div>
        </div>
        <i @click="collapse=!collapse" v-show="!collapse" class="arrow-right fr el-icon-arrow-right"></i>
        <i @click="collapse=!collapse" v-show="collapse" class="arrow-right fr el-icon-arrow-down"></i>
      </div>
      <div :class="{'plant-item':true, 'height-0':!collapse}">
        <el-row :gutter="30">
          <el-col :span="6">国家 :</el-col>
          <el-col :span="6">城市 :</el-col>
          <el-col :span="6">安装商 :</el-col>
          <el-col :span="6">联系方式 :</el-col>
          <el-col :span="6">用户 :</el-col>
          <el-col :span="6">联系方式 :</el-col>
          <el-col :span="6">电站类型 :</el-col>
          <el-col :span="6">时间 :</el-col>
          <el-col :span="6">地址 :</el-col>
        </el-row>
      </div>
    </div>
    <!-- 设备状态 -->
    <device-status :incomeDetail="incomeDetail" :power="incomeDetail.power" :title="'Device status'"></device-status>
    <!-- 今日异常 流向图 -->
    <div class="block">
      <el-row :gutter="15">
        <el-col :span="8">
          <el-card shadow="never">
            <div class="title border-line" slot="header">
              {{$t('plant.todayAb')}}
              <i class="fr el-icon-more" @click="abnormalVisible=true"></i>
            </div>
            <el-echart :datas="normalData" height="200px"></el-echart>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="never">
            <div class="title border-line" slot="header">
              Flow graph
              <i class="fr el-icon-more"></i>
            </div>
            <div class="flow-map" style="height:100px"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
    <today-abnormal :visible.sync="abnormalVisible"></today-abnormal>
  </section>
</template>
<script>
import echartData from '@/views/pages/plant/echartData'
import deviceStatus from '../components/powerStatus'
import todayAbnormal from '@/views/pages/plant/todayAbnormal'
import lineBar from '@/views/pages/components/lineBar/lineBar'
import lineChart from './lineChart'
export default {
  components: {
    deviceStatus,
    lineBar,
    todayAbnormal
  },
  mixins: [lineChart, echartData],
  data () {
    return {
      collapse: false,
      abnormalVisible: false,
      multiValue: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      incomeDetail: { // 收益详情
        currency: '', // 货币种类
        power: 0, // 功率
        today: {
          generation: 0,
          earnings: 0
        },
        month: {
          generation: 0,
          earnings: 0
        },
        year: {
          generation: 0,
          earnings: 0
        },
        cumulate: {
          generation: 0,
          earnings: 0
        }
      }
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
.plant-head {
  padding: 10px;
  .arrow-right {
    padding: 10px;
    cursor: pointer;
  }
  .plant-name {
    .iconfont {
      color: @sys-main-header;
      font-size: 32px;
      margin-right: 10px;
    }
    span {
      margin-right: 40px;
    }
  }
  .select-area {
    padding: 0 20px;
    .arrow {
      cursor: pointer;
      margin: 0 3px;
      font-size: 20px;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
.plant-item {
  transition: all .2s;
  overflow: hidden;
  max-height: 98px;
  &.height-0 {
    max-height: 0px;
  }
  .el-row {
    border-top: 1px solid #f5f5f5;
    padding: 10px 0 0 50px;
  }
  .el-col {
    padding-bottom: 10px;
  }
}
</style>
