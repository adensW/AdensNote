<template>
  <div class='bar'>
      <div class='bar-content'>
          <icon @handleClick='handleClick'>menu</icon>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Bar',
  methods: {
    handleClick() {
      console.log('click')
      this.$emit('handleClick')
    }
  }
}
</script>
