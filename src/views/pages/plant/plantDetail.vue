<template>
  <section class="sys-main">
    <div class="block bg-c mg-b15">
      <div class="plant-head clearfix">
        <div class="plant-name flex-center fl">
          <i class="iconfont icon-fadianzhan"></i>
          <div>
            <span>电站名称 :</span>
            <span>国家 :</span>
            <span>城市 :</span>
          </div>
          <div class="select-area flex-center">
            <i class="arrow el-icon-caret-left"></i>
            <el-select size="mini" v-model="plantName">
              <el-option label="232" value="32" key="3"></el-option>
            </el-select>
            <i class="arrow el-icon-caret-right"></i>
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
    <div class="block">
      <plant-status :title="$t('plant.plantS')"></plant-status>
    </div>
    <div class="block">
      <line-bar>
        <template v-slot:radioBtn>
          <el-radio-button label="power">{{$t('common.power')}}</el-radio-button>
          <el-radio-button label="elec">{{$t('common.gene')}}</el-radio-button>
          <el-radio-button label="list">{{$t('plant.deviceL')}}</el-radio-button>
        </template>
        <template v-slot:other>
          <device-list></device-list>
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
      plantName: '',
      collapse: false,
      abnormalVisible: false,
      plantId: '',
      device: {
        total: 0,
        normal: 0,
        warning: 0,
        fault: 0,
        offline: 0
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
    }
  },
  created () {
    let { plantId } = this.$route.query
    if (plantId) {
      this.plantId = plantId
      this.getSingleStatus(plantId)
    }
  },
  mounted () {

  },
  methods: {
    // 百分比取整数
    percentMethod (value) {
      if (this.deviceTotal === 0) return 0
      return (value / this.deviceTotal) * 100
    },
    // 获取单个电站的状态
    async getSingleStatus (id) {
      let { result } = await this.$axios({
        url: '/v0/plant/status/single',
        data: {
          stationID: id
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
