<template>
  <section class="sys-main bg-c">
    <el-form size="mini" :model="dataForm" :rules="rules" label-position="left" label-width="100px">
      <div class="title border-line">绑定设备</div>
      <div class="col-container device">
        <el-row :gutter="40" v-for="(item, index) in dataForm.device" :key="'index'+index">
          <el-col :span="10">
            <el-form-item label="设备序列号" :prop="'device.'+index+'.aa'" :rules="{required:true,trigger: 'blur',message:'aa is invalid'}">
              <el-input v-model="item.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="设备注册码" :prop="'device.'+index+'.aa'" :rules="{required:true,trigger: 'blur',message:'aa is invalid'}">
              <el-input v-model="item.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="padding-left:0px">
            <span class="op-icon">
              <i class="iconfont icon-delete" @click="deviceDelete(index)" v-show="!(index==0 && deleteBtn)"></i>
              <i class="fr iconfont icon-add" @click="deviceAdd" v-show="index==0"></i>
            </span>
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
        device: [{ aa: 1 }, { aa: 1 }, { aa: 1 }],
        aa: ''
      },
      templateDevice: {
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
  computed: {
    deleteBtn () { // 绑定的设备length为1 且 设备序列号或注册码为空不显示删除按钮
      return this.dataForm.device.length === 1 && !this.dataForm.device[0].aa
    }
  },
  methods: {
    // 设备新增
    deviceAdd () {
      this.dataForm.device.push({ ...this.templateDevice })
    },
    // 设备删除
    async deviceDelete (index) {
      if (index === 0 && this.dataForm.device.length === 1) {
        let res = await this.$confirm('Are you sure you want to delete it?', 'tip', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => true).catch(() => false)
        if (!res) return
        this.dataForm.device = [{ ...this.templateDevice }]
      } else {
        this.dataForm.device.splice(index, 1)
      }
    },
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
  &.device {
    padding-right: 90px;
  }
}
.op-icon {
  display: block;
  width: 60px;
  .iconfont {
    font-size: 22px;
    color: @sys-main-header;
    line-height: 28px;
    padding: 0 2px;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
