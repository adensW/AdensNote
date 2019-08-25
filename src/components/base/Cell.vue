<template>
  <div class="cell-wrapper" @click="focus">
      <span v-if="editable" class="cell-span"
        :contenteditable="editable"
        @input="$emit('input',$event)"
        >
          <slot></slot>
      </span>
      <span v-if="!editable" class="cell-span">
          <slot></slot>
      </span>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus (e) {
      console.log(e.target.innerText.length)
      if (e.target.innerText.length <= 0) {
        try {
          window.getSelection().collapse(e.target.children[0], 1)
        } catch (error) {
          window.getSelection().collapse(e.target.children[0])
        }
        e.target.focus()
      }
    }
  }
}
</script>

<style>
.cell-wrapper{
    height: 18px;
}
</style>
