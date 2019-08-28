<template>
  <div id="app">
    <bar @handleClick='handleClick'></bar>
    <Drawer :opened="drawerOpen"><SideNav v-if="albumLoaded" class="layout-window"></SideNav></Drawer>
    <div class='main-content'>
      <router-view></router-view>
    </div>
     <!-- <div class="row foot">foot: Aden's note</div> -->
  </div>
</template>

<script>
import fs from 'libs/files.js'
import { mapGetters, mapActions } from 'vuex';
import Bar from 'components/bar/Bar'
import SideNav from 'components/modules/SideNav';
import Drawer from 'components/drawer/Drawer'
export default {
  name: 'app',
  components: {
    Bar,
    SideNav,
    Drawer
  },
  data() {
    return {
      drawerOpen: false
    };
  },
  computed: {
    ...mapGetters(['storage', 'albumLoaded'])
  },

  methods: {
    ...mapActions([
      'loadAlbum',
      'initAlbum',
      'updateAlbumLoadState']),
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
    },
    handleClick() {
      this.drawerOpen = !this.drawerOpen;
      console.log('handleclick',this.drawerOpen)

    }
  },
  mounted() {
    console.log(this.storage.rootPath)
    if (!fs.ExistsSync(this.storage.rootPath)) {
      fs.mkdirSync(this.storage.rootPath)
      fs.mkdirSync(this.storage.notePath)
      fs.mkdirSync(this.storage.todoPath)
      fs.writeFile(this.storage.albumsPath, JSON.stringify(
        {
          id: '1',
          name: 'default',
          notePath: this.storage.notePath,
          todoPath: this.storage.todoPath,
          createdAT: Date.now(),
          updatedAt: Date.now(),
          tags: [],
          isStarred: false,
          isTrashed: false,
          toDoCollection: [{
            id: '1',
            name: '',
            isTrashed: false
          }]
        }
      ))
    }
    this.initLoad();
    // fs.writeFile(`${this.storage.rootPath}\\1.json`, JSON.stringify({id: '1234'}))
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  // padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
:focus {
  outline: none;
}
.nav-container {
  overflow: auto;
}
.container {
  overflow: auto;
}
.main-content{
  margin-top: 56px;
}
</style>
