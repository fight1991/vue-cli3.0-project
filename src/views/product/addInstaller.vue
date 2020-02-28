<template>
  <el-dialog
    class="sys-dialog"
    title="new installer"
    @close="$emit('update:visible')"
    :visible.sync="dialogVisible"
    width="700px">
    <div class="content">
      <el-form size="mini" :model="dataForm" label-position="left" label-width="120px" :rules="rules">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="installer name" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
            <el-form-item label="installer abbreviation" prop="aa">
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
            <el-form-item label="contact" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="email" prop="aa">
              <el-input type="textarea" :rows="3" v-model="dataForm.aa"></el-input>
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
    </div>
    <div class="foot-btn flex-center">
      <el-button size="mini" @click="dialogVisible=false">cancel</el-button>
      <el-button size="mini" type="primary">next</el-button>
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
