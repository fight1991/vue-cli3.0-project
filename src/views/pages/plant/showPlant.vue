<template>
  <section class="sys-main">
    <show-item></show-item>
    <!-- 表格区域 -->
    <div class="list-container bg-c">
      <div class="title border-line">电站列表</div>
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
            <el-button size="mini" @click="search">重置</el-button>
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <func-bar>
        <el-table :data="tableData" :max-height="400" size="mini">
          <el-table-column align="center" label="状态" prop="name"></el-table-column>
          <el-table-column align="center" label="电站" prop="age"></el-table-column>
          <el-table-column align="center" label="装机容量" prop="age"></el-table-column>
          <el-table-column align="center" label="发电功率" prop="age"></el-table-column>
          <el-table-column align="center" label="今日发电量" prop="age"></el-table-column>
          <el-table-column align="center" label="更多" prop="age"></el-table-column>
        </el-table>
      </func-bar>
      <page-box :pagination="pagination"></page-box>
    </div>
  </section>
</template>
<script>
import showItem from '../components/showItem'
export default {
  components: {
    showItem
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
</style>
