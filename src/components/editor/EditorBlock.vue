<template>
  <div>
    <div
      contenteditable="true"
      class="pell-content"
      @keydown.enter="enterClick"
      @keydown.up="upClick"
      @keydown.down="downClick"
      @input="onInput"
      @keydown.delete="deleteClick"
      @click="mouseClick"
      @keydown.tab="tabClick"
      ref="editor"
    ></div>
  </div>
</template>

<script>
import mark from 'libs/marked.js'
import { mapGetters, mapActions } from 'vuex'

const BLOCKTYPE = {
  SINGLE_LINE: 0,
  MUTI_LINE: 1
}
export default {
  name: 'EditorBlock',
  props: ['content', 'index'],
  data () {
    return {
      mdType: '',
      mdText: '',
      mdTag: '',
      blockType: BLOCKTYPE.SINGLE_LINE
    }
  },
  created () {
    this.$on('lastFocused', function () {
      this.$refs.editor.focus()
      try {
        window.getSelection().collapse(this.$refs.editor, 1)
      } catch (error) {
        window.getSelection().collapse(this.$refs.editor)
      }
    })
  },
  mounted: function () {
    if (this.focusedIndex === this.index) {
      this.$refs.editor.focus()
    }
    this.$refs.editor.innerText = this.content.mdRaw
  },
  watch: {
    focusedIndex: function () {
      if (this.index === this.focusedIndex) {
        // console.log(this.index);
        this.$refs.editor.focus()
        try {
          window.getSelection().collapse(this.$refs.editor, 1)
        } catch (error) {
          window.getSelection().collapse(this.$refs.editor)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['focusedIndex'])
  },
  methods: {
    ...mapActions(['go']),
    blockBlur () {
      if (typeof this.content.mdRaw !== 'undefined') {
        this.$refs.editor.innerHTML = mark.marked(this.content.mdRaw)
        let lexer = mark.lexer(this.content.mdRaw)
        // let inlineLexer = mark.inlineLexer(this.content.mdRaw, lexer.links)

        // console.log(lexer)
        // console.log(inlineLexer)

        if (lexer.length > 0) {
          this.mdType = lexer[0].type
          this.mdText = lexer[0].text
          this.mdTag = this.getTag(lexer[0].type, lexer[0].depth | null)
        } else {
          this.mdType = ''
          this.mdText = this.mdRaw
        }
      }
    },
    upClick (e) {
      if (this.blockType === BLOCKTYPE.MUTI_LINE) {

      } else {
        this.$emit('upClick', e)
      }
    },
    downClick (e) {
      if (this.blockType === BLOCKTYPE.MUTI_LINE) {

      } else {
        this.$emit('downClick', e)
      }
    },
    enterClick (e) {
      this.blockBlur()

      if (this.mdType === 'code') {

      } else {
        this.$emit('enterClick', e, this.content.cid)
      }
    },
    deleteClick (e) {
      if (!this.mdText || this.mdText.length <= 0) {
        this.$emit('deleteClick', e, this.content.cid)
      }
    },
    tabClick (e) {
      e.preventDefault()
      e.stopPropagation()
      document.execCommand('insertText', false, '    ')
    },
    mouseClick (e) {
      e.preventDefault()
      e.stopPropagation()
      // console.log(this.index)
      this.go({ index: this.index })
      // this.$store.dispatch("go",{index:this.index})
    },
    onInput (e) {
      this.content.mdRaw = this.mdTag + e.target.innerText
      this.mdText = e.target.innerText
      this.$emit('rawChange')
    },
    getTag (type, depth) {
      let tags = {
        heading: {
          '1': '# ',
          '2': '## ',
          '3': '### ',
          '4': '#### ',
          '5': '##### ',
          '6': '###### '
        },
        space: '\n ',
        code: '``` ',
        table: '',
        hr: '--- ',
        blockquote_start: '>',
        blockquote_end: '',
        list_start: '',
        list_item_start: '',
        list_item_end: '',
        list_end: '',
        paragraph: '',
        html: '',
        text: ''
      }
      if (type === 'heading') {
        return tags['heading'][depth]
      }
      return tags[type]
    }
  }
}
</script>

<style>
</style>
