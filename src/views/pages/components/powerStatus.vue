<template>
  <el-card shadow="never">
    <div class="title border-line" slot="header">{{title}}</div>
    <el-row class="current-kw">
      <el-col :span="8">
        <div class="my-pg flex-center">
          <el-progress :width="150" type="circle" color="#67C23A" :show-text="false" :percentage="49" :stroke-width="12"></el-progress>
          <div class="progress-txt">
            <div class="number">{{power + 'kw'}}</div>
            <div class="f12">{{$t('common.currentP')}}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <income-item v-bind="$attrs"></income-item>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import incomeItem from './incomeItem'
export default {
  components: { incomeItem },
  data () {
    return {}
  },
  props: {
    title: {
      default: ''
    },
    power: {
      default: 0
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.my-pg {
  height: 240px;
  position: relative;
  margin-right: 15px;
  border-right: 1px solid #f5f5f5;
  .el-progress {
    vertical-align: top
  }
  .progress-txt {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: #999;
    .number {
      color: #67C23A;
    }
  }
}
</style>
