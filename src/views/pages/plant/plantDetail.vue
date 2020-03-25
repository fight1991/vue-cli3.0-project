<template>
  <section class="sys-main">
    <div class="block mg-b15">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title border-line" slot="header">
              Today's abnormal
              <i class="fr el-icon-more" @click="abnormalVisible=true"></i>
            </div>
            <el-echart :datas="normalData" height="200px"></el-echart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title border-line" slot="header">Device status</div>
            <div class="progress-container">
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Normal</span><span style="color:#67c23a">{{device.normal}}</span></div>
                <el-progress class="progress" :show-text="false" :stroke-width="12" :percentage="percentMethod(device.normal)" color="#67c23a"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Alarm</span><span style="color:#e6a23c">{{device.warning}}</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="percentMethod(device.warning)" color="#e6a23c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Abnormal</span><span style="color:#f56c6c">{{device.fault}}</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="percentMethod(device.fault)" color="#f56c6c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Offline</span><span style="color:#909399">{{device.offline}}</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="percentMethod(device.offline)" color="#909399"></el-progress>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <el-card shadow="never">
            <div class="title border-line" slot="header">Power station condition</div>
            <!-- <el-echart :datas="powerData" height="200px"></el-echart> -->
            <div class="current-kw flex-around">
              <div class="my-pg">
                <el-progress :width="150" type="circle" color="#67C23A" :show-text="false" :percentage="49" :stroke-width="12"></el-progress>
                <div class="progress-txt">
                  <div class="number">66KW</div>
                  <div class="f12">当前功率</div>
                </div>
              </div>
              <div class="details flex">
                <div class="content-item flex-around">
                <i class="icon icon-plant-day"></i>
                <div class="plant-text">
                  <p><span>Electric (kwh)</span></p>
                  <p><span>Income ($)</span></p>
                </div>
                <div class="plant-money">
                  <p><span class="num">333</span></p>
                  <p><span class="money">333</span></p>
                </div>
              </div>
              <div class="content-item flex-around">
                <i class="icon icon-plant-month"></i>
                <div class="plant-text">
                  <p><span>Electric (kwh)</span></p>
                  <p><span>Income ($)</span></p>
                </div>
                <div class="plant-money">
                  <p><span class="num">333</span></p>
                  <p><span class="money">333</span></p>
                </div>
              </div>
              <div class="content-item flex-around">
                <i class="icon icon-plant-year"></i>
                <div class="plant-text">
                  <p><span>Electric (kwh)</span></p>
                  <p><span>Income ($)</span></p>
                </div>
                <div class="plant-money">
                  <p><span class="num">333</span></p>
                  <p><span class="money">333</span></p>
                </div>
              </div>
              <div class="content-item flex-around">
                <i class="icon icon-plant-total"></i>
                <div class="plant-text">
                  <p><span>Electric (kwh)</span></p>
                  <p><span>Income ($)</span></p>
                </div>
                <div class="plant-money">
                  <p><span class="num">333</span></p>
                  <p><span class="money">333</span></p>
                </div>
              </div>
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
            <el-radio-group v-model="echartType" size="mini" @change="echartChange">
              <el-radio-button label="power">Power</el-radio-button>
              <el-radio-button label="elec">Generation</el-radio-button>
              <el-radio-button label="list">Device list</el-radio-button>
            </el-radio-group>
          </div>
          <div class="date" v-show="echartType=='elec'">
            <el-dropdown size="mini" split-button @command="selectDateType">
              {{dateType}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Day">Day</el-dropdown-item>
                <el-dropdown-item command="Month">Month</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="date-area">
              <i class="arrow el-icon-arrow-left" @click="computeDate('reduce')"></i>
              <el-date-picker
                size="mini"
                style="width:110px"
                v-model="dateValue"
                :type="dateType=='Day' ? 'month':'year'">
              </el-date-picker>
              <i class="arrow el-icon-arrow-right" @click="computeDate('add')"></i>
              </span>
          </div>
        </div>
        <!-- 图表 -->
        <div class="chart" v-show="echartType!=='list'">
          <el-echart :datas="echartData[echartType]" height="300px"></el-echart>
        </div>
        <!-- 设备列表 -->
        <device-list v-show="echartType==='list'"></device-list>
      </div>
    </div>
    <today-abnormal :visible.sync="abnormalVisible"></today-abnormal>
  </section>
</template>
<script>
import echartData from './echartData'
import { formatDate } from '@/util'
import todayAbnormal from './todayAbnormal'
import deviceList from './deviceList'
export default {
  mixins: [echartData],
  components: {
    todayAbnormal,
    deviceList
  },
  data () {
    return {
      abnormalVisible: false,
      plantId: '',
      powerRadio: 'day',
      dateValue: '',
      dateType: 'Day',
      echartType: 'power', // 默认显示功率图表
      device: {
        normal: 0,
        warning: 0,
        fault: 0,
        offline: 0
      },
      echartUrl: {
        Hours: '/v0/plant/history/single/report/day', // 日报表url // 获取每个小时
        Day: '/v0/plant/history/single/report/month', // 月报表url 获取每天数据
        Month: '/v0/plant/history/single/report/year' // 年报表url 获取每个月内数据
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
      this.getLineData()
      this.getBarData(this.dateType)
    }
    this.setDefaultTime()
  },
  mounted () {

  },
  methods: {
    // 百分比取整数
    percentMethod (value) {
      if (this.deviceTotal === 0) return 0
      return (value / this.deviceTotal) * 100
    },
    echartChange (type) {

    },
    // 切换日期控件类型
    selectDateType (command) {
      this.dateType = command
      this.setDefaultTime()
      this.getBarData(command)
    },
    // 设置默认事件
    setDefaultTime () {
      let dateP = this.dateType === 'Day' ? 'yyyy-MM' : 'yyyy'
      this.dateValue = formatDate(new Date(), dateP)
    },
    // 计算月份 年份
    computeDate (type) {
      let currentTime = new Date(this.dateValue)
      if (this.dateType === 'Day') { // 月份增减
        let tempMonth = type === 'reduce' ? currentTime.getMonth() - 1 : currentTime.getMonth() + 1
        let temp = currentTime.setMonth(tempMonth)
        let lastDate = new Date(temp)
        let lastYear = lastDate.getFullYear()
        let lastMonth = this.checkMonth(lastDate.getMonth() + 1)
        let showDate = lastYear + '-' + lastMonth
        if (new Date(showDate).getTime() > Date.now()) return
        this.dateValue = showDate
      } else { // 年份增减
        let tempYear = type === 'reduce' ? currentTime.getFullYear() - 1 : currentTime.getFullYear() + 1
        if (tempYear > new Date().getFullYear()) return
        this.dateValue = tempYear.toString()
      }
      // 发送请求
      this.getBarData(this.dateType)
    },
    // 小于10补0
    checkMonth (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
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
    },
    // 折现图表数据
    async getLineData () {
      let { result } = await this.$axios({
        url: '/v0/plant/history/single/raw/day',
        method: 'post',
        data: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
          stationID: this.plantId,
          parameters: ['power']
        }
      })
      if (result && result.data && result.data.length > 0) {
        let xAxis = result.data.map(v => v.datetime)
        let value = result.data.map(v => v.value)
        this.echartData.power.xAxis.data = xAxis
        this.echartData.power.series[0].data = value
      }
    },
    // 柱状图表数据
    async getBarData (type) {
      let dateArr = this.dateValue.split('-')
      let { result } = this.$axios({
        url: this.echartUrl[type],
        method: 'post',
        data: {
          year: dateArr[0],
          month: dateArr[1] || '',
          day: dateArr[2] || '',
          stationID: this.plantId,
          parameters: ['generation', 'feed-in', 'loads', 'grid-consumption']
        }
      })
      if (result && result.data && result.data.length > 0) {
        this.echartData.elec.dataset.source = result.data
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
.power {
  .header {
    border-bottom: 1px solid #f5f5f5;
  }
}
.date-area {
  margin-left: 20px;
  .arrow {
    cursor: pointer;
    margin: 0 8px;
  }
}
.my-pg {
  position: relative;
  margin-right: 15px;
  .el-progress {
    vertical-align: top
  }
  .progress-txt {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: #999;
    .number {
      color: #67C23A;
    }
  }
}
.current-kw {
  height: 200px;
  .details {
    flex-wrap: wrap;
  }
}
.content-item {
  padding: 10px 0;
  width: 50%;
  box-sizing: border-box;
  &:nth-child(2n+1) {
    border-right: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
  }
  .plant-money {
    .num {
      color: #FFC245;
      font-weight: bold;
    }
    .money {
      color: #67C23A;
      font-weight: bold;
    }
  }
}
.el-icon-more {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
