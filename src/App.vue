<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import fs from 'libs/files.js'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'app',
  components: {},
  data() {
    return {};
  },
  computed: {

    ...mapGetters(['storage']),

  },

  methods: {},
  mounted() {
    console.log(this.storage.rootPath)
    
    fs.writeFile(`${this.storage.rootPath}\\1.json`, JSON.stringify({id: '1234'}))
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
