<template>
  <div class="todo layout-window" @click.self="focusLastBlock">
    <TodoBlock
      v-for="(item,index) in todos"
      :key="item.id"
      @enterClick="enterClick"
      @upClick="upClick"
      @downClick="downClick"
      @rawChange="rawChange"
      @deleteClick="deleteClick"
      v-bind="item"
      :index="index"
    ></TodoBlock>
  </div>
</template>

<script>
import uid from 'apis/uid.js';
import fs from 'libs/files.js';
import _ from 'utils/lodash/lodash.js';
import { mapGetters, mapActions } from 'vuex';

import TodoBlock from 'components/todo/TodoBlock';

import switcherMixin from 'components/mixin/switcher.mixin.js';

export default {
  name: 'ToDo',
  components: {
    TodoBlock
  },
  data() {
    return {
      pannelName: 'TODO_PANNEL'
    };
  },
  mixins: [switcherMixin],
  computed: {
    ...mapGetters([
      // 把 `this.storageFocused` 映射为 `this.$store.getters.storageFocused`
      'todos',
      'todoProp',
      'focusState',
      'todoPath'
    ])
  },
  watch: {

  },
  methods: {
    ...mapActions(['addTodo', 'deleteTodo', 'loadTodoProp']),
    rawChange: _.throttle(function() {
      console.log(new Date());
    }, 500),
    upClick(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$store.commit('prev');
    },
    downClick(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$store.dispatch('next');
    },
    enterClick(evt, cid) {
      // add new block;
      evt.preventDefault();
      evt.stopPropagation();
      let index = this.todos.findIndex(item => item.id === cid);
      console.log(index);
      this.addTodo({
        todo: {
          id: uid(),
          type: 'TODO',
          title: '',
          noteId: uid()
        },
        startIndex: index + 1
      });
      this.$store.dispatch('addLine');

      this.$store.dispatch('go', { index: index + 1 });
    },
    deleteClick(evt, cid) {
      evt.preventDefault();
      evt.stopPropagation();
      let todo = this.todos.find(p => p.id === cid);
      this.deleteTodo(todo);
      this.$store.dispatch('removeLine');
      this.$store.dispatch('prev');
    },
    focusLastBlock(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$store.dispatch('go', { index: this.todos.length - 1 });
      this.$children[this.todos.length - 1].$emit('lastFocused');
      //  this.contents[this.contents.length-1].focused=true;
    },
    readTodo() {
      fs.readFile(`${this.todoPath}\\${this.id}.json`, (err, content) => {
        if (err) {
          let defaultTodo = {};
          Object.assign(defaultTodo, {
            id: this.id,
            todos: [
              {
                id: uid(),
                type: 'TODO',
                title: '',
                noteId: uid()
              }
            ],
            createdAT: Date.now(),
            updatedAt: Date.now(),
            type: '',
            folder: '',
            title: '',
            tags: [],
            isStarred: false,
            isTrashed: false
          });
          this.loadTodoProp(defaultTodo);
        } else {
          this.loadTodoProp(JSON.parse(content));
        }
      });
    }
  },
  created() {
    // console.log('created', this.id);
    // this.readTodo();
    // if (this.todos.length === 0) {
    //   this.$store.dispatch('addTodo', {
    //     todo: {
    //       id: uid(),
    //       type: 'TODO',
    //       title: ''
    //     },
    //     startIndex: 0
    //   })
    // }
    // //
    // this.$store.dispatch('reset')
  }
};
</script>

<style lang="less">

.todo {
  border-radius: 0;
  box-shadow: none;
  height: 96vh;
}
input{
  border: 0 ;
  border-bottom: 1px solid gray;
}
</style>
