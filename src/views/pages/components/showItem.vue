<template>
  <div class="container-top mg-b10">
    <div class="left">
      <div class="top-item flex-between mg-b10">
        <div class="items flex-around" @click="selectStatus(0)">
          <i class="iconfont icon-sum"></i>
          <div class="items-right">
            <div>{{$t('common.total')}}</div>
            <div>
              <span class="num">{{plantStatus.total}}</span>
            </div>
          </div>
        </div>
        <div class="items flex-around" @click="selectStatus(1)">
          <i class="iconfont icon-normal"></i>
          <div class="items-right">
            <div>{{$t('common.normal')}}</div>
            <div>
              <span class="num">{{plantStatus.normal}}</span>
            </div>
          </div>
        </div>
        <div class="items flex-around" @click="selectStatus(2)">
          <i class="iconfont icon-fault"></i>
          <div class="items-right">
            <div>{{$t('common.abnormal')}}</div>
            <div>
              <span class="num">{{plantStatus.abnormal}}</span>
            </div>
          </div>
        </div>
        <div class="items flex-around" @click="selectStatus(3)">
          <i class="iconfont icon-offline"></i>
          <div class="items-right">
            <div>{{$t('common.offline')}}</div>
            <div>
              <span class="num">{{plantStatus.offline}}</span>
            </div>
          </div>
        </div>
      </div>
      <el-card shadow="never" class="no-bottom">
        <div class="title border-line" slot="header">{{$t('plant.statusGer')}}</div>
        <income-item :incomeDetail="incomeDetail"></income-item>
      </el-card>
    </div>
    <div class="right bg-c">
      <div class="weather-content">{{$t('common.weather')}}</div>
      <div class="map-content" style="width:100%;">
        <g-map v-if="lang=='en'"></g-map>
        <b-map v-else></b-map>
      </div>
    </div>
  </div>
</template>
<script>
import incomeItem from './incomeItem'
const bMap = () => import('./bMap')
const gMap = () => import('./gMap')
export default {
  name: 'show-item',
  components: {
    incomeItem,
    bMap,
    gMap
  },
  data () {
    return {
      plantStatus: {
        total: 0,
        normal: 0,
        abnormal: 0,
        offline: 0
      },
      incomeList: [],
      mapId: '', // 地图容器 若id相同的话只渲染一次
      incomeDetail: { // 收益详情
        currency: '', // 货币种类
        today: {
          generation: 0,
          earnings: 0
        },
        month: {
          generation: 0,
          earnings: 0
        },
        year: {
          generation: 0,
          earnings: 0
        },
        cumulate: {
          generation: 0,
          earnings: 0
        }
      }
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 获取所有电站正常 非正常 故障个数
    async getPlantStatus () {
      let { result } = await this.$axios({
        url: '/v0/plant/status/all'
      })
      if (result) {
        this.plantStatus.total = result.total || 0
        this.plantStatus.normal = result.normal || 0
        this.plantStatus.abnormal = result.abnormal || 0
      }
    },
    selectStatus (status) {
      this.$emit('getselect', status)
    }
  }
}
</script>
<style lang="less" scoped>
.map-content {
  width: 100%;
  height: calc(100% - 120px);
}
.container-top {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  .left {
    flex: 1;
    margin-right: 10px;
    .top-item {
      .items {
        cursor: pointer;
        padding: 10px 20px;
        background-color: #fff;
        box-sizing: border-box;
        width: 24%;
        &:hover {
          box-shadow: 0 4px 6px rgba(0,0,0,.2);
          transition: all .5s ease-in-out;
        }
        .iconfont {
          font-size: 36px;
          color: #2AC6FC;
        }
        .icon-normal {
          color: #67C23A;
        }
        .icon-offline {
          color: #ccc;
        }
        .icon-fault {
          color: #FFC245;
        }
        .items-right {
          padding-left: 30px;
          text-align: right;
          .num {
            font-size: 16px;
            margin-right: 10px;
          }
          div {
            padding: 2px;
          }
        }
      }
    }
    .status-count {
      padding: 5px 0;
      .title {
        margin: 5px 10px;
        text-indent: 10px;
      }
      .content {
        border-top: 1px solid #f5f5f5;
        padding: 5px 10px;
        flex-wrap: wrap;
      }
      .content-item {
        padding: 10px 0;
        width: 50%;
        box-sizing: border-box;
        &:nth-child(2n+1) {
          border-right: 1px solid #f5f5f5;
        }
        .plant-money {
          .num {
            color: #FFC245;
            font-weight: bold;
          }
          .money {
            color: #67C23A;
            font-weight: bold;
          }
        }
      }
    }
  }
  .right {
    .weather-content {
      height: 95px;
      margin-bottom: 10px;
    }
    width: 350px;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
