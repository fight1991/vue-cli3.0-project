<template>
  <section class="sys-main">
    <show-item></show-item>
    <!-- 表格区域 -->
    <div class="list-container bg-c">
      <div class="title border-line">电站列表</div>
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm" :inline="true">
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="choose">
              <el-option v-for="item in statusList" :label="item.label" :value="item.status" :key="item.status"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="plant name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="search">reset</el-button>
            <el-button type="primary" size="mini" @click="search">search</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <func-bar>
        <common-table :tableHeadData="plantTableHead" :border="false" :tableList="resultList">
          <template v-slot:status="{row}">
            <i class="el-icon-warning" v-show="row.status === 1"></i>
            <i class="el-icon-success" v-show="row.status === 2"></i>
          </template>
          <template v-slot:createdDate="{row}">
              {{ row.createdDate | formatDate }}
            </template>
          <template v-slot:op="{row}">
            <div class="flex-between table-op-btn">
              <i title="look" class="iconfont icon-look" @click="goToDetail('look',row.stationID)"></i>
              <i title="edit" class="iconfont icon-edit" @click="goToDetail('edit',row.stationID)"></i>
              <i title="delete" class="iconfont icon-delete" @click="deletePlant(row.stationID)"></i>
            </div>
          </template>
        </common-table>
      </func-bar>
      <div class="states-row flex-between">
        <span><i class="el-icon-success"></i> Normal: 8</span>
        <span><i class="el-icon-warning"></i> Glitch: 8</span>
      </div>
      <page-box :pagination="pagination" @change="getPlantList"></page-box>
    </div>
  </section>
</template>
<script>
import showItem from '../components/showItem'
import plantTableHead from './plantTableHead'
export default {
  components: {
    showItem
  },
  mixins: [plantTableHead],
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
          age: 18,
          city: 33333,
          stationID: '1'

        },
        {
          name: 'ls',
          age: 133,
          stationID: '2'
        }
      ]
    }
  },
  created () {
    console.log(this.test)
  },
  methods: {
    search () {
      this.getPlantList(this.$store.pagination)
    },
    reset () {
      this.searchForm = {
        status: 0,
        name: ''
      }
    },
    // 获取电站列表
    getPlantList (pagination) {
      this.$post({
        url: '/plant/list',
        data: {
          ...pagination,
          condition: this.searchForm
        },
        success: ({ result }) => {
          if (result) {
            this.pagination.totalPages = result.totalPages
            this.tableData = result.stations || []
          }
        }
      })
    },
    // 电站删除
    async deletePlant (id) {
      let res = await this.$confirm('Are you sure you want to delete it?', 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => true).catch(() => false)
      if (!res) return
      this.$post({
        url: '/plant/delete',
        data: {
          stationID: id
        },
        success: () => {
          this.$message.success('succcessful')
          this.search()
        }
      })
    },
    // 页面跳转
    goToDetail (type, id) {
      if (type === 'look') {
        this.$router.push({
          name: 'bus-plant-detail',
          query: {
            plantId: id,
            opType: 'look',
            tabId: this.$route.name + 'look' + id
          }
        })
      } else {
        this.$router.push({
          name: 'bus-plant-edit',
          query: {
            plantId: id,
            opType: 'edit',
            tabId: this.$route.name + 'edit' + id
          }
        })
      }
    },
    // 定义表头溢出省略号
    renderHead (h, { column }) {
      return (
        <el-tooltip
          class="text-cut"
          effect="dark"
          content={column.label}
          placement="top"
        >
          <div>{column.label}</div>
        </el-tooltip>
      )
    },
    // 普通显示
    renderCommon (h, { column }) {
      return column.label
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
  width: 150px;
  font-size: 12px;
  padding: 10px;
}
.el-icon-warning {
  color: #E6A23C;
}
.el-icon-success {
  color: #67C23A;
}
</style>
