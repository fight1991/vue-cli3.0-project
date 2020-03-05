<template>
  <el-form size="mini" :model="dataForm" label-position="left" label-width="120px" :rules="rules">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择安装商 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="Authorizer" prop="aa" label-width="100px">
          <el-input v-model="dataForm.aa" placeholder="Authorized Company or Authorizer"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择代理商 -->
      <el-col :span="12" v-else>
        <el-form-item label="Authorizer" prop="aa" label-width="100px">
          <el-input v-model="dataForm.aa" placeholder="Authorized Company or Authorizer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Country" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Email" prop="aa" label-width="100px">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Address" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Postcode" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MP" prop="aa" label-width="90px">
          <el-input v-model="dataForm.aa" placeholder="mobile number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Introduction" prop="aa">
          <el-input type="textarea" :rows="3" v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Remark" prop="aa">
          <el-input type="textarea" :rows="3" v-model="dataForm.aa"></el-input>
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
        aa: ''
      },
      rules: {
        aa: [{ required: true, message: '' }]
      }
    }
  },
  props: ['tag'],
  methods: {

  }
}
</script>
<style lang="less" scoped>

</style>
