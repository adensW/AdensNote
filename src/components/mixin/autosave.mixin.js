import { mapGetters, mapActions } from 'vuex'
import fs from 'libs/files.js'
var autoSaveMixin = {
  data() {
    return {
      timer: []
    }
  },
  computed: {
    ...mapGetters([
      // 把 `this.storageFocused` 映射为 `this.$store.getters.storageFocused`
      'albums',
      'todoProp',
      'editorProp',
      'albumLoaded',
      'todoPath'
    ])
  },
  watch: {
    albumLoaded: function () {
      if (this.albumLoaded) {
        this.initAutoSave()
      }
    }
  },
  methods: {
    ...mapActions(['updatePannel', 'saveAlbum']),
    initAutoSave: function () {
      this.timer.push(setInterval(() => {
        // console.log("hello",new Date())
        this.saveAlbum();
        fs.writeFile(`${this.todoPath}\\${this.todoProp.id}.json`, JSON.stringify(this.todoProp))
        console.log('Auto Save')
      }, 5000))
    },
    clearAutoSave: function () {
      this.timer.forEach(element => {
        clearInterval(element)
      })
    }
  },
  beforeDestory() {
    this.clearAutoSave()
  }
}
export default autoSaveMixin
