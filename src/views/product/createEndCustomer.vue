<template>
  <el-dialog
    class="sys-dialog"
    title="End Customer Register"
    @close="$emit('update:visible')"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <el-form size="mini" :model="dataForm" label-position="left" label-width="110px" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Name" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" prop="aa" label-width="70px">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Country" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SN" prop="aa" label-width="70px">
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
            <el-form-item label="MP" prop="aa" label-width="70px">
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
    </div>
    <div class="foot-btn flex-center">
      <el-button size="mini" @click="dialogVisible=false">cancel</el-button>
      <el-button size="mini" type="primary">register</el-button>
    </div>
  </el-dialog>
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
  props: {
    visible: {
      default: false
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
    }
  }
}
</script>
<style lang="less" scoped>

</style>
