<template>
  <div class="home layout-container" v-hotkey='keymap'>
    <div class="row wrapper">
      <div class="col-5 nav-container">
        <SideNav v-if="albumLoaded" class='layout-window'></SideNav>
      </div>
      <div class="col-5 container">
        <ToDo v-if="todoLoaded" class='layout-window'></ToDo>
      </div>
      <div class="col-14  container">
        <Editor v-if="editorLoaded" class='layout-window'></Editor>
      </div>
    </div>
    <div class="row foot">foot: Aden's note</div>
  </div>
</template>

<script>
import autoSaveMixin from 'components/mixin/autosave.mixin.js';
import switcherMixin from 'components/mixin/switcher.mixin.js';

import SideNav from 'components/modules/SideNav';
import ToDo from 'views/ToDo';
import Editor from 'views/Editor';
import { mapGetters, mapActions } from 'vuex';
import fs from 'libs/files.js';
export default {
  name: 'home',
  components: {
    SideNav,
    ToDo,
    Editor
  },
  computed: {
    ...mapGetters(['storage', 'albumLoaded', 'todoLoaded', 'editorLoaded']),
    keymap(){
      return{
        'ctrl+s': () => {console.log('save')},
        'up': () => {console.log('up')},
        'down': () => {console.log('down')}

      }
    }
  },
  mixins: [autoSaveMixin, switcherMixin],
  methods: {
    ...mapActions([
      'loadAlbum',
      'initAlbum',
      'updateAlbumLoadState',
      'updateTodoLoadState',
      'updateEditorLoadState'
    ]),
    initLoad() {
      if (!this.albumLoaded) {
        fs.readFile(this.storage.albumsPath, (err, content) => {
          if (err) {
            this.initAlbum();
          } else {
            let album = JSON.parse(content);
            if (album) {
              this.loadAlbum(album);
            }
            this.updateAlbumLoadState(true);
          }
        });
      }
    }
  },
  mounted() {
    this.initLoad();
  }
};
</script>
<style lang="less" scoped>
.wrapper{
  height: 96vh;
}
</style>
