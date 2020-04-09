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
                <el-select style="width:100%" v-model="searchForm.status" placeholder="choose">
                  <el-option v-for="item in statusList" :label="item.label" :value="item.status" :key="item.status"></el-option>
                </el-select>
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
      <!-- 表格区域 -->
      <func-bar>
        <el-row class="table-btn" type="flex" justify="end">
          <el-button size="mini" icon="iconfont icon-import" @click="importMulti">Import</el-button>
          <el-button size="mini" icon="iconfont icon-unbind" @click="unbindMulti">Unbind</el-button>
        </el-row>
        <common-table :tableHeadData="tableHead" @select="getSelection" :selectBox="true" :tableList="resultList">
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
export default {
  data () {
    return {
      selection: [],
      statusList: [
        { status: 0, label: 'all' },
        { status: 1, label: 'online' },
        { status: 4, label: 'offline' }
      ],
      searchForm: {
        status: 0,
        moduleSN: '',
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
      },
      tableHead: [
        {
          label: 'DataCollector SN',
          prop: 'moduleSN',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Type',
          prop: 'deviceType',
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
          prop: 'status',
          checked: true,
          slotName: 'status'
        }
      ]
    }
  },
  computed: {
    deviceId () {
      return this.selection.map(v => v.deviceID)
    }
  },
  created () {
    this.search()
  },
  methods: {
    getSelection (select) {
      this.selection = select
    },
    resetSearchForm () {
      this.searchForm = {
        status: 0,
        moduleSN: '',
        deviceType: ''
      }
    },
    reset () {
      this.resetSearchForm()
      this.search()
    },
    search () {
      this.getModuleList(this.$store.state.pagination)
    },
    // 批量导入
    importMulti () {

    },
    // 批量解绑
    unbindMulti () {

    },
    // 获取模块列表
    getModuleList () {

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
