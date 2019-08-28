<template>
  <div class="home layout-container" v-hotkey="keymap">
    <div class="row">
      <div class="col-5 container">
        <ToDo v-if="todoLoaded" class="layout-window"></ToDo>
      </div>
      <div class="col-14 container">
        <Editor v-if="editorLoaded" class="layout-window"></Editor>
      </div>
    </div>

  </div>
</template>

<script>
import autoSaveMixin from 'components/mixin/autosave.mixin.js';
import switcherMixin from 'components/mixin/switcher.mixin.js';

import ToDo from 'views/ToDo';
import Editor from 'views/Editor';
import { mapGetters, mapActions } from 'vuex';
// import fs from 'libs/files.js';
export default {
  name: 'home',
  components: {
    ToDo,
    Editor
  },
  computed: {
    ...mapGetters(['storage', 'todoLoaded', 'editorLoaded']),
    keymap() {
      return {
        'ctrl+s': () => {
          console.log('save');
        },
        up: () => {
          console.log('up');
        },
        down: () => {
          console.log('down');
        }
      };
    }
  },
  mixins: [autoSaveMixin, switcherMixin],
  methods: {
    ...mapActions([

      'updateTodoLoadState',
      'updateEditorLoadState'
    ])
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  height: 96vh;
}
</style>
