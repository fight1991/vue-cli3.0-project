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
          <el-input v-model="dataForm.sn" placeholder="sn"></el-input>
        </el-form-item>
      </el-col>
      <!-- 安装商选择安装商 / 代理商选择代理商 -->
      <el-col :span="12" v-else>
        <el-form-item label="Authorizer" prop="organName" label-width="100px">
          <el-select v-model="dataForm.organName" placeholder="Authorized Company or Authorizer" style="width:100%;">
            <el-option v-for="(item, index) in organList" :value="item" :key="'index' + index" :label="item"></el-option>
          </el-select>
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
        <el-form-item label="MP" prop="details.phone" label-width="100px">
          <div class="flex">
            <el-select v-model="dataForm.details.area" style="width:30%">
              <el-option v-for="item in areaNum" :key="item.num" :label="item.num" :value="item.num"></el-option>
            </el-select>
            <el-input style="width:70%" v-model="dataForm.details.phone" placeholder="mobile number"></el-input>
          </div>
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
        sn: '', // 验证sn-key号
        key: '',
        details: {
          area: '+86',
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
      areaNum: [ { num: '+86', contry: 'china' } ],
      rules: {
        organName: [{ required: true, message: '', trigger: 'change' }],
        sn: [{ required: true, validator: this.snValid, message: 'SN is required', trigger: 'blur' }],
        'details.name': [{ required: true, message: 'name is required', trigger: 'blur' }],
        'details.phone': [{ required: true, message: 'phone is required', trigger: 'blur' }],
        'details.email': [{ required: true, message: 'email is required', trigger: 'blur' }],
        'details.country': [{ required: true, message: 'country is required', trigger: 'blur' }],
        'details.address': [{ required: true, message: 'address is required', trigger: 'blur' }],
        'details.postcode': [{ required: true, message: 'postcode is required', trigger: 'blur' }],
        'details.introduction': [{ required: true, message: 'introduction is required', trigger: 'blur' }],
        'details.note': [{ required: true, message: 'note is required', trigger: 'blur' }]
      }
    }
  },
  props: ['tag', 'organList'],
  created () {

  },
  methods: {
    copyForm () {
      return {
        organName: '',
        organType: '',
        sn: '', // 验证sn号
        details: {
          area: '+86',
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
        callback(new Error('SN or key is required'))
        return false
      }
      let res = this.checkSN(value)
      if (!res) {
        callback(new Error('SN or key is invalid'))
        return false
      }
      callback()
    },
    async checkSN (sn, key = '') {
      if (!sn) return false
      let { result } = await this.$axios({
        url: '/v0/module/checksn',
        method: 'post',
        data: {
          type: 0,
          devices: [{ sn, key }]
        }
      })
      if (result) {
        return result[0] && result[0].errno === 0
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
