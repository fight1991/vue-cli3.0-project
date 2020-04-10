<template>
  <el-dialog
    class="sys-dialog"
    title="Abnormal list"
    @opened="dialogOpen"
    @close="closeDialog"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <el-table size="mini" :height="400" :data="resultList" border>
        <el-table-column label="Inverter SN" prop="sn"></el-table-column>
        <el-table-column label="Error code" prop="code"></el-table-column>
        <el-table-column label="Error name" prop="content"></el-table-column>
        <el-table-column label="Reporting time" prop="datetime">
          <template slot-scope="scope">
            {{ scope.row.datetime | formatDate}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      resultList: []
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
    async dialogOpen () {
      let { result } = await this.$axios({
        url: '/v0/plant/alarm/today/detail',
        data: {
          stationID: this.$route.plantId
        }
      })
      this.resultList = result || []
    }
  }
}
</script>
<style lang="less" scoped>

</style>
