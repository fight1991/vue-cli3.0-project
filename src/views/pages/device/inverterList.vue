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
                <el-input v-model="searchForm.name" placeholder="plant name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.name" placeholder="inverter sn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.name" placeholder="module sn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.name" placeholder="country"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.name" placeholder="type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-button size="mini" @click="search">reset</el-button>
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
            <i class="el-icon-warning"></i>
            <i class="el-icon-success"></i>
            <i class="el-icon-error"></i>
            <i class="el-icon-remove"></i>
          </template>
          <template v-slot:op="{row}">
            <div class="flex-center table-op-btn">
              <i title="look" class="iconfont icon-look" @click="goToDetail"></i>
            </div>
          </template>
        </common-table>
      </func-bar>
      <div class="states-row flex-between">
        <span><i class="el-icon-success"></i> Normal: 8</span>
        <span><i class="el-icon-warning"></i> Alarm: 8</span>
        <span><i class="el-icon-error"></i> Glitch: 8</span>
        <span><i class="el-icon-remove"></i> Offline: 8</span>
      </div>
      <page-box :pagination="pagination"></page-box>
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
        { status: 2, label: 'abnormal' }
      ],
      searchForm: {
        status: 0, // 0 全部 ，1 正常， 2 异常
        name: ''
      },
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 40
      },
      resultList: [
        { age: 11 },
        { age: 11 }
      ]
    }
  },
  methods: {
    search () {

    },
    goToDetail (id) {
      this.$router.push('/bus/device/inverter/1111')
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
