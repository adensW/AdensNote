<template>
  <div @click="focusLastBlock" class="editor pell layout-window">
    <EditorBlock
      v-for="(item,index) in contents"
      :key="item.cid"
      :index="index"
      :content="item"
      @enterClick="enterClick"
      @upClick="upClick"
      @downClick="downClick"
      @rawChange="rawChange"
      @deleteClick="deleteClick"
    ></EditorBlock>
    <!-- <div id="pell" class="pell"></div>
    <div id="html-output"></div>-->
  </div>
</template>

<script>
import _ from 'utils/lodash/lodash.js'
import fs from 'libs/files.js'
import { mapGetters, mapActions } from 'vuex'
import EditorBlock from 'components/editor/EditorBlock'
// import uid from 'apis/uid.js'
// import event from 'src/electronlibs/renderer/eventChannel.js'
export default {
  name: 'Editor',
  components: {
    EditorBlock
  },
  data () {
    return {
      pannelName: 'EDITOR_PANNEL'
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      // 把 `this.storageFocused` 映射为 `this.$store.getters.storageFocused`
      'storage',
      'editorProp',
      'contents',
      'maxLine'
    ])
  },
  methods: {
    ...mapActions([
      'updateContent',
      'updateTitle',
      'addContent',
      'deleteContent',
      'initContentProp']),
    rawChange: _.throttle(function () {
      // console.log(new Date())
      if (this.contents.length > 0) {
        this.updateTitle(this.$children[0].$data.mdText)
      }
      this.save()
    }, 500),
    upClick (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$store.dispatch('prev')
    },
    downClick (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$store.dispatch('next')
    },
    enterClick (evt, cid) {
      // add new block;

      evt.preventDefault()
      evt.stopPropagation()
      let index = this.contents.findIndex(p => p.cid === cid)
      this.addContent({
        content:
        {
          cid: `${this.maxLine}`,
          mdRaw: ''
        },
        startIndex: index + 1
      })
      this.$store.dispatch('addLine')

      this.$store.dispatch('next')
    },
    deleteClick (evt, cid) {
      evt.preventDefault()
      evt.stopPropagation()
      if (this.contents.length > 1) {
        let content = this.contents.find(p => p.cid === cid)
        this.deleteContent(content)
      }
    },
    focusLastBlock (evt) {
      evt.preventDefault()
      evt.stopPropagation()

      this.$store.dispatch('go', { index: this.contents.length - 1 })
      this.$children[this.contents.length - 1].$emit('lastFocused')

      //  this.contents[this.contents.length-1].focused=true;
    },
    save () {
      fs.writeFile(
        `${this.storage.notePath}\\${this.editorProp.id}.json`,
        JSON.stringify(this.editorProp)
      )
      // this.cacheNote()
    },
    loadNote () {
      // this.$store.state.storage
      fs.readFile(
        `${this.storage.notePath}\\${this.name}`,
        (err, contents) => {
          console.log(err, contents)
          if (!err) {
            console.log(contents)
            if (typeof contents === 'string' && contents.length > 0) {
              let parsed = JSON.parse(contents)
              console.log(parsed)
              if (parsed) {
                this.loadNote(parsed)
                console.log(parsed.contents.length)
                this.$store.dispatch('init', {
                  focusedIndex: 0,
                  lineLength: parsed.contents.length,
                  maxLine: parsed.contents.length
                })
              }
            } else {
              this.init()
            }
          } else {
            this.init()
          }
        }
      )
    },
    init () {
      // this.initContentProp();
      this.$store.dispatch('init', {
        focusedIndex: 0,
        lineLength: 1,
        maxLine: 1
      })
      if (this.contents.length === 0) {
        this.addContent({ cid: 0, mdRaw: '' })
      }
      console.log('init', this.contents)

      // this.cacheNote()
    },
    newNote () {
      this.save()
      this.init()
    },
    cacheNote () {
      if (
        this.contents.length > 0 &&
        this.contents[0].mdRaw.trim().length > 0
      ) {
        localStorage.setItem('lastOpenedNote', this.noteName)
      }
    }
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  beforeDestroy () {
  }
}
</script>

<style>
.pell {
  /* border: 2px solid #000; */
  border-radius: 0;
  box-shadow: none;
  height: 96vh;
}
p {
  margin: 0px;
}
pre {
  background-color: burlywood;
}
</style>
