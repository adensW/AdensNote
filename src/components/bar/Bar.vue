<template>
  <div class='bar'>
      <div class='bar-content'>
          <slot></slot>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Bar',
  methods: {
    handleClick() {
      this.$emit('handleclcik')
    }
  }
}
</script>
