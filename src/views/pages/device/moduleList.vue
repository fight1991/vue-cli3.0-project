<template>
  <section class="sys-main bg-c">
    <!-- 查询区域 -->
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm">
          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.moduleSN" placeholder="module sn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select style="width:100%" v-model="searchForm.communication" placeholder="choose">
                  <el-option v-for="item in statusList" :label="item.label" :value="item.status" :key="item.status"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select style="width:100%" v-model="searchForm.moduleType" placeholder="type">
                  <el-option v-for="(item,index) in typeList" :label="item" :value="item" :key="item + index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-button size="mini" @click="reset">reset</el-button>
              <el-button type="primary" size="mini" @click="search">search</el-button>
            </el-col>
          </el-row>
        </el-form>
      </search-bar>
      <!-- 表格区域 -->
      <func-bar>
        <el-row class="table-btn" type="flex" justify="end">
          <el-dropdown @command="commandDrop" trigger="click">
            <el-button size="mini" icon="iconfont icon-import" :disabled="false" @click="importMulti">Import</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="d">模板下载</el-dropdown-item>
              <el-upload
                class="dropDown-upload"
                :before-upload="beforeUpload"
                action="http://127.0.0.1">
                <el-dropdown-item command="e" divided>导入</el-dropdown-item>
              </el-upload>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" icon="iconfont icon-unbind" :disabled="access!=255" @click="unbindMulti">Unbind</el-button>
        </el-row>
        <common-table :tableHeadData="tableHead" @select="getSelection" :selectBox="access==255" :tableList="resultList">
          <template v-slot:status="{row}">
            <i class="el-icon-success"></i>
            <i class="el-icon-remove"></i>
          </template>
        </common-table>
      </func-bar>
      <div class="states-row flex-between">
        <span><i class="el-icon-success"></i> Normal</span>
        <span><i class="el-icon-remove"></i> Offline</span>
      </div>
      <page-box :pagination.sync="pagination" @change="getModuleList"></page-box>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      selection: [],
      statusList: [
        { status: 0, label: 'all' },
        { status: 1, label: 'online' },
        { status: 2, label: 'offline' }
      ],
      searchForm: {
        communication: 0,
        moduleSN: '',
        moduleType: ''
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
      typeList: [],
      tableHead: [
        {
          label: 'DataCollector SN',
          prop: 'moduleSN',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Type',
          prop: 'moduleType',
          checked: true
        },
        {
          label: 'Plant',
          prop: 'plantName',
          checked: true
        },
        {
          label: 'Software version',
          prop: 'version',
          checked: true
        },
        {
          label: 'Signal',
          prop: 'signal',
          checked: true
        },
        {
          label: 'Status',
          prop: 'communication',
          checked: true,
          slotName: 'status'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      access: state => state.access
    }),
    bindIds () {
      return this.selection.map(v => {
        return {
          moduleSN: v.moduleSN,
          stationID: v.stationID
        }
      })
    }
  },
  created () {
    this.getModuleTypeList()
    this.search()
  },
  methods: {
    getSelection (select) {
      this.selection = select
    },
    resetSearchForm () {
      this.searchForm = {
        communication: 0,
        moduleSN: '',
        moduleType: ''
      }
    },
    reset () {
      this.resetSearchForm()
      this.search()
    },
    search () {
      this.getModuleList(this.$store.state.pagination)
    },
    commandDrop () {

    },
    // 批量导入
    importMulti () {
      // /module/import
    },
    // 批量解绑
    async unbindMulti () {
      let { result } = await this.$axios({
        url: '/v0/module/disable',
        data: {
          modules: this.bindIds
        }
      })
      if (result) {
        this.search()
      }
    },
    // 获取模块类型列表
    async getModuleTypeList () {
      let { result: { types } } = await this.$axios({
        url: '/v0/module/types'
      })
      this.typeList = types || []
    },
    // 获取模块列表
    async getModuleList (pagination) {
      let { result } = await this.$axios({
        url: '/v0/module/list',
        data: {
          ...pagination,
          condition: this.searchForm
        }
      })
      if (result) {
        this.resultList = result.data || []
        this.pagination.total = result.total
        this.pagination.currentPage = result.currentPage
        this.pagination.pageSize = result.pageSize
      }
    },
    beforeUpload (file) {
      // excel 或 .csv格式
      let excelType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      if (!excelType.includes(file.type)) {
        this.$message({
          message: 'invalid file type',
          type: 'error'
        })
        return false
      }
      let param = new FormData()
      param.append('file', file, file.name)
      // 文件上传请求
      this.$upload({
        url: '/v0/module/import',
        data: {},
        success: res => {}
      })
    }
  }
}
</script>
<style lang="less" scoped>
.states-row {
  display: inline-block;
  font-size: 12px;
  padding: 10px 0 0 10px;
  span {
    margin-right: 15px;
  }
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
