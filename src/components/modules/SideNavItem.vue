<template>
  <div @click="loadTodo">
    <input @input="onInput" v-model="content" />
  </div>
</template>

<script>
import _ from 'utils/lodash/lodash.js';
import fs from 'libs/files.js';
import uid from 'apis/uid.js'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'SideNavItem',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: this.title
    };
  },
  computed: {
    ...mapGetters(['todoPath'])
  },
  methods: {
    ...mapActions([
      'updateTodoCollection',
      'loadTodoProp',
      'updateTodoLoadState',
      'updateEditorLoadState']),

    onInput: _.debounce(function(e) {
      //   this.TodoContent = e.target.innerText;
      this.updateTodoCollection({
        id: this.id,
        type: this.type,
        name: e.target.value
      });
    }, 200),
    loadTodo() {
      this.updateTodoLoadState(false);
      this.updateEditorLoadState(false);

      fs.readFile(`${this.todoPath}\\${this.id}.json`, (err, content) => {
        if (!err) {
          let parsed = JSON.parse(content);
          this.loadTodoProp(parsed)
          this.updateTodoLoadState(true);
        } else {
          this.loadTodoProp({
            id: this.id,
            fold: this.notePath,
            title: this.title,
            todos: [{
              id: uid(),
              type: 'TODO',
              title: '',
              noteId: uid()
            }],
            createdAT: Date.now(),
            updatedAt: Date.now(),
            type: 'TODO',
            isStarred: false,
            isTrashed: false
          })
          this.updateTodoLoadState(true);
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
input{
  width: 94%;
  border: 0 ;
  border-bottom: 1px solid gray;
}
</style>>
