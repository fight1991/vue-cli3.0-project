<template>
  <section class="sys-main bg-c">
    <el-form size="mini" :model="dataForm" ref="dataForm" :rules="rules" label-position="left" label-width="120px">
      <div class="title border-line">Plant</div>
      <div class="col-container">
        <el-row :gutter="40">
          <el-col :lg="12" :md="24">
            <el-form-item label="Plant name" prop="details.name">
              <el-input v-model="dataForm.details.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="Station type" prop="details.type">
              <el-input v-model="dataForm.details.type"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="Country" prop="details.country">
              <el-input v-model="dataForm.details.country"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="City" prop="details.city">
              <el-input v-model="dataForm.details.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24">
            <el-form-item label="Site address" prop="details.address">
              <el-input v-model="dataForm.details.address"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :lg="12" :md="24">
            <el-form-item label="建站日期" prop="details.createdDate">
              <el-date-picker
                style="width:100%"
                v-model="dataForm.details.createdDate"
                type="date"
                :placeholder="$t('chooseDate')">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :lg="12" :md="24">
            <el-form-item label="Electricity price" prop="details.price">
              <el-select v-model="dataForm.details.price" style="width:100%">
                <el-option v-for="item in powerList" :key="item.id" :value="item.name" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="title equipment border-line">Equipment <i class="el-add-icon el-icon-circle-plus-outline" @click="deviceAdd"></i></div>
      <div class="col-container devices">
        <el-row :gutter="40" v-for="(item, index) in dataForm.devices" :key="'index'+index">
          <!-- validator: (rule, value, callback)=>{checkSN(rule, value, callback, 'sn')} -->
          <el-col :span="10">
            <el-form-item label="SN" label-width="60px" :prop="'devices.'+index+'.sn'" :rules="{required:true, message: 'sn is invalid', trigger: 'blur'}">
              <el-input v-model="item.sn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Key" label-width="60px" :prop="'devices.'+index+'.key'" :rules="{required:true, message: 'key is invalid', trigger: 'blur'}">
              <el-input v-model="item.key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="padding-left:0px">
            <span class="op-icon">
              <i class="iconfont icon-delete" @click="deviceDelete(index)"></i>
              <!-- <i class="fr iconfont icon-add" @click="deviceAdd" v-show="index==0"></i> -->
              <!-- v-show="!(index==0 && deleteBtn)" -->
              <i class="el-icon-error" v-show="item.isPass !== 1"></i>
            </span>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-row class="foot-btn" type="flex" justify="center" v-if="opType!=='look'">
      <el-button size="mini" @click="cancel">Cancel</el-button>
      <el-button size="mini" @click="confirmBtn" type="primary">{{opType=='add'?'New':'Edit'}}</el-button>
    </el-row>
    <el-dialog
      title="Error List"
      :visible.sync="errVisible">
      <div v-for="(item, index) in errorList" :key="'index'+index">{{item.sn}}</div>
      <el-row type="flex" justify="center">
        <el-button size="mini" @click="dialogCancel">Cancel</el-button>
        <el-button size="mini" type="primary" @click="dialogConfirm">Go on</el-button>
      </el-row>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data () {
    return {
      opType: 'add', // 记录操作类型 add创建, look查看 edit编辑
      stationID: '', // 电站id
      snIsPass: true,
      errVisible: false,
      snResult: [], // sn校验的结果
      dataForm: {
        devices: [
          { sn: '', key: '', isPass: 1 }
        ],
        details: {
          name: '',
          type: '',
          country: '',
          city: '',
          address: '',
          price: ''
        }
      },
      templateDevice: {
        sn: '',
        key: '',
        isPass: 1
      },
      rules: {
        'details.name': [{ required: true, message: 'name is required', trigger: 'blur' }],
        'details.type': [{ required: true, message: 'type is required', trigger: 'blur' }],
        'details.country': [{ required: true, message: 'country is required', trigger: 'blur' }],
        'details.city': [{ required: true, message: 'city is required', trigger: 'blur' }],
        'details.address': [{ required: true, message: 'address is required', trigger: 'blur' }],
        'details.price': [{ required: true, message: 'price is required', trigger: 'change' }]
      },
      powerList: [
        { id: '3', name: 'CNY' }
      ]
    }
  },
  created () {
    this.getPriceList()
    let { opType } = this.$route.meta
    if (opType) {
      this.opType = opType || this.$route.query.opType
    }
    if (this.opType !== 'add') {
      this.stationID = this.$route.query.plantId
      this.getStationInfo(this.stationID)
    }
  },
  computed: {
    deleteBtn () { // 绑定的设备length为1 且 设备序列号或注册码为空不显示删除按钮
      return this.dataForm.devices.length === 1 && !this.dataForm.devices[0].sn
    },
    isAllPass () { // 所有sn校验成功
      return this.snResult.length > 0 && this.snResult.every(v => v.errno === 0)
    },
    errorList () {
      return this.snResult.filter(v => v.errno !== 0)
    }
  },
  methods: {
    // 表格模板
    copyData () {
      return {
        devices: [
          { sn: '', key: '' }
        ],
        details: {
          name: '',
          type: '',
          country: '',
          city: '',
          address: '',
          price: ''
        }
      }
    },
    // 设备新增
    deviceAdd () {
      this.dataForm.devices.push({ ...this.templateDevice })
    },
    // 获取电价列表
    async getPriceList () {
      let { result } = await this.$axios({
        url: '/plant/statistics/pricelist'
      })
      if (result && result.length > 0) {
        this.powerList = result
      }
    },
    // 设备删除
    async deviceDelete (index) {
      if (index === 0 && this.dataForm.devices.length === 1) {
        if (this.dataForm.devices[0].sn) {
          let res = await this.$confirm('Are you sure you want to delete it?', 'tip', {
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel',
            type: 'warning'
          }).then(() => true).catch(() => false)
          if (!res) return
        }
        this.dataForm.devices = [{ ...this.templateDevice }]
      } else {
        this.dataForm.devices.splice(index, 1)
      }
    },
    // dialog取消
    dialogCancel () {
      this.snResult.forEach((v, i) => {
        if (v.errno !== 0) {
          this.dataForm.devices[i].isPass = 0
        }
      })
      this.errVisible = false
    },
    // dialog中的确认
    dialogConfirm () {
      this.errVisible = false
      this.creatPlant()
    },
    // 取消按钮
    async cancel () {
      let res = await this.$confirm('Are you sure you want to cancel?', 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => true).catch(() => false)
      if (!res) return
      this.dataForm = this.copyData()
      this.$refs.dataForm.clearValidate()
    },
    // 新建电站 / 编辑电站
    async confirmBtn () {
      // 表单必填项校验
      let isPass = true
      this.$refs.dataForm.validate(valid => (isPass = valid))
      if (!isPass) return
      await this.remoteSN(...this.dataForm.devices)
      // 有的sn校验失败
      console.log(this.isAllPass)
      if (!this.isAllPass) {
        this.errVisible = true
      } else {
        this.creatPlant()
      }
    },
    // 创建电站
    creatPlant () {
      let url = this.opType === 'add' ? '/v0/plant/create' : '/v0/plant/update'
      this.$post({
        url: url,
        data: {
          ...this.dataForm
        },
        success: ({ result }) => {
          this.$message.success('successful')
          this.backRoute('bus-plant-view')
        }
      })
    },
    // 校验sn
    async checkSN (rule, value, callback, type, item) {
      if (!value) {
        callback(new Error(type + ' is invalid'))
        return
      }
      if (type === 'key') { // 远程校验sn是否合法
        let res = await this.remoteSN(item)
        if (!res.errno === 0) {
          callback(new Error('sn or key is invalid'))
        }
        return
      }
      callback()
    },
    // 远程校验sn 任意一对sn-key验证通过都可创建成功,全部sn-key失败则创建失败
    async remoteSN (item) {
      let { result } = await this.$axios({
        method: 'post',
        url: '/v0/device/checksn',
        data: [item]
      })
      if (result && result.length > 0) {
        this.snResult = result
      }
      return true
    },
    // 查询电站信息
    async getStationInfo (stationID) {
      let { result } = await this.$axios({
        url: '/v0/plant​/get',
        data: {
          stationID
        }
      })
      this.dataForm = result || this.copyData()
      return true
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
  &.devices {
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
      transform: scale(1.2);
      transform-origin: center;
    }
  }
}
.el-icon-error {
  font-size: 20px;
  line-height: 28px;
  padding: 0 2px;
  color: #F56C6C;
}
.equipment {
  display: flex;
  align-items: center;
}
.el-add-icon {
  text-indent: 0px;
  font-size: 18px;
  color: @sys-main-header;
  padding: 0 2px;
  margin-left: 20px;
  cursor: pointer;
  transition: all .5s;
  &:hover {
    transform: scale(1.5);
    transform-origin: center;
  }
}
.sn-key {
  color: #F56C6C;
  padding: 5px 10px;
}
</style>
