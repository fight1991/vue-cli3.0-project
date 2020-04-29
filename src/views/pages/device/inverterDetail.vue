<template>
  <section class="sys-main">
    <!-- 电站名称区域 -->
    <div class="block bg-c mg-b15">
      <div class="plant-head clearfix">
        <div class="plant-name flex-center fl">
          <i class="iconfont icon-nibianqi"></i>
          <div>
            <span>逆变器sn : {{headInfo.deviceSN || ''}}</span>
            <span>电站名 : {{headInfo.plantName || ''}}</span>
            <span>模块sn : {{headInfo.moduleSN || ''}}</span>
            <span>逆变器型号 : {{headInfo.deviceType || ''}}</span>
            <span>设备状态 : {{headInfo.status || ''}}</span>
          </div>
        </div>
        <i @click="collapse=!collapse" v-show="!collapse" class="arrow-right fr el-icon-arrow-right"></i>
        <i @click="collapse=!collapse" v-show="collapse" class="arrow-right fr el-icon-arrow-down"></i>
      </div>
      <div :class="{'plant-item':true, 'height-0':!collapse}">
        <el-row :gutter="30">
          <el-col :span="6">国家 : {{headInfo.country || ''}}</el-col>
          <el-col :span="6">地区 : {{headInfo.city || ''}}</el-col>
          <el-col :span="6">安装时间 : {{headInfo.feedinDate | formatDate('yyyy-MM-dd')}}</el-col>
          <el-col :span="6">逆变器硬件版本 : {{headInfo.hardwareVersion || ''}}</el-col>
          <el-col :span="6">逆变器master : {{headInfo.softVersion && headInfo.softVersion.master || ''}}</el-col>
          <el-col :span="6">逆变器slaver : {{headInfo.softVersion && headInfo.softVersion.slaver || ''}}</el-col>
          <el-col :span="6">逆变器manager : {{headInfo.softVersion && headInfo.softVersion.manager || ''}}</el-col>
        </el-row>
      </div>
    </div>
    <!-- 设备状态 -->
    <device-status :incomeDetail="incomeDetail" :power="incomeDetail.power" :title="$t('plant.deviceS')"></device-status>
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
              <!-- Flow graph -->
              流向图
              <i class="fr el-icon-more" @click="flowDialog=true"></i>
            </div>
            <div class="flow-map flex-center" style="height:200px">
              <flow-animate></flow-animate>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 功率折线图和电量统计柱状图 -->
    <div class="container-bottom bg-c">
      <line-bar :id="deviceId" :type="'device'" ref="lineBar">
        <template v-slot:radioBtn>
          <el-radio-button label="power">Power</el-radio-button>
          <el-radio-button label="elec">Generation</el-radio-button>
        </template>
      </line-bar>
    </div>
    <!-- 多选折线图 -->
    <div class="container-bottom bg-c">
      <el-row class="select-line">
        <el-select v-model="multiValue" multiple size="mini" placeholder="choose" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-row>
      <el-echart :datas="lineChart" height="300px"></el-echart>
    </div>
    <today-abnormal :type="'device'" :id="deviceId" :visible.sync="abnormalVisible"></today-abnormal>
    <flow-dialog :visible.sync="flowDialog"></flow-dialog>
  </section>
</template>
<script>
import echartData from '@/views/pages/plant/echartData'
import deviceStatus from '../components/powerStatus'
import todayAbnormal from '@/views/pages/plant/todayAbnormal'
import lineBar from '@/views/pages/components/lineBar/lineBar'
import flowDialog from './flowDialog'
import flowAnimate from './flowAnimate'
import lineChart from './lineChart'
export default {
  components: {
    deviceStatus,
    lineBar,
    todayAbnormal,
    flowDialog,
    flowAnimate
  },
  mixins: [lineChart, echartData],
  data () {
    return {
      flowDialog: false,
      collapse: false,
      abnormalVisible: false,
      multiValue: [],
      deviceId: '',
      options: [],
      headInfo: {},
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
    this.deviceId = this.$route.query.id
    this.getHeadInfo()
    this.getOptions()
  },
  mounted () {
    this.$refs.lineBar.getLineData()
    this.$refs.lineBar.getBarData()
  },
  methods: {
    async getHeadInfo () {
      let { result } = await this.$axios({
        url: '/v0//device/addressbook',
        data: {
          deviceID: this.deviceId
        }
      })
      this.headInfo = result || {}
    },
    async getOptions () {
      let { result } = await this.$axios({
        url: '/v0/device/variables',
        data: {
          deviceID: this.deviceId
        }
      })
      if (result) {
        this.options = result.varialbes || []
      }
    },
    // 多折线图表
    async getMultiChart () {
      let { result } = await this.$axios({
        url: '/v0/device/history/raw',
        method: 'post',
        data: {
          variables: this.multiValue,
          timespan: 'hour',
          beginDate: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
          }
        }
      })
      if (result && result.length > 0) {
        result.forEach((v, i) => {
          let tempData = v.data.map(item => [item.timestamp, item.value])
          this.lineChart.series[i] = {
            name: v.variable,
            data: tempData,
            type: 'line',
            smooth: true
          }
        })
      }
      return true
    },
    selectChange () {
      if (!this.multiValue) return
      this.lineChart.legend.data = this.multiValue
      this.getMultiChart()
    }
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
