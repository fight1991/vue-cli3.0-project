<template>
  <section class="sys-main bg-c">
    <el-form size="mini" :model="dataForm" :rules="rules" label-position="left" label-width="100px">
      <div class="title border-line">绑定设备</div>
      <div class="col-container">
        <el-row :gutter="40">
          <el-col :lg="12" :md="24">
            <el-form-item label="设备序列号" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :lg="12" :md="24">
            <el-form-item label="设备注册码" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="title border-line">电站设置</div>
      <div class="col-container">
        <el-row :gutter="40">
          <el-col :lg="12" :md="24">
            <el-form-item label="电站名称" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="国家" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="装机容量" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="城市" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="电站类型" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="地址" prop="aa">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="建站日期" prop="aa">
              <el-date-picker
                style="width:100%"
                v-model="dataForm.aa"
                type="date"
                :placeholder="$t('chooseDate')">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="电价" prop="aa">
              <el-select v-model="dataForm.aa" style="width:100%">
                <el-option v-for="item in powerList" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-row class="foot-btn" type="flex" justify="center">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button size="mini" @click="createAdd" type="primary">创建</el-button>
    </el-row>
  </section>
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
      },
      powerList: []
    }
  },
  created () {

  },
  methods: {
    cancel () {

    },
    createAdd () {

    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin: 15px 10px;
}
.foot-btn {
  margin: 20px 0;
}
.col-container {
  padding: 0 50px;
}
</style>
