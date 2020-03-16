<template>
  <section class="sys-main">
    <!-- 查询区域 -->
    <div class="list-container bg-c">
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm" :inline="true">
          <el-form-item>
            <el-select v-model="searchForm.aa">
              <el-option label="所有" :value="1" :key="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.bb" placeholder="电站名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="search">reset</el-button>
            <el-button type="primary" size="mini" @click="search">search</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <!-- 列表查询区域 -->
      <func-bar>
        <el-table :data="tableData" :max-height="400" size="mini">
          <el-table-column align="center" label="逆变器sn" prop="age"></el-table-column>
          <el-table-column align="center" label="模块sn" prop="age"></el-table-column>
          <el-table-column align="center" label="电站" prop="age"></el-table-column>
          <el-table-column align="center" label="账户" prop="age"></el-table-column>
          <el-table-column align="center" label="机型" prop="age"></el-table-column>
          <el-table-column align="center" label="发电功率" prop="age"></el-table-column>
          <el-table-column align="center" label="近日发电量" prop="age"></el-table-column>
          <el-table-column align="center" label="累计发电量" prop="age"></el-table-column>
          <el-table-column align="center" label="并网时间" prop="age"></el-table-column>
          <el-table-column align="center" label="国家" prop="age"></el-table-column>
          <el-table-column align="center" label="设备状态" prop="age">
            <template>
              <i class="el-icon-warning"></i>
              <i class="el-icon-success"></i>
              <i class="el-icon-error"></i>
              <i class="el-icon-remove"></i>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" prop="age" width="100px" fixed="right">
            <template slot-scope="scope">
              <div class="flex-between table-op-btn">
                <i title="look" class="iconfont icon-look" @click="goToDetail('look',scope.row.id)"></i>
                <i title="edit" class="iconfont icon-edit" @click="goToDetail('edit',scope.row.id)"></i>
                <i title="delete" class="iconfont icon-delete" @click="deletePlant(scope.row.id)"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
export default {
  components: {

  },
  data () {
    return {
      searchForm: {
        aa: '',
        bb: ''
      },
      pagination: {
        pageSize: 10,
        pageIndex: 1,
        total: 40
      },
      tableData: [
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
