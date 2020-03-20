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
            <el-input v-model="searchForm.name" placeholder="inverter sn"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="search">reset</el-button>
            <el-button type="primary" size="mini" @click="search">search</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <!-- 列表查询区域 -->
      <func-bar>
        <common-table :tableHeadData="deviceTableHead" :border="false" :tableList="resultList">
          <template v-slot:status="{row}">
            <i class="el-icon-warning"></i>
            <i class="el-icon-success"></i>
            <i class="el-icon-error"></i>
            <i class="el-icon-remove"></i>
          </template>
        </common-table>
      </func-bar>
      <div class="states-row flex-between">
        <span><i class="el-icon-success"></i> Normal: 8</span>
        <span><i class="el-icon-warning"></i> alarm: 8</span>
        <span><i class="el-icon-error"></i> Glitch: 8</span>
        <span><i class="el-icon-remove"></i> offline: 8</span>
      </div>
      <page-box :pagination="pagination"></page-box>
    </div>
  </section>
</template>
<script>
import deviceTableHead from './deviceTableHead'
export default {
  mixins: [deviceTableHead],
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
        totalPages: 40
      },
      resultList: [
        {
          name: 'zs',
          age: 18
        },
        {
          name: 'ls',
          age: 133
        }
      ]
    }
  },
  methods: {
    search () {

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
  padding: 10px;
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
