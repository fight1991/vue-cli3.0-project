<template>
  <section class="sys-main">
    <div class="block mg-b15">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title border-line" slot="header">Today's abnormal</div>
            <el-echart :datas="normalData" height="200px"></el-echart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title border-line" slot="header">Device status</div>
            <div class="progress-container">
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Normal</span><span style="color:#67c23a">8</span></div>
                <el-progress class="progress" :show-text="false" :stroke-width="12" :percentage="33" color="#67c23a"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Alarm</span><span style="color:#e6a23c">12</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="45" color="#e6a23c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Abnormal</span><span style="color:#f56c6c">12</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="45" color="#f56c6c"></el-progress>
              </div>
              <div class="progress-line">
                <div class="status-text f12 flex-between"><span>Offline</span><span style="color:#909399">12</span></div>
                <el-progress class="progress" :show-text="false" :text-inside="true" :stroke-width="12" :percentage="45" color="#909399"></el-progress>
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
              <el-radio-button label="power">功率</el-radio-button>
              <el-radio-button label="elec">电量统计</el-radio-button>
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
        <div class="chart">
          <el-echart :datas="echartData[echartType]" height="300px"></el-echart>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import echartData from './echartData'
import { formatDate } from '@/util'
export default {
  mixins: [echartData],
  components: {

  },
  data () {
    return {
      powerRadio: 'day',
      dateValue: '',
      dateType: 'Day',
      echartType: 'power' // 默认显示功率图表
    }
  },
  computed: {
    disabledDate () {
      return this.dateValue.getTime() > Date.now()
    }
  },
  created () {
    this.setDefaultTime()
  },
  mounted () {

  },
  methods: {
    echartChange (type) {

    },
    selectDateType (command) {
      this.dateType = command
      this.setDefaultTime()
    },
    setDefaultTime () {
      let dateP = this.dateType === 'Day' ? 'yyyy-MM' : 'yyyy'
      this.dateValue = formatDate(new Date(), dateP)
    },
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
    },
    checkMonth (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
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
</style>
