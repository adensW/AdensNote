<template>
  <div class='album'>
    <div class="fold" v-for="album in folds" :key="album.id">
      <Cell>{{album.name}}</Cell>
      <SideNavItem @on-close="close" v-for="link in album.links"
        :key="link.id"
        v-bind="link"
      ></SideNavItem>
      <div @click="add">Add</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import uid from 'apis/uid.js'

import Cell from 'components/base/Cell'
import SideNavItem from './SideNavItem'

import switcherMixin from 'components/mixin/switcher.mixin.js'
export default {
  name: 'SideNav',
  components: {
    Cell,
    SideNavItem
  },
  mixins: [switcherMixin],
  data () {
    return {
      pannelName: 'SIDE_MENU'
    }
  },
  computed: {
    ...mapGetters(['albums', 'storage']),
    folds: function () {
      let arr = []
      this.albums.forEach(element => {
        let links = []
        element.toDoCollection.forEach(todo => {
          links.push({
            id: todo.id,
            title: todo.name
          })
        })
        arr.push({
          id: element.id,
          name: element.name,
          links: links
        })
      })
      return arr
    }
  },
  methods: {
    ...mapActions([
      'addTodoCollection',
      'deleteTodoCollection',
      'updateTodoCollection'
    ]),
    add: function () {
      let id = uid()
      console.log(this.storage)
      this.addTodoCollection({
        id: id,
        name: 'title',
        isTrashed: false
      })
    },
    close(){
      this.$emit('on-close')
    }

  },
  mounted () {}
}
</script>

<style>
</style>
