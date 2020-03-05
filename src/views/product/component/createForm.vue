<template>
  <el-form size="mini" :model="dataForm" label-position="left" label-width="140px" :rules="rules">
    <el-row :gutter="20" v-if="next">
      <!-- 安装商名称 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="Company Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 代理商名称 -->
      <el-col :span="12" v-if="tag===2">
        <el-form-item label="Company Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择代理商 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="Authorizer" prop="aa">
          <el-input v-model="dataForm.aa" placeholder="Authorized Company or Authorizer"></el-input>
        </el-form-item>
      </el-col>
      <!-- 厂商联系人 -->
      <el-col :span="12" v-if="tag===2">
        <el-form-item label="Authorizer" prop="aa">
          <el-input v-model="dataForm.aa" placeholder="Authorized Company or Authorizer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Country" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 安装商简称 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="Short Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 代理商简称 -->
      <el-col :span="12" v-if="tag===2">
        <el-form-item label="Short Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Address" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Email" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Postcode" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MP" prop="aa">
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
    <!-- 个人信息录入 -->
    <el-row :gutter="20" v-else>
      <el-col :span="12">
        <el-form-item label="Name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MP" prop="aa" label-width="60px">
          <el-input v-model="dataForm.aa" placeholder="mobile phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Country" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Email" prop="aa" label-width="60px">
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
      dataForm: {
        aa: ''
      },
      rules: {
        aa: [{ required: true, message: '' }]
      }
    }
  },
  props: {
    tag: {
      default: 1
    },
    next: {
      default: true
    }
  }, // tag=1为安装商 tag为2为代理商
  methods: {

  }
}
</script>
<style lang="less" scoped>

</style>
