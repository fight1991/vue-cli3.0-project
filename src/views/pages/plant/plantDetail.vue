<template>
  <section class="sys-main">
    <!-- 电站名称区域 -->
    <div class="block bg-c mg-b15">
      <div class="plant-head clearfix">
        <div class="plant-name flex-center fl">
          <i class="iconfont icon-fadianzhan"></i>
          <div v-if="pageFlag==='detail'">
            <span>电站名称 :</span>
            <span>国家 :</span>
            <span>城市 :</span>
          </div>
          <div v-else>
            <span>电站名称 </span>
          </div>
          <div class="select-area flex-center" v-if="pageFlag==='board'">
            <i class="arrow el-icon-caret-left" @click="switchPlant('reduce')"></i>
            <el-select size="mini" v-model="plantId">
              <el-option v-for="item in plantList" :label="item.plantName" :value="item.stationID" :key="item.stationID"></el-option>
            </el-select>
            <i class="arrow el-icon-caret-right" @click="switchPlant('add')"></i>
          </div>
        </div>
        <i @click="collapse=!collapse" v-show="!collapse" class="arrow-right fr el-icon-arrow-right"></i>
        <i @click="collapse=!collapse" v-show="collapse" class="arrow-right fr el-icon-arrow-down"></i>
      </div>
      <div :class="{'plant-item':true, 'height-0':!collapse}">
        <el-row :gutter="30">
          <el-col :span="6" v-if="pageFlag==='board'">国家 :</el-col>
          <el-col :span="6" v-if="pageFlag==='board'">城市 :</el-col>
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
    <!-- 今日异常 设备状态区域 -->
    <div class="block">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title border-line" slot="header">
              {{$t('plant.todayAb')}}
              <i class="fr el-icon-more" @click="abnormalVisible=true"></i>
            </div>
            <el-echart :datas="normalData" height="200px"></el-echart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title border-line" slot="header">{{$t('plant.deviceS')}}</div>
            <div class="progress-container">
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>{{$t('common.total')}}</span><span style="color:#00BFFF">{{device.total}}</span></div>
                <el-progress class="progress" :show-text="false" :stroke-width="12" :percentage="percentMethod(device.total)" color="#67c23a"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>{{$t('common.normal')}}</span><span style="color:#67c23a">{{device.normal}}</span></div>
                <el-progress class="progress" :show-text="false" :stroke-width="12" :percentage="percentMethod(device.normal)" color="#67c23a"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>{{$t('common.alarm')}}</span><span style="color:#e6a23c">{{device.warning}}</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="percentMethod(device.warning)" color="#e6a23c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>{{$t('common.glitch')}}</span><span style="color:#f56c6c">{{device.fault}}</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="percentMethod(device.fault)" color="#f56c6c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>{{$t('common.offline')}}</span><span style="color:#909399">{{device.offline}}</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="percentMethod(device.offline)" color="#909399"></el-progress>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 电站状态 -->
    <div class="block">
      <plant-status :incomeDetail="incomeDetail" :title="$t('plant.plantS')"></plant-status>
    </div>
    <div class="block">
      <line-bar :plantId="plantId" ref="lineBar">
        <template v-slot:radioBtn>
          <el-radio-button label="power">{{$t('common.power')}}</el-radio-button>
          <el-radio-button label="elec">{{$t('common.gene')}}</el-radio-button>
          <el-radio-button label="list">{{$t('plant.deviceL')}}</el-radio-button>
        </template>
        <template v-slot:other>
          <device-list ref="deviceList" :plantId="plantId"></device-list>
        </template>
      </line-bar>
    </div>
    <today-abnormal :visible.sync="abnormalVisible"></today-abnormal>
  </section>
</template>
<script>
import echartData from './echartData'
import todayAbnormal from './todayAbnormal'
import deviceList from './deviceList'
import plantStatus from '../components/plantStatus'
import lineBar from '@/views/pages/components/lineBar/lineBar'
import Socket from '@/net/socket'

export default {
  mixins: [echartData],
  components: {
    todayAbnormal,
    deviceList,
    plantStatus,
    lineBar
  },
  data () {
    return {
      pageFlag: 'detail',
      switch: false, // 节流
      collapse: false,
      abnormalVisible: false,
      plantId: '',
      plantList: [],
      socket: null,
      device: {
        total: 0,
        normal: 0,
        warning: 0,
        fault: 0,
        offline: 0
      },
      incomeDetail: { // 收益详情
        currency: '', // 货币种类
        power: '', // 功率
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
  computed: {
    deviceTotal () {
      let total = 0
      Object.values(this.device).forEach(value => {
        total += Number(value)
      })
      return total
    },
    plantIndex () {
      return this.plantList.findIndex(v => v.stationID === this.plantId)
    }
  },
  async created () {
    let { query: { plantId }, meta: { page } } = this.$route
    if (page === 'detail') { // 电站详情页面
      if (plantId) {
        this.plantId = plantId
        this.getSingleStatus()
        this.getDeviceStatus()
      }
    } else { // dashboard页面
      // 获取plantList列表
      await this.getPlantList()
      // 截取plantList第一项
      if (this.plantList[0]) {
        this.plantId = this.plantList[0].stationID
      }
    }
    // this.getSomeIncome()
    this.pageFlag = page
  },
  mounted () {},
  beforeDestroy () {
    this.socket && this.socket.closeLink()
  },
  methods: {
    // 百分比取整数
    percentMethod (value) {
      if (this.deviceTotal === 0) return 0
      return (value / this.deviceTotal) * 100
    },
    // 电站列表
    async getPlantList () {
      let { result } = await this.$axios({
        url: '/v0/plant/droplist'
      })
      if (result) {
        this.plantList = result.plants || []
      }
      return true
    },
    // 左右切换电站
    async switchPlant (type) {
      if (this.switch) return
      this.switch = true
      // 获取当前索引
      let index = type === 'reduce' ? this.plantIndex - 1 : this.plantIndex + 1
      if (index < 0) {
        index = 0
      }
      if (index > this.plantList.length - 1) {
        index = this.plantList.length - 1
      }
      this.plantId = this.plantList[index].plantId
      // 发送请求
      await this.$all.promise([
        this.getSingleStatus(),
        this.getDeviceStatus(),
        this.$refs.deviceList.getDeviceList(),
        this.$refs.lineBar.getLineData(),
        this.$refs.lineBar.getBarData()])
      this.switch = false
    },
    // 获取电站下的设备状态
    async getDeviceStatus () {
      let { result } = await this.$axios({
        url: '/v0/plant/status/detail',
        data: {
          stationID: this.plantId
        }
      })
      if (result) {
        this.device = result
      }
      return true
    },
    // 获取单个电站的状态(今日异常)
    async getSingleStatus () {
      let { result } = await this.$axios({
        url: '/v0/plant/status/single',
        data: {
          stationID: this.plantId
        }
      })
      if (result && result.abnormal) {
        let { warning, fault } = result.abnormal
        this.normalData.title.text = warning + fault
        this.normalData.series[0].data = [
          { value: warning, name: 'Alarm' },
          { value: fault, name: 'Glitch' }
        ]
      }
      if (result && result.device) {
        this.device = result.device
      }
      return true
    },
    // 获取电站的实时功率、发电、收益
    getSomeIncome () {
      this.socket = new Socket()
      this.socket.startLink({
        url: '/plant/earnings/detail',
        flag: 'income',
        data: {
          stationID: this.plantId
        },
        success: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.progress-container {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.status-text {
  padding: 2px 5px;
}
.plant-head {
  padding: 10px;
  .arrow-right {
    padding: 10px;
    cursor: pointer;
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
</style>
