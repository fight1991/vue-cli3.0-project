<template>
  <el-form ref="dataForm" size="mini" :model="dataForm" label-position="left" label-width="120px" :rules="rules">
    <el-row :gutter="20">
      <!-- 终端用户sn号 -->
      <el-col :span="24" v-if="tag=='user'">
        <el-form-item label="SN" prop="moduleSN" label-width="80px">
          <el-input v-model="dataForm.moduleSN" placeholder="sn"></el-input>
        </el-form-item>
      </el-col>
      <!-- 安装商选择代理商 多选 -->
      <el-col :span="24" v-if="tag=='installer'">
        <el-form-item label="Authorizer" prop="organNameM" label-width="100px">
          <el-select
            class="agent-multi"
            :popper-append-to-body="false"
            v-model="dataForm.organNameM"
            multiple
            collapse-tags
            placeholder="Authorized Company or Authorizer" style="width:100%;">
            <el-option v-for="(item, index) in organList" :value="item" :key="'index' + index" :label="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 代理商选择代理商 单选 -->
      <el-col :span="24" v-if="tag=='agent'">
        <el-form-item label="Authorizer" prop="organNameS" label-width="100px">
          <el-select v-model="dataForm.organNameS" placeholder="Authorized Company or Authorizer" style="width:100%;">
            <el-option v-for="(item, index) in organList" :value="item" :key="'index' + index" :label="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      dataForm: {
        organNameS: '',
        organNameM: [],
        organType: '',
        moduleSN: ''
      },
      rules: {
        organNameS: [{ required: true, message: '', trigger: 'change' }],
        organNameM: [{ required: true, message: '', trigger: 'change' }],
        moduleSN: [{ required: true, message: '', trigger: 'blur' }]
      }
    }
  },
  props: ['tag', 'organList'],
  created () {},
  methods: {
    copyForm () {
      return {
        organNameS: '',
        organNameM: [],
        organType: '',
        moduleSN: ''
      }
    },
    cancel () {
      this.dataForm = this.copyForm()
    },
    clearValidate () {
      this.$refs.dataForm.clearValidate()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
