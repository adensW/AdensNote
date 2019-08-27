<template>
<div class='drawer-wrapper'>
  <div class='mask' v-show='open' @click='toggleDisplay'></div>
  <div class=''><slot></slot></div>
</div>
</template>

<script>
export default {
  name: 'Drawer',
  prop: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    }
  },
  data(){
    return {
      open:this.value|false
    }
  },
  methods:{
    toggleDisplay(){
      console.log(this.open)
      this.open = !this.open;
    }
  }
}
</script>
