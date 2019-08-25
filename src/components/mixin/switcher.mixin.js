import { mapGetters, mapActions } from 'vuex'

var switcherMixin = {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'focusedPannel'
    ])
  },
  mounted: function () {
    console.log(this.$el)
    this.RegistryGlobalEvent()
  },
  methods: {
    ...mapActions(['updatePannel']),
    RegistryGlobalEvent () {
      this.$el.addEventListener('click', this.focus)
      // this.$el.addEventListener('keydown', this.keydown)
    },
    keydown(event) {
      // console.log('keydown', event)
    },
    focus () {
      if (this.pannelName) {
        console.log('1', this.pannelName)
      }
      // this.updatePannel(this.pannelName)
    }
  },
  beforeDestory () {
    this.$el.removeEventListener('click', this.focus)
    // this.$el.removeEventListener('keydown', this.keydown)
  }
}
export default switcherMixin
