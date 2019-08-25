<template>
     <router-link :to="link.path">
         <Cell :editable="editable"
          @input="$emit('input',$event)"
          >{{link.title}}</Cell>
     </router-link>
</template>

<script>
import Cell from './Cell'
export default {
  name: 'LinkCell',
  components: {
    Cell
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    link: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
