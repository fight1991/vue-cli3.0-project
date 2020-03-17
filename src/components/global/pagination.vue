<template>
  <div class="pagination flex-between">
    <span>显示第{{pagination.currentPage}}-{{pagination.pageSize}}条结果,共{{pagination.totalPages}}条(每页显示{{pagination.pageSize}}条)</span>
    <el-pagination
      v-if='pagination.totalPages != 0'
      background
      :small="small"
      :pager-count= "5"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page.sync="pagination.currentPage"
      :page-sizes="pageSizes"
      :page-size="pagination.pageSize"
      :total="pagination.totalPages"
      :layout="layout">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    small: {
      default: true
    },
    layout: {
      default: () => { // total, sizes, prev, pager, next, jumper
        return 'prev, pager, next'
      }
    },
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

    }
  },
  mounted () {
    // this.windowsWidth()
    // window.addEventListener('resize', this.windowsWidth)
  },
  methods: {
    currentChange (page) {
      this.pagination.currentPage = page
      this.$emit('change', this.pagination)
      this.$emit('update:pagination', this.pagination)
    },
    sizeChange (size) {
      this.pagination.pageSize = size
      if ((this.pagination.currentPage - 1) * size > this.pagination.totalPages) {
        this.pagination.currentPage = 1
      }
      this.$emit('change', this.pagination)
      this.$emit('update:pagination', this.pagination)
    }
    // windowsWidth () {
    //   if (document.documentElement.clientWidth < 768) {
    //     this.layout = 'prev, pager, next'
    //   } else {
    //     this.layout = 'total, sizes, prev, pager, next, jumper'
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>

</style>
