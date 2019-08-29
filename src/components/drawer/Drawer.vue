<template>
<div class='drawer-wrapper'>
  <div class='drawer-content' v-show="_open"><slot></slot></div>
  <div class='drawer-mask' v-show="_open" @click='toggleDisplay'></div>
</div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    opened: {
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
  data() {
    return {
     
    }
  },
  computed: {
    _open: function() {
      return this.opened;
    }
  },
  methods: {
    toggleDisplay() {
      console.log(this.open)
      this.open = !this.open;
    }
  }
}
</script>
