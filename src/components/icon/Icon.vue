<template>
  <i class='icons' @click="$emit('handleClick')"><slot></slot></i>
</template>

<script>
export default {
  name: 'Icon'
}
</script>
