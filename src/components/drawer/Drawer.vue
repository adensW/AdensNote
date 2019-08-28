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
      open: this.opened | false
    }
  },
  watch: {
    opened: function(val) {
      console.log(val);
      this.open = val;
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
