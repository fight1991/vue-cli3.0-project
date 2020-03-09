<template>
  <div class="container-top mg-b10">
    <div class="left">
      <div class="top-item flex-between mg-b10">
        <div class="items">电站总数</div>
        <div class="items">正常电站</div>
        <div class="items">离线电站</div>
        <div class="items">故障电站</div>
      </div>
      <div class="status-count bg-c">
        <div class="title border-line">状态统计</div>
        <div class="content flex">
          <div class="content-item">1</div>
          <div class="content-item">2</div>
          <div class="content-item">3</div>
        </div>
      </div>
    </div>
    <div class="right bg-c">
      <div class="weather-content">天气</div>
      <div :id="mapId" class="map-content" style="width:100%;"></div>
    </div>
  </div>
</template>
<script>
import BMap from 'BMap'
export default {
  name: 'show-item',
  data () {
    return {
      mapId: '' // 地图容器 若id相同的话只渲染一次
    }
  },
  created () {
    this.mapId = 'map-content' + this.$route.name
    window.addEventListener('resize', this.asyncInit)
  },
  mounted () {
    this.initBaiduMap()
  },
  methods: {
    initBaiduMap () {
      let mp = new BMap.Map(this.mapId)
      mp.centerAndZoom(new BMap.Point(-118.24532, 34.05349), 11)
      mp.enableScrollWheelZoom(true)
    }
  },
  asyncInit () {
    this.$nextTick(() => {
      this.initBaiduMap()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.asyncInit)
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
    margin-right: 5px;
    .top-item {
      .items {
        background-color: #fff;
        width: 24%;
        height: 100px;
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
      }
      .content-item {
        width: 33.3%;
        height: 200px;
        border-right:1px solid #f5f5f5;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .right {
    .weather-content {
      height: 95px;
      margin-bottom: 10px;
    }
    width: 250px;
    padding: 5px;
    box-sizing: border-box;
  }
}

</style>
