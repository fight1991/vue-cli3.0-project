<template>
  <el-form size="mini" :model="dataForm" label-position="left" label-width="150px" :rules="rules">
    <el-row :gutter="10" v-if="next">
      <!-- 安装商名称 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="installer name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 代理商名称 -->
      <el-col :span="12" v-if="tag===2">
        <el-form-item label="agent name" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择代理商 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="select Agent" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 厂商联系人 -->
      <el-col :span="12" v-if="tag===2">
        <el-form-item label="factory contact" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="area" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 安装商简称 -->
      <el-col :span="12" v-if="tag===1">
        <el-form-item label="installer abbreviation" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <!-- 代理商简称 -->
      <el-col :span="12" v-if="tag===2">
        <el-form-item label="agent abbreviation" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="full address" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="contact" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="email" prop="aa">
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
    <!-- 个人信息录入 -->
    <el-row :gutter="10" v-else>
      <el-col :span="12">
        <el-form-item label="contact" prop="aa">
          <el-input v-model="dataForm.aa"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="mobile phone" prop="aa">
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
