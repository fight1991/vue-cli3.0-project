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
    }
  }
}
