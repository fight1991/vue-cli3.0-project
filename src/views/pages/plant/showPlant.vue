<template>
  <section class="sys-main">
    <show-item ref="plantStatus"></show-item>
    <!-- 表格区域 -->
    <el-card shadow="never">
      <div class="title border-line" slot="header">{{$t('plant.plantsList')}}</div>
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm" :inline="true">
          <el-form-item>
            <el-select v-model="searchForm.status">
              <el-option v-for="item in statusList" :label="$t('common.' + item.label)" :value="item.status" :key="item.status"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.name" :placeholder="$t('common.plantsName')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="reset">{{$t('common.reset')}}</el-button>
            <el-button type="primary" size="mini" @click="search">{{$t('common.search')}}</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <func-bar>
        <common-table :tableHeadData="plantTableHead" :tableList="resultList">
          <template v-slot:status="{row}">
            <i class="el-icon-warning" v-show="Number(row.status) === 0"></i>
            <i class="el-icon-success" v-show="Number(row.status) === 1"></i>
          </template>
          <template v-slot:createdDate="{row}">
              {{ Number(row.createdDate) | formatDate('yyyy-MM-dd HH:mm') }}
            </template>
          <template v-slot:op="{row}">
            <div class="flex-center table-op-btn">
              <i title="look" class="iconfont icon-look" @click="goToDetail('look',row)"></i>
              <i title="edit" class="iconfont icon-edit" v-if="username==row.owner" @click="goToDetail('edit',row)"></i>
              <i title="delete" class="iconfont icon-delete" v-if="username==row.owner" @click="deletePlant(row.stationID)"></i>
            </div>
          </template>
        </common-table>
        <div class="states-row">
          <span><i class="el-icon-success"></i> {{$t('common.normal')}}</span>
          <span><i class="el-icon-warning"></i> {{$t('common.abnormal')}}</span>
        </div>
        <page-box :pagination.sync="pagination" @change="getPlantList"></page-box>
      </func-bar>
    </el-card>
  </section>
</template>
<script>
import showItem from '../components/showItem'
import plantTableHead from './plantTableHead'
import plantStore from './plantStore'
import { mapState } from 'vuex'
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
        total: 40
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
    this.search()
    this.$store.registerModule('plant-module', plantStore)
  },
  computed: {
    ...mapState({
      username: state => state.userInfo.user
    })
  },
  mounted () {
    this.$refs.plantStatus.getPlantStatus()
  },
  beforeDestroy () {
    this.$store.unregisterModule('plant-module')
  },
  methods: {
    search () {
      this.getPlantList(this.$store.state.pagination)
    },
    reset () {
      this.searchForm = {
        status: 0,
        name: ''
      }
      this.search()
    },
    // 获取电站列表
    getPlantList (pagination) {
      this.$post({
        url: '/v0/plant/list',
        data: {
          ...pagination,
          condition: this.searchForm
        },
        success: ({ result }) => {
          if (result) {
            this.pagination.total = result.total
            this.pagination.currentPage = result.currentPage
            this.pagination.pageSize = result.pageSize
            this.resultList = result.plants || []
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
        url: '/v0/plant/delete',
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
    goToDetail (type, row) {
      if (type === 'look') {
        let { country, city, name } = row
        this.$store.commit('plant-module/setCountryAndCity', { country, city, plantName: name })
        this.$router.push({
          name: 'bus-plant-detail',
          query: {
            plantId: row.stationID,
            opType: 'look',
            tabId: this.$route.name + 'look' + row.stationID
          }
        })
      } else {
        this.$router.push({
          name: 'bus-plant-edit',
          query: {
            plantId: row.stationID,
            opType: 'edit',
            tabId: this.$route.name + 'edit' + row.stationID
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
