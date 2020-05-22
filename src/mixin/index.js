export default {
  data () {
    return {
      setDivH: window.innerHeight - 150 // 容器高度
    }
  },
  created () {
    window.addEventListener('resize', () => {
      this.setDivH = window.innerHeight - 150
    })
  },
  methods: {
    backRoute (router) {
      this.$store.dispatch('backGo', router)
    },
    // 获取国家列表
    async getCountryList () {
      let { result } = await this.$axios({
        url: '/v0/map/countries'
      })
      if (result) {
        return result.countries || []
      } else {
        return []
      }
    }
  }
}
