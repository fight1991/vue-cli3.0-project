export default {
  data () {
    return {}
  },
  methods: {
    backRoute (router) {
      this.$store.dispatch('backGo', router)
    }
  }
}
