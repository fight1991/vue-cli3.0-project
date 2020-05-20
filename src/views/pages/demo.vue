<template>
  <div class="demo">
    <h1>This page is not found , Coming soon</h1>
    <div >
      <div id="map_canvas" style="height: 400px; width: 400px"></div>
    </div>
  </div>
</template>

<script>
import google from 'google'
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      let map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
      console.log(map)
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
