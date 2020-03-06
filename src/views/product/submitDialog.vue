<template>
  <el-dialog
    class="sys-dialog"
    :title="title"
    @opened="cancelForm"
    @close="closeDialog"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <create-form ref="form" :tag="tag" v-if="type=='add'"></create-form>
      <join-form ref="form" :tag="tag" v-else></join-form>
    </div>
    <div class="foot-btn flex-center">
      <el-button size="mini" @click="cancelForm">cancel</el-button>
      <el-button size="mini" type="primary" @click="register">register</el-button>
    </div>
  </el-dialog>
</template>
<script>
import createForm from './component/createForm'
import joinForm from './component/joinForm'
export default {
  components: {
    createForm,
    joinForm
  },
  data () {
    return {
      dialogVisible: false,
      rules: {
        aa: [{ required: true, message: '' }]
      }
    }
  },
  props: {
    visible: {
      default: false
    },
    title: {
      default: ''
    },
    tag: {
      default: ''
    },
    type: {
      default: 'add'
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
    cancelForm () {
      this.$refs.form.clearValidate()
      this.$refs.form.cancel()
    },
    // 创建 installer agent // 加入user agent installer
    register () {
      let flag = true
      this.$refs.form.$refs.dataForm.validate(valid => {
        flag = valid
      })
      if (!flag) return
      let submitData = this.$refs.form.dataForm
      submitData.organType = this.tag
      let url = this.tag === 'add' ? '/organs/register' : '/organs/join'
      this.$post({
        url: url,
        data: submitData,
        success: res => {
          this.$message.success('successful')
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
