<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import fs from 'libs/files.js'
import { mapGetters } from 'vuex';
export default {
  name: 'app',
  components: {},
  data() {
    return {};
  },
  computed: {

    ...mapGetters(['storage'])

  },

  methods: {},
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
</style>
