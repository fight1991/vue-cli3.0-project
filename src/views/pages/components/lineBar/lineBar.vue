<template>
  <div class="power bg-c">
    <div class="header flex-between pd10">
      <div class="btn">
        <el-radio-group v-model="echartType" size="mini" @change="echartChange">
          <slot name="radioBtn"></slot>
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
      <el-echart :datas="echartData[echartType]" height="350px"></el-echart>
    </div>
    <div v-show="echartType==='list'">
      <slot name="other"></slot>
    </div>
  </div>
</template>
<script>
import echartData from './echartData'
import { formatDate } from '@/util'
export default {
  mixins: [echartData],
  data () {
    return {
      dateValue: '',
      dateType: 'Day',
      echartType: 'power', // 默认显示功率图表
      echartUrl: {
        Hours: '/v0/plant/history/single/report/day', // 日报表url // 获取每个小时
        Day: '/v0/plant/history/single/report/month', // 月报表url 获取每天数据
        Month: '/v0/plant/history/single/report/year' // 年报表url 获取每个月内数据
      }
    }
  },
  computed: {

  },
  props: ['plantId'],
  created () {
    if (this.plantId) {
      this.getLineData()
      this.getBarData()
    }
    this.setDefaultTime()
  },
  mounted () {

  },
  methods: {
    echartChange (type) {

    },
    // 切换日期控件类型
    selectDateType (command) {
      this.dateType = command
      this.setDefaultTime()
      this.getBarData()
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
      this.getBarData()
    },
    // 小于10补0
    checkMonth (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    // 折现图表数据功率
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
      return true
    },
    // 柱状图表数据;电量统计
    async getBarData () {
      let dateArr = this.dateValue.split('-')
      let { result } = await this.$axios({
        url: this.echartUrl[this.dateType],
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
      return true
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
