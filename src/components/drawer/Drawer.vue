<template>
<div class='drawer-wrapper'>
  <div class='drawer-content' v-show="visiable"><slot></slot></div>
  <div class='drawer-mask' v-show="visiable" @click='toggleDisplay'></div>
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
      visiable:this.opened
    }
  },
  watch: {
    opened: function(val) {
      this.visiable =val;
    }
  },
  methods: {
    toggleDisplay() {
      this.visiable = false;
       this.$emit('on-close');
    }
  }
}
</script>
