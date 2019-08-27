<template>
<div class='drawer-wraper'>

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
  }
}
</script>
