<template>
  <div id="g-map" :style="{'height': height, 'width': width}"></div>
</template>

<script>
import google from 'google'
export default {
  data () {
    return {
      gMap: null,
      cuPosition: null
    }
  },
  props: {
    height: {
      default: '100%'
    },
    width: {
      default: '100%'
    }
  },
  watch: {},
  created () {
    this.getGeoLocation()
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.gMap = new google.maps.Map(document.getElementById('g-map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
    },
    // h5获取当前经纬度信息并标识在
    getGeoLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getLocationError)
      } else {
        console.log('获取经纬度信息失败')
      }
    },
    getLocationSuccess (res) {
      this.cuPosition = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      }
      // 重新设置中心点
      this.gMap.setCenter(this.cuPosition)
      // 添加标记点
      let marker = new google.maps.Marker({
        position: this.cuPosition
        // title: 'hellow'
      })
      marker.setMap(this.gMap)
      // 信息窗
      let infoWindow = new google.maps.InfoWindow()
      infoWindow.setPosition(this.cuPosition)
      infoWindow.setContent('Location found.')
      marker.addListener('click', () => {
        infoWindow.open(this.gMap, marker)
      })
    },
    getLocationError () {
      console.log('error获取经纬度信息失败')
    }
  }
}
</script>

<style lang="less" scoped>
.demo {
  height: 1000px;
  background-color:#fff;
  border-top:1px solid transparent;
  text-align: center;
}
#map_canvas {
  margin: 0 auto;
}
</style>
