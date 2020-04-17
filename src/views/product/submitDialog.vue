<template>
  <el-dialog
    class="sys-dialog"
    :title="title"
    :modal-append-to-body="false"
    @opened="dialogOpen"
    @close="closeDialog"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <create-form ref="form" :tag="$attrs.tag" :organList="organList" v-if="type=='add'"></create-form>
      <join-form ref="form" :tag="$attrs.tag" :organList="organList" v-else></join-form>
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
      organList: [], // 组织列表
      access: {
        user: 1,
        installer: 2,
        agent: 3
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
    dialogOpen () {
      // 新增安装商,查询代理商, 加入安装商,查询安装商
      if (this.$attrs.tag === 'installer') {
        this.type === 'add' ? this.getOrgansList('agent') : this.getOrgansList('installer')
      }
      this.cancelForm()
    },
    cancelForm () {
      this.$refs.form.clearValidate()
      this.$refs.form.cancel()
    },
    // 获取组织列表
    async getOrgansList (tag) {
      let { result } = await this.$axios({ url: '/v0/organs/list', data: { organType: tag } })
      this.organList = result || []
    },
    // 创建 installer agent // 加入user agent installer
    register () {
      let flag = true
      this.$refs.form.$refs.dataForm.validate(valid => {
        flag = valid
      })
      if (!flag) return
      let submitData = this.$refs.form.dataForm
      let phone = submitData.details.area + '-' + submitData.details.phone
      submitData.details.phone = phone
      submitData.organType = this.$attrs.tag
      let url = this.type === 'add' ? 'v0/organs/register' : 'v0/organs/join'
      this.$post({
        url: url,
        data: submitData,
        success: res => {
          let access = this.access[this.$attrs.tag]
          this.$store.commit('setAccess', access)
          this.$message.success('successful, require a re-login')
          this.dialogVisible = false
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
