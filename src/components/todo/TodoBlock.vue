<template>
  <div class="todo-block row">
    <input class="todo-block col-18"
      @keydown.enter="$emit('enterClick',$event,id)"
      @keydown.up="$emit('upClick',$event)"
      @keydown.down="$emit('downClick',$event)"
      @keydown.delete="deleteClick"
      @input="onInput"
      v-model="content"
      ref="todo"
      placeholder="no title" />
    <span class='col-6' @click="loadEditor"><icon>chevron_right</icon></span>
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import fs from 'libs/files.js'
import _ from 'utils/lodash/lodash.js'
export default {
  name: 'TodoBlock',
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'TODO'
    },
    title: {
      type: String,
      default: ''
    },
    noteId: {
      type: String,
      default: ''
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      timer: [],
      content: this.title
    }
  },
  watch: {
    focusedIndex: function () {
      if (this.index === this.focusedIndex) {
        this.$refs.todo.focus()
        // try {
        //   window.getSelection().collapse(this.$refs.todo, 1)
        // } catch (error) {
        //   window.getSelection().collapse(this.$refs.todo)
        // }
      }
    }
  },
  computed: {
    ...mapGetters(['focusedIndex', 'notePath'])
  },
  methods: {
    ...mapActions(['updateTodo',
      'loadNote',
      'updateEditorLoadState',
      'initContentProp',
      'init']),
    onInput: _.debounce(function (e) {
    //   this.TodoContent = e.target.innerText;
      console.log(e.target.value)
      this.updateTodo({
        id: this.id,
        type: this.type,
        title: e.target.value,
        noteId: this.noteId
      })
    }, 200),
    deleteClick (e) {
      if (!this.title || this.title.length <= 0) {
        this.$emit('deleteClick', e, this.id)
      }
    },
    loadEditor() {
      console.log('todo.block.loadeditor', this.noteId)
      this.updateEditorLoadState(false)

      fs.readFile(`${this.notePath}\\${this.noteId}.json`, (err, content) => {
        if (!err) {
          let parsed = JSON.parse(content);
          this.loadNote(parsed)
          this.init({
            focusedIndex: 0,
            lineLength: parsed.contents.length,
            maxLine: parsed.contents.length
          })
        } else {
          this.loadNote({
            id: this.noteId,
            contents: [],
            createdAT: Date.now(),
            updatedAt: Date.now(),
            type: 'MARKDOWN_NOTE',
            folder: this.notePath,
            title: this.title,
            tags: [],
            isStarred: false,
            isTrashed: false
          })
          this.initContentProp()
          this.init({
            focusedIndex: 0,
            lineLength: 1,
            maxLine: 1
          })
        }

        this.updateEditorLoadState(true)
      })
    }
  },
  created () {
    this.$on('lastFocused', function () {
      this.$refs.todo.focus()
      // try {
      //   window.getSelection().collapse(this.$refs.todo, 1)
      // } catch (error) {
      //   window.getSelection().collapse(this.$refs.todo)
      // }
    })
  },
  mounted () {
    if (this.index === this.focusedIndex) {
      this.$refs.todo.focus();
      // try {
      //   window.getSelection().collapse(this.$refs.todo, 1)
      // } catch (error) {
      //   window.getSelection().collapse(this.$refs.todo)
      // }
    }
  }
}
</script>
<style lang="less" scoped>
[contenteditable=true]:empty:before{
  content: attr(placeholder);
  display: block; /* For Firefox */
  color:#8080807d;
}

</style>
