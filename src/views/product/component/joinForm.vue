<template>
  <el-form ref="dataForm" size="mini" :model="dataForm" label-position="left" label-width="120px" :rules="rules">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Name" prop="details.name">
          <el-input v-model="dataForm.details.name"></el-input>
        </el-form-item>
      </el-col>
      <!-- 终端用户sn号 -->
      <el-col :span="12" v-if="tag=='user'">
        <el-form-item label="SN" prop="sn" label-width="100px">
          <el-input v-model="dataForm.sn"></el-input>
        </el-form-item>
      </el-col>
      <!-- 选择安装商/选择代理商 -->
      <el-col :span="12" v-else>
        <el-form-item label="Authorizer" prop="organName" label-width="100px">
          <el-input v-model="dataForm.organName" placeholder="Authorized Company or Authorizer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Country" prop="details.country">
          <el-input v-model="dataForm.details.country"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Email" prop="details.email" label-width="100px">
          <el-input v-model="dataForm.details.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Address" prop="details.address">
          <el-input v-model="dataForm.details.address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Postcode" prop="details.postcode">
          <el-input v-model="dataForm.details.postcode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MP" prop="details.phone" label-width="90px">
          <el-input v-model="dataForm.details.phone" placeholder="mobile number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Introduction" prop="details.introduction">
          <el-input type="textarea" :rows="3" v-model="dataForm.details.introduction"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Remark" prop="details.note">
          <el-input type="textarea" :rows="3" v-model="dataForm.details.note"></el-input>
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
        organName: '',
        organType: '',
        sn: '', // 验证sn号
        details: {
          name: '',
          phone: '',
          email: '',
          country: '',
          address: '',
          postcode: '',
          introduction: '',
          note: ''
        }
      },
      rules: {
        organName: [{ required: true, message: '' }],
        sn: [{ required: true, validator: this.snValid, message: 'SN is required', trigger: 'blur' }],
        'details.name': [{ required: true, message: 'name is required' }],
        'details.phone': [{ required: true, message: 'phone is required' }],
        'details.email': [{ required: true, message: 'email is required' }],
        'details.country': [{ required: true, message: 'country is required' }],
        'details.address': [{ required: true, message: 'address is required' }],
        'details.postcode': [{ required: true, message: 'postcode is required' }],
        'details.introduction': [{ required: true, message: 'introduction is required' }],
        'details.note': [{ required: true, message: 'note is required' }]
      }
    }
  },
  props: ['tag'],
  methods: {
    copyForm () {
      return {
        organName: '',
        organType: '',
        sn: '', // 验证sn号
        details: {
          name: '',
          phone: '',
          email: '',
          country: '',
          address: '',
          postcode: '',
          introduction: '',
          note: ''
        }
      }
    },
    cancel () {
      this.dataForm = this.copyForm()
    },
    clearValidate () {
      this.$refs.dataForm.clearValidate()
    },
    // 验证sn
    snValid (rule, value, callback) {
      if (!value) {
        callback(new Error('SN is required'))
        return false
      }
      let res = this.checkSN(value)
      if (!res) {
        callback(new Error('SN is invalid'))
        return false
      }
      callback()
    },
    async checkSN (value) {
      let { result } = await this.$axios({
        url: '/device/checksn',
        method: 'post',
        data: {
          sn: [value]
        }
      })
      if (result[0] && result[0].errno > 0) { // sn验证错误
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
