<template>
  <section class="sys-main">
    <!-- 查询区域 -->
    <div class="list-container bg-c">
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm" :inline="true">
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="choose">
              <el-option v-for="item in statusList" :label="item.label" :value="item.status" :key="item.status"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.deviceSN" placeholder="inverter sn"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="searchForm">reset</el-button>
            <el-button type="primary" size="mini" @click="search">search</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <!-- 列表查询区域 -->
      <func-bar>
        <common-table :tableHeadData="deviceTableHead" :tableList="resultList">
          <template v-slot:status="{row}">
            <i class="el-icon-warning" v-show="row.status==2"></i>
            <i class="el-icon-success" v-show="row.status==1"></i>
            <i class="el-icon-error" v-show="row.status==3"></i>
            <i class="el-icon-remove" v-show="row.status==4"></i>
          </template>
          <template v-slot:feedinDate="{row}">
            {{row.feedinDate | formatDate('yyyy-MM-dd')}}
          </template>
        </common-table>
      </func-bar>
      <div class="states-row flex-between">
        <span><i class="el-icon-success"></i> Normal</span>
        <span><i class="el-icon-warning"></i> Alarm</span>
        <span><i class="el-icon-error"></i> Fault</span>
        <span><i class="el-icon-remove"></i> Offline</span>
      </div>
      <page-box :pagination.sync="pagination" @change="getDeviceList"></page-box>
    </div>
  </section>
</template>
<script>
import deviceTableHead from './deviceTableHead'
export default {
  mixins: [deviceTableHead],
  data () {
    return {
      statusList: [ // 0 全部 1 正常 2 告警 3 故障 4离线
        { status: 0, label: 'all' },
        { status: 1, label: 'normal' },
        { status: 2, label: 'fault' },
        { status: 3, label: 'alarm' },
        { status: 4, label: 'offline' }
      ],
      searchForm: {
        status: 0, // 0 全部 ，1 正常， 2 异常
        batteryMainSN: '',
        deviceSN: '',
        deviceType: '',
        moduleSN: ''
      },
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 40
      },
      resultList: []
    }
  },
  prop: ['plantId'],
  created () {
    this.search()
  },
  methods: {
    search () {
      this.getDeviceList(this.$store.state.pagination)
    },
    resetSearchForm () {
      this.searchForm = {
        status: 0,
        plantName: '',
        deviceSN: '',
        moduleSN: '',
        country: '',
        deviceType: ''
      }
    },
    async getDeviceList (pagination) {
      let pages = pagination || this.$store.state.pagination
      let { result } = await this.$axios({
        url: '/plant/device/list',
        data: {
          ...pages,
          stationID: this.plantId,
          condition: this.searchForm
        }
      })
      if (result) {
        this.pagination.total = result.total
        this.pagination.currentPage = result.currentPage
        this.pagination.pageSize = result.pageSize
        this.resultList = result.devices || []
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  padding: 10px 0px 10px;
  margin-left: 10px;
  border-bottom: 1px solid #f5f5f5;
}
.states-row {
  width: 300px;
  font-size: 12px;
  padding: 10px 0 0 10px;
}
.el-icon-warning {
  color: #E6A23C;
}
.el-icon-success {
  color: #67C23A;
}
.el-icon-error {
  color: #F96867;
}
</style>
