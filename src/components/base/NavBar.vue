<template>
    <div class="nav">
        <NavBarItem v-for="(item,index) in links"
            :key="index"
            :link="item"
        ></NavBarItem>
    </div>
</template>

<script>
import NavBarItem from './NavBarItem'
export default {
  name: 'Navbar',
  components: {
    NavBarItem
  },
  props: ['links'],
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
