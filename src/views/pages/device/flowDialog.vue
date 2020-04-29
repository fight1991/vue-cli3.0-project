<template>
  <el-dialog
    class="sys-dialog"
    title="实时数据"
    :modal-append-to-body="false"
    @opened="search"
    @close="closeDialog"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <func-bar>
        <el-table size="mini" :height="400" :data="resultList" border>
          <el-table-column label="Type" prop="alarmType"></el-table-column>
          <el-table-column label="Code" prop="code"></el-table-column>
          <el-table-column label="Content" prop="content"></el-table-column>
          <el-table-column label="Reporting time" prop="time">
            <template slot-scope="scope">
              {{ scope.row.time | formatDate}}
            </template>
          </el-table-column>
        </el-table>
        <!-- <page-box :pagination.sync="pagination" @change="getList"></page-box> -->
      </func-bar>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      resultList: [],
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
    search () {
      this.getList(this.$store.state.pagination)
    },
    async getList (pagination) {}
  }
}
</script>
<style lang="less" scoped>

</style>
