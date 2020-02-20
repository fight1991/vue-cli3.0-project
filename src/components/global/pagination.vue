<template>
  <el-col :span="24">
    <el-pagination
      v-if='pagination.total != 0'
      background
      :pager-count= "5"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page.sync="pagination.pageIndex"
      :page-sizes="pageSizes"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </el-col>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
      default: function () {
        return this.$store.state.pagination
      }
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 50, 100, 200]
      }
    }
  },
  data () {
    return {
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  mounted () {
    this.windowsWidth()
    window.addEventListener('resize', this.windowsWidth)
  },
  methods: {
    currentChange (page) {
      this.pagination.pageIndex = page
      this.$emit('change', this.pagination)
      this.$emit('update:pagination', this.pagination)
    },
    sizeChange (size) {
      this.pagination.pageSize = size
      if ((this.pagination.pageIndex - 1) * size > this.pagination.total) {
        this.pagination.pageIndex = 1
      }
      this.$emit('change', this.pagination)
      this.$emit('update:pagination', this.pagination)
    },
    windowsWidth () {
      if (document.documentElement.clientWidth < 768) {
        this.layout = 'prev, pager, next'
      } else {
        this.layout = 'total, sizes, prev, pager, next, jumper'
      }
    }
  }
}
</script>
