<template>
  <el-form size="mini" :model="dataForm" label-position="left" label-width="120px" :rules="rules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="contact" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择安装商 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="select installer" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择代理商 -->
      <el-col :span="12" v-else>
        <el-form-item label="select Agent" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="area" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="email" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="full address" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="postal code" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="mobile phone" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="profile" prop="aa">
          <el-input type="textarea" :rows="3" v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="remarks" prop="aa">
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
