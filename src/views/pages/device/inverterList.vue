<template>
  <section class="sys-main">
    <!-- 查询区域 -->
    <div class="list-container bg-c">
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm">
          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item>
                <el-select style="width:100%" v-model="searchForm.status" placeholder="choose">
                  <el-option v-for="item in statusList" :label="item.label" :value="item.status" :key="item.status"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.plantName" placeholder="plant name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.deviceSN" placeholder="inverter sn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.moduleSN" placeholder="module sn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.country" placeholder="country"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.deviceType" placeholder="type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-button size="mini" @click="reset">reset</el-button>
              <el-button type="primary" size="mini" @click="search">search</el-button>
            </el-col>
          </el-row>
        </el-form>
      </search-bar>
      <!-- 列表查询区域 -->
      <func-bar>
        <el-row class="table-btn" type="flex" justify="end">
          <el-button size="mini" icon="el-icon-plus">New</el-button>
          <el-button size="mini" icon="el-icon-delete">Delete</el-button>
        </el-row>
        <common-table :tableHeadData="inverterTableHead" :selectBox="true" :tableList="resultList">
          <template v-slot:status="{row}">
            <i class="el-icon-warning" v-show="row.status==3"></i>
            <i class="el-icon-success" v-show="row.status==1"></i>
            <i class="el-icon-error" v-show="row.status==2"></i>
            <i class="el-icon-remove" v-show="row.status==4"></i>
          </template>
          <template v-slot:feedinDate="{row}">
            {{Number(row.feedinDate )| formatDate('yyyy-MM-dd')}}
          </template>
          <template v-slot:op="{row}">
            <div class="flex-center table-op-btn">
              <i title="look" class="iconfont icon-look" @click="goToDetail"></i>
            </div>
          </template>
        </common-table>
      </func-bar>
      <div class="states-row flex-between">
        <span><i class="el-icon-success"></i> Normal: {{statusAll.normal}}</span>
        <span><i class="el-icon-warning"></i> Alarm: {{statusAll.warning}}</span>
        <span><i class="el-icon-error"></i> Glitch: {{statusAll.fault}}</span>
        <span><i class="el-icon-remove"></i> Offline: {{statusAll.offline}}</span>
      </div>
      <page-box :pagination="pagination" @change="getInverterList"></page-box>
    </div>
  </section>
</template>
<script>
import inverterTableHead from './inverterTableHead'
export default {
  mixins: [inverterTableHead],
  data () {
    return {
      statusList: [
        { status: 0, label: 'all' },
        { status: 1, label: 'normal' },
        { status: 2, label: 'fault' },
        { status: 3, label: 'alarm' },
        { status: 4, label: 'offline' }
      ],
      searchForm: {
        status: 0,
        plantName: '',
        deviceSN: '',
        moduleSN: '',
        country: '',
        deviceType: ''
      },
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 40
      },
      resultList: [
        { age: 11 },
        { age: 11 }
      ],
      statusAll: {
        normal: 0,
        warning: 0,
        fault: 0,
        offline: 0
      }
    }
  },
  created () {
    this.search()
    this.getStatusAll()
  },
  methods: {
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
    reset () {
      this.resetSearchForm()
      this.search()
    },
    search () {
      this.getInverterList(this.$store.state.pagination)
    },
    goToDetail (id) {
      this.$router.push('/bus/device/inverter/1111')
    },
    // 获取列表
    getInverterList (pagination) {
      this.$post({
        url: '/v0/device/list',
        data: {
          ...pagination,
          condition: this.searchForm
        },
        success: ({ result }) => {
          if (result) {
            this.pagination.total = result.total
            this.pagination.currentPage = result.currentPage
            this.pagination.pageSize = result.pageSize
            this.resultList = result.devices || []
          }
        }
      })
    },
    // 获取所有逆变器状态
    async getStatusAll () {
      let { result } = await this.$axios({
        url: 'v0/device/status/all'
      })
      if (result) {
        // this.statusAll = result
      }
    },
    // 删除逆变器
    async deleteInverter () {
      let { result } = await this.$axios({
        url: '​/device​/delete',
        method: 'post',
        data: {}
      })
      if (result) {
        this.$message.success('successful')
      }
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
