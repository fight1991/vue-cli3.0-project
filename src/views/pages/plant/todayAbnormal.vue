<template>
  <el-dialog
    class="sys-dialog"
    title="Abnormal list"
    :modal-append-to-body="false"
    @opened="search"
    @close="closeDialog"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <search-bar>
        <el-form size="mini" label-width="0px" :model="searchForm" :inline="true">
          <el-form-item v-if="type==='plant'">
            <el-input v-model="searchForm.deviceSN" placeholder="inverter sn"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.alarmType" :placeholder="$t('common.alarmType')">
              <el-option v-for="item in alarmTypeList" :label="$t('common.' + item.label)" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="reset">{{$t('common.reset')}}</el-button>
            <el-button type="primary" size="mini" @click="search">{{$t('common.search')}}</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <func-bar>
        <el-table size="mini" :height="400" :data="resultList" border>
          <el-table-column label="Inverter SN" prop="deviceSN" v-if="type==='plant'"></el-table-column>
          <el-table-column label="Type" prop="alarmType"></el-table-column>
          <el-table-column label="Code" prop="code"></el-table-column>
          <el-table-column label="Content" prop="content"></el-table-column>
          <el-table-column label="Reporting time" prop="time">
            <template slot-scope="scope">
              {{ scope.row.time | formatDate}}
            </template>
          </el-table-column>
        </el-table>
      </func-bar>
      <page-box :pagination.sync="pagination" @change="getList"></page-box>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      resultList: [],
      searchForm: {
        deviceSN: '',
        alarmType: 0
      },
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 40
      },
      alarmTypeList: [
        {
          value: 0,
          label: 'all'
        }, {
          value: 1,
          label: 'common'
        }, {
          value: 2,
          label: 'pvBus'
        }, {
          value: 3,
          label: 'powerGrid'
        }, {
          value: 4,
          label: 'temper'
        }, {
          value: 5,
          label: 'cpu'
        }, {
          value: 6,
          label: 'eps'
        }, {
          value: 7,
          label: 'peri'
        }, {
          value: 8,
          label: 'alarm'
        }
      ]
    }
  },
  props: {
    visible: {
      default: false
    },
    type: {
      default: 'plant'
    }
  },
  watch: {
    visible: function (newData) {
      this.dialogVisible = newData
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    },
    reset () {
      this.searchForm = {
        deviceSN: '',
        alarmType: 0
      }
    },
    search () {
      this.getList(this.$store.state.pagination)
    },
    async getList (pagination) {
      let params = {}
      if (this.type === 'plant') {
        params.stationID = this.$attrs.id
      } else {
        params.deviceID = this.$attrs.id
      }
      let { result } = await this.$axios({
        method: 'post',
        url: `/v0/${this.type}/alarm/today/detail`,
        data: {
          ...params,
          ...pagination,
          condition: this.searchForm
        }
      })
      if (result) {
        this.pagination.total = result.total
        this.pagination.currentPage = result.currentPage
        this.pagination.pageSize = result.pageSize
        this.resultList = result.data || []
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
