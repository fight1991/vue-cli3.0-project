<template>
  <el-form ref="dataForm" size="mini" :model="dataForm" label-position="left" label-width="140px" :rules="rules">
    <el-row :gutter="20">
      <!-- 安装商/代理商名称 -->
      <el-col :span="12">
        <el-form-item label="Company Name" prop="organName">
          <el-input v-model="dataForm.organName"></el-input>
        </el-form-item>
      </el-col>
      <!-- 安装商选择代理商 / 代理商直接填写厂商联系人 -->
      <el-col :span="12">
        <el-form-item label="Authorizer" prop="parentOrgan" label-width="110px">
          <el-select v-if="tag=='installer'" v-model="dataForm.parentOrgan" placeholder="Authorized Company or Authorizer" style="width:100%;">
            <el-option v-for="(item, index) in organList" :value="item" :key="'index' + index" :label="item"></el-option>
          </el-select>
          <el-input v-else v-model="dataForm.parentOrgan" placeholder="Authorized Company or Authorizer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Country" prop="details.country">
          <el-input v-model="dataForm.details.country"></el-input>
        </el-form-item>
      </el-col>
      <!-- 安装商/代理商简称 -->
      <el-col :span="12">
        <el-form-item label="Short Name" prop="organShortName" label-width="110px">
          <el-input v-model="dataForm.organShortName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Address" prop="details.address">
          <el-input v-model="dataForm.details.address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Name" prop="details.name">
          <el-input v-model="dataForm.details.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Email" prop="details.email" label-width="110px">
          <el-input v-model="dataForm.details.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Postcode" prop="details.postcode">
          <el-input v-model="dataForm.details.postcode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MP" prop="details.phone" label-width="110px">
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
      dataForm: {
        organName: '', // 组织名称
        organShortName: '', // 组织简称
        details: {
          area: '',
          name: '',
          phone: '',
          email: '',
          country: '',
          address: '',
          postcode: '',
          introduction: '',
          note: ''
        },
        organType: '', // 组织类型 user, installer, agent
        parentOrgan: '' // 父组织,如果是代理商则填厂商联系人，安装商则填代理商组织
      },
      areaNum: [ { num: '+86', contry: 'china' } ],
      rules: {
        organName: [{ required: true, message: '', trigger: 'blur' }],
        parentOrgan: [{ required: true, message: '', trigger: this.tag === 'installer' ? 'change' : 'blur' }],
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
  props: {
    tag: {
      default: 'agent'
    },
    organList: {
      default: []
    }
  },
  created () {
    // if (this.tag === 'installer') {
    //   this.getOrgansList('agent')
    // }
  },
  methods: {
    copyForm () {
      return {
        organName: '',
        organShortName: '',
        details: {
          name: '',
          phone: '',
          email: '',
          country: '',
          address: '',
          postcode: '',
          introduction: '',
          note: ''
        },
        organType: '',
        parentOrgan: '',
        organList: []
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
