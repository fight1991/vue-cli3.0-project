<template>
  <el-form ref="dataForm" size="mini" :model="dataForm" label-position="left" label-width="140px" :rules="rules">
    <el-row :gutter="20">
      <!-- 安装商/代理商名称 -->
      <el-col :span="12">
        <el-form-item label="Company Name" prop="organName">
          <el-input v-model="dataForm.organName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Country" prop="details.country">
          <el-input v-model="dataForm.details.country"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Address" prop="details.address">
          <el-input v-model="dataForm.details.address"></el-input>
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
        organName: '',
        details: {
          area: '+86',
          phone: '',
          email: '',
          country: '',
          address: '',
          postcode: '',
          note: ''
        }
      },
      areaNum: [ { num: '+86', contry: 'china' } ],
      rules: {
        organName: [{ required: true, message: '', trigger: 'blur' }],
        'details.country': [{ required: true, message: 'country is required', trigger: 'blur' }],
        'details.address': [{ required: true, message: 'address is required', trigger: 'blur' }]
      }
    }
  },
  props: {
    tag: {
      default: 'agent'
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
        details: {
          area: '+86',
          phone: '',
          email: '',
          country: '',
          address: '',
          postcode: '',
          note: ''
        }
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
