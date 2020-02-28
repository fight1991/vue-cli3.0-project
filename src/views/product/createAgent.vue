<template>
  <el-dialog
    class="sys-dialog"
    title="new agent"
    @close="$emit('update:visible')"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <create-form :tag="2" :next="isNext"></create-form>
    </div>
    <div class="foot-btn flex-center">
      <template v-if="isNext">
        <el-button size="mini" @click="dialogVisible=false">cancel</el-button>
        <el-button size="mini" type="primary" @click="isNext=false">next</el-button>
      </template>
      <template v-else>
        <el-button size="mini" @click="isNext=true">last</el-button>
        <el-button size="mini" type="primary">register</el-button>
      </template>
    </div>
  </el-dialog>
</template>
<script>
import createForm from './component/createForm'
export default {
  components: {
    createForm
  },
  data () {
    return {
      isNext: true,
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
