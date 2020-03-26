<template>
  <section class="sys-main">
    <device-status :title="'Device status'"></device-status>
    <el-card shadow="never">
      <div class="title border-line" slot="header">
        Flow graph
        <i class="fr el-icon-more"></i>
      </div>
      <div class="flow-map" style="height:100px"></div>
    </el-card>
    <div class="container-bottom bg-c">
      <line-bar>
        <template v-slot:radioBtn>
          <el-radio-button label="power">Power</el-radio-button>
          <el-radio-button label="elec">Generation</el-radio-button>
        </template>
      </line-bar>
    </div>
  </section>
</template>
<script>
import deviceStatus from '../components/plantStatus'
import lineBar from '@/views/pages/components/lineBar/lineBar'
export default {
  components: {
    deviceStatus,
    lineBar
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.el-icon-more {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.container-bottom {
  padding-bottom: 10px;
  margin-bottom: 15px;
}
</style>
