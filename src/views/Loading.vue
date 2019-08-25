<template>
    <div>loading</div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
// import fs from 'libs/files.js'
export default {
  name: 'Loading',
  data() {
    return {

    }
  },
  props: [],
  computed: {
    // ...mapGetters(['storage'])
  },
  mounted() {
    // fs.readFile(this.storage.albumsPath, (err, content) => {
    //   if (err) {
    //     this.initAlbum();
    //   } else {
    //     let album = JSON.parse(content);
    //     if (album) {
    //       this.loadAlbum(album)
    //     }
    //     this.updateLoadState(true)
    //     this.$router.push({ path: 'home' })
    //   }
    // })
  },
  methods: {
    // ...mapActions(['loadAlbum', 'initAlbum'])
  }
}
</script>

<style>

</style>
