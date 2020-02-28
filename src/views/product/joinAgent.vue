<template>
  <el-dialog
    class="sys-dialog"
    title="Existing Agent"
    @close="$emit('update:visible')"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <join-form :tag="2"></join-form>
    </div>
    <div class="foot-btn flex-center">
      <el-button size="mini" @click="dialogVisible=false">cancel</el-button>
      <el-button size="mini" type="primary">register</el-button>
    </div>
  </el-dialog>
</template>
<script>
import joinForm from './component/joinForm'
export default {
  components: {
    joinForm
  },
  data () {
    return {
      dialogVisible: false,
      dataForm: {
        aa: ''
      },
      rules: {
        aa: [{ required: true, message: '' }]
      }
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
    }
  }
}
</script>
<style lang="less" scoped>

</style>
